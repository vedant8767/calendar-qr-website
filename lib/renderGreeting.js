// Draws an e-greeting template onto a canvas in the browser and returns a Blob.
// Layer order: overlays marked behindBackground, then the background artwork
// (which should have a transparent window for the photo), then everything else
// by zIndex.

const imageCache = new Map();

function loadImage(src) {
  if (!imageCache.has(src)) {
    imageCache.set(
      src,
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => {
          imageCache.delete(src);
          reject(new Error(`Could not load ${src}`));
        };
        img.src = src;
      }),
    );
  }
  return imageCache.get(src);
}

function resolveSrc(src, assets) {
  if (src === "{{IMAGE_1}}") return assets.background;
  if (src === "{{IMAGE_2}}") return assets.photo;
  return src;
}

function resolveText(text, values) {
  if (text === "name") return values.name ?? "";
  return text.replace(/\{\{(\w+)\}\}/g, (_, k) => values[k] ?? "");
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (r > 0) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}

// Fills the w×h box with the image, cropping like CSS object-fit: cover.
function drawCover(ctx, img, x, y, w, h) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (img.naturalWidth - sw) / 2;
  const sy = (img.naturalHeight - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function drawOverlay(ctx, layer, img) {
  const ox = layer.offsetX ?? 0;
  const oy = layer.offsetY ?? 0;
  ctx.save();
  // offsetX/Y is the pivot measured from the layer's top-left corner.
  ctx.translate(layer.x + ox, layer.y + oy);
  ctx.rotate(((layer.rotation ?? 0) * Math.PI) / 180);
  ctx.transform(1, layer.skewY ?? 0, layer.skewX ?? 0, 1, 0, 0);
  ctx.scale(layer.scaleX ?? 1, layer.scaleY ?? 1);
  roundedRect(ctx, -ox, -oy, layer.width, layer.height, layer.cornerRadius ?? 0);
  ctx.clip();
  drawCover(ctx, img, -ox, -oy, layer.width, layer.height);
  ctx.restore();
}

function wrapLines(ctx, text, maxWidth) {
  const lines = [];
  for (const para of text.split("\n")) {
    let line = "";
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const test = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(test).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    lines.push(line);
  }
  return lines;
}

function drawText(ctx, block, text) {
  if (!text) return;
  const pad = block.padding ?? 0;
  const lineH = block.fontSize * (block.lineHeight ?? 1);
  const innerW = block.width - pad * 2;
  ctx.save();
  ctx.font = `${block.fontWeight ?? "normal"} ${block.fontSize}px ${block.fontFamily ?? "Arial"}`;
  ctx.fillStyle = block.fill ?? "#000";
  ctx.textBaseline = "middle";
  ctx.textAlign = block.align ?? "left";
  const x =
    block.align === "center"
      ? block.x + block.width / 2
      : block.align === "right"
        ? block.x + block.width - pad
        : block.x + pad;
  wrapLines(ctx, text, innerW).forEach((line, i) => {
    ctx.fillText(line, x, block.y + pad + lineH * i + lineH / 2);
  });
  ctx.restore();
}

/**
 * @param template  event.template from lib/egreets.js
 * @param assets    { background: url, photo: url | null }
 * @param values    { name }
 * @returns Promise<Blob>
 */
export async function renderGreeting(template, assets, values) {
  const pr = template.pixelRatio ?? 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(template.width * pr);
  canvas.height = Math.round(template.height * pr);
  const ctx = canvas.getContext("2d");
  ctx.scale(pr, pr);

  const overlays = template.overlayImages ?? [];
  const sources = [template.backgroundImage.src, ...overlays.map((o) => o.src)];
  const images = new Map();
  await Promise.all(
    sources.map(async (src) => {
      const url = resolveSrc(src, assets);
      if (url) images.set(src, await loadImage(url));
    }),
  );

  const byZ = (a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0);
  const paintOverlay = (o) => images.has(o.src) && drawOverlay(ctx, o, images.get(o.src));

  overlays.filter((o) => o.behindBackground).sort(byZ).forEach(paintOverlay);

  const bg = template.backgroundImage;
  ctx.drawImage(images.get(bg.src), 0, 0, bg.width ?? template.width, bg.height ?? template.height);

  [
    ...overlays.filter((o) => !o.behindBackground).map((o) => ({ ...o, kind: "image" })),
    ...(template.textBlocks ?? []).map((t) => ({ ...t, kind: "text" })),
  ]
    .sort(byZ)
    .forEach((layer) =>
      layer.kind === "image" ? paintOverlay(layer) : drawText(ctx, layer, resolveText(layer.text, values)),
    );

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not export image"))),
      template.mimeType ?? "image/png",
      template.quality ?? 1,
    ),
  );
}
