import { C, addHeader, panel, label, body, rule } from "./shared.mjs";

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  addHeader(
    slide, ctx,
    "Differentiated Growth Strategy",
    "The same market requires two opposite brand-growth mandates",
    "Tesla must extend premium equity; BYD must upgrade and concentrate brand meaning.",
    1,
  );

  panel(slide, ctx, 40, 145, 570, 465, { line: "#F0C4C0" });
  panel(slide, ctx, 630, 145, 570, 465, { line: "#C9D6FA" });
  label(slide, ctx, 60, 162, 110, "TESLA", C.tesla, C.teslaSoft);
  label(slide, ctx, 650, 162, 90, "BYD", C.byd, C.bydSoft);

  body(slide, ctx, 60, 202, 520, 34, "EXTEND PREMIUM BRAND EQUITY", { fontSize: 20, bold: true, color: C.tesla });
  body(slide, ctx, 650, 202, 520, 34, "UPGRADE & CONCENTRATE BRAND EQUITY", { fontSize: 20, bold: true, color: C.byd });
  rule(slide, ctx, 60, 244, 520, "#F0C4C0");
  rule(slide, ctx, 650, 244, 520, "#C9D6FA");

  body(slide, ctx, 60, 260, 245, 26, "EXISTING BRAND ASSETS", { fontSize: 12, bold: true, color: C.muted });
  body(slide, ctx, 60, 290, 245, 95, "• Premium technology imagery\n• Emotional excitement\n• Strong owner identity\n• Pricing power and advocacy", { fontSize: 14 });
  body(slide, ctx, 335, 260, 245, 26, "GROWTH CONSTRAINTS", { fontSize: 12, bold: true, color: C.muted });
  body(slide, ctx, 335, 290, 245, 95, "• Service and ownership friction\n• Narrow product portfolio\n• Limited usage occasions\n• Reputation concentration", { fontSize: 14 });

  body(slide, ctx, 650, 260, 245, 26, "EXISTING BRAND ASSETS", { fontSize: 12, bold: true, color: C.muted });
  body(slide, ctx, 650, 290, 245, 95, "• Broad salience and scale\n• Product and cost performance\n• Vertical integration\n• Strong price-value credibility", { fontSize: 14 });
  body(slide, ctx, 925, 260, 245, 26, "GROWTH CONSTRAINTS", { fontSize: 12, bold: true, color: C.muted });
  body(slide, ctx, 925, 290, 245, 95, "• Fragmented architecture\n• Value-for-money stereotype\n• Weak global resonance\n• Less distinctive intelligence cues", { fontSize: 14 });

  panel(slide, ctx, 60, 420, 520, 155, { fill: C.teslaSoft, line: "#F0C4C0" });
  panel(slide, ctx, 650, 420, 520, 155, { fill: C.bydSoft, line: "#C9D6FA" });
  body(slide, ctx, 80, 438, 480, 22, "STRATEGIC JOB", { fontSize: 12, bold: true, color: C.tesla });
  body(slide, ctx, 80, 468, 480, 78, "Broaden users, cities, use cases and revenue streams without making the technology promise ordinary.", { fontSize: 17, bold: true });
  body(slide, ctx, 670, 438, 480, 22, "STRATEGIC JOB", { fontSize: 12, bold: true, color: C.byd });
  body(slide, ctx, 670, 468, 480, 78, "Turn manufacturing scale into coherent premium, intelligent and globally resonant brand meaning.", { fontSize: 17, bold: true });

  panel(slide, ctx, 250, 626, 780, 42, { fill: C.navy, line: C.navy });
  body(slide, ctx, 270, 636, 740, 22, "DECISION RULE  Strengthen one weak CBBE layer without damaging the brand's strongest association.", { fontSize: 13, bold: true, color: "#FFFFFF", align: "center" });
  return slide;
}
