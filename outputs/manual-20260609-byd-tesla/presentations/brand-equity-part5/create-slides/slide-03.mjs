import { C, addHeader, panel, label, body, rule } from "./shared.mjs";

const pillars = [
  {
    n: "01", title: "OWNERSHIP FLYWHEEL", tag: "MARKET PENETRATION",
    action: "Service-level standards, real-time repair visibility and proactive customer care.",
    effect: "Product satisfaction → trust → attachment → advocacy.",
    kpi: "Service NPS\nRepair cycle time\nReferral rate",
    risk: "Margin pressure",
    control: "Target high-friction moments; use digital triage.",
  },
  {
    n: "02", title: "SELECTIVE ACCESS", tag: "MARKET DEVELOPMENT",
    action: "Accessible model or trim plus deeper lower-tier-city coverage.",
    effect: "Broader salience without surrendering technology leadership.",
    kpi: "New-to-brand buyers\nCity consideration\nPremium perception",
    risk: "Prestige dilution",
    control: "Cost-down through platform efficiency, not de-contenting.",
  },
  {
    n: "03", title: "USE-CASE EXPANSION", tag: "PRODUCT DEVELOPMENT",
    action: "Compact, MPV and utility formats plus software/service bundles.",
    effect: "More purchase occasions and higher customer lifetime value.",
    kpi: "Portfolio mix\nSoftware attach rate\nRepeat purchase",
    risk: "Complexity",
    control: "Shared platforms and one consistent design language.",
  },
];

export async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  addHeader(slide, ctx, "Tesla Growth Blueprint", "Broaden access without making the brand ordinary", "Three execution pillars translate premium equity into scalable growth.", 3);

  pillars.forEach((p, i) => {
    const x = 40 + i * 405;
    panel(slide, ctx, x, 155, 380, 485, { line: "#F0C4C0" });
    ctx.addShape(slide, { x: x + 18, y: 174, w: 46, h: 46, fill: C.tesla, line: { fill: C.tesla, width: 0 }, geometry: "roundRect" });
    body(slide, ctx, x + 18, 184, 46, 24, p.n, { fontSize: 16, bold: true, color: "#FFFFFF", align: "center" });
    body(slide, ctx, x + 78, 173, 280, 27, p.title, { fontSize: 16, bold: true });
    label(slide, ctx, x + 78, 204, 178, p.tag, C.tesla, C.teslaSoft);
    rule(slide, ctx, x + 18, 242, 344, "#F0C4C0");

    body(slide, ctx, x + 18, 258, 90, 20, "ACTION", { fontSize: 11, bold: true, color: C.tesla });
    body(slide, ctx, x + 18, 280, 344, 62, p.action, { fontSize: 14 });
    body(slide, ctx, x + 18, 352, 130, 20, "BRAND MECHANISM", { fontSize: 11, bold: true, color: C.tesla });
    body(slide, ctx, x + 18, 374, 344, 55, p.effect, { fontSize: 14, bold: true });

    panel(slide, ctx, x + 18, 442, 164, 106, { fill: "#F8F9FB", line: C.line });
    panel(slide, ctx, x + 198, 442, 164, 106, { fill: C.teslaSoft, line: "#F0C4C0" });
    body(slide, ctx, x + 30, 454, 140, 18, "KPIs", { fontSize: 11, bold: true, color: C.muted });
    body(slide, ctx, x + 30, 478, 140, 50, p.kpi, { fontSize: 11 });
    body(slide, ctx, x + 210, 454, 140, 18, "RISK", { fontSize: 11, bold: true, color: C.tesla });
    body(slide, ctx, x + 210, 478, 140, 22, p.risk, { fontSize: 13, bold: true });
    body(slide, ctx, x + 210, 504, 140, 28, p.control, { fontSize: 9, color: C.muted });

    body(slide, ctx, x + 18, 568, 344, 18, "SUCCESS TEST", { fontSize: 11, bold: true, color: C.muted });
    body(slide, ctx, x + 18, 590, 344, 34, i === 0 ? "Higher advocacy, not only fewer complaints." : i === 1 ? "More buyers with stable premium perception." : "More occasions without weaker simplicity.", { fontSize: 12, bold: true });
  });
  return slide;
}
