#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable, List, Optional, Tuple

REPO_ROOT = Path(__file__).resolve().parents[1]

# Directories considered "published" (stable, citeable assets)
PUBLISHED_DIRS = {"decks", "diagrams", "frameworks", "references", "lexicon"}

# Require -v1 / -v2 / -v1.1 style tags on new *non-markdown* assets under published dirs
VERSION_PATTERN = re.compile(r"-v\d+(\.\d+)?\b", re.IGNORECASE)

# Git porcelain v1 XY meanings we care about
# X = index status, Y = working tree status
# We also detect rename/copy via X (R/C) primarily.
@dataclass(frozen=True)
class Change:
    xy: str
    path: str
    orig_path: Optional[str] = None  # for renames/copies


def run(cmd: List[str], *, check: bool = True, capture: bool = True) -> str:
    proc = subprocess.run(
        cmd,
        cwd=REPO_ROOT,
        text=True,
        capture_output=capture,
    )
    if check and proc.returncode != 0:
        if proc.stdout:
            print(proc.stdout)
        if proc.stderr:
            print(proc.stderr, file=sys.stderr)
        raise SystemExit(proc.returncode)
    return (proc.stdout or "").strip()


def run_bytes(cmd: List[str], *, check: bool = True) -> bytes:
    proc = subprocess.run(
        cmd,
        cwd=REPO_ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    if check and proc.returncode != 0:
        if proc.stdout:
            print(proc.stdout.decode(errors="replace"))
        if proc.stderr:
            print(proc.stderr.decode(errors="replace"), file=sys.stderr)
        raise SystemExit(proc.returncode)
    return proc.stdout or b""


def is_under_published_dir(path_str: str) -> bool:
    p = Path(path_str)
    return bool(p.parts) and p.parts[0] in PUBLISHED_DIRS


def looks_like_rename_or_copy(xy: str) -> bool:
    # Rename/copy shows as R/C in index status (X)
    return xy and xy[0] in {"R", "C"}


def looks_like_delete(xy: str) -> bool:
    return "D" in xy


def looks_like_modify(xy: str) -> bool:
    return "M" in xy


def looks_like_add(xy: str) -> bool:
    # "A" in index or untracked handled separately by parsing
    return "A" in xy


def is_untracked(xy: str) -> bool:
    return xy == "??"


def parse_status_z() -> List[Change]:
    """
    Parse `git status --porcelain=v1 -z` safely (handles spaces/newlines in filenames).
    Format:
      XY SP PATH NUL
      XY SP ORIG_PATH NUL PATH NUL   (for renames/copies)
    """
    out = run_bytes(["git", "status", "--porcelain=v1", "-z"], check=True)
    if not out:
        return []

    parts = out.split(b"\x00")
    # last element after split is usually b'' (trailing NUL); ignore empties
    i = 0
    changes: List[Change] = []

    while i < len(parts):
        entry = parts[i]
        i += 1
        if not entry:
            continue

        # entry begins with b'XY ' then path bytes
        if len(entry) < 4 or entry[2:3] != b" ":
            # Defensive: unexpected format; print a hint and bail
            print("Blocked: unable to parse git status output safely.", file=sys.stderr)
            raise SystemExit(10)

        xy = entry[0:2].decode(errors="replace")
        path = entry[3:].decode(errors="replace")

        if looks_like_rename_or_copy(xy):
            # Next token(s): ORIG then NEW (Git emits ORIG in current entry's path, then NEW as next token)
            # In porcelain v1 -z, rename appears as: "R  old\0new\0"
            # We already captured "old" as path. Next token should be "new".
            if i >= len(parts):
                print("Blocked: rename detected but missing new path.", file=sys.stderr)
                raise SystemExit(11)
            new_path_bytes = parts[i]
            i += 1
            new_path = new_path_bytes.decode(errors="replace") if new_path_bytes else ""
            changes.append(Change(xy=xy, path=new_path, orig_path=path))
        else:
            changes.append(Change(xy=xy, path=path))

    return changes


def enforce_no_renames_or_deletes(changes: Iterable[Change]) -> None:
    offenders: List[Change] = []
    for ch in changes:
        if looks_like_rename_or_copy(ch.xy) or looks_like_delete(ch.xy):
            offenders.append(ch)

    if offenders:
        print("\nBlocked: renames/deletes detected (public repo safety rule).")
        for ch in offenders:
            if looks_like_rename_or_copy(ch.xy):
                print(f"  {ch.xy}  {ch.orig_path} -> {ch.path}")
            else:
                print(f"  {ch.xy}  {ch.path}")
        print("\nFix: add a new versioned file instead of renaming/deleting.")
        raise SystemExit(2)


def enforce_no_modifying_published_assets(changes: Iterable[Change], *, allow_modify: bool) -> None:
    if allow_modify:
        return

    offenders: List[Change] = []
    for ch in changes:
        if looks_like_modify(ch.xy) and is_under_published_dir(ch.path):
            offenders.append(ch)

    if offenders:
        print("\nBlocked: modifications to already-published assets detected.")
        for ch in offenders:
            print(f"  {ch.xy}  {ch.path}")
        print("\nFix: create a new file version (e.g., -v2) instead of editing in place.")
        print("Or run with --allow-modify if you truly intend to revise a published artifact.")
        raise SystemExit(3)


def enforce_version_naming_for_new_published_files(changes: Iterable[Change], *, force: bool) -> None:
    offenders: List[str] = []

    for ch in changes:
        is_new = is_untracked(ch.xy) or looks_like_add(ch.xy)
        if not is_new:
            continue

        if not is_under_published_dir(ch.path):
            continue

        name = Path(ch.path).name

        # Markdown is allowed without -v# (indexes/README/notes)
        if name.lower().endswith(".md"):
            continue

        if not VERSION_PATTERN.search(name):
            offenders.append(ch.path)

    if offenders and not force:
        print("\nBlocked: new published files missing version tag like -v1, -v2, etc.")
        for p in offenders:
            print(f"  {p}")
        print("\nFix: rename file to include -v1 (example: My-Deck-v1.pptx)")
        print("Or run with --force to bypass (not recommended).")
        raise SystemExit(4)


def build_commit_message(changes: Iterable[Change], custom: Optional[str] = None) -> str:
    if custom:
        return custom

    added = [c for c in changes if is_untracked(c.xy) or looks_like_add(c.xy)]
    modified = [c for c in changes if looks_like_modify(c.xy)]
    ts = datetime.now().strftime("%Y-%m-%d")

    parts: List[str] = []
    if added:
        parts.append(f"Publish {len(added)} asset(s)")
    if modified:
        parts.append(f"Update {len(modified)} file(s)")
    if not parts:
        parts.append("Update repository content")

    return " · ".join(parts) + f" ({ts})"


def maybe_run_update_index(*, skip_index: bool) -> None:
    if skip_index:
        return
    idx_script = REPO_ROOT / "tools" / "update-index.py"
    if idx_script.exists():
        print("Updating indexes...")
        # Capture output; if it fails, run() will exit with a useful return code
        run([sys.executable, str(idx_script)], check=True, capture=True)
    else:
        print("Note: tools/update-index.py not found. Skipping index update.")


def main() -> None:
    ap = argparse.ArgumentParser(description="One-command publishing for the FieldS

