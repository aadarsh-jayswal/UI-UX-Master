// Native read-only discovery probe. No thread/turn, model request, install, or config write.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../..');
const executable=process.argv[2];
if(!executable)throw new Error('Pass the installed Codex executable path');
const expected=new Set(JSON.parse(fs.readFileSync(path.join(root,'collection.json'),'utf8')).core.map(s=>s.name));
const project=path.resolve(root,'..'),exportProject=path.join(root,'exports','codex');
const child=spawn(executable,['app-server','--listen','stdio://'],{stdio:['pipe','pipe','pipe'],windowsHide:true});
let buffer='',completed=false;
const timeout=setTimeout(()=>{console.error('Native discovery timed out');child.kill();process.exitCode=1;},20000);
const send=request=>child.stdin.write(JSON.stringify(request)+'\n');
child.on('error',error=>{clearTimeout(timeout);console.error(error.message);process.exitCode=1;});
child.stderr.on('data',()=>{}); // Avoid dumping incidental host diagnostics/credentials.
child.stdout.on('data',chunk=>{
  buffer+=chunk.toString('utf8');
  for(let end;(end=buffer.indexOf('\n'))>=0;){
    const line=buffer.slice(0,end);buffer=buffer.slice(end+1);let message;
    try{message=JSON.parse(line);}catch{continue;}
    if(message.id===1){
      if(message.error){console.error(JSON.stringify(message.error));clearTimeout(timeout);child.kill();process.exitCode=1;return;}
      send({method:'initialized',params:{}});
      send({id:2,method:'skills/list',params:{cwds:[project,exportProject],forceReload:true}});
    }
    if(message.id===2){
      completed=true;clearTimeout(timeout);
      if(message.error){console.error(JSON.stringify(message.error));process.exitCode=1;}
      else {
        const result={probe:'native Codex skills/list; no model turn',results:(message.result.data||[]).map(row=>({cwd:row.cwd,collectionSkills:(row.skills||[]).filter(skill=>expected.has(skill.name)).map(({name,path,scope,enabled})=>({name,path,scope,enabled})),errors:(row.errors||[]).filter(error=>JSON.stringify(error).includes(root))}))};
        fs.writeFileSync(path.join(here,'discovery-result.json'),JSON.stringify(result,null,2)+'\n');
        console.log(JSON.stringify(result,null,2));
      }
      child.stdin.end();child.kill();
    }
  }
});
child.on('exit',()=>{clearTimeout(timeout);if(!completed){console.error('App-server exited before skills/list response');process.exitCode=1;}});
send({id:1,method:'initialize',params:{clientInfo:{name:'ui_ux_local_validation',title:'UI UX Local Validation',version:'1.0.0'}}});
