#!/usr/bin/env node
// Read-only against the named source collection; writes snapshots/provenance only inside this bundle.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const bundle = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== '--source-root') {
  console.error('Usage: node scripts/capture-sources.mjs --source-root PATH');
  process.exit(2);
}
const sourceRoot = fs.realpathSync(path.resolve(args[1]));
const pendingWrites = new Map();
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const slash = p => p.split(path.sep).join('/');
const excluded = new Set(['Zip', '.git', 'node_modules', '.venv', 'venv', 'dist', 'build', '.next', '.cache', 'coverage', '__pycache__']);
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).sort((a,b) => a.name.localeCompare(b.name)).flatMap(e => {
    if (e.isSymbolicLink()) throw new Error(`Source symlink requires explicit review: ${path.join(dir, e.name)}`);
    if (e.isDirectory()) return excluded.has(e.name) ? [] : walk(path.join(dir,e.name));
    return e.isFile() ? [path.join(dir,e.name)] : [];
  });
}
function write(relative, data) {
  const target = path.resolve(bundle, relative);
  if (!target.startsWith(bundle + path.sep)) throw new Error('Output escapes bundle');
  // Reject symlinked ancestors before writes.
  for (let p = target; p !== path.dirname(p); p = path.dirname(p)) {
    if (fs.existsSync(p) && fs.lstatSync(p).isSymbolicLink()) throw new Error(`Output symlink: ${p}`);
    if (p === bundle) break;
  }
  pendingWrites.set(target, data);
}
function copyTree(src, dest) {
  for (const file of walk(src)) write(path.join(dest,path.relative(src,file)),fs.readFileSync(file));
}
function zipEntries(file) {
  const bytes=fs.readFileSync(file); let end=-1;
  for(let p=bytes.length-22;p>=Math.max(0,bytes.length-65557);p--) if(bytes.readUInt32LE(p)===0x06054b50){end=p;break;}
  if(end<0) throw new Error(`No ZIP directory: ${file}`);
  const count=bytes.readUInt16LE(end+10); let p=bytes.readUInt32LE(end+16); const result=[];
  for(let i=0;i<count;i++) {
    if(bytes.readUInt32LE(p)!==0x02014b50) throw new Error('Invalid ZIP directory');
    const method=bytes.readUInt16LE(p+10), size=bytes.readUInt32LE(p+20), plainSize=bytes.readUInt32LE(p+24);
    const n=bytes.readUInt16LE(p+28), extra=bytes.readUInt16LE(p+30), comment=bytes.readUInt16LE(p+32), offset=bytes.readUInt32LE(p+42);
    const name=bytes.subarray(p+46,p+46+n).toString('utf8');
    if(name.startsWith('/')||name.split('/').includes('..')) throw new Error('Unsafe ZIP member');
    if(/SKILL\.md$/i.test(name)) {
      if(bytes.readUInt32LE(offset)!==0x04034b50) throw new Error('Invalid ZIP member');
      const start=offset+30+bytes.readUInt16LE(offset+26)+bytes.readUInt16LE(offset+28);
      const packed=bytes.subarray(start,start+size);
      const data=method===0?packed:method===8?zlib.inflateRawSync(packed,{maxOutputLength:2*1024*1024}):null;
      if(!data||data.length!==plainSize) throw new Error('Unsupported or inconsistent ZIP member');
      result.push({name,data});
    }
    p+=46+n+extra+comment;
  }
  return result;
}
const base = {
  'user-research':['retain','skills/user-research/SKILL.md','User evidence owner'],
  'research-synthesis':['merge','skills/user-research/SKILL.md','Synthesis is an existing research responsibility'],
  'design-system':['retain','skills/design-system/SKILL.md','Shared-system owner'],
  'design-handoff':['merge','shared/references/interface.md','Interface delivery mode and templates'],
  'ux-copy':['merge','shared/references/interface.md','Copy is an interface mode'],
  'design-critique':['merge','skills/improve-ui/SKILL.md','Independent critique/audit owner'],
  'accessibility-review':['merge','skills/fixing-accessibility/SKILL.md','Read-only audit mode retained separately from remediation'],
  'ui-skills-root':['merge','skills/ui-ux-meta-architect/SKILL.md','Extend registry routing into evidence/ownership coordination'],
  'baseline-ui':['reference','shared/references/baseline-ui.md','Conditional defaults shared by interface work'],
  'create-design-md':['merge','shared/references/design-md.md','Shared design-language record mode'],
  'fixing-accessibility':['retain','skills/fixing-accessibility/SKILL.md','Specialized accessibility repair/verification'],
  'fixing-metadata':['merge','shared/references/metadata.md','Bounded interface metadata mode'],
  'fixing-motion-performance':['merge','skills/animate/SKILL.md','Motion diagnostic mode'],
  'improve-ui':['retain','skills/improve-ui/SKILL.md','Read-only product assessment'],
  'animate':['retain','skills/animate/SKILL.md','Temporal/gesture owner'],
  'animate-expo':['merge','shared/references/motion-expo.md','Native motion platform profile'],
  'animation-vocabulary':['reference','shared/references/motion-vocabulary.md','Naming lookup does not need another skill'],
  'apple-design':['reference','shared/references/apple.md','Contextual platform/design profile'],
  'emil-design-eng':['reference','shared/references/motion.md','Shared craft principles with explicit policy'],
  'find-animation-opportunities':['merge','skills/animate/SKILL.md','Read-only discover mode'],
  'improve-animations':['merge','skills/animate/SKILL.md','Audit/plan/reconcile modes; explicit implementation mode'],
  'review-animations':['merge','skills/animate/SKILL.md','Explicit motion-review mode'],
  'pick-ui-library':['reference','shared/references/libraries.md','Deliberate lookup mode'],
  'prototype':['merge','shared/references/interface.md','Explore mode and reusable picker'],
  'ask-sonner':['reference','shared/references/sonner.md','Library-specific resource'],
  'ui-design-toolkit':['retain','skills/ui-design-toolkit/SKILL.md','Interface owner with other domains handed to canonical specialists']
};
const config=JSON.parse(fs.readFileSync(path.join(bundle,'collection.json'),'utf8'));
const records=[]; const primary=new Map();const archives=[];
for(const folder of ['design','ui-skills-main','skills-main','shadcn-ui-main','higgsfield_skills-main']) {
  for(const file of walk(path.join(sourceRoot,folder)).filter(f=>path.basename(f).toLowerCase()==='skill.md')) {
    const bytes=fs.readFileSync(file), text=bytes.toString('utf8');
    const name=/^name:\s*["']?([^\r\n"']+)/m.exec(text)?.[1].trim();
    if(!name) throw new Error(`Missing source identity: ${file}`);
    const optional=config.optional.includes(name);
    const [disposition,destination,rationale]=optional?['optional',`integrations/skills/${name}/SKILL.md`,'Preserve original specialist, resources and dependencies; not activated by default']:base[name]||[];
    if(!disposition) throw new Error(`Unaccounted source: ${name}`);
    const record={id:`loose:${slash(path.relative(sourceRoot,file))}`,name,original_path:file,source_relative:slash(path.relative(sourceRoot,file)),archive_member:null,sha256:sha(bytes),disposition,destination,rationale,license_status:folder==='design'?'not-documented-in-accessible-folder':'MIT-source-notice-preserved'};
    records.push(record); primary.set(name,record);
    if(optional) copyTree(path.dirname(file),`integrations/skills/${name}`);
  }
}
for(const relative of ['ui-skills-main/design-engineering-toolkit.plugin','shadcn-ui-main/shadcn-ui.plugin']) {
  const archive=path.join(sourceRoot,relative);
  archives.push({source_relative:relative,sha256:sha(fs.readFileSync(archive))});
  for(const entry of zipEntries(archive)) {
    const name=/^name:\s*["']?([^\r\n"']+)/m.exec(entry.data.toString('utf8'))?.[1].trim();
    if(!name) throw new Error('Missing packaged identity');
    const original=primary.get(name); const duplicate=original?.sha256===sha(entry.data);
    if(original&&!duplicate) throw new Error(`Previously duplicate definition diverged: ${name}`);
    const mapping=base[name];
    if(!original&&!mapping) throw new Error(`Unmapped archive skill: ${name}`);
    records.push({id:`package:${relative}!/${entry.name}`,name,original_path:archive,source_relative:relative,archive_member:entry.name,sha256:sha(entry.data),disposition:duplicate?'duplicate':mapping[0],duplicate_of:duplicate?original.id:null,destination:original?.destination??mapping[1],rationale:duplicate?'Byte-identical packaged copy; preserve provenance, exclude active duplication':mapping[2],license_status:duplicate?original.license_status:'package-notice-incomplete; constituent-source-notices-preserved'});
  }
}
const copies=[
 ['skills-main/skills/animate/RECIPES.md','shared/references/web-recipes.md'],
 ['skills-main/skills/animate-expo/RECIPES.md','shared/references/expo-recipes.md'],
 ['skills-main/skills/animation-vocabulary/SKILL.md','shared/references/vocabulary-source.md'],
 ['skills-main/skills/ask-sonner/API.md','shared/references/sonner-api.md'],
 ['skills-main/LICENSE','licenses/emil-kowalski-MIT.txt'],
 ['ui-skills-main/LICENSE','licenses/julien-thibeaut-MIT.txt'],
 ['higgsfield_skills-main/LICENSE','licenses/higgsfield-MIT.txt'],
 ['shadcn-ui-main/ui-main/LICENSE.md','licenses/shadcn-MIT.txt'],
 ['web_page_taxonomy_guide.md','provenance/taxonomy-original.md'],
 ['web_page_taxonomy_guide_revised.md','provenance/taxonomy-revised.md']
];
const resources=[];
for(const [source,destination] of copies) {
  const original=fs.readFileSync(path.join(sourceRoot,source));
  let data=original;
  if(destination.endsWith('vocabulary-source.md')) data=Buffer.from(original.toString('utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,''));
  write(destination,data); resources.push({source_relative:source,original_path:path.join(sourceRoot,source),source_sha256:sha(original),destination,sha256:sha(data)});
}
const loose=records.filter(r=>!r.archive_member).length,duplicates=records.filter(r=>r.disposition==='duplicate').length;
if(loose!==36||records.length!==50||duplicates!==13||new Set(records.map(r=>r.name)).size!==37) throw new Error('Source inventory drift; inspect before accepting new counts');
write('provenance/sources.json',JSON.stringify({schema_version:1,captured_date:'2026-10-23',source_root:sourceRoot,exclusions:[...excluded],counts:{loose,packaged:records.length-loose,total:records.length,unique_names:37,duplicate_copies:duplicates},definitions:records,archives,supporting_resources:resources,notes:['Source paths are provenance only, never runtime dependencies.','Design source license is undocumented; core uses independently worded procedures rather than copying its definitions.','No definition was invented for higgsfield-game-generation.']},null,2)+'\n');
// Commit only after all source definitions, mappings, resources, and counts were accepted.
for(const [target,data] of pendingWrites) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, data);
}
console.log(`Captured ${records.length} definitions; ${duplicates} duplicates; ${config.optional.length} optional snapshots. Source files were read only.`);
