#!/usr/bin/env bash
set -e

INPUT_DIR="$1"
OUTPUT_DIR="./output"
TSX_FILE="$OUTPUT_DIR/all-icons.tsx"

if [[ -z "$INPUT_DIR" ]]; then
  echo "Usage: $0 input_folder"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"
echo "// Auto-generated SVG React components\n" > "$TSX_FILE"

for f in "$INPUT_DIR"/*.png; do
  [[ -e "$f" ]] || { echo "No PNGs in $INPUT_DIR"; exit 1; }

  BASENAME="$(basename "$f" .png)"
  SVG_PATH="$OUTPUT_DIR/${BASENAME}.svg"
  TMP_PGM="$OUTPUT_DIR/${BASENAME}.pgm"
  TMP_SVG="$OUTPUT_DIR/tmp_${BASENAME}.svg"

  convert "$f" -background white -alpha remove -resize 1024x1024 -threshold 50% "$TMP_PGM"

  potrace "$TMP_PGM" --svg -o "$TMP_SVG" --turdsize 2 --flat --opttolerance 0.2

  svgo "$TMP_SVG" -o "$SVG_PATH" --multipass

  COMPONENT_NAME="$(echo "$BASENAME" | sed -r 's/(^|_)([a-z])/\U\2/g')"
  SVG_CONTENT=$(awk '!/^<\?xml/ {print}' "$SVG_PATH")

  echo -e "export const ${COMPONENT_NAME} = () => (\n$SVG_CONTENT\n)\n" >> "$TSX_FILE"


  # Cleanup temp
  rm "$TMP_PGM" "$TMP_SVG"

  echo "Converted: $f -> $SVG_PATH (component: $COMPONENT_NAME)"
done

echo "All SVGs and React components are in: $OUTPUT_DIR"
echo "React TSX file: $TSX_FILE"
