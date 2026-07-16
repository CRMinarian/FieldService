// Off-script ds-bundle generator for Field Service Nerd (v3-final).
// The repo is off-envelope: Babel-in-browser JSX assigned to window.
// This compiles web/*.jsx into one IIFE exposing window.FSN.<Name>,
// wires the styles.css @import closure, vendors React, and emits a
// card + .d.ts + .prompt.md per component.  Verified by package-validate.
import { build as esbuild } from 'esbuild';
import esbuildPkg from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { join } from 'node:path';

const REPO = 'Z:/Projects/FieldService';
const WEB = join(REPO, 'web');
const OUT = join(REPO, 'ds-bundle');
const GLOBAL = 'FSN';

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

/* ---------- 1. compile + bundle the components ---------- */
const FILES = ['_ds.jsx','Nav.jsx','Hero.jsx','Sections.jsx','Consulting.jsx','About.jsx'];
let body = '';
for (const f of FILES) {
  const src = readFileSync(join(WEB, f), 'utf8');
  const out = await esbuildPkg.transform(src, {
    loader: 'jsx', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment',
    format: 'iife', // wraps in its own scope so per-file `const {Button}=window.FSN` don't collide
  });
  body += `\n/* ==== ${f} ==== */\n` + out.code + '\n';
}

const PAGE = ['Nav','Hero','TrustBar','Pillars','LeadMagnet','Podcast','Videos','ConsultingTeaser',
  'EmailSection','Faq','Footer','ConsultHero','ConsultServices','ConsultApproach','ConsultContact',
  'AboutHero','AboutCredentials','AboutBio','AboutConnect'];
const PRIMS = ['Button','Eyebrow','Pill','SectionHead','Section'];
const ALL = [...PRIMS, ...PAGE];

const normalize = `\n;(function(){var w=window,F=w.${GLOBAL}=w.${GLOBAL}||{};[${PAGE.map(n=>`'${n}'`).join(',')}].forEach(function(k){if(w[k])F[k]=w[k];});})();\n`;
const header = `/* @ds-bundle: ${JSON.stringify({ namespace: GLOBAL, react: '18.3.1', components: ALL.map(n => ({ name: n })), sourceHashes: {}, inlinedExternals: [], source: 'design-sync-cli', note: 'off-script build of window-assigned Babel components; React vendored, not inlined' })} */\n`;
writeFileSync(join(OUT, '_ds_bundle.js'), header + body + normalize);
writeFileSync(join(OUT, '.ds-build-meta.json'), JSON.stringify({ componentCount: ALL.length, shape: 'package', generator: 'design-sync off-script', globalName: GLOBAL }, null, 2));

/* ---------- 2. styles closure ---------- */
mkdirSync(join(OUT, 'tokens'), { recursive: true });
for (const t of ['fonts','colors','typography','spacing','effects']) {
  cpSync(join(WEB, 'tokens', t + '.css'), join(OUT, 'tokens', t + '.css'));
}
writeFileSync(join(OUT, '_ds_bundle.css'), readFileSync(join(WEB, 'app.css'), 'utf8'));
writeFileSync(join(OUT, 'styles.css'),
`/* Field Service Nerd — Field Manual design system. Consumers link THIS file. */
@import url('./tokens/fonts.css');
@import url('./tokens/colors.css');
@import url('./tokens/typography.css');
@import url('./tokens/spacing.css');
@import url('./tokens/effects.css');
@import url('./_ds_bundle.css');
`);

/* ---------- 3. vendor React ---------- */
mkdirSync(join(OUT, '_vendor'), { recursive: true });
async function fetchTo(url, dest) {
  const r = await fetch(url); if (!r.ok) throw new Error('fetch ' + url + ' -> ' + r.status);
  writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
}
// filenames MUST be react.js / react-dom.js — the validator's export smoke loads exactly those
await fetchTo('https://unpkg.com/react@18.3.1/umd/react.production.min.js', join(OUT, '_vendor/react.js'));
await fetchTo('https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js', join(OUT, '_vendor/react-dom.js'));

/* ---------- 4. per-component cards ---------- */
const NOOP = 'function(){}';
// group, dts props body, one-line summary, preview expr (R=createElement, F=window.FSN), wide layout?
const M = {
  Button:   ['Primitives', `variant?: 'primary' | 'ghost' | 'data' | 'dark'; size?: 'sm' | 'md'; as?: string; children?: React.ReactNode; style?: React.CSSProperties; [prop: string]: any;`,
    'Button — squared instrument control. Variants: primary / ghost / data / dark. Sizes: sm / md. Renders as any element via `as`.',
    `R('div',{style:{display:'flex',flexWrap:'wrap',gap:14,alignItems:'center'}},[R(F.Button,{key:1,variant:'primary'},'Get the AI Primer'),R(F.Button,{key:2,variant:'ghost'},'Browse the Manual'),R(F.Button,{key:3,variant:'data'},'RUN QUERY'),R(F.Button,{key:4,variant:'dark'},'Secondary'),R(F.Button,{key:5,variant:'primary',size:'sm'},'Get the Brief')])`, false],
  Eyebrow:  ['Primitives', `children?: React.ReactNode; style?: React.CSSProperties;`,
    'Eyebrow — monospace DATA kicker with a leading tick. Section labels, coordinates, status.',
    `R(F.Eyebrow,null,'Field Service // D365 \\u00b7 AI \\u00b7 Scheduling')`, false],
  Pill:     ['Primitives', `tone?: 'data' | 'signal'; children?: React.ReactNode; style?: React.CSSProperties;`,
    'Pill — small mono status tag. Tone: data (steel) or signal (orange).',
    `R('div',{style:{display:'flex',flexWrap:'wrap',gap:12}},[R(F.Pill,{key:1},'Ex-Microsoft GBB'),R(F.Pill,{key:2},'D365 FS since 2002'),R(F.Pill,{key:3,tone:'signal'},'IoT \\u00b7 RSO \\u00b7 Copilot')])`, false],
  SectionHead:['Primitives', `eyebrow?: React.ReactNode; title: React.ReactNode; sub?: React.ReactNode; center?: boolean; onDark?: boolean;`,
    'SectionHead — eyebrow + display title + stencil rule + optional sub. center and onDark options.',
    `R(F.SectionHead,{eyebrow:'What this is',title:'Built for the people who run it',sub:'Not a general audience. Written for architects, practitioners, and technical sellers who have seen the bad deployments.'})`, true],
  Section:  ['Primitives', `id?: string; alt?: boolean; children?: React.ReactNode; style?: React.CSSProperties;`,
    'Section — standard content container with vertical rhythm and max-width. alt swaps the band background.',
    `R(F.Section,{id:'demo'},R(F.SectionHead,{eyebrow:'Section',title:'A standard content container',sub:'Padding and max-width come from the system spacing tokens.'}))`, true],
  Nav:      ['Navigation', `onJoin?: (e?: any) => void; theme?: 'dark' | 'light'; onToggleTheme?: () => void;`,
    'Nav — sticky control bar: Alfa Slab wordmark, page links, theme toggle, and the primary CTA.',
    `R(F.Nav,{onJoin:${NOOP},theme:'dark',onToggleTheme:${NOOP}})`, true],
  Hero:     ['Hero', `onJoin?: (e?: any) => void;`,
    'Hero — dark cover header: eyebrow, big headline, stencil rule, lede, dual CTAs, credential pills.',
    `R(F.Hero,{onJoin:${NOOP}})`, true],
  TrustBar: ['Hero', ``, 'TrustBar — credential stat strip (years, ex-Microsoft, D365/RSO/IoT, since 2002).', `R(F.TrustBar,null)`, true],
  Pillars:  ['Home', ``, 'Pillars — "One site. Three signals." three-card grid: Knowledge Base, Podcast, Consulting.', `R(F.Pillars,null)`, true],
  LeadMagnet:['Home', `onJoin?: (e?: any) => void;`, 'LeadMagnet — the AI Primer lead-capture split: benefit list + primer cover mock.', `R(F.LeadMagnet,{onJoin:${NOOP}})`, true],
  Podcast:  ['Home', ``, 'Podcast — dark on-air block: waveform, copy, watch/LinkedIn CTAs, episode thumbnail.', `R(F.Podcast,null)`, true],
  Videos:   ['Home', ``, 'Videos — centered section embedding the YouTube playlist with a full-playlist CTA.', `R(F.Videos,null)`, true],
  ConsultingTeaser:['Home', ``, 'ConsultingTeaser — framed callout linking to the fixed-fee consulting engagements.', `R(F.ConsultingTeaser,null)`, true],
  EmailSection:['Home', ``, 'EmailSection — centered email-capture form (first name + email) for the primer + field notes.', `R(F.EmailSection,null)`, true],
  Faq:      ['Home', ``, 'Faq — accordion of the five short answers about audience, cost, consulting, and Pierre.', `R(F.Faq,null)`, true],
  Footer:   ['Home', ``, 'Footer — dark footer: wordmark, section links, YouTube/LinkedIn, and the copyright line.', `R(F.Footer,null)`, true],
  ConsultHero:['Consulting', ``, 'ConsultHero — consulting cover: "Companies call when the implementation is broken." + CTA.', `R(F.ConsultHero,null)`, true],
  ConsultServices:['Consulting', ``, 'ConsultServices — four fixed-fee engagement cards with price and duration.', `R(F.ConsultServices,null)`, true],
  ConsultApproach:['Consulting', ``, 'ConsultApproach — "Three steps. No committee." numbered process grid.', `R(F.ConsultApproach,null)`, true],
  ConsultContact:['Consulting', ``, 'ConsultContact — dark booking block: schedule the diagnostic call or email Pierre.', `R(F.ConsultContact,null)`, true],
  AboutHero:['About', ``, 'AboutHero — centered about cover: "30 years in the field. One knowledge base."', `R(F.AboutHero,null)`, true],
  AboutCredentials:['About', ``, 'AboutCredentials — dark credential strip (ex-Microsoft, D365, Power Platform/RSO/IoT, since 2002).', `R(F.AboutCredentials,null)`, true],
  AboutBio: ['About', ``, 'AboutBio — portrait + long-form practitioner bio with KB and consulting CTAs.', `R(F.AboutBio,null)`, true],
  AboutConnect:['About', ``, 'AboutConnect — three connect cards: YouTube, LinkedIn, Consulting.', `R(F.AboutConnect,null)`, true],
};

function dts(name, props) {
  const iface = props && props.trim()
    ? `export interface ${name}Props {\n  ${props.trim()}\n}`
    : `export interface ${name}Props {}`;
  return `import type * as React from 'react';\n${iface}\n/** Field Service Nerd — rendered from window.${GLOBAL}.${name} */\nexport declare const ${name}: React.FC<${name}Props>;\n`;
}
function promptMd(name, group, summary, props) {
  return `${summary}\n\n**Group:** ${group}  \n**Global:** \`window.${GLOBAL}.${name}\`\n\n## Usage\n\nRendered from the compiled bundle. Compose it like any React component:\n\n\`\`\`jsx\nconst { ${name} } = window.${GLOBAL};\n<${name} ${props && props.includes('onJoin') ? 'onJoin={handleJoin} ' : ''}/>\n\`\`\`\n\nField Manual design language — stamped Alfa Slab wordmark, Oswald headings, weathered safety orange on olive-drab, worn texture. Style via the design tokens in \`styles.css\`, not ad-hoc CSS.\n`;
}
function card(name, group, expr, wide) {
  const bodyCss = wide
    ? `html,body{margin:0}body{background:var(--surface-page);min-height:100vh}`
    : `html,body{margin:0}body{background:var(--surface-page);padding:44px}#root{max-width:840px;margin:0 auto}`;
  return `<!-- @dsCard group="${group}" -->
<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} — Field Service Nerd</title>
<link rel="stylesheet" href="../../../styles.css">
<style>${bodyCss}</style>
</head><body>
<div id="root"></div>
<script src="../../../_vendor/react.js"></script>
<script src="../../../_vendor/react-dom.js"></script>
<script src="../../../_ds_bundle.js"></script>
<script>
(function(){
  var R = React.createElement, F = window.${GLOBAL};
  try {
    ReactDOM.createRoot(document.getElementById('root')).render(${expr});
  } catch (e) {
    document.getElementById('root').innerHTML =
      '<div style="font-family:var(--font-mono);color:var(--warn);padding:24px">'+String(e)+'</div>';
  }
})();
</script>
</body></html>`;
}

let count = 0;
for (const name of ALL) {
  const [group, props, summary, expr, wide] = M[name];
  const dir = join(OUT, 'components', group, name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, name + '.jsx'), `// @generated — re-export from the compiled Field Service Nerd bundle\nexport const ${name} = (typeof window !== 'undefined') && window.${GLOBAL} ? window.${GLOBAL}.${name} : undefined;\n`);
  writeFileSync(join(dir, name + '.d.ts'), dts(name, props));
  writeFileSync(join(dir, name + '.prompt.md'), promptMd(name, group, summary, props));
  writeFileSync(join(dir, name + '.html'), card(name, group, expr, wide));
  count++;
}

writeFileSync(join(OUT, 'README.md'), `# Field Service Nerd — Design System\n\nField Manual (v3-final). ${count} components under \`window.FSN.*\`. Import \`styles.css\` and load \`_ds_bundle.js\`.\n`);
console.error(`OK — ${count} components -> ${OUT}`);
