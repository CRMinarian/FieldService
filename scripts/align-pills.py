# Align pill triggers to the tightened EP01 timeline via faster-whisper.
# Usage: python scripts/align-pills.py
# Reads  edit/ep01-tight.mp4 (via extracted wav), youtube/edit/pills.json
# Writes edit/segments.json (all ASR segments), updates pills.json tStart values.
import json, re, subprocess, sys, os
from difflib import SequenceMatcher

SRC = "edit/ep01-tight.mp4"
WAV = "edit/ep01-tight.wav"
PILLS = "youtube/edit/pills.json"

if not os.path.exists(WAV):
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                    "-i", SRC, "-vn", "-ac", "1", "-ar", "16000", WAV], check=True)

from faster_whisper import WhisperModel
model = WhisperModel("small", device="cpu", compute_type="int8")
segments, info = model.transcribe(WAV, language="en", vad_filter=True)

segs = []
for s in segments:
    segs.append({"start": round(s.start, 2), "end": round(s.end, 2), "text": s.text.strip()})
    print(f"[{s.start:8.1f}] {s.text.strip()[:90]}", flush=True)

with open("edit/segments.json", "w", encoding="utf8") as f:
    json.dump(segs, f, indent=1)

def norm(t):
    return re.sub(r"[^a-z0-9 ]+", "", t.lower())

with open(PILLS, encoding="utf8") as f:
    manifest = json.load(f)

# Fuzzy-match each trigger against a sliding window of concatenated segments.
for pill in manifest["pills"]:
    trig = norm(pill["trigger"])
    best = (0.0, None)
    for i in range(len(segs)):
        window = norm(" ".join(s["text"] for s in segs[i:i + 3]))
        r = SequenceMatcher(None, trig, window).ratio()
        # also try containment score on the single segment
        r2 = SequenceMatcher(None, trig, norm(segs[i]["text"])).ratio()
        score = max(r, r2)
        if score > best[0]:
            best = (score, segs[i]["start"])
    pill["tStart"] = best[1]
    pill["score"] = round(best[0], 2)
    print(f"{pill['id']:>10}: t={best[1]}  score={best[0]:.2f}")

with open(PILLS, "w", encoding="utf8") as f:
    json.dump(manifest, f, indent=1)
print("updated", PILLS)
