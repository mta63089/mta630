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
  TMP_PNG="$OUTPUT_DIR/${BASENAME}_prep.png"

  # 1. Preprocess: flatten transparency, resize, reduce to 8 colors (tune as needed)
  convert "$f" -background white -alpha remove -resize 1024x1024 -colors 8 "$TMP_PNG"

  # 2. Inkscape color trace to SVG
  inkscape "$TMP_PNG" \
    --actions="EditSelectAll; SelectionTraceBitmap; FileSaveAs:$SVG_PATH; FileClose"

  # 3. Optimize SVG (svgo, optional)
  svgo "$SVG_PATH" -o "$SVG_PATH" --multipass

  # 4. Remove XML header, preserve SVG
  SVG_CONTENT=$(awk '!/^<\?xml/ {print}' "$SVG_PATH")

  # 5. Component name (PascalCase)
  COMPONENT_NAME="$(echo "$BASENAME" | sed -r 's/(^|_)([a-z])/\U\2/g')"
  echo -e "export const ${COMPONENT_NAME} = () => (\n$SVG_CONTENT\n)\n" >> "$TSX_FILE"

  # Cleanup
  rm "$TMP_PNG"

  echo "Converted: $f -> $SVG_PATH (component: $COMPONENT_NAME)"
done

echo "All color SVGs and React components are in: $OUTPUT_DIR"
echo "React TSX file: $TSX_FILE"
