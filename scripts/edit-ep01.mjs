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
} else {
  console.error('unknown stage; use: tighten');
  process.exit(1);
}
