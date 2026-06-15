import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";
import { saveBlobToFile } from "/Users/renyiting/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs";

const workspace = "/Users/renyiting/Documents/spark/outputs/manual-20260609-byd-tesla/presentations/brand-equity-part5";
const starterPptxPath = path.join(workspace, "template-starter.pptx");
const outputDir = path.join(workspace, "output");
const finalPptx = path.join(outputDir, "BYD-vs-Tesla-Part-V-Growth-Strategies.pptx");
const previewDir = path.join(workspace, "preview");
const layoutDir = path.join(workspace, "layout", "final");

const presentation = await PresentationFile.importPptx(await FileBlob.load(starterPptxPath));

function rewrite(slide, id, text) {
  const shape = slide.shapes.getById(String(id));
  if (!shape) throw new Error(`Missing inherited shape ${id} on slide ${slide.index + 1}`);
  shape.text = text;
}

const slide1 = presentation.slides.getItem(0);
rewrite(slide1, 6, "Two Brands, Two Growth Jobs");
rewrite(slide1, 8, "Tesla must extend premium technology equity; BYD must upgrade and concentrate brand equity.");
rewrite(slide1, 16, "TESLA");
rewrite(slide1, 17, "Broaden users and use cases while preserving a distinctive technology promise.");
rewrite(slide1, 21, "BYD");
rewrite(slide1, 2, "Turn scale and product strength into coherent, higher-level brand meaning.");
rewrite(slide1, 39, "GUARDRAIL");
rewrite(slide1, 44, "Every growth move must reinforce core positioning and avoid brand dilution.");
rewrite(slide1, 51, "01");

const slide2 = presentation.slides.getItem(1);
rewrite(slide2, 6, "Ansoff Reveals an Asymmetric Agenda");
rewrite(slide2, 9, "GROWTH LOGIC");
rewrite(slide2, 2, "01");
rewrite(slide2, 8, "MARKET PENETRATION\nTesla: improve ownership.\nBYD: clarify brand roles.");
rewrite(slide2, 5, "02");
rewrite(slide2, 14, "MARKET DEVELOPMENT\nTesla: broaden access.\nBYD: build global meaning.");
rewrite(slide2, 22, "03");
rewrite(slide2, 21, "PRODUCT DEVELOPMENT\nTesla: add use cases.\nBYD: strengthen intelligence.");
rewrite(slide2, 23, "04");
rewrite(slide2, 24, "SELECTIVE DIVERSIFICATION\nTesla: license FSD.\nBYD: become green tech.");
rewrite(slide2, 34, "A");
rewrite(slide2, 36, "C");
rewrite(slide2, 37, "B");
rewrite(slide2, 38, "D");
rewrite(slide2, 45, "02");

const slide3 = presentation.slides.getItem(2);
rewrite(slide3, 6, "Tesla: Broaden Access, Keep the Edge");
rewrite(slide3, 8, "Extend the technology promise without making the brand ordinary.");
rewrite(slide3, 16, "OWNERSHIP");
rewrite(slide3, 17, "Faster service, transparent repairs, and stronger care can deepen brand resonance.");
rewrite(slide3, 21, "ACCESS");
rewrite(slide3, 2, "Enter lower-tier cities and a more accessible price band through efficiency, not weaker value.");
rewrite(slide3, 39, "USE CASES");
rewrite(slide3, 44, "Add smaller vehicles, MPVs, and utility products to reduce dependence on a narrow line-up.");
rewrite(slide3, 51, "03");

const slide4 = presentation.slides.getItem(3);
rewrite(slide4, 6, "BYD Must Sequence Brand Upgrading");
rewrite(slide4, 9, "PHASED ROADMAP");
rewrite(slide4, 2, "01");
rewrite(slide4, 8, "SHORT TERM | 1-2 YEARS\nClarify portfolio roles and make intelligent technology more visible.");
rewrite(slide4, 5, "02");
rewrite(slide4, 14, "MEDIUM TERM | 3-5 YEARS\nMove from product exports to localized global brand building.");
rewrite(slide4, 22, "03");
rewrite(slide4, 21, "LONG TERM | 5+ YEARS\nEvolve from NEV maker to a broader green-technology company.");
rewrite(slide4, 23, "04");
rewrite(slide4, 24, "ARCHITECTURE RULE\nUse existing premium marques for upward movement; avoid another overlapping brand.");
rewrite(slide4, 34, "A");
rewrite(slide4, 36, "C");
rewrite(slide4, 37, "B");
rewrite(slide4, 38, "D");
rewrite(slide4, 45, "04");

const slide5 = presentation.slides.getItem(4);
rewrite(slide5, 6, "Growth Needs Brand Discipline");
rewrite(
  slide5,
  8,
  "TESLA — License selected FSD capabilities and become an intelligent-mobility platform. Key risks: liability, regulation, and weaker exclusivity.\n\nBYD — Use Yangwang and Fangchengbao as intelligent-premium flagships. Key risks: cannibalization, overlap, and fragmented investment.\n\nRULE — Growth must reinforce core brand meaning."
);
rewrite(slide5, 45, "05");

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });
await fs.mkdir(layoutDir, { recursive: true });

for (let index = 0; index < presentation.slides.count; index += 1) {
  const slide = presentation.slides.getItem(index);
  const number = String(index + 1).padStart(2, "0");
  const png = await presentation.export({ slide, format: "png", scale: 1 });
  await saveBlobToFile(png, path.join(previewDir, `slide-${number}.png`));
  const layout = await presentation.export({ slide, format: "layout" });
  await saveBlobToFile(layout, path.join(layoutDir, `slide-${number}.layout.json`));
}

const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(finalPptx);
console.log(finalPptx);
