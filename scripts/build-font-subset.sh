#!/usr/bin/env bash
#
# Regenerate public/fonts/pretendard/PretendardVariable.site.woff2 — a subset of
# Pretendard Variable holding exactly the characters this site can render.
#
# The site loads two tiers of the same "Pretendard Variable" family:
#   1. this subset (~120KB, one request), which wins for every character in it
#      because app/fonts/pretendard-site.css is imported last, and
#   2. the 92-slice dynamic subset, which covers anything this one misses.
# So a stale subset is not a bug: an unlisted character still renders in
# Pretendard, it just costs one extra slice request. Re-run this after a large
# copy change to pull those characters back into the fast path.
#
# Needs: bash, node, npm, python3 (a venv with fonttools is created on demand).
set -euo pipefail

PRETENDARD_VERSION="${PRETENDARD_VERSION:-1.3.9}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_FONT="$REPO/public/fonts/pretendard/PretendardVariable.site.woff2"
OUT_CSS="$REPO/app/fonts/pretendard-site.css"
VENV="$REPO/node_modules/.cache/font-subset-venv"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "==> python venv with fonttools"
[ -x "$VENV/bin/pyftsubset" ] || { mkdir -p "$(dirname "$VENV")"; python3 -m venv "$VENV"; "$VENV/bin/pip" install -q fonttools brotli; }

echo "==> pretendard@$PRETENDARD_VERSION source font"
( cd "$WORK" && npm pack --silent "pretendard@$PRETENDARD_VERSION" >/dev/null \
  && tar xzf "pretendard-$PRETENDARD_VERSION.tgz" package/dist/public/variable/PretendardVariable.ttf )
TTF="$WORK/package/dist/public/variable/PretendardVariable.ttf"

echo "==> collecting characters"
python3 - "$REPO" "$WORK/unicodes.txt" <<'PY'
import os, sys, json
repo, out = sys.argv[1], sys.argv[2]
chars = set()

def eat(path):
    try:
        chars.update(open(path, encoding='utf-8').read())
    except (OSError, UnicodeDecodeError):
        pass

for root, dirs, files in os.walk(os.path.join(repo, 'app')):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for f in files:
        if f.endswith(('.tsx', '.ts', '.css', '.mdx')):
            eat(os.path.join(root, f))
# Popup copy is edited through the admin panel and persisted outside source.
eat(os.path.join(repo, 'popups-config.json'))

cps = {ord(c) for c in chars if ord(c) > 0x20 and ord(c) != 0x7f and ord(c) < 0xE000}
# Always carry the full ASCII/latin-1 range and common punctuation so that
# numbers, symbols and stray Latin never fall out of the fast path.
for lo, hi in ((0x20, 0x7E), (0xA0, 0xFF), (0x2010, 0x2027), (0x2030, 0x205E),
               (0x20A9, 0x20AC), (0x2190, 0x2193), (0x3000, 0x303F)):
    cps.update(range(lo, hi + 1))

open(out, 'w').write(','.join(f'{c:04x}' for c in sorted(cps)))
print(f'    {len(cps)} codepoints '
      f'({sum(1 for c in cps if 0xAC00 <= c <= 0xD7A3)} hangul syllables)')
PY

echo "==> subsetting"
"$VENV/bin/pyftsubset" "$TTF" \
  --unicodes-file="$WORK/unicodes.txt" \
  --layout-features='*' \
  --flavor=woff2 \
  --output-file="$OUT_FONT"

echo "==> writing $(basename "$OUT_CSS")"
python3 - "$WORK/unicodes.txt" "$OUT_CSS" "$OUT_FONT" <<'PY'
import sys, os
cps = sorted(int(c, 16) for c in open(sys.argv[1]).read().split(','))
ranges, start, prev = [], cps[0], cps[0]
for cp in cps[1:]:
    if cp == prev + 1:
        prev = cp
        continue
    ranges.append((start, prev))
    start = prev = cp
ranges.append((start, prev))
fmt = lambda lo, hi: f'U+{lo:04x}' if lo == hi else f'U+{lo:04x}-{hi:04x}'
body = ', '.join(fmt(lo, hi) for lo, hi in ranges)
# Wrap the unicode-range so the file stays reviewable in a diff.
wrapped, line = [], '    '
for chunk in body.split(', '):
    if len(line) + len(chunk) > 92:
        wrapped.append(line.rstrip())
        line = '    '
    line += chunk + ', '
wrapped.append(line.rstrip().rstrip(','))
kb = round(os.path.getsize(sys.argv[3]) / 1024)
open(sys.argv[2], 'w').write(f'''/*
 * Pretendard Variable, subset to the characters this site actually renders
 * ({kb}KB, {len(cps)} codepoints). GENERATED — run scripts/build-font-subset.sh.
 *
 * Imported after fonts/pretendard.css so that, within the shared
 * "Pretendard Variable" family, this face wins for every codepoint below and
 * the 92-slice dynamic subset only serves what is missing here.
 */
@font-face {{
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-display: swap;
  font-weight: 45 920;
  src: url(/fonts/pretendard/PretendardVariable.site.woff2) format('woff2');
  unicode-range:
{chr(10).join(wrapped)};
}}
''')
print(f'    {kb}KB, {len(ranges)} unicode ranges')
PY
echo "==> done"
