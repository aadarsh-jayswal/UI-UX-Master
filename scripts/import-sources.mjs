#!/usr/bin/env node
// Imports the merged upstream material into canonical locations and records provenance.
//   node scripts/import-sources.mjs --principles <ui-ux-principles plugin dir> --jmo <jmo-skills-main dir> [--apply]
// Without --apply it prints the plan only. Re-running with unchanged sources is idempotent.
import fs from 'node:fs';
import path from 'node:path';
import { bundleRoot, hash, posix, files } from './lib.mjs';

const args = process.argv.slice(2);
const opt = name => { const i = args.indexOf(name); return i >= 0 ? path.resolve(args[i + 1]) : null; };
const principles = opt('--principles'), jmo = opt('--jmo'), apply = args.includes('--apply');
if (!principles || !jmo) throw new Error('Usage: node scripts/import-sources.mjs --principles DIR --jmo DIR [--apply]');

const records = [], writes = [];
const write = (dest, bytes, record) => {
  writes.push({ dest, bytes });
  records.push({ ...record, destination: posix(path.relative(bundleRoot, dest)), destination_sha256: hash(bytes) });
};
const text = file => fs.readFileSync(file, 'utf8');

// 1. Playbook knowledge base (text only). Image links become plain references to the optional visuals pack,
//    so core skills stay small; gallery and coverage map move to that pack.
const refs = path.join(principles, 'references');
const playbookDir = path.join(bundleRoot, 'shared', 'references', 'playbook');
const playbookFiles = ['index.md', 'task-router.md', 'supplemental.md', 'source-notes.md',
  ...fs.readdirSync(path.join(refs, 'principles')).filter(f => f.endsWith('.md')).sort().map(f => `principles/${f}`)];
const toPlaybook = body => body
  .replace(/!\[([^\]]*)\]\((?:\.\.\/)+assets\/([^)]+)\)/g, '*Image in the optional `ui-ux-playbook-visuals` pack: `assets/$2`*')
  .replace(/\[([^\]]+)\]\((?:\.\.\/)?(coverage-map|examples-gallery)\.md\)/g, '$1 (optional `ui-ux-playbook-visuals` pack)')
  .replace(/`scripts\/audit_rendered_ui\.js`/g, '`scripts/audit-rendered-ui.js`')
  .replace(/`scripts\/contrast\.py`/g, '`scripts/contrast.mjs`')
  .replace(/python (?:\.\.\/\.\.\/)?scripts\/contrast\.py/g, 'node scripts/contrast.mjs');
for (const rel of playbookFiles) {
  const src = path.join(refs, rel);
  write(path.join(playbookDir, rel), Buffer.from(toPlaybook(text(src))), {
    id: `principles:${rel}`, origin: 'ui-ux-principles 1.0.0', original_path: posix(src), sha256: hash(fs.readFileSync(src)),
    disposition: 'adapted', license: 'Paraphrased knowledge base built from a third-party PDF (uxpeak); personal use',
    rationale: 'Traceable visual/UX rules with IDs, checks and exceptions; image links replaced to avoid per-skill duplication'
  });
}

// 2. Optional visuals pack: images, gallery, coverage map.
const visuals = path.join(bundleRoot, 'integrations', 'skills', 'ui-ux-playbook-visuals');
for (const sub of ['assets/source', 'assets/recreated']) for (const src of files(path.join(principles, sub)))
  write(path.join(visuals, sub, path.basename(src)), fs.readFileSync(src), {
    id: `principles:${sub}/${path.basename(src)}`, origin: 'ui-ux-principles 1.0.0', original_path: posix(src), sha256: hash(fs.readFileSync(src)),
    disposition: 'snapshot', license: sub.endsWith('source') ? 'Crop of a third-party PDF figure; personal reference only' : 'Original illustration',
    rationale: 'Visual examples kept in one optional pack'
  });
for (const name of ['examples-gallery.md', 'coverage-map.md']) {
  const src = path.join(refs, name);
  const body = text(src).replace(/\]\(\.\.\/assets\//g, '](assets/').replace(/\]\(principles\/([^)#]+)(#[^)]*)?\)/g, '](playbook-chapter:$1$2)');
  write(path.join(visuals, name), Buffer.from(body.replace(/playbook-chapter:/g, '../../../shared/references/playbook/principles/')), {
    id: `principles:${name}`, origin: 'ui-ux-principles 1.0.0', original_path: posix(src), sha256: hash(fs.readFileSync(src)),
    disposition: 'adapted', license: 'Personal use', rationale: 'Gallery/coverage map belong with the images'
  });
}

// 3. better-ui (MIT, Jakub Krehel): reference files verbatim; the SKILL.md is re-authored as shared/references/polish.md.
const betterUi = path.join(jmo, 'skills', 'better-ui');
for (const name of ['animations.md', 'enter-exit.md', 'icon-transitions.md', 'icons.md', 'performance.md', 'surfaces.md']) {
  const src = path.join(betterUi, name), bytes = fs.readFileSync(src);
  write(path.join(bundleRoot, 'shared', 'references', 'polish', name), bytes, {
    id: `jmo:better-ui/${name}`, origin: 'jmo-skills-main (upstream jakubkrehel/skills@d574cc8)', original_path: posix(src), sha256: hash(bytes),
    disposition: 'snapshot', license: 'MIT, Jakub Krehel', rationale: 'Exact polish values for surfaces, icons and motion'
  });
}
write(path.join(bundleRoot, 'licenses', 'jakub-krehel-MIT.txt'), fs.readFileSync(path.join(betterUi, 'LICENSE')), {
  id: 'jmo:better-ui/LICENSE', origin: 'jmo-skills-main', original_path: posix(path.join(betterUi, 'LICENSE')), sha256: hash(fs.readFileSync(path.join(betterUi, 'LICENSE'))),
  disposition: 'snapshot', license: 'MIT', rationale: 'Attribution'
});
write(path.join(bundleRoot, 'licenses', 'johnathan-mo-MIT.txt'), fs.readFileSync(path.join(jmo, 'LICENSE')), {
  id: 'jmo:LICENSE', origin: 'jmo-skills-main', original_path: posix(path.join(jmo, 'LICENSE')), sha256: hash(fs.readFileSync(path.join(jmo, 'LICENSE'))),
  disposition: 'snapshot', license: 'MIT', rationale: 'Attribution for re-authored ste and interview guidance'
});

// 4. Rendered-UI audit script (adapted later in place; source hash recorded for traceability).
const auditSrc = path.join(principles, 'scripts', 'audit_rendered_ui.js');
const auditDest = path.join(bundleRoot, 'shared', 'scripts', 'audit-rendered-ui.js');
if (!fs.existsSync(auditDest)) write(auditDest, fs.readFileSync(auditSrc), {
  id: 'principles:scripts/audit_rendered_ui.js', origin: 'ui-ux-principles 1.0.0', original_path: posix(auditSrc), sha256: hash(fs.readFileSync(auditSrc)),
  disposition: 'adapted', license: 'Authored for this collection', rationale: 'Heuristic rendered-UI checks mapped to principle IDs'
});

// Records for re-authored material (no verbatim copy).
for (const [id, src, dest, why] of [
  ['jmo:ste/SKILL.md', path.join(jmo, 'skills', 'ste', 'SKILL.md'), 'shared/references/clear-writing.md', 'Clear technical English rules for every deliverable'],
  ['jmo:interview/SKILL.md', path.join(jmo, 'skills', 'interview', 'SKILL.md'), 'shared/references/discovery-interview.md', 'Requirement interview when a user is available'],
  ['jmo:better-ui/SKILL.md', path.join(betterUi, 'SKILL.md'), 'shared/references/polish.md', 'Polish rules re-authored with links to this collection\'s owners'],
  ['jmo:animate/RECIPES.md', path.join(jmo, 'skills', 'animate', 'RECIPES.md'), 'shared/references/web-recipes.md', 'Already present byte-identical; no copy']
]) records.push({ id, origin: 'jmo-skills-main', original_path: posix(src), sha256: hash(fs.readFileSync(src)), destination: dest,
  disposition: id.endsWith('RECIPES.md') ? 'duplicate-existing' : 're-authored', license: id.includes('better-ui') ? 'MIT, Jakub Krehel' : id.includes('animate') ? 'MIT, Emil Kowalski' : 'MIT, Johnathan Mo', rationale: why });
records.push({ id: 'jmo:excluded', origin: 'jmo-skills-main', original_path: 'skills/agentation, skills/codex', sha256: '-', destination: '-',
  disposition: 'excluded', license: 'agentation: PolyForm Shield 1.0.0; codex: MIT', rationale: 'agentation licence restricts reuse; codex is a CLI handoff, not UI/UX guidance' });

const ledger = path.join(bundleRoot, 'provenance', 'merged-sources.json');
const out = Buffer.from(JSON.stringify({ note: 'Material merged into ui-ux-master from ui-ux-principles and jmo-skills-main. sha256 = source bytes; destination_sha256 = bytes written by this script.', records }, null, 2) + '\n');
if (apply) {
  for (const w of writes) { fs.mkdirSync(path.dirname(w.dest), { recursive: true }); fs.writeFileSync(w.dest, w.bytes); }
  fs.writeFileSync(ledger, out);
}
console.log(`${apply ? 'wrote' : 'would write'} ${writes.length} files; ${records.length} provenance records`);
