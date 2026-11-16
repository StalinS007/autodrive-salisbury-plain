#!/bin/sh
# Rebuilds /car-guide.pdf (Find My Car lead magnet) from car-buying-strategy.html with headless Chrome.
cd "$(dirname "$0")/../.."
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="$PWD/car-guide.pdf" "file://$PWD/tools/guide/car-buying-strategy.html"
