#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { bundleRoot,readJson,metadata,markdownLinks,files,inside,hash,resourceClosure } from './lib.mjs';

export function validateInstalled(skillsRoot,root=bundleRoot) {
  const config=readJson(path.join(root,'collection.json')),errors=[],names=[];
  for(const item of config.core) {
    const skill=path.join(skillsRoot,item.name),file=path.join(skill,'SKILL.md');
    if(!fs.existsSync(file)){errors.push(`Missing exported skill ${item.name}`);continue;}
    try {
      const text=fs.readFileSync(file,'utf8'),front=metadata(text);names.push(front.name);
      if(front.name!==item.name)errors.push(`Wrong exported identity: ${file}`);
      if(text.includes('../../shared/'))errors.push(`Unmaterialized authoring reference: ${file}`);
      for(const local of files(skill).filter(f=>f.endsWith('.md'))) {
        if(path.basename(local)==='THIRD-PARTY-NOTICES.md')continue;
        for(const link of markdownLinks(fs.readFileSync(local,'utf8'))) {
          const target=path.resolve(path.dirname(local),link);
          if(!inside(skill,target)||!fs.existsSync(target))errors.push(`Nonportable link ${local}: ${link}`);
        }
      }
      if(!fs.existsSync(path.join(skill,'THIRD-PARTY-NOTICES.md'))||!fs.existsSync(path.join(skill,'licenses','emil-kowalski-MIT.txt')))errors.push(`Missing attribution: ${skill}`);
    }catch(error){errors.push(`${file}: ${error.message}`);}
  }
  if(new Set(names).size!==config.core.length)errors.push('Exported core identities are not unique/complete');
  return errors;
}
export function validateBundle({root=bundleRoot,sourceRoot=null}={}) {
  const config=readJson(path.join(root,'collection.json')),errors=[],warnings=[];
  const names=config.core.map(s=>s.name);
  if(names.length!==7||new Set(names).size!==7)errors.push('Expected seven unique core entrypoints');
  for(const skill of config.core) {
    const file=path.join(root,'skills',skill.name,'SKILL.md');
    try {
      const text=fs.readFileSync(file,'utf8'),front=metadata(text);
      if(front.name!==skill.name)errors.push(`Identity/folder mismatch: ${skill.name}`);
      if(!skill.separate_purpose)errors.push(`Missing independent-purpose justification: ${skill.name}`);
      if(text.split(/\r?\n/).length>140)errors.push(`Core unexpectedly long: ${skill.name}`);
      resourceClosure(file,root);
    }catch(error){errors.push(`${file}: ${error.message}`);}
  }
  for(const file of files(path.join(root,'shared')).filter(f=>f.endsWith('.md'))) {
    for(const link of markdownLinks(fs.readFileSync(file,'utf8'))) {
      const target=path.resolve(path.dirname(file),link);
      if(!inside(root,target)||!fs.existsSync(target))errors.push(`Broken shared link ${path.relative(root,file)}: ${link}`);
    }
  }
  const provenance=readJson(path.join(root,'provenance','sources.json'));
  const definitions=provenance.definitions;
  if(definitions.length!==50||new Set(definitions.map(d=>d.name)).size!==37||definitions.filter(d=>d.disposition==='duplicate').length!==13)errors.push('50/37/13 provenance reconciliation failed');
  if(new Set(definitions.map(d=>d.id)).size!==definitions.length)errors.push('Duplicate provenance record IDs');
  for(const record of definitions) {
    if(!record.rationale||!record.original_path||!record.sha256||!record.disposition)errors.push(`Incomplete provenance: ${record.id}`);
    if(!fs.existsSync(path.join(root,record.destination)))errors.push(`Missing canonical destination: ${record.id}`);
    if(record.disposition==='optional'&&fs.existsSync(path.join(root,record.destination))&&hash(fs.readFileSync(path.join(root,record.destination)))!==record.sha256)errors.push(`Optional definition drift: ${record.id}`);
    if(record.disposition==='duplicate') {
      const primary=definitions.find(d=>d.id===record.duplicate_of);
      if(!primary||primary.sha256!==record.sha256)errors.push(`Unproven duplicate: ${record.id}`);
    }
    if(sourceRoot&&!record.archive_member) {
      const source=path.join(sourceRoot,record.source_relative);
      if(!fs.existsSync(source)||hash(fs.readFileSync(source))!==record.sha256)errors.push(`Source changed/unavailable: ${record.source_relative}`);
    }
  }
  for(const resource of provenance.supporting_resources) {
    const dest=path.join(root,resource.destination);
    if(!fs.existsSync(dest)||hash(fs.readFileSync(dest))!==resource.sha256)errors.push(`Snapshot drift: ${resource.destination}`);
    if(sourceRoot) {
      const source=path.join(sourceRoot,resource.source_relative);
      if(!fs.existsSync(source)||hash(fs.readFileSync(source))!==resource.source_sha256)errors.push(`Supporting source drift: ${resource.source_relative}`);
    }
  }
  if(sourceRoot)for(const archive of provenance.archives||[]) {
    const source=path.join(sourceRoot,archive.source_relative);
    if(!fs.existsSync(source)||hash(fs.readFileSync(source))!==archive.sha256)errors.push(`Archive source drift: ${archive.source_relative}`);
  }
  for(const name of config.optional)if(!fs.existsSync(path.join(root,'integrations','skills',name,'SKILL.md')))errors.push(`Optional snapshot missing: ${name}`);
  if(config.optional.includes('higgsfield-game-generation'))errors.push('Missing upstream skill was invented');
  const scenarios=readJson(path.join(root,'evals','scenarios.json'));
  for(const scenario of scenarios) {
    if(!names.includes(scenario.owner))errors.push(`Unknown scenario owner: ${scenario.id}`);
    for(const relative of scenario.references)if(!fs.existsSync(path.join(root,'shared',relative)))errors.push(`Missing scenario resource: ${scenario.id}: ${relative}`);
  }
  const picker=fs.readFileSync(path.join(root,'shared','templates','prototype-picker.html'),'utf8');
  for(const script of picker.matchAll(/<script>([\s\S]*?)<\/script>/g))try{new Function(script[1]);}catch(error){errors.push(`Picker JS syntax: ${error.message}`);}
  for(const platform of ['codex','claude','cursor']) {
    const directory=path.join(root,'exports',platform,config.platforms[platform].directory);
    if(fs.existsSync(directory))errors.push(...validateInstalled(directory,root));
    else warnings.push(`${platform} ready-to-copy export not generated`);
  }
  warnings.push('Live model routing/output quality and native app sessions remain unverified; the separate Codex scanner probe is recorded in evals/native-check/REPORT.md.');
  warnings.push('Optional provider services and snapshot scripts were not executed; their prerequisites remain external.');
  return {errors,warnings,counts:{core:names.length,optional:config.optional.length,source_definitions:definitions.length,unique_source_names:37,duplicate_copies:13,scenarios:scenarios.length}};
}
function main(){
  const args=process.argv.slice(2);let sourceRoot=null;
  if(args.length){if(args.length!==2||args[0]!=='--source-root')throw new Error('Usage: node scripts/validate.mjs [--source-root PATH]');sourceRoot=path.resolve(args[1]);}
  const result=validateBundle({sourceRoot});console.log(JSON.stringify(result,null,2));if(result.errors.length)process.exitCode=1;
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url)try{main();}catch(error){console.error(error.message);process.exitCode=1;}
