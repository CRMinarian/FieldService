// EP01 programmatic edit orchestrator | stage-based, resumable.
// Usage: node scripts/edit-ep01.mjs <stage>
//   tighten  — parse edit/silence-raw.txt, cut dead air -> edit/ep01-tight.mp4
// Source: youtube/Recordings/Episode 1.mp4 (1080p30, ~40:50)
import { execFileSync, spawnSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const SRC = 'youtube/Recordings/Episode 1.mp4';
const PAD = 0.25;        // keep this much of each pause on both sides
const MIN_KEEP = 0.20;   // drop keep-segments shorter than this
const MIN_CUT = 1.4;     // only cut silences at least this long (shorter = natural rhythm, keep)
const stage = process.argv[2];

function probeDuration(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
    '-of', 'csv=p=0', file], { encoding: 'utf8' });
  return parseFloat(out.trim());
}

function parseSilences(path) {
  const txt = readFileSync(path, 'utf8');
  const silences = [];
  let start = null;
  for (const line of txt.split('\n')) {
    const ms = line.match(/silence_start:\s*(-?[\d.]+)/);
    const me = line.match(/silence_end:\s*([\d.]+)/);
    if (ms) start = Math.max(0, parseFloat(ms[1]));
    else if (me && start !== null) { silences.push([start, parseFloat(me[1])]); start = null; }
  }
  return silences;
}

function buildKeeps(silences, duration) {
  // Invert silences into speech segments, padded.
  const keeps = [];
  let cursor = 0;
  for (const [s, e] of silences) {
    const keepEnd = Math.min(s + PAD, duration);
    if (keepEnd - cursor > MIN_KEEP) keeps.push([cursor, keepEnd]);
    cursor = Math.max(cursor, e - PAD);
  }
  if (duration - cursor > MIN_KEEP) keeps.push([cursor, duration]);
  // Merge overlapping/adjacent
  const merged = [];
  for (const seg of keeps) {
    const last = merged[merged.length - 1];
    if (last && seg[0] <= last[1] + 0.01) last[1] = Math.max(last[1], seg[1]);
    else merged.push([...seg]);
  }
  return merged;
}

if (stage === 'tighten') {
  const duration = probeDuration(SRC);
  // Only cut LONG silences (>= MIN_CUT).  Short pauses are natural speech rhythm;
  // cutting all of them makes 170+ jump cuts for ~90s saved.  Not worth it.
  const silences = parseSilences('edit/silence-raw.txt')
    .filter(([s, e]) => e - s >= MIN_CUT);
  const keeps = buildKeeps(silences, duration);
  const kept = keeps.reduce((a, [s, e]) => a + (e - s), 0);
  console.log(`source ${duration.toFixed(1)}s | ${silences.length} long silences (>=${MIN_CUT}s) | ` +
    `${keeps.length} keep-segments | kept ${kept.toFixed(1)}s | cut ${(duration - kept).toFixed(1)}s`);
  writeFileSync('edit/keeps.json', JSON.stringify(keeps.map(([s, e]) => [+s.toFixed(3), +e.toFixed(3)])));

  // Per-segment extract (frame-accurate: -ss before -i with re-encode) then concat-copy.
  // Avoids the select-expression length limit entirely.
  const segFiles = [];
  for (let i = 0; i < keeps.length; i++) {
    const [s, e] = keeps[i];
    const f = `edit/seg-${String(i).padStart(3, '0')}.mp4`;
    segFiles.push(f);
    if (existsSync(f)) continue; // resumable
    const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
      '-ss', s.toFixed(3), '-t', (e - s).toFixed(3), '-i', SRC,
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '17',
      '-c:a', 'aac', '-b:a', '256k', '-ar', '48000',
      '-video_track_timescale', '90000', f], { encoding: 'utf8' });
    if (r.status !== 0) { console.error(`seg ${i} failed:`, r.stderr?.slice(-800)); process.exit(1); }
    if (i % 10 === 0) console.log(`seg ${i + 1}/${keeps.length}`);
  }
  writeFileSync('edit/concat.txt', segFiles.map(f => `file '${f.replace('edit/', '')}'`).join('\n'));
  const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'concat', '-safe', '0', '-i', 'edit/concat.txt',
    '-c', 'copy', 'edit/ep01-tight.mp4'], { encoding: 'utf8' });
  if (r.status !== 0) { console.error('concat failed:', r.stderr?.slice(-1500)); process.exit(1); }
  console.log(`done -> edit/ep01-tight.mp4 (${probeDuration('edit/ep01-tight.mp4').toFixed(1)}s)`);
} else if (stage === 'cut') {
  // Content cut: keep only script-matching ranges of edit/ep01-tight.mp4.
  // Reads edit/cutlist.json: [{label, start, end}] on the TIGHT timeline (seconds).
  // Produces edit/ep01-cut.mp4 and edit/pills-final.json (pill times remapped through cuts).
  const TIGHT = 'edit/ep01-tight.mp4';
  const cuts = JSON.parse(readFileSync('edit/cutlist.json', 'utf8'));
  const segFiles = [];
  for (let i = 0; i < cuts.length; i++) {
    const { label, start, end } = cuts[i];
    const f = `edit/cut-${String(i).padStart(2, '0')}.mp4`;
    segFiles.push(f);
    if (!existsSync(f)) {
      const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
        '-ss', start.toFixed(3), '-t', (end - start).toFixed(3), '-i', TIGHT,
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '17',
        '-c:a', 'aac', '-b:a', '256k', '-ar', '48000',
        '-video_track_timescale', '90000', f], { encoding: 'utf8' });
      if (r.status !== 0) { console.error(`cut ${i} (${label}) failed:`, r.stderr?.slice(-800)); process.exit(1); }
    }
    console.log(`cut ${i} ${label}: ${(end - start).toFixed(1)}s`);
  }
  writeFileSync('edit/concat-cut.txt', segFiles.map(f => `file '${f.replace('edit/', '')}'`).join('\n'));
  let r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'concat', '-safe', '0', '-i', 'edit/concat-cut.txt', '-c', 'copy', 'edit/ep01-cut.mp4'],
    { encoding: 'utf8' });
  if (r.status !== 0) { console.error('concat failed:', r.stderr?.slice(-1500)); process.exit(1); }

  // Remap pill tStart (tight timeline) -> cut timeline.
  const toCut = (t) => {
    let acc = 0;
    for (const { start, end } of cuts) {
      if (t < start) return null;        // fell in a removed region before this keep
      if (t <= end) return acc + (t - start);
      acc += end - start;
    }
    return null;
  };
  const manifest = JSON.parse(readFileSync('youtube/edit/pills.json', 'utf8'));
  for (const p of manifest.pills) {
    p.tFinal = p.tStart == null ? null : toCut(p.tStart);
    if (p.tFinal != null) p.tFinal = +p.tFinal.toFixed(2);
  }
  writeFileSync('edit/pills-final.json', JSON.stringify(manifest, null, 1));
  const total = cuts.reduce((a, c) => a + (c.end - c.start), 0);
  console.log(`done -> edit/ep01-cut.mp4 (${total.toFixed(1)}s = ${(total / 60).toFixed(1)} min)`);
  console.log('pill times remapped -> edit/pills-final.json');
} else if (stage === 'overlay') {
  // Composite pills onto edit/ep01-cut.mp4 (or a slice), add title/end cards, audio chain, final encode.
  // Usage: node scripts/edit-ep01.mjs overlay [testStart testEnd]  (test mode renders a slice, no cards)
  const CUT = 'edit/ep01-cut.mp4';
  const manifest = JSON.parse(readFileSync('edit/pills-final.json', 'utf8'));
  const pills = manifest.pills.filter(p => p.tFinal != null);
  const testStart = process.argv[3] ? parseFloat(process.argv[3]) : null;
  const testEnd = process.argv[4] ? parseFloat(process.argv[4]) : null;
  const isTest = testStart != null;

  const active = isTest
    ? pills.filter(p => p.tFinal >= testStart - 2 && p.tFinal < testEnd)
    : pills;

  // Build filtergraph: loop each pill PNG as a timed stream, fade in/out on its alpha,
  // overlay with slide-up (overlay x/y expressions may use t; alpha fades via fade filter).
  const inputs = ['-i', CUT];
  const parts = [];
  let last = '[0:v]';
  active.forEach((p, i) => {
    inputs.push('-loop', '1', '-framerate', '30', '-i', `edit/pills/${p.id}.png`);
    const t0 = +(isTest ? p.tFinal - testStart : p.tFinal).toFixed(2);
    const t1 = +(t0 + (p.hold || 7)).toFixed(2);
    // pills render at 2x; scale to target width. sky is big, pills medium, headers small.
    const w = p.kind === 'sky' ? 820 : p.kind === 'header' ? 420 : 760;
    const fade = 0.35;
    parts.push(`[${i + 1}:v]format=rgba,scale=${w}:-1,` +
      `fade=t=in:st=${t0}:d=${fade}:alpha=1,fade=t=out:st=${(t1 - fade).toFixed(2)}:d=${fade}:alpha=1[p${i}]`);
    // Everything anchors bottom-right (Pierre is centered in this framing; bottom-left has the
    // baked-in StreamYard name tag).  Kit hard rule: never over the face.
    const x = `W-w-56`;
    const yBase = p.kind === 'sky' ? 'H-h-120' : `H-h-140`;
    // slide-up 30px on entry
    const y = `${yBase}+30*max(0\\,1-((t-${t0})/${fade}))`;
    // shortest=1: end this overlay when the MAIN input ends (looped PNGs are infinite).
    parts.push(`${last}[p${i}]overlay=x=${x}:y='${y}':eval=frame:shortest=1:enable='between(t,${t0},${t1})'[v${i}]`);
    last = `[v${i}]`;
  });
  const vLabel = active.length ? last : '[0:v]';
  const audio = `[0:a]highpass=f=80,afftdn=nf=-25,loudnorm=I=-14:TP=-1.5:LRA=11[aout]`;
  parts.push(audio);
  writeFileSync('edit/overlay-graph.txt', parts.join(';\n'));

  const out = isTest ? 'edit/ep01-test.mp4' : 'edit/ep01-body.mp4';
  const args = ['-hide_banner', '-loglevel', 'error', '-stats', '-y'];
  if (isTest) args.push('-ss', String(testStart), '-t', String(testEnd - testStart));
  args.push(...inputs, '-filter_complex_script', 'edit/overlay-graph.txt',
    '-map', vLabel, '-map', '[aout]',
    '-c:v', 'libx264', '-preset', isTest ? 'veryfast' : 'slow', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
    '-video_track_timescale', '90000', out);
  const r = spawnSync('ffmpeg', args, { stdio: 'inherit' });
  if (r.status !== 0) process.exit(1);
  console.log(`done -> ${out}`);
} else if (stage === 'finalize') {
  // Prepend title card, append end card (2.5s each, with the body's audio silence), concat -> master.
  const mk = (png, out) => {
    const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
      '-loop', '1', '-t', '2.5', '-i', png, '-f', 'lavfi', '-t', '2.5',
      '-i', 'anullsrc=r=48000:cl=stereo',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-r', '30',
      '-video_track_timescale', '90000', '-shortest', out], { encoding: 'utf8' });
    if (r.status !== 0) { console.error(r.stderr?.slice(-800)); process.exit(1); }
  };
  mk('edit/card-title.png', 'edit/card-title.mp4');
  mk('edit/card-end.png', 'edit/card-end.mp4');
  writeFileSync('edit/concat-final.txt',
    ["file 'card-title.mp4'", "file 'ep01-body.mp4'", "file 'card-end.mp4'"].join('\n'));
  const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'concat', '-safe', '0', '-i', 'edit/concat-final.txt',
    '-c', 'copy', '-movflags', '+faststart', 'edit/EP01-master.mp4'], { encoding: 'utf8' });
  if (r.status !== 0) { console.error(r.stderr?.slice(-1500)); process.exit(1); }
  console.log(`done -> edit/EP01-master.mp4 (${probeDuration('edit/EP01-master.mp4').toFixed(1)}s)`);
} else if (stage === 'shorts') {
  // Cut vertical Shorts from edit/ep01-cut.mp4 (cut-timeline seconds).
  // Center-crop 9:16 (Pierre is centered), overlay one big pill low-center, <60s.
  const SHORTS = [
    { id: 'q1-process', src: [198.1, 248.3], pill: 'q1',
      note: 'You just automated the mess -> whiteboard Try This' },
    { id: 'q3-rso', src: [441.9, 494.7], pill: 'q3',
      note: 'RSO demos great / garbage underneath -> schedule a day by hand' },
  ];
  for (const s of SHORTS) {
    const dur = +(s.src[1] - s.src[0]).toFixed(2);
    const t0 = 0.8, t1 = Math.min(dur - 0.5, t0 + 7);
    const graph =
      `[0:v]crop=608:1080:656:0,scale=1080:1920:flags=lanczos[base];` +
      `[1:v]format=rgba,scale=980:-1,` +
      `fade=t=in:st=${t0}:d=0.35:alpha=1,fade=t=out:st=${(t1 - 0.35).toFixed(2)}:d=0.35:alpha=1[pill];` +
      `[base][pill]overlay=x=(W-w)/2:y=H-h-260:shortest=1:enable='between(t,${t0},${t1})'[vout];` +
      `[0:a]highpass=f=80,afftdn=nf=-25,loudnorm=I=-14:TP=-1.5:LRA=11[aout]`;
    const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
      '-ss', s.src[0].toFixed(2), '-t', dur.toFixed(2), '-i', 'edit/ep01-cut.mp4',
      '-loop', '1', '-framerate', '30', '-i', `edit/pills/${s.pill}.png`,
      '-filter_complex', graph, '-map', '[vout]', '-map', '[aout]',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart',
      `edit/EP01-short-${s.id}.mp4`], { encoding: 'utf8' });
    if (r.status !== 0) { console.error(`short ${s.id} failed:`, r.stderr?.slice(-1200)); process.exit(1); }
    console.log(`done -> edit/EP01-short-${s.id}.mp4 (${dur}s)`);
  }
} else {
  console.error('unknown stage; use: tighten | cut | overlay [t0 t1] | finalize | shorts');
  process.exit(1);
}
