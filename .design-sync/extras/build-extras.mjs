// Adds Pages (website wireframes) + Brand Guide cards into the ds-bundle,
// so the Claude Design project holds the whole model: wireframes, logo,
// brand guide, brand assets, and the component parts bin.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const OUTC = 'Z:/Projects/FieldService/ds-bundle/components';
const NOOP = 'function(){}';

// ---- Pages: full site pages assembled from the real window.FSN components ----
function pageCard(name, title, expr, vh) {
  const dir = `${OUTC}/Pages/${name}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/${name}.html`,
`<!-- @dsCard group="Pages" viewport="1280x${vh}" -->
<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${title} — Field Service Nerd</title>
<link rel="stylesheet" href="../../../styles.css">
<style>html,body{margin:0}body{background:var(--surface-page)}</style>
</head><body>
<div id="root"></div>
<script src="../../../_vendor/react.js"></script>
<script src="../../../_vendor/react-dom.js"></script>
<script src="../../../_ds_bundle.js"></script>
<script>
(function(){
  var R = React.createElement, F = window.FSN, noop = ${NOOP};
  try { ReactDOM.createRoot(document.getElementById('root')).render(${expr}); }
  catch (e) { document.getElementById('root').innerHTML =
    '<div style="font-family:var(--font-mono);color:var(--warn);padding:24px">'+String(e)+'</div>'; }
})();
</script>
</body></html>`);
  // lightweight prompt doc so the pane has context
  writeFileSync(`${dir}/${name}.prompt.md`,
`${title} — full ${name.toLowerCase()} page assembled from the Field Service Nerd components.\n\n**Group:** Pages\n\nComposition of real \`window.FSN\` components in site order. Use as the wireframe/reference for building or editing this page.\n`);
}

const frag = (arr) => `R(React.Fragment,null,[${arr.map((s,i)=>s.replace('{k}', i+1)).join(',')}])`;

pageCard('HomePage', 'Home', frag([
  "R(F.Nav,{key:{k},onJoin:noop,theme:'dark',onToggleTheme:noop})",
  "R(F.Hero,{key:{k},onJoin:noop})",
  "R(F.TrustBar,{key:{k}})",
  "R(F.Pillars,{key:{k}})",
  "R(F.LeadMagnet,{key:{k},onJoin:noop})",
  "R(F.Podcast,{key:{k}})",
  "R(F.Videos,{key:{k}})",
  "R(F.ConsultingTeaser,{key:{k}})",
  "R(F.EmailSection,{key:{k}})",
  "R(F.Faq,{key:{k}})",
  "R(F.Footer,{key:{k}})",
]), 5200);

pageCard('ConsultingPage', 'Consulting', frag([
  "R(F.Nav,{key:{k},onJoin:noop,theme:'dark',onToggleTheme:noop})",
  "R(F.ConsultHero,{key:{k}})",
  "R(F.ConsultServices,{key:{k}})",
  "R(F.ConsultApproach,{key:{k}})",
  "R(F.ConsultContact,{key:{k}})",
  "R(F.Footer,{key:{k}})",
]), 3400);

pageCard('AboutPage', 'About', frag([
  "R(F.Nav,{key:{k},onJoin:noop,theme:'dark',onToggleTheme:noop})",
  "R(F.AboutHero,{key:{k}})",
  "R(F.AboutCredentials,{key:{k}})",
  "R(F.AboutBio,{key:{k}})",
  "R(F.AboutConnect,{key:{k}})",
  "R(F.Footer,{key:{k}})",
]), 2600);

// ---- Brand Guide: the approved v3 guide as a card ----
const guideDir = `${OUTC}/Brand Guide/DesignGuide`;
mkdirSync(guideDir, { recursive: true });
const guide = readFileSync('fsn-manual-v3.html', 'utf8');
writeFileSync(`${guideDir}/DesignGuide.html`,
  `<!-- @dsCard group="Brand Guide" viewport="1200x2600" -->\n` + guide);
writeFileSync(`${guideDir}/DesignGuide.prompt.md`,
  `Field Manual v3-final — the Field Service Nerd brand guide: palette, typography, treatments, primitives.\n\n**Group:** Brand Guide\n\nThe canonical visual reference for the design system.\n`);

console.error('wrote Pages (Home/Consulting/About) + Brand Guide cards');
