// Executes the actual embedded script against an offline DOM fixture, not a browser.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {bundleRoot} from '../scripts/lib.mjs';

const html=fs.readFileSync(path.join(bundleRoot,'shared','templates','prototype-picker.html'),'utf8');
const script=/<script>([\s\S]*?)<\/script>/.exec(html)[1];
class Element {
  constructor(tag='div'){this.tagName=tag.toUpperCase();this.style={};this.attrs=new Map();this.listeners=new Map();this.isContentEditable=false;}
  addEventListener(type,fn){this.listeners.set(type,fn);}
  setAttribute(name,value){this.attrs.set(name,value);}
  removeAttribute(name){this.attrs.delete(name);}
  closest(selector){return /input|textarea|select/.test(selector)&&['INPUT','TEXTAREA','SELECT'].includes(this.tagName)?this:selector.includes('[contenteditable="true"]')&&this.attrs.get('contenteditable')==='true'?this:null;}
  click(){this.listeners.get('click')?.({target:this});}
  focus(){this.focused=true;}
}
function harness({query='',motion=false}={}) {
  const stage=new Element(),picker=new Element('nav'),highlight=new Element(),replay=new Element('button'),note=new Element();
  const buttons=Array.from({length:3},(_,i)=>{const e=new Element('button');e.offsetWidth=80;e.offsetLeft=6+i*84;return e;});
  picker.querySelectorAll=()=>buttons;picker.querySelector=()=>highlight;picker.contains=element=>buttons.includes(element)||element===replay;
  stage.replaceChildren=child=>{stage.rendered=child;};
  stage.querySelector=selector=>selector==='[data-action]'?stage.rendered.action:stage.rendered.status;
  const templates=Object.fromEntries([...html.matchAll(/<template id="([^"]+)">([\s\S]*?)<\/template>/g)].map(([,id,markup])=>['#'+id,{content:{cloneNode:()=>({markup,action:new Element('button'),status:new Element()})}}]));
  const elements={'#stage':stage,'.picker':picker,'#replay':replay,'#variant-note':note,...templates};
  const events=new Map(),location={href:'https://offline.invalid/'+query,search:query};
  const document={querySelector:selector=>elements[selector],addEventListener:(type,fn)=>events.set(type,fn),fonts:{ready:{then:fn=>fn()}}};
  const context=vm.createContext({document,window:{addEventListener:()=>{}},location,history:{replaceState:(_a,_b,url)=>{location.href=url.href;location.search=url.search;}},URL,URLSearchParams,requestAnimationFrame:fn=>fn()});
  vm.runInContext(motion?script.replace("{id:'quiet',","{id:'quiet',animated:true,"):script,context,{timeout:1000});
  function key(value,target=new Element(),extra={}){let prevented=false;events.get('keydown')({key:value,target,preventDefault:()=>{prevented=true;},...extra});return prevented;}
  return {stage,picker,replay,note,buttons,location,key};
}
test('picker switches actual template content and keeps one selected direction',()=>{
  const h=harness();assert.match(h.stage.rendered.markup,/Workspace overview/);
  h.buttons[1].click();assert.match(h.stage.rendered.markup,/Make room for focused work/);
  assert.equal(h.buttons.filter(b=>b.attrs.get('aria-current')==='true').length,1);
  assert.equal(new URL(h.location.href).searchParams.get('v'),'2');
});
test('picker sample action produces status feedback',()=>{
  const h=harness();h.stage.rendered.action.click();assert.match(h.stage.rendered.status.textContent,/Action received/);
});
test('picker restores URL selection and clamps invalid values',()=>{
  assert.match(harness({query:'?v=3'}).stage.rendered.markup,/Frequently used actions/);
  assert.match(harness({query:'?v=invalid'}).stage.rendered.markup,/Workspace overview/);
  assert.match(harness({query:'?v=99'}).stage.rendered.markup,/Frequently used actions/);
});
test('picker leaves input typing and modified shortcuts untouched',()=>{
  const h=harness();assert.equal(h.key('2',new Element('input')),false);assert.equal(h.key('2',new Element(),{ctrlKey:true}),false);
  assert.match(h.stage.rendered.markup,/Workspace overview/);
});
test('picker leaves bare contenteditable and plaintext-only typing untouched',()=>{
  for(const value of ['', 'plaintext-only']) {
    const h=harness(),editable=new Element();editable.isContentEditable=true;editable.attrs.set('contenteditable',value);
    assert.equal(h.key('2',editable),false);assert.match(h.stage.rendered.markup,/Workspace overview/);
  }
});
test('picker arrow navigation is scoped to picker and wraps with focus',()=>{
  const h=harness();assert.equal(h.key('ArrowLeft'),false);
  assert.equal(h.key('ArrowLeft',h.buttons[0]),true);assert.match(h.stage.rendered.markup,/Frequently used actions/);assert.equal(h.buttons[2].focused,true);
});
test('picker shows replay only for animated directions and remounts the selected template',()=>{
  assert.equal(harness().replay.hidden,true);
  const h=harness({motion:true}),first=h.stage.rendered;assert.equal(h.replay.hidden,false);h.replay.click();assert.notEqual(h.stage.rendered,first);
  const second=h.stage.rendered;h.key('r');assert.notEqual(h.stage.rendered,second);
});
