import { C, addHeader, panel, label, body, rule } from "./shared.mjs";

const cells = [
  {
    x: 315, y: 220, title: "MARKET PENETRATION", priority: "PRIORITY 1",
    tesla: "Repair ownership friction:\nservice standards, repair visibility, customer care.",
    byd: "Clarify Dynasty/Ocean roles and reduce portfolio overlap.",
  },
  {
    x: 750, y: 220, title: "MARKET DEVELOPMENT", priority: "PRIORITY 2",
    tesla: "Selective access:\nlower-tier cities and an accessible price band.",
    byd: "Localized overseas communication, retail, service and trust.",
  },
  {
    x: 315, y: 430, title: "PRODUCT DEVELOPMENT", priority: "PRIORITY 2",
    tesla: "Compact, MPV and utility formats plus software bundles.",
    byd: "Intelligent driving, cockpit, OTA and premium-design consistency.",
  },
  {
    x: 750, y: 430, title: "SELECTIVE DIVERSIFICATION", priority: "CONTROLLED BET",
    tesla: "License selected FSD modules as an industry platform.",
    byd: "Connect mobility, batteries, storage and energy solutions.",
  },
];

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  addHeader(slide, ctx, "Ansoff Growth Portfolio", "Repair the core before expanding into adjacent growth", "Sequencing protects brand consistency and prevents premature diversification.", 2);

  body(slide, ctx, 52, 190, 170, 25, "MARKETS", { fontSize: 12, bold: true, color: C.muted, align: "center" });
  body(slide, ctx, 330, 160, 330, 25, "EXISTING PRODUCTS", { fontSize: 12, bold: true, color: C.muted, align: "center" });
  body(slide, ctx, 765, 160, 330, 25, "NEW PRODUCTS", { fontSize: 12, bold: true, color: C.muted, align: "center" });
  body(slide, ctx, 268, 300, 42, 25, "EXISTING", { fontSize: 9, bold: true, color: C.muted, align: "center" });
  body(slide, ctx, 268, 510, 42, 25, "NEW", { fontSize: 9, bold: true, color: C.muted, align: "center" });

  for (const cell of cells) {
    panel(slide, ctx, cell.x, cell.y, 400, 180);
    body(slide, ctx, cell.x + 18, cell.y + 16, 245, 22, cell.title, { fontSize: 14, bold: true });
    label(slide, ctx, cell.x + 258, cell.y + 12, 124, cell.priority, C.navy, "#EDF0F5");
    rule(slide, ctx, cell.x + 18, cell.y + 48, 364);
    body(slide, ctx, cell.x + 18, cell.y + 61, 70, 20, "TESLA", { fontSize: 11, bold: true, color: C.tesla });
    body(slide, ctx, cell.x + 92, cell.y + 59, 290, 47, cell.tesla, { fontSize: 12 });
    body(slide, ctx, cell.x + 18, cell.y + 118, 70, 20, "BYD", { fontSize: 11, bold: true, color: C.byd });
    body(slide, ctx, cell.x + 92, cell.y + 116, 290, 47, cell.byd, { fontSize: 12 });
  }

  panel(slide, ctx, 40, 220, 220, 390, { fill: C.navy, line: C.navy });
  body(slide, ctx, 62, 245, 176, 25, "SEQUENCING LOGIC", { fontSize: 14, bold: true, color: "#FFFFFF", align: "center" });
  const steps = [
    ["1", "Repair current-market friction"],
    ["2", "Expand into adjacent customers and use cases"],
    ["3", "Diversify only when brand fit is explicit"],
  ];
  steps.forEach(([n, t], i) => {
    const y = 300 + i * 90;
    ctx.addShape(slide, { x: 64, y, w: 34, h: 34, fill: i === 0 ? C.tesla : i === 1 ? C.byd : C.green, line: { fill: "transparent", width: 0 }, geometry: "ellipse" });
    body(slide, ctx, 64, y + 6, 34, 20, n, { fontSize: 13, bold: true, color: "#FFFFFF", align: "center" });
    body(slide, ctx, 112, y - 2, 126, 50, t, { fontSize: 13, bold: true, color: "#FFFFFF" });
    if (i < 2) body(slide, ctx, 76, y + 48, 20, 35, "↓", { fontSize: 20, color: "#AEB7C7", align: "center" });
  });
  body(slide, ctx, 58, 565, 184, 30, "Core repair precedes reach.", { fontSize: 12, bold: true, color: "#D8DEEA", align: "center" });
  return slide;
}
