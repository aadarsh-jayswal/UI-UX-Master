import { test,after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { bundleRoot,readJson,installationPlan,applyPlan,metadata,resourceClosure,files } from '../scripts/lib.mjs';
import { validateInstalled,validateBundle } from '../scripts/validate.mjs';

const temp=fs.mkdtempSync(path.join(os.tmpdir(),'ui-ux-test-'));
const config=readJson(path.join(bundleRoot,'collection.json'));
const project=name=>path.join(temp,name);
after(()=>{
  // Resolved target must remain inside the explicitly named OS temporary directory.
  const resolved=fs.realpathSync(temp),base=fs.realpathSync(os.tmpdir());
  const relative=path.relative(base,resolved);
  assert(!relative.startsWith('..')&&!path.isAbsolute(relative)&&path.basename(resolved).startsWith('ui-ux-test-'));
  assert(!fs.lstatSync(temp).isSymbolicLink());
  fs.rmSync(temp,{recursive:true,force:false});
});

test('canonical collection reconciles all sources and shared dependencies',()=>{
  assert.deepEqual(validateBundle().errors,[]);
  for(const skill of config.core){
    const file=path.join(bundleRoot,'skills',skill.name,'SKILL.md');
    assert.equal(metadata(fs.readFileSync(file,'utf8')).name,skill.name);
    assert(resourceClosure(file).length>0);
  }
});
for(const platform of ['codex','claude','cursor'])test(`${platform}: seven independent portable skills survive relocation`,()=>{
  const first=project(platform),plan=installationPlan({platform,project:first});
  const result=applyPlan(plan,{apply:true});assert(result.created>0);
  assert.equal(result.skills,7);assert.deepEqual(validateInstalled(plan.targetRoot),[]);
  assert.equal(fs.readdirSync(plan.targetRoot).length,7);
  const moved=project(platform+'-relocated');fs.renameSync(first,moved);
  const relocated=path.join(moved,config.platforms[platform].directory);
  assert.deepEqual(validateInstalled(relocated),[]);
  for(const file of files(relocated).filter(f=>f.endsWith('.md')&&path.basename(f)!=='THIRD-PARTY-NOTICES.md')){
    const text=fs.readFileSync(file,'utf8');
    assert(!text.includes(bundleRoot));assert(!text.includes('../../shared/'));
  }
});
test('dry run creates no project or files',()=>{
  const dir=project('dry'),plan=installationPlan({platform:'codex',project:dir});
  const result=applyPlan(plan);assert(result.wouldCreate>0);assert.equal(result.created,0);assert(!fs.existsSync(dir));
});
test('identical exports are idempotent without rewriting',()=>{
  const plan=installationPlan({platform:'claude',project:project('repeat')});
  applyPlan(plan,{apply:true});const file=path.join(plan.targetRoot,'animate','SKILL.md'),before=fs.statSync(file).mtimeMs;
  const result=applyPlan(plan,{apply:true});assert.equal(result.created,0);assert.equal(fs.statSync(file).mtimeMs,before);
});
test('changed skill collision aborts before writing any other skill',()=>{
  const dir=project('conflict'),target=path.join(dir,'.agents','skills','animate');
  fs.mkdirSync(target,{recursive:true});fs.writeFileSync(path.join(target,'SKILL.md'),'user-owned content');
  const plan=installationPlan({platform:'codex',project:dir});
  assert.throws(()=>applyPlan(plan,{apply:true}),/Refusing to overwrite/);
  assert.equal(fs.readFileSync(path.join(target,'SKILL.md'),'utf8'),'user-owned content');
  assert(!fs.existsSync(path.join(plan.targetRoot,'ui-design-toolkit')));
});
test('extra files in a same-named skill are not silently merged',()=>{
  const plan=installationPlan({platform:'codex',project:project('extra')});applyPlan(plan,{apply:true});
  const file=path.join(plan.targetRoot,'animate','my-custom.md');fs.writeFileSync(file,'keep me');
  assert.throws(()=>applyPlan(plan,{apply:true}),/Refusing to overwrite or merge/);
  assert.equal(fs.readFileSync(file,'utf8'),'keep me');
});
test('non-directory ancestor fails before partial export',()=>{
  const dir=project('blocked-parent');fs.mkdirSync(dir);fs.writeFileSync(path.join(dir,'.agents'),'owned');
  assert.throws(()=>installationPlan({platform:'codex',project:dir}),/Parent is not a directory/);
  assert.deepEqual(fs.readdirSync(dir),['.agents']);
});
test('symlink/junction destination cannot redirect writes',()=>{
  const dir=project('linked'),other=project('redirected');fs.mkdirSync(dir);fs.mkdirSync(other);
  fs.symlinkSync(other,path.join(dir,'.agents'),process.platform==='win32'?'junction':'dir');
  assert.throws(()=>installationPlan({platform:'codex',project:dir}),/Refusing symlink path/);
  assert.deepEqual(fs.readdirSync(other),[]);
});
test('invalid optional identity and traversal are rejected',()=>{
  assert.throws(()=>installationPlan({platform:'codex',project:project('invalid'),optional:['../../escape']}),/Unknown optional/);
  assert.throws(()=>installationPlan({platform:'unknown',project:project('invalid')}),/Unknown platform/);
  assert(!fs.existsSync(project('invalid')));
});
test('optional selection preserves native resources without enabling all integrations',()=>{
  const plan=installationPlan({platform:'cursor',project:project('optional'),optional:['shadcn','migrate-radix-to-base']});
  const result=applyPlan(plan,{apply:true});assert.equal(result.skills,9);
  assert(fs.existsSync(path.join(plan.targetRoot,'shadcn','rules','forms.md')));
  assert(fs.existsSync(path.join(plan.targetRoot,'migrate-radix-to-base','consumer-props.md')));
  assert(!fs.existsSync(path.join(plan.targetRoot,'higgsfield-generate')));
  assert.deepEqual(validateInstalled(plan.targetRoot),[]);
});
test('CLI uses argument parsing safely with spaces in project path',()=>{
  const dir=project('project with spaces');
  const result=spawnSync(process.execPath,[path.join(bundleRoot,'scripts','setup.mjs'),'--platform','codex','--project',dir,'--apply'],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);assert.deepEqual(validateInstalled(path.join(dir,'.agents','skills')),[]);
});
test('CLI rejects unknown arguments without writes',()=>{
  const dir=project('unknown-option');
  const result=spawnSync(process.execPath,[path.join(bundleRoot,'scripts','setup.mjs'),'--platform','codex','--project',dir,'--force','--apply'],{encoding:'utf8'});
  assert.equal(result.status,1);assert.match(result.stderr,/Unknown option/);assert(!fs.existsSync(dir));
});
test('both taxonomy sources are preserved and canonical taxonomy exists in a relocated interface export',()=>{
  const provenance=readJson(path.join(bundleRoot,'provenance','sources.json'));
  const sourceNames=provenance.supporting_resources.map(r=>r.source_relative);
  assert(sourceNames.includes('web_page_taxonomy_guide.md'));assert(sourceNames.includes('web_page_taxonomy_guide_revised.md'));
  const target=path.join(project('codex-relocated'),'.agents','skills','ui-design-toolkit','resources','references','page-taxonomy.md');
  assert(fs.existsSync(target));
});
