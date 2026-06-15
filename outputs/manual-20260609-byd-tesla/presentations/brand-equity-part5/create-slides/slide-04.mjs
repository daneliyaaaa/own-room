import { C, addHeader, panel, label, body, rule } from "./shared.mjs";

const phases = [
  {
    years: "1–2 YEARS", title: "SIMPLIFY & SIGNAL", color: "#6D8FE8",
    action: "Clarify Dynasty/Ocean roles; define Denza, Fangchengbao and Yangwang ladders; make intelligent technology visible.",
    mechanism: "Reduce confusion and upgrade imagery and judgments.",
    kpis: "Brand confusion\nPremium consideration\nTech association",
  },
  {
    years: "3–5 YEARS", title: "LOCALIZE & RESONATE", color: "#4775E3",
    action: "Shift from product export to localized communication, retail, service standards and cultural relevance.",
    mechanism: "Build credibility, feelings and resonance outside China.",
    kpis: "Overseas awareness\nService satisfaction\nPrice realization",
  },
  {
    years: "5+ YEARS", title: "EXPAND CORPORATE MEANING", color: C.byd,
    action: "Evolve from an NEV maker into a mobility, battery and energy-storage technology company.",
    mechanism: "Create a broader, future-facing master-brand purpose.",
    kpis: "Corporate brand value\nNon-auto association\nEcosystem adoption",
  },
];

export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  addHeader(slide, ctx, "BYD Growth Blueprint", "Sequence brand upgrading before adding further complexity", "The roadmap converts industrial strength into premium and globally resonant equity.", 4);

  rule(slide, ctx, 105, 214, 1035, "#B7C5EA", 4);
  phases.forEach((p, i) => {
    const x = 40 + i * 405;
    ctx.addShape(slide, { x: x + 170, y: 190, w: 38, h: 38, fill: p.color, line: { fill: "#FFFFFF", width: 4 }, geometry: "ellipse" });
    panel(slide, ctx, x, 245, 380, 383, { line: "#C9D6FA" });
    label(slide, ctx, x + 18, 263, 94, p.years, p.color, C.bydSoft);
    body(slide, ctx, x + 18, 300, 340, 30, p.title, { fontSize: 17, bold: true, color: p.color });
    rule(slide, ctx, x + 18, 340, 344, "#C9D6FA");
    body(slide, ctx, x + 18, 356, 80, 18, "ACTION", { fontSize: 11, bold: true, color: C.byd });
    body(slide, ctx, x + 18, 380, 344, 88, p.action, { fontSize: 14 });
    body(slide, ctx, x + 18, 478, 130, 18, "BRAND MECHANISM", { fontSize: 11, bold: true, color: C.byd });
    body(slide, ctx, x + 18, 501, 344, 55, p.mechanism, { fontSize: 14, bold: true });
    panel(slide, ctx, x + 18, 566, 344, 62, { fill: "#F8F9FB", line: C.line });
    body(slide, ctx, x + 30, 576, 44, 18, "KPIs", { fontSize: 11, bold: true, color: C.muted });
    body(slide, ctx, x + 80, 575, 270, 37, p.kpis.replace(/\n/g, "  |  "), { fontSize: 10, color: C.ink });
  });

  panel(slide, ctx, 150, 642, 980, 36, { fill: C.navy, line: C.navy });
  body(slide, ctx, 170, 651, 940, 19, "ARCHITECTURE GUARDRAIL  Use existing premium marques for upward movement; do not create another overlapping sub-brand.", { fontSize: 12, bold: true, color: "#FFFFFF", align: "center" });
  return slide;
}
