import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const bundleRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
export const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
export const posix=p=>p.split(path.sep).join('/');
export const inside=(root,file)=>{const r=path.relative(root,file);return r===''||(!r.startsWith('..'+path.sep)&&r!=='..'&&!path.isAbsolute(r));};

export function assertNoSymlinks(target) {
  for(let p=path.resolve(target);;p=path.dirname(p)) {
    try {
      const stat=fs.lstatSync(p);
      if(stat.isSymbolicLink()) throw new Error(`Refusing symlink path: ${p}`);
      if(p!==path.resolve(target)&&!stat.isDirectory())throw new Error(`Parent is not a directory: ${p}`);
    }
    catch(error){if(error.code!=='ENOENT')throw error;}
    if(path.dirname(p)===p)break;
  }
}
export function files(root) {
  return fs.readdirSync(root,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(e=>{
    const full=path.join(root,e.name);
    if(e.isSymbolicLink())throw new Error(`Unexpected symlink: ${full}`);
    return e.isDirectory()?files(full):e.isFile()?[full]:[];
  });
}
export function markdownLinks(text) {
  // Only ordinary authored links; fenced code examples are not dependencies.
  const prose=text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm,'');
  return [...prose.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1].trim().replace(/^<|>$/g,'')).filter(p=>! /^(?:https?:|mailto:|#|data:)/i.test(p)).map(p=>decodeURIComponent(p.split('#')[0])).filter(Boolean);
}
export function metadata(text) {
  const front=/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if(!front)throw new Error('Missing YAML frontmatter');
  const out={};
  for(const line of front[1].split(/\r?\n/)) {
    const m=/^([a-z][a-z-]*):\s*(.+)$/.exec(line);
    if(!m)throw new Error(`Core frontmatter must use simple scalar fields: ${line}`);
    out[m[1]]=m[2].replace(/^(["'])(.*)\1$/,'$2');
  }
  if(!out.name||!out.description)throw new Error('name and description required');
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(out.name)||out.name.length>64)throw new Error('Invalid skill name');
  if(out.description.length>1024||/[<>]/.test(out.description))throw new Error('Invalid description');
  if(Object.keys(out).some(k=>!['name','description'].includes(k)))throw new Error('Core uses portable name/description frontmatter only');
  return out;
}
export function resourceClosure(skillFile,root=bundleRoot) {
  const shared=path.join(root,'shared'), seen=new Set(),queue=[skillFile];
  while(queue.length) {
    const file=queue.pop();
    const text=fs.readFileSync(file,'utf8');
    for(const link of markdownLinks(text)) {
      const target=path.resolve(path.dirname(file),link);
      if(!inside(root,target))throw new Error(`Link escapes bundle: ${file}: ${link}`);
      if(!fs.existsSync(target)||!fs.statSync(target).isFile())throw new Error(`Missing resource: ${file}: ${link}`);
      if(inside(shared,target)&&!seen.has(target)) {seen.add(target);if(/\.md$/i.test(target))queue.push(target);}
    }
  }
  return [...seen].sort();
}
export function installationPlan({root=bundleRoot,platform,project,optional=[]}) {
  const config=readJson(path.join(root,'collection.json'));
  if(!Object.hasOwn(config.platforms,platform))throw new Error(`Unknown platform: ${platform}`);
  const projectRoot=path.resolve(project),targetRoot=path.join(projectRoot,config.platforms[platform].directory);
  if(!inside(projectRoot,targetRoot))throw new Error('Destination escapes project');
  assertNoSymlinks(targetRoot);
  if(new Set(optional).size!==optional.length)throw new Error('Duplicate optional names');
  for(const name of optional)if(!config.optional.includes(name))throw new Error(`Unknown optional skill: ${name}`);
  const entries=[];
  const add=(relative,bytes)=>entries.push({target:path.join(targetRoot,relative),relative:posix(relative),bytes:Buffer.isBuffer(bytes)?bytes:Buffer.from(bytes)});
  const licenses=files(path.join(root,'licenses'));
  for(const item of config.core) {
    const source=path.join(root,'skills',item.name,'SKILL.md');
    const body=fs.readFileSync(source,'utf8').replaceAll('../../shared/','resources/');
    add(`${item.name}/SKILL.md`,body);
    const resources=resourceClosure(source,root);
    for(const resource of resources)add(path.join(item.name,'resources',path.relative(path.join(root,'shared'),resource)),fs.readFileSync(resource));
    add(`${item.name}/THIRD-PARTY-NOTICES.md`,fs.readFileSync(path.join(root,'THIRD-PARTY-NOTICES.md')));
    for(const license of licenses)add(path.join(item.name,'licenses',path.basename(license)),fs.readFileSync(license));
    add(`${item.name}/collection-origin.json`,JSON.stringify({collection:config.name,version:config.version,skill:item.name,platform,generated:true,source:`skills/${item.name}/SKILL.md`,resources:resources.map(f=>posix(path.relative(path.join(root,'shared'),f)))},null,2)+'\n');
  }
  for(const name of optional) {
    const source=path.join(root,'integrations','skills',name);
    if(!fs.existsSync(path.join(source,'SKILL.md')))throw new Error(`Optional snapshot missing: ${name}`);
    for(const file of files(source))add(path.join(name,path.relative(source,file)),fs.readFileSync(file));
    add(`${name}/THIRD-PARTY-NOTICES.md`,fs.readFileSync(path.join(root,'THIRD-PARTY-NOTICES.md')));
    for(const license of licenses)add(path.join(name,'licenses',path.basename(license)),fs.readFileSync(license));
    add(`${name}/collection-origin.json`,JSON.stringify({collection:config.name,version:config.version,skill:name,optional:true,platform,generated:true,upstream_snapshot:true},null,2)+'\n');
  }
  const duplicates=new Set();
  for(const entry of entries) {
    if(!inside(targetRoot,entry.target))throw new Error('File escapes skill destination');
    if(duplicates.has(entry.target))throw new Error('Duplicate generated path');
    duplicates.add(entry.target);
  }
  return {projectRoot,targetRoot,platform,skills:[...config.core.map(s=>s.name),...optional],entries};
}
export function applyPlan(plan,{apply=false}={}) {
  const conflicts=[],missing=[],identical=[];
  // Preflight the complete plan before any directory/file creation.
  for(const entry of plan.entries) {
    assertNoSymlinks(entry.target);
    if(fs.existsSync(entry.target)) {
      if(!fs.statSync(entry.target).isFile()||!fs.readFileSync(entry.target).equals(entry.bytes))conflicts.push(entry.target);
      else identical.push(entry.target);
    } else missing.push(entry);
  }
  // Existing skill folders may contain user modifications or obsolete resources not present in this plan.
  for(const name of plan.skills) {
    const dir=path.join(plan.targetRoot,name);
    if(fs.existsSync(dir)) {
      if(!fs.statSync(dir).isDirectory()) {conflicts.push(dir);continue;}
      const expected=new Set(plan.entries.filter(e=>inside(dir,e.target)).map(e=>e.target));
      for(const file of files(dir))if(!expected.has(file))conflicts.push(file);
    }
  }
  if(conflicts.length)throw new Error(`Refusing to overwrite or merge changed skill files (${conflicts.length}):\n${[...new Set(conflicts)].join('\n')}`);
  if(apply)for(const entry of missing) {
    assertNoSymlinks(entry.target);
    fs.mkdirSync(path.dirname(entry.target),{recursive:true});
    fs.writeFileSync(entry.target,entry.bytes,{flag:'wx'});
  }
  return {created:apply?missing.length:0,wouldCreate:missing.length,identical:identical.length,skills:plan.skills.length};
}
