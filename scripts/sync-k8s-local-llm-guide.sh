#!/usr/bin/env bash
# Vendor the k8s-local-llm guide into this site.
#
# Source of truth is the guide repo (github.com/AlexsJones/axjns-k8s-local-llm).
# At build time the page fetches README.md from GitHub raw and falls back to the
# vendored copy written here, so the build never depends on the network.
#
# Usage:
#   scripts/sync-k8s-local-llm-guide.sh                      # from ../axjns-k8s-local-llm
#   GUIDE_SRC=/path/to/checkout scripts/sync-k8s-local-llm-guide.sh
set -euo pipefail
cd "$(dirname "$0")/.."
SRC="${GUIDE_SRC:-../axjns-k8s-local-llm}"
DEST_MD=content/blog/k8s-local-llm/README.md
DEST_IMG=public/blog/k8s-local-llm/img
mkdir -p "$(dirname "$DEST_MD")" "$DEST_IMG"
cp "$SRC/README.md" "$DEST_MD"
rm -f "$DEST_IMG"/*.png
cp "$SRC"/site/img/*.png "$DEST_IMG"/
echo "synced $(wc -l < "$DEST_MD") lines and $(ls "$DEST_IMG" | wc -l) images from $SRC"
