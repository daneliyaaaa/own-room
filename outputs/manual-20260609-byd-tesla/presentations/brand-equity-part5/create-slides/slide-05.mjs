import { C, addHeader, panel, label, body, rule } from "./shared.mjs";

export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  addHeader(slide, ctx, "Breakthrough Bets & Governance", "Bold growth is valuable only when brand-control gates are explicit", "Each bet requires a defined upside, risk boundary, approval gate and tracking system.", 5);

  panel(slide, ctx, 40, 150, 560, 315, { line: "#F0C4C0" });
  panel(slide, ctx, 620, 150, 560, 315, { line: "#C9D6FA" });
  label(slide, ctx, 60, 168, 110, "TESLA BET", C.tesla, C.teslaSoft);
  label(slide, ctx, 640, 168, 95, "BYD BET", C.byd, C.bydSoft);
  body(slide, ctx, 60, 207, 510, 55, "License selected FSD modules and become an intelligent-mobility platform.", { fontSize: 19, bold: true });
  body(slide, ctx, 640, 207, 510, 55, "Make Yangwang and Fangchengbao intelligent-premium flagships.", { fontSize: 19, bold: true });
  rule(slide, ctx, 60, 274, 510, "#F0C4C0");
  rule(slide, ctx, 640, 274, 510, "#C9D6FA");

  body(slide, ctx, 60, 290, 80, 20, "UPSIDE", { fontSize: 11, bold: true, color: C.green });
  body(slide, ctx, 145, 288, 425, 42, "Ecosystem reach • recurring revenue • category authority", { fontSize: 14, bold: true });
  body(slide, ctx, 60, 340, 80, 20, "RISKS", { fontSize: 11, bold: true, color: C.tesla });
  body(slide, ctx, 145, 338, 425, 42, "Safety liability • regulation • weaker exclusivity", { fontSize: 14 });
  body(slide, ctx, 60, 390, 80, 20, "GATE", { fontSize: 11, bold: true, color: C.navy });
  body(slide, ctx, 145, 388, 425, 52, "License modular capabilities only after safety and brand-control thresholds are met.", { fontSize: 14, bold: true });

  body(slide, ctx, 640, 290, 80, 20, "UPSIDE", { fontSize: 11, bold: true, color: C.green });
  body(slide, ctx, 725, 288, 425, 42, "Premium proof • technology halo • faster brand upgrading", { fontSize: 14, bold: true });
  body(slide, ctx, 640, 340, 80, 20, "RISKS", { fontSize: 11, bold: true, color: C.byd });
  body(slide, ctx, 725, 338, 425, 42, "Cannibalization • architecture overlap • fragmented investment", { fontSize: 14 });
  body(slide, ctx, 640, 390, 80, 20, "GATE", { fontSize: 11, bold: true, color: C.navy });
  body(slide, ctx, 725, 388, 425, 52, "Give each marque an exclusive audience, price band, design code and channel role.", { fontSize: 14, bold: true });

  panel(slide, ctx, 40, 490, 760, 170);
  body(slide, ctx, 60, 508, 710, 25, "QUARTERLY BRAND-EQUITY DASHBOARD", { fontSize: 16, bold: true });
  const metrics = [
    ["Premium perception", "Can the brand command more?"],
    ["Purchase consideration", "Is strategy expanding demand?"],
    ["NPS / advocacy", "Is experience becoming resonance?"],
    ["Price realization", "Does equity survive transactions?"],
    ["Cross-brand confusion", "Is architecture becoming clearer?"],
  ];
  metrics.forEach(([m, q], i) => {
    const y = 543 + i * 20;
    body(slide, ctx, 60, y, 180, 18, m, { fontSize: 11, bold: true, color: i % 2 ? C.byd : C.tesla });
    body(slide, ctx, 248, y, 500, 18, q, { fontSize: 11, color: C.muted });
  });

  panel(slide, ctx, 825, 490, 355, 170, { fill: C.navy, line: C.navy });
  body(slide, ctx, 848, 510, 310, 22, "FINAL APPROVAL RULE", { fontSize: 14, bold: true, color: "#FFFFFF" });
  rule(slide, ctx, 848, 542, 310, "#66728A");
  body(slide, ctx, 848, 558, 310, 80, "Approve a growth initiative only when it reinforces the core brand meaning and strengthens one weak CBBE layer.", { fontSize: 16, bold: true, color: "#FFFFFF", valign: "middle" });
  return slide;
}
