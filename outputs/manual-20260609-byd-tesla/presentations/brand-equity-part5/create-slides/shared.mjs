export const C = {
  bg: "#F5F6F8",
  paper: "#FFFFFF",
  ink: "#172033",
  muted: "#687386",
  line: "#D9DEE7",
  tesla: "#D83A34",
  teslaSoft: "#FBE9E7",
  byd: "#2F63D8",
  bydSoft: "#EAF0FF",
  green: "#23866B",
  amber: "#C98516",
  navy: "#273247",
};

export function addHeader(slide, ctx, kicker, title, subtitle, page) {
  ctx.addText(slide, {
    x: 40, y: 22, w: 1160, h: 22, text: kicker.toUpperCase(),
    fontSize: 15, bold: true, color: "#97A0B0", name: "section-label",
  });
  ctx.addShape(slide, { x: 40, y: 56, w: 5, h: 38, fill: C.tesla, name: "section-marker" });
  ctx.addText(slide, {
    x: 58, y: 52, w: 1120, h: 46, text: title,
    fontSize: 27, bold: true, color: C.ink, valign: "middle",
  });
  if (subtitle) {
    ctx.addText(slide, {
      x: 58, y: 98, w: 1080, h: 25, text: subtitle,
      fontSize: 13, color: C.muted,
    });
  }
  ctx.addText(slide, {
    x: 1190, y: 680, w: 50, h: 18, text: String(page).padStart(2, "0"),
    fontSize: 11, bold: true, color: "#9AA3B2", align: "right",
  });
}

export function panel(slide, ctx, x, y, w, h, options = {}) {
  return ctx.addShape(slide, {
    x, y, w, h,
    fill: options.fill || C.paper,
    line: { fill: options.line || C.line, width: options.lineWidth ?? 1, style: "solid" },
    geometry: options.geometry || "roundRect",
    name: options.name,
  });
}

export function label(slide, ctx, x, y, w, text, color, fill) {
  ctx.addShape(slide, {
    x, y, w, h: 25, fill, line: { fill, width: 0 }, geometry: "roundRect",
  });
  ctx.addText(slide, {
    x: x + 8, y: y + 3, w: w - 16, h: 19, text,
    fontSize: 11, bold: true, color, valign: "middle",
  });
}

export function rule(slide, ctx, x, y, w, color = C.line, width = 1) {
  ctx.addShape(slide, {
    x, y, w, h: 0, geometry: "line",
    line: { fill: color, width, style: "solid" },
  });
}

export function body(slide, ctx, x, y, w, h, text, options = {}) {
  return ctx.addText(slide, {
    x, y, w, h, text,
    fontSize: options.fontSize || 13,
    color: options.color || C.ink,
    bold: options.bold || false,
    valign: options.valign || "top",
    align: options.align || "left",
    insets: options.insets || { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export function metric(slide, ctx, x, y, value, caption, color) {
  body(slide, ctx, x, y, 90, 30, value, { fontSize: 22, bold: true, color });
  body(slide, ctx, x + 92, y + 2, 180, 28, caption, { fontSize: 11, color: C.muted });
}
