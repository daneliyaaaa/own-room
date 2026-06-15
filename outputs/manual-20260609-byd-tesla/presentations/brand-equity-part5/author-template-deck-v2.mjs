import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";
import { saveBlobToFile } from "/Users/renyiting/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs";

const workspace = "/Users/renyiting/Documents/spark/outputs/manual-20260609-byd-tesla/presentations/brand-equity-part5";
const starterPptxPath = path.join(workspace, "template-starter-v2.pptx");
const outputDir = path.join(workspace, "output");
const finalPptx = path.join(outputDir, "BYD-vs-Tesla-Part-V-Growth-Strategies-Expanded.pptx");
const previewDir = path.join(workspace, "preview-v2");
const layoutDir = path.join(workspace, "layout", "final-v2");

const presentation = await PresentationFile.importPptx(await FileBlob.load(starterPptxPath));

function rewrite(slide, id, text) {
  const shape = slide.shapes.getById(String(id));
  if (!shape) throw new Error(`Missing inherited shape ${id} on slide ${slide.index + 1}`);
  shape.text = text;
}

function reposition(slide, id, rect) {
  const shape = slide.shapes.getById(String(id));
  if (!shape) throw new Error(`Missing inherited shape ${id} on slide ${slide.index + 1}`);
  shape.position = rect;
}

function rewriteFourItemSlide(slide, content) {
  rewrite(slide, 6, content.title);
  rewrite(slide, 9, content.kicker);
  rewrite(slide, 2, "01");
  rewrite(slide, 8, content.item1);
  rewrite(slide, 5, "02");
  rewrite(slide, 14, content.item2);
  rewrite(slide, 22, "03");
  rewrite(slide, 21, content.item3);
  rewrite(slide, 23, "04");
  rewrite(slide, 24, content.item4);
  rewrite(slide, 34, "A");
  rewrite(slide, 37, "B");
  rewrite(slide, 36, "C");
  rewrite(slide, 38, "D");
  rewrite(slide, 45, content.page);
}

rewriteFourItemSlide(presentation.slides.getItem(0), {
  kicker: "DIAGNOSIS",
  title: "Opposite Brand Gaps Require Opposite Growth",
  item1:
    "TESLA'S ASSET\nPremium imagery, emotion, and resonance create pricing power and advocacy.",
  item2:
    "TESLA'S GAP\nService friction, narrow coverage, and portfolio concentration constrain scale.",
  item3:
    "BYD'S ASSET\nSalience, product performance, cost engineering, and scale accelerate adoption.",
  item4:
    "BYD'S GAP\nFragmented architecture and value-for-money cues constrain premium meaning.",
  page: "01",
});

rewriteFourItemSlide(presentation.slides.getItem(1), {
  kicker: "ANSOFF PORTFOLIO",
  title: "Prioritize Core Repair Before Adjacent Expansion",
  item1:
    "MARKET PENETRATION\nTesla: repair ownership friction.\nBYD: clarify portfolio roles.",
  item2:
    "MARKET DEVELOPMENT\nTesla: selective access.\nBYD: localized global brand building.",
  item3:
    "PRODUCT DEVELOPMENT\nTesla: new formats + software.\nBYD: intelligence + premium design.",
  item4:
    "SELECTIVE DIVERSIFICATION\nTesla: FSD platform.\nBYD: mobility-energy ecosystem.",
  page: "02",
});

const slide3 = presentation.slides.getItem(2);
rewrite(slide3, 4, "");
rewrite(slide3, 9, "TESLA EXECUTION BLUEPRINT");
rewrite(slide3, 10, "Objective: broaden access without making the brand ordinary");
reposition(slide3, 9, { x: 250, y: 82, width: 760, height: 52 });
reposition(slide3, 10, { x: 250, y: 138, width: 760, height: 28 });
reposition(slide3, 11, { x: 175, y: 195, width: 930, height: 440 });
rewrite(
  slide3,
  11,
  "01  OWNERSHIP FLYWHEEL\n" +
    "ACTION  Service standards + repair visibility + proactive care\n" +
    "EFFECT  Satisfaction → trust → advocacy\n" +
    "KPIs  Service NPS | repair time | referral rate\n" +
    "CONTROL  Target high-friction moments; use digital triage\n\n" +
    "02  SELECTIVE ACCESS\n" +
    "ACTION  Accessible model/trim + lower-tier-city coverage\n" +
    "EFFECT  Broader salience, protected technology leadership\n" +
    "KPIs  New-to-brand | consideration | premium perception\n" +
    "CONTROL  Cost-down via platform efficiency, not de-contenting\n\n" +
    "03  USE-CASE EXPANSION\n" +
    "ACTION  Compact + MPV/utility formats + software bundles\n" +
    "EFFECT  More occasions and higher lifetime value\n" +
    "KPIs  Portfolio mix | software attach | repeat purchase\n" +
    "CONTROL  Shared platform and one design language"
);

const slide4 = presentation.slides.getItem(3);
rewrite(slide4, 4, "");
rewrite(slide4, 9, "BYD EXECUTION BLUEPRINT");
rewrite(slide4, 10, "Objective: turn industrial strength into premium and global brand meaning");
reposition(slide4, 9, { x: 250, y: 82, width: 760, height: 52 });
reposition(slide4, 10, { x: 250, y: 138, width: 760, height: 28 });
reposition(slide4, 11, { x: 175, y: 195, width: 930, height: 440 });
rewrite(
  slide4,
  11,
  "01  SHORT TERM | 1-2 YEARS\n" +
    "ACTION  Clarify Dynasty/Ocean; define premium-brand ladder; make intelligence visible\n" +
    "EFFECT  Less confusion; stronger imagery and judgments\n" +
    "KPIs  Brand confusion | premium consideration | tech association\n\n" +
    "02  MEDIUM TERM | 3-5 YEARS\n" +
    "ACTION  Localize communication, retail, service, and cultural relevance\n" +
    "EFFECT  Overseas credibility, feelings, and resonance\n" +
    "KPIs  Awareness | consideration | service | price realization\n\n" +
    "03  LONG TERM | 5+ YEARS\n" +
    "ACTION  Evolve from NEV maker to mobility-battery-storage technology company\n" +
    "EFFECT  Broader, future-facing master-brand purpose\n" +
    "KPIs  Brand value | non-auto association | ecosystem adoption\n\n" +
    "GUARDRAIL  Upgrade through existing premium marques; no overlapping new brand"
);

const slide5 = presentation.slides.getItem(4);
rewrite(slide5, 2, "Breakthrough bets can reshape competition — but only with explicit brand-control gates.");
rewrite(slide5, 39, "GOVERNANCE DASHBOARD");
rewrite(
  slide5,
  44,
  "Quarterly tracking:\nPremium perception | consideration | NPS | price realization | cross-brand confusion",
);
rewrite(
  slide5,
  7,
  "TESLA — FSD PLATFORM\n" +
    "Bet: license selected FSD modules.\n" +
    "Upside: reach, recurring revenue, category authority.\n" +
    "Risk: liability, regulation, weaker exclusivity.\n" +
    "Gate: safety and brand-control thresholds.\n\n" +
    "BYD — PREMIUM FLAGSHIPS\n" +
    "Bet: sharpen Yangwang and Fangchengbao.\n" +
    "Upside: premium proof and technology halo.\n" +
    "Risk: overlap, cannibalization, fragmented spend.\n" +
    "Gate: exclusive audience, price, design, and channel."
);
rewrite(slide5, 45, "05");

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });
await fs.mkdir(layoutDir, { recursive: true });

for (let index = 0; index < presentation.slides.count; index += 1) {
  const slide = presentation.slides.getItem(index);
  const number = String(index + 1).padStart(2, "0");
  await saveBlobToFile(
    await presentation.export({ slide, format: "png", scale: 1 }),
    path.join(previewDir, `slide-${number}.png`),
  );
  await saveBlobToFile(
    await presentation.export({ slide, format: "layout" }),
    path.join(layoutDir, `slide-${number}.layout.json`),
  );
}

await (await PresentationFile.exportPptx(presentation)).save(finalPptx);
console.log(finalPptx);
