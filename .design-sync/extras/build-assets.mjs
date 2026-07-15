import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const kit = readFileSync('brand-kit.css','utf8');
const REPO = 'Z:/Projects/FieldService/web/brand';
mkdirSync(REPO, { recursive: true });
writeFileSync(REPO + '/brand-kit.css', kit);

const SVG_DEFS = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="silkscreen" x="-6%" y="-14%" width="112%" height="128%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.013 0.02" numOctaves="2" seed="6" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="4" xChannelSelector="R" yChannelSelector="G" result="rough"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="11" result="speck"/>
    <feComponentTransfer in="speck" result="spk"><feFuncA type="discrete" tableValues="0 0 0 0 1"/></feComponentTransfer>
    <feComposite in="rough" in2="spk" operator="out"/>
  </filter>
  <filter id="stampink" x="-12%" y="-24%" width="124%" height="148%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.016 0.024" numOctaves="2" seed="4" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="3" xChannelSelector="R" yChannelSelector="G" result="rough"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="9" result="speck"/>
    <feComponentTransfer in="speck" result="spk"><feFuncA type="discrete" tableValues="0 0 0 1 1"/></feComponentTransfer>
    <feComposite in="rough" in2="spk" operator="out"/>
  </filter>
</defs></svg>`;

/* ===================== ASSET STYLES ===================== */
const STYLES = `
<style>
/* ---------- 1 · YouTube channel banner 2560x1440 ---------- */
.yt-banner{width:2560px;height:1440px;background:var(--graphite);position:relative;overflow:hidden;color:var(--bone);}
.yt-banner .edge-haz{position:absolute;top:0;left:0;right:0;height:14px;background:var(--hazard);z-index:3;}
.yt-banner .edge-rule{position:absolute;top:14px;left:0;right:0;height:4px;background:var(--orange);z-index:3;}
.yt-banner .wmk{position:absolute;font-family:var(--f-wm);font-size:560px;line-height:1;color:#000;opacity:.05;right:-30px;top:-140px;text-transform:uppercase;z-index:0;}
.yt-banner .safe{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:1500px;height:423px;display:flex;align-items:center;gap:64px;z-index:2;}
.yt-banner .lock{flex:none;}
.yt-banner .tag-manual{font-size:15px;padding:6px 13px 5px;}
.yt-banner .fs{font-size:38px;letter-spacing:.34em;margin-top:16px;}
.yt-banner .nerd{font-size:196px;margin-top:-4px;}
.yt-banner .haz-underline{height:12px;width:560px;background:var(--hazard);margin-top:16px;opacity:.9;}
.yt-banner .vrule{width:2px;height:320px;background:var(--line);flex:none;}
.yt-banner .info{display:flex;flex-direction:column;gap:22px;position:relative;padding-top:6px;}
.yt-banner .kick{font-family:var(--f-osw);font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:26px;color:var(--bone);}
.yt-banner .topics{display:flex;flex-wrap:wrap;gap:10px;max-width:560px;}
.yt-banner .topics span{font-family:var(--f-mono);font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:var(--bone-muted);border:1px solid var(--line);border-radius:2px;padding:7px 13px;}
.yt-banner .topics span.o{color:var(--orange);border-color:rgba(227,107,44,.45);}
.yt-banner .host{font-family:var(--f-mono);font-size:15px;color:var(--steel-lt);letter-spacing:.05em;text-transform:uppercase;}
.yt-banner .approve.big{position:absolute;right:-24px;top:-96px;transform:rotate(-9deg);padding:12px 18px 9px;}
.yt-banner .approve.big .a1{font-size:23px;} .yt-banner .approve.big .a2{font-size:10px;margin-top:5px;}
.yt-banner .ribbon{position:absolute;bottom:0;left:0;right:0;height:60px;background:var(--navy);color:var(--bone-dim);border-top:3px solid var(--orange);font-family:var(--f-mono);font-size:15px;letter-spacing:.14em;display:flex;align-items:center;white-space:nowrap;overflow:hidden;padding-left:26px;z-index:3;}

/* ---------- 2 · YouTube thumbnail 1280x720 ---------- */
.yt-thumb{width:1280px;height:720px;background:var(--od);position:relative;overflow:hidden;color:var(--bone);}
.yt-thumb .lrule{position:absolute;left:0;top:0;bottom:0;width:12px;background:var(--orange);z-index:3;}
.yt-thumb .top{position:absolute;top:34px;left:52px;right:44px;display:flex;justify-content:space-between;align-items:center;z-index:2;}
.yt-thumb .mini{font-family:var(--f-wm);text-transform:uppercase;font-size:26px;letter-spacing:.02em;color:var(--bone);}
.yt-thumb .mini b{color:var(--orange);}
.yt-thumb .parttag{font-size:16px;padding:7px 13px;}
.yt-thumb .body{position:absolute;left:52px;right:40px;top:118px;bottom:64px;display:flex;gap:30px;z-index:2;}
.yt-thumb .left{flex:1;display:flex;flex-direction:column;justify-content:center;}
.yt-thumb .topic{font-family:var(--f-mono);text-transform:uppercase;letter-spacing:.16em;color:var(--steel-lt);font-size:20px;margin-bottom:16px;}
.yt-thumb .title{font-family:var(--f-osw);font-weight:700;text-transform:uppercase;font-size:98px;line-height:.92;letter-spacing:.01em;margin:0;color:var(--bone);}
.yt-thumb .title .o{color:var(--orange);}
.yt-thumb .sub{font-family:var(--f-osw);font-weight:500;text-transform:uppercase;letter-spacing:.04em;font-size:26px;color:var(--bone-muted);margin-top:20px;}
.yt-thumb .right{width:300px;flex:none;position:relative;display:flex;align-items:center;justify-content:center;}
.yt-thumb .portrait{width:284px;height:352px;border:2px solid var(--line);border-radius:4px;background:linear-gradient(180deg,var(--panel-2),var(--panel));display:flex;align-items:center;justify-content:center;font-family:var(--f-mono);font-size:19px;color:var(--bone-dim);letter-spacing:.16em;text-align:center;line-height:1.7;}
.yt-thumb .stamp{position:absolute;bottom:8px;right:-8px;transform:rotate(-8deg);padding:8px 12px 6px;}
.yt-thumb .stamp .a1{font-size:18px;} .yt-thumb .stamp .a2{font-size:9px;margin-top:3px;}
.yt-thumb .haz{position:absolute;bottom:0;left:0;right:0;height:14px;background:var(--hazard);z-index:3;}

/* ---------- 3 · LinkedIn Live 1280x720 ---------- */
.li-live{width:1280px;height:720px;background:var(--graphite);position:relative;overflow:hidden;color:var(--bone);}
.li-live .seriesbar{position:absolute;top:0;left:0;right:0;height:72px;background:var(--navy);border-bottom:3px solid var(--orange);display:flex;align-items:center;justify-content:space-between;padding:0 44px;z-index:3;}
.li-live .series{font-family:var(--f-wm);text-transform:uppercase;font-size:25px;letter-spacing:.02em;color:var(--bone);}
.li-live .series b{color:var(--orange);}
.li-live .badge{display:inline-flex;align-items:center;gap:9px;font-family:var(--f-osw);font-weight:700;text-transform:uppercase;letter-spacing:.16em;font-size:18px;color:var(--warn);border:2px solid var(--warn);border-radius:3px;padding:6px 13px;}
.li-live .badge i{width:11px;height:11px;border-radius:50%;background:#D94A2A;box-shadow:0 0 0 3px rgba(217,74,42,.22);}
.li-live .body{position:absolute;left:52px;right:52px;top:158px;z-index:2;}
.li-live .topic{font-family:var(--f-mono);text-transform:uppercase;letter-spacing:.16em;color:var(--steel-lt);font-size:19px;margin-bottom:18px;}
.li-live .title{font-family:var(--f-osw);font-weight:700;text-transform:uppercase;font-size:80px;line-height:.98;letter-spacing:.01em;margin:0;max-width:1050px;color:var(--bone);}
.li-live .title .o{color:var(--orange);}
.li-live .meta{display:flex;align-items:center;gap:18px;margin-top:34px;}
.li-live .parttag{font-size:18px;padding:9px 15px;}
.li-live .host{font-family:var(--f-osw);font-weight:600;text-transform:uppercase;letter-spacing:.04em;font-size:24px;color:var(--bone);}
.li-live .host b{color:var(--orange);}
.li-live .foot{position:absolute;bottom:30px;left:52px;right:52px;display:flex;justify-content:space-between;align-items:flex-end;z-index:2;}
.li-live .url{font-family:var(--f-mono);text-transform:uppercase;letter-spacing:.14em;color:var(--bone-dim);font-size:17px;}
.li-live .stamp{transform:rotate(-7deg);padding:9px 13px 7px;}
.li-live .stamp .a1{font-size:19px;} .li-live .stamp .a2{font-size:10px;margin-top:4px;}

/* ---------- 4 · E-book cover 1600x2560 ---------- */
.ebook{width:1600px;height:2560px;background:var(--od);position:relative;overflow:hidden;color:var(--bone);}
.ebook .frame{position:absolute;inset:40px;border:2px solid rgba(240,237,230,.12);border-radius:4px;pointer-events:none;z-index:2;}
.ebook .topbar{position:absolute;top:88px;left:100px;right:100px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:24px;z-index:3;}
.ebook .tag-manual{font-size:20px;padding:9px 16px 7px;letter-spacing:.4em;}
.ebook .kicker{font-size:19px;}
.ebook .mid{position:absolute;top:372px;left:100px;right:100px;z-index:3;}
.ebook .fs{font-family:var(--f-osw);font-weight:700;text-transform:uppercase;letter-spacing:.36em;font-size:54px;color:var(--bone);}
.ebook .nerd{font-family:var(--f-wm);text-transform:uppercase;color:var(--orange);font-size:302px;line-height:.8;letter-spacing:.01em;margin-top:4px;text-shadow:0 4px 0 rgba(0,0,0,.4);}
.ebook .haz{height:16px;background:var(--hazard);margin:40px 0 0;opacity:.9;width:100%;}
.ebook .title{font-family:var(--f-osw);font-weight:700;text-transform:uppercase;font-size:96px;line-height:1;letter-spacing:.01em;margin:60px 0 0;color:var(--bone);}
.ebook .title .o{color:var(--orange);}
.ebook .sub{font-family:var(--f-body);font-size:31px;line-height:1.5;color:var(--bone-muted);margin:38px 0 0;max-width:1150px;}
.ebook .stampwrap{position:absolute;top:150px;right:130px;z-index:4;}
.ebook .approve{padding:18px 26px 14px;transform:rotate(-10deg);}
.ebook .approve .a1{font-size:36px;} .ebook .approve .a2{font-size:15px;margin-top:8px;}
.ebook .foot{position:absolute;bottom:120px;left:100px;right:100px;z-index:3;}
.ebook .author{font-family:var(--f-wm);text-transform:uppercase;font-size:66px;color:var(--bone);letter-spacing:.02em;line-height:1;}
.ebook .cred{font-family:var(--f-mono);font-size:22px;color:var(--steel-lt);letter-spacing:.05em;text-transform:uppercase;margin-top:16px;}
.ebook .hazfoot{height:14px;background:var(--hazard);margin-top:32px;}
.ebook .rivets{margin-top:28px;}
.ebook .rivets i{width:16px;height:16px;}
</style>`;

/* ===================== CANVASES ===================== */
const banner = `
<div class="canvas yt-banner worn">
  <div class="edge-haz"></div><div class="edge-rule"></div>
  <div class="wmk">FSN</div>
  <div class="safe">
    <div class="lock">
      <span class="tag-manual">Technical Manual</span>
      <div class="fs">Field Service</div>
      <div class="nerd silk">Nerd</div>
      <div class="haz-underline"></div>
    </div>
    <div class="vrule"></div>
    <div class="info">
      <div class="kick">Practical Field Service Intelligence</div>
      <div class="topics">
        <span class="o">D365 Field Service</span><span>AI &middot; Copilot</span>
        <span>RSO Scheduling</span><span>Connected FS &middot; IoT</span>
      </div>
      <div class="host">Pierre Hulsebus &mdash; Ex-Microsoft Field Service Global Black Belt</div>
      <div class="approve big stampink"><div class="a1">Approved</div><div class="a2">For Field Use</div></div>
    </div>
  </div>
  <div class="ribbon">FSN-001 &middot; REV 6 &middot; APPROVED FOR FIELD USE &middot; D365 FIELD SERVICE &middot; AI/COPILOT &middot; RSO &middot; CONNECTED FS &middot; IoT &middot; REAL RESULTS FROM REAL DEPLOYMENTS &middot; FSN-001 &middot; REV 6 &middot; APPROVED FOR FIELD USE</div>
</div>`;

const ytthumb = `
<div class="canvas yt-thumb worn">
  <div class="lrule"></div>
  <div class="top">
    <span class="mini">Field Service&nbsp;<b>Nerd</b></span>
    <span class="parttag">EP 012</span>
  </div>
  <div class="body">
    <div class="left">
      <div class="topic">RSO &middot; Scheduling</div>
      <h1 class="title">Fix Your <span class="o">RSO</span> Scheduling</h1>
      <div class="sub">Real deployment wins &mdash; not hype.</div>
    </div>
    <div class="right">
      <div class="portrait">HOST<br>PHOTO</div>
      <div class="approve stampink stamp"><div class="a1">Field</div><div class="a2">Tested</div></div>
    </div>
  </div>
  <div class="haz"></div>
</div>`;

const lilive = `
<div class="canvas li-live worn">
  <div class="seriesbar">
    <span class="series">Field Service Nerd <b>// Live</b></span>
    <span class="badge"><i></i> Live</span>
  </div>
  <div class="body">
    <div class="topic">Live Session &middot; Field Service Fixes</div>
    <h1 class="title">Copilot in <span class="o">Field Service</span>: Real Deployment Wins</h1>
    <div class="meta">
      <span class="parttag">THU &middot; 2:00 PM ET</span>
      <span class="host">Pierre Hulsebus <b>+</b> Brock</span>
    </div>
  </div>
  <div class="foot">
    <span class="url">fieldservicenerd.com</span>
    <span class="approve stampink stamp"><div class="a1">Approved</div><div class="a2">For Field Use</div></span>
  </div>
</div>`;

const ebook = `
<div class="canvas ebook worn">
  <div class="frame"></div>
  <div class="topbar"><span class="tag-manual">Technical Manual</span><span class="kicker">FSN-001 &middot; REV 6</span></div>
  <div class="stampwrap"><div class="approve stampink"><div class="a1">Approved</div><div class="a2">For Field Use</div></div></div>
  <div class="mid">
    <div class="fs">Field Service</div>
    <div class="nerd silk">Nerd</div>
    <div class="haz"></div>
    <h1 class="title">The AI Primer for<br>Dynamics 365<br><span class="o">Field Service</span></h1>
    <p class="sub">What actually works in production &mdash; the AI, the scheduling, and the architecture that holds up on real deployments.</p>
  </div>
  <div class="foot">
    <div class="author">Pierre Hulsebus</div>
    <div class="cred">Ex-Microsoft Field Service Global Black Belt &middot; D365 FS since 2002</div>
    <div class="hazfoot"></div>
    <div class="rivets"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  </div>
</div>`;

/* ===================== EMIT REPO FILES ===================== */
function standalone(title, frag){
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="./brand-kit.css">
${STYLES}
<style>html,body{margin:0;background:#111;}body{display:flex;align-items:flex-start;justify-content:flex-start;}</style>
</head><body>${SVG_DEFS}${frag}</body></html>`;
}
writeFileSync(REPO + '/yt-banner.html',      standalone('FSN — YouTube Channel Banner 2560x1440', banner));
writeFileSync(REPO + '/yt-thumbnail.html',   standalone('FSN — YouTube Thumbnail 1280x720', ytthumb));
writeFileSync(REPO + '/linkedin-live.html',  standalone('FSN — LinkedIn Live 1280x720', lilive));
writeFileSync(REPO + '/ebook-cover.html',    standalone('FSN — E-book Cover 1600x2560', ebook));

/* ===================== EMIT REVIEW ARTIFACT ===================== */
function card(label, spec, w, h, scaleW, frag, safe){
  const k = (scaleW / w);
  const fh = Math.round(h * k);
  return `
  <section class="ac">
    <div class="ac-head"><h2>${label}</h2><span class="ac-spec">${spec}</span></div>
    <div class="ac-frame" style="width:${scaleW}px;height:${fh}px;">
      <div class="ac-scale" style="transform:scale(${k});width:${w}px;height:${h}px;">${frag}</div>
      ${safe ? `<div class="ac-safe" title="Mobile/TV safe area"></div>` : ''}
    </div>
  </section>`;
}
const artifact = `<title>Field Service Nerd — Brand Asset Kit v3-final</title>
<style>${kit}</style>
${STYLES}
<style>
:root{--pg:#15130F;}
body{margin:0;background:var(--pg);color:var(--bone);font-family:var(--f-body);}
.hero{background:var(--graphite);border-bottom:4px solid var(--orange);padding:30px 26px 26px;position:relative;overflow:hidden;}
.hero .k{font-family:var(--f-mono);text-transform:uppercase;letter-spacing:.18em;color:var(--steel-lt);font-size:12px;}
.hero h1{font-family:var(--f-wm);text-transform:uppercase;font-size:clamp(40px,8vw,84px);line-height:.85;margin:10px 0 0;color:var(--bone);}
.hero h1 .o{color:var(--orange);}
.hero p{font-family:var(--f-osw);text-transform:uppercase;letter-spacing:.03em;color:var(--bone-muted);margin:14px 0 0;font-size:15px;max-width:640px;}
.wrap{max-width:1040px;margin:0 auto;padding:30px 20px 60px;}
.ac{margin:0 0 40px;}
.ac-head{display:flex;align-items:baseline;gap:14px;border-bottom:1px solid var(--line);padding-bottom:8px;margin-bottom:16px;}
.ac-head h2{font-family:var(--f-osw);font-weight:700;text-transform:uppercase;letter-spacing:.03em;font-size:22px;margin:0;color:var(--bone);}
.ac-spec{font-family:var(--f-mono);font-size:12px;color:var(--bone-dim);letter-spacing:.06em;}
.ac-frame{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:4px;background:#000;box-shadow:var(--shadow-md,0 12px 30px rgba(0,0,0,.5));}
.ac-scale{transform-origin:top left;}
.ac-safe{position:absolute;border:2px dashed rgba(240,237,230,.5);pointer-events:none;
  left:50%;top:50%;transform:translate(-50%,-50%);width:60.4%;height:29.4%;}
.note{border:1px solid var(--steel);background:rgba(74,107,138,.1);border-radius:3px;padding:14px 16px;font-size:13.5px;color:var(--bone);line-height:1.55;}
.note b{color:var(--steel-lt);font-family:var(--f-mono);font-size:11px;text-transform:uppercase;letter-spacing:.1em;}
.note code{font-family:var(--f-mono);color:var(--orange);font-size:12px;}
</style>
${SVG_DEFS}
<div class="hero worn">
  <div class="k">Field Manual v3-final &middot; Locked Style</div>
  <h1>Brand Asset <span class="o">Kit</span></h1>
  <p>Four production templates in the locked Alfa Slab / silkscreen manual style. Each renders at true pixel dimensions in the repo under <b style="color:var(--bone)">web/brand/</b>.</p>
</div>
<div class="wrap">
  ${card('YouTube Channel Banner','2560 &times; 1440 &middot; safe area dashed', 2560,1440, 960, banner, true)}
  ${card('YouTube Video Thumbnail','1280 &times; 720 &middot; template', 1280,720, 720, ytthumb, false)}
  ${card('LinkedIn Live Thumbnail','1280 &times; 720 &middot; series template', 1280,720, 720, lilive, false)}
  ${card('E-book Cover','1600 &times; 2560 &middot; portrait', 1600,2560, 460, ebook, false)}
  <div class="note">
    <b>How to use</b><br>
    Files live in <code>web/brand/</code>: <code>yt-banner.html</code>, <code>yt-thumbnail.html</code>, <code>linkedin-live.html</code>, <code>ebook-cover.html</code>, sharing <code>brand-kit.css</code> (fonts inlined). Open any file and screenshot at 100%, or print-to-PDF the e-book cover. Swap the title / EP number / topic text and the <b style="color:var(--bone)">HOST PHOTO</b> placeholder with Pierre's headshot. The banner keeps all identity inside the dashed mobile/TV safe area.
  </div>
</div>`;
writeFileSync('fsn-brand-assets.html', artifact);
console.error('wrote repo files to', REPO);
console.error('wrote fsn-brand-assets.html', Math.round(Buffer.byteLength(artifact)/1024)+'KB (excl kit)');

/* ===== Unify into the Claude Design project: self-contained graphic + logo cards ===== */
const DSB = 'Z:/Projects/FieldService/ds-bundle/components';
function selfCard(group, name, w, h, cardW, frag) {
  const k = cardW / w, ch = Math.round(h * k);
  const dir = `${DSB}/${group}/${name}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/${name}.html`,
`<!-- @dsCard group="${group}" viewport="${cardW}x${ch}" -->
<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${name} — Field Service Nerd</title>
<style>${kit}</style>${STYLES}
<style>html,body{margin:0;background:#15130F}#f{width:${cardW}px;height:${ch}px;overflow:hidden}#s{transform:scale(${k});transform-origin:top left;width:${w}px;height:${h}px}</style>
</head><body>${SVG_DEFS}<div id="f"><div id="s">${frag}</div></div></body></html>`);
}
const logoFrag = `<div class="worn" style="width:1200px;height:675px;background:var(--graphite);position:relative;display:flex;align-items:center;overflow:hidden">
  <div style="position:absolute;top:0;left:0;right:0;height:12px;background:var(--hazard)"></div>
  <div style="position:relative;z-index:2;padding:0 96px">
    <span class="tag-manual" style="font-size:16px;padding:6px 14px 5px">Field Manual</span>
    <div class="line-fs" style="font-size:40px;letter-spacing:.34em;margin-top:18px">Field Service</div>
    <div class="line-nerd silk" style="font-size:196px;margin-top:-2px">Nerd</div>
    <div style="height:12px;width:560px;background:var(--hazard);margin-top:16px;opacity:.9"></div>
  </div>
</div>`;
selfCard('Brand Assets', 'YouTubeBanner',    2560, 1440, 1024, banner);
selfCard('Brand Assets', 'YouTubeThumbnail', 1280, 720,  900,  ytthumb);
selfCard('Brand Assets', 'LinkedInLive',     1280, 720,  900,  lilive);
selfCard('Brand Assets', 'EbookCover',       1600, 2560, 540,  ebook);
selfCard('Logo',         'Wordmark',         1200, 675,  1000, logoFrag);
console.error('wrote graphic + logo cards into ds-bundle/components/{Brand Assets,Logo}');
