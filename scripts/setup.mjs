#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import { bundleRoot,readJson,installationPlan,applyPlan } from './lib.mjs';

function main() {
  const args=process.argv.slice(2),options={optional:[],apply:false};
  for(let i=0;i<args.length;i++) {
    const key=args[i];
    if(key==='--apply')options.apply=true;
    else if(['--platform','--project','--optional'].includes(key)) {
      const value=args[++i];if(!value||value.startsWith('--'))throw new Error(`Missing value for ${key}`);
      if(key==='--optional')options.optional.push(...value.split(',').filter(Boolean));
      else options[key.slice(2)]=value;
    } else if(key==='--help'){console.log('node scripts/setup.mjs --platform codex|claude|cursor|generic --project PATH [--optional name,name] [--apply]\nDry run by default. Existing changed/extra skill files are never overwritten. No dependencies, auth, plugin registration or MCP setup.');return;}
    else throw new Error(`Unknown option: ${key}`);
  }
  if(!options.platform||!options.project)throw new Error('--platform and --project are required (use --help)');
  const plan=installationPlan(options),result=applyPlan(plan,options);
  console.log(`${options.apply?'Exported':'DRY RUN'}: ${result.skills} skills -> ${plan.targetRoot}`);
  console.log(`New files ${options.apply?result.created:result.wouldCreate}; identical files skipped ${result.identical}.`);
  const config=readJson(path.join(bundleRoot,'collection.json'));
  for(const [name,profile]of Object.entries(config.platforms)) {
    const dir=path.join(plan.projectRoot,profile.directory);
    if(name!=='generic'&&dir!==plan.targetRoot&&config.core.some(s=>fs.existsSync(path.join(dir,s.name,'SKILL.md'))))console.log(`NOTICE: another profile already contains collection skills at ${dir}; hosts scanning multiple roots can show duplicates. Use one discoverable copy per host/scope.`);
  }
  console.log(`Next: open the target project in ${options.platform}; ${config.platforms[options.platform].invoke}. Verify discovery in the actual host.`);
}
try{main();}catch(error){console.error(error.message);process.exitCode=1;}
