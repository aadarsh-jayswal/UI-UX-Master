import { test,after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { bundleRoot,readJson,installationPlan,applyPlan,files,markdownLinks,inside } from '../scripts/lib.mjs';
import { validateInstalled } from '../scripts/validate.mjs';
import { ratio,verdict } from '../shared/scripts/contrast.mjs';
import { evaluatePage,findChrome } from '../shared/scripts/page-eval.mjs';

const fixtures=path.join(bundleRoot,'tests','fixtures');
const expected=readJson(path.join(fixtures,'expected.json')).fixtures;
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'ui-ux-master-test-'));
after(()=>fs.rmSync(temp,{recursive:true,force:true}));
const chrome=findChrome()&&typeof WebSocket!=='undefined'?false:'Chrome/Edge or Node 22 WebSocket unavailable';

test('contrast matches WCAG reference values',()=>{
  assert.equal(verdict(ratio('#626262','#fff')).ratio,6.1);
  assert.equal(verdict(ratio('#767676','#ffffff')).aa,true);
  assert.equal(verdict(ratio('#A9A9A9','#FFFFFF')).aa,false);
  assert.equal(verdict(ratio('#000','#fff')).ratio,21);
  assert.equal(verdict(ratio('#00000080','#fff')).ratio,4);
  const ring=verdict(ratio('e2dacd','fffdf9'),'non-text');
  assert.equal(ring.ratio,1.36);assert.equal(ring.aa,false);assert.equal(ring.aaa,null);
  assert.equal(verdict(ratio('#949494','#fff'),'non-text').aa,true);
  assert.throws(()=>ratio('red','#fff'),/Expected/);
});
test('rendered-UI audit script parses as one expression',()=>{
  const src=fs.readFileSync(path.join(bundleRoot,'shared','scripts','audit-rendered-ui.js'),'utf8');
  assert.doesNotThrow(()=>new Function(`return ${src.replace(/^\s*\/\*[\s\S]*?\*\/\s*/,'')}`));
});
test('every core skill links the quality bar and its scripts export with it',()=>{
  const plan=installationPlan({platform:'plugin',project:path.join(temp,'plugin'),optional:['ui-ux-playbook-visuals']});
  applyPlan(plan,{apply:true});
  assert.deepEqual(validateInstalled(plan.targetRoot),[]);
  for(const name of ['improve-ui','ui-design-toolkit','fixing-accessibility','animate']) {
    const res=path.join(plan.targetRoot,name,'resources');
    for(const f of ['references/quality-bar.md','scripts/page-eval.mjs','scripts/audit-rendered-ui.js','scripts/contrast.mjs'])assert(fs.existsSync(path.join(res,f)),`${name} lacks ${f}`);
  }
  assert(fs.existsSync(path.join(plan.targetRoot,'improve-ui','resources','references','playbook','task-router.md')));
  const visuals=path.join(plan.targetRoot,'ui-ux-playbook-visuals');
  for(const file of files(visuals).filter(f=>f.endsWith('.md')&&path.basename(f)!=='THIRD-PARTY-NOTICES.md'))
    for(const link of markdownLinks(fs.readFileSync(file,'utf8'))){const t=path.resolve(path.dirname(file),link);assert(inside(visuals,t)&&fs.existsSync(t),`${file}: ${link}`);}
  assert.equal(files(path.join(visuals,'assets')).filter(f=>f.endsWith('.png')).length,133);
});
for(const [fixture,spec] of Object.entries(expected))test(`audit finds every script-detectable planted flaw in ${fixture}`,{skip:chrome},async()=>{
  const [width,height]=spec.viewport;
  const r=await evaluatePage(path.join(fixtures,fixture),{width,height,audit:true});
  assert.equal(r.viewport.width,width,'viewport is the requested width, not the window width');
  const ids=new Set(r.audit.findings.map(f=>f.id));
  const want=Object.entries(spec.planted||{}).filter(([,v])=>v.script).map(([id])=>id);
  assert.deepEqual(want.filter(id=>!ids.has(id)),[]);
  if(fixture.startsWith('clean'))assert.deepEqual(r.audit.findings.filter(f=>f.severity==='high'),[]);
});
test('non-text contrast, target size and names are caught',{skip:chrome},async()=>{
  const r=await evaluatePage(path.join(fixtures,'non-text.html'),{width:390,height:844,audit:true});
  const by=id=>r.audit.findings.filter(f=>f.id===id);
  assert(by('WCAG-1.4.11').some(f=>/radio indicator/.test(f.message)&&f.ratio===1.36&&f.severity==='high'));
  assert(by('WCAG-1.4.11').some(f=>/"Name"/.test(f.sample)));
  assert(!by('WCAG-1.4.11').some(f=>/"Good"/.test(f.sample)));
  assert.equal(by('WCAG-2.5.8').length,1);
  assert.equal(by('WCAG-4.1.2').length,1);
});
test('real key events move focus into the dialog and Escape returns it',{skip:chrome},async()=>{
  const r=await evaluatePage(path.join(fixtures,'modal.html'),{click:'#open',keys:'Tab,Shift+Tab,Escape'});
  assert.match(r.afterClick,/^button#cancel/);
  assert.match(r.keys[0].focus,/^button#confirm/);
  assert.match(r.keys[1].focus,/^button#cancel/);
  assert.match(r.keys[2].focus,/^button#open/);
});
test('reduced motion and true phone width are emulated',{skip:chrome},async()=>{
  const script=path.join(temp,'probe.js');
  fs.writeFileSync(script,'({ reduce: matchMedia("(prefers-reduced-motion: reduce)").matches, w: innerWidth })');
  const r=await evaluatePage(path.join(fixtures,'modal.html'),{width:320,height:640,reducedMotion:true,script});
  assert.deepEqual(r.script,{reduce:true,w:320});
});
