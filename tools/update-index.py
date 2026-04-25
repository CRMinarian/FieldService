from pathlib import Path
from datetime import datetime

REPO_ROOT = Path(__file__).resolve().parents[1]
DECKS_DIR = REPO_ROOT / "decks"
INDEX_FILE = DECKS_DIR / "index.md"

ALLOWED_EXT = {".pptx", ".pdf"}

def is_deck_file(p: Path) -> bool:
    return p.is_file() and p.suffix.lower() in ALLOWED_EXT

def rel_link(p: Path) -> str:
    rel = p.relative_to(DECKS_DIR).as_posix()
    return f"[{p.name}](./{rel})"

def guess_year(p: Path) -> str:
    parts = p.relative_to(DECKS_DIR).parts
    if parts and len(parts[0]) == 4 and parts[0].isdigit():
        return parts[0]
    return "Unsorted"

def main():
    if not DECKS_DIR.exists():
        raise SystemExit("No /decks folder found.")

    files = sorted([p for p in DECKS_DIR.rglob("*") if is_deck_file(p)])

    by_year = {}
    for f in files:
        by_year.setdefault(guess_year(f), []).append(f)

    latest = max(files, key=lambda p: p.stat().st_mtime) if files else None
    now = datetime.now().strftime("%Y-%m-%d %H:%M")

    lines = [
        "# Decks",
        "",
        "> This page is auto-generated. Edit the deck files, not this index.",
        f"> Last generated: {now}",
        "",
        "## Latest",
        ""
    ]

    lines.append(f"- {rel_link(latest)}" if latest else "- (no decks found yet)")
    lines.append("")
    lines.append("## By Year")
    lines.append("")

    years = sorted([y for y in by_year if y != "Unsorted"], reverse=True)
    if "Unsorted" in by_year:
        years.append("Unsorted")

    for year in years:
        lines.append(f"### {year}")
        lines.append("")
        for f in sorted(by_year[year], key=lambda p: p.name.lower()):
            lines.append(f"- {rel_link(f)}")
        lines.append("")

    INDEX_FILE.write_text("\n".join(lines).strip() + "\n", encoding="utf-8")
    print(f"Updated: {INDEX_FILE}")

if __name__ == "__main__":
    main()


1
from pathlib import Path
from datetime import datetime

REPO_ROOT = Path(__file__).resolve().parents[1]
DECKS_DIR = REPO_ROOT / "decks"
INDEX_FILE = DECKS_DIR / "index.md"

ALLOWED_EXT = {".pptx", ".pdf"}

def is_deck_file(p: Path) -> bool:
    return p.is_file() and p.suffix.lower() in ALLOWED_EXT

def rel_link(p: Path) -> str:
    rel = p.relative_to(DECKS_DIR).as_posix()
    return f"[{p.name}](./{rel})"

def guess_year(p: Path) -> str:
    parts = p.relative_to(DECKS_DIR).parts
    if parts and len(parts[0]) == 4 and parts[0].isdigit():
        return parts[0]
    return "Unsorted"

def main():
    if not DECKS_DIR.exists():
        raise SystemExit("No /decks folder found.")

    files = sorted([p for p in DECKS_DIR.rglob("*") if is_deck_file(p)])

    by_year = {}
    for f in files:
        by_year.setdefault(guess_year(f), []).append(f)

    latest = max(files, key=lambda p: p.stat().st_mtime) if files else None
    now = datetime.now().strftime("%Y-%m-%d %H:%M")

    lines = [
        "# Decks",
        "",
        "> This page is auto-generated. Edit the deck files, not this index.",
        f"> Last generated: {now}",
        "",
        "## Latest",
        ""
    ]

    lines.append(f"- {rel_link(latest)}" if latest else "- (no decks found yet)")
    lines.append("")
    lines.append("## By Year")
    lines.append("")

    years = sorted([y for y in by_year if y != "Unsorted"], reverse=True)
    if "Unsorted" in by_year:
        years.append("Unsorted")

    for year in years:
        lines.append(f"### {year}")
        lines.append("")
        for f in sorted(by_year[year], key=lambda p: p.name.lower()):
            lines.append(f"- {rel_link(f)}")
        lines.append("")

    # Ensure decks folder exists and write index
    DECKS_DIR.mkdir(parents=True, exist_ok=True)
    INDEX_FILE.write_text("\n".join(lines).strip() + "\n", encoding="utf-8")
    print(f"Updated: {INDEX_FILE}")

if __name__ == "__main__":
    main()

