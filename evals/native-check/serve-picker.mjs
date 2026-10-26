// Temporary loopback-only browser fixture. No filesystem browsing or external assets.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const html=fs.readFileSync(path.join(root,'shared','templates','prototype-picker.html'));
const server=http.createServer((request,response)=>{
  if(request.method!=='GET'||!['/','/?v=1','/?v=2','/?v=3'].includes(request.url)){response.writeHead(404);response.end('Not found');return;}
  response.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-store'});response.end(html);
});
server.listen(0,'127.0.0.1',()=>console.log('PICKER_URL=http://127.0.0.1:'+server.address().port+'/'));
setTimeout(()=>server.close(),300000).unref();
process.on('SIGINT',()=>server.close());
