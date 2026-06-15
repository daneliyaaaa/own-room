import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

for (const text of [
  "FIRST READER",
  "卡片架",
  "推进卡：让局面变糟",
  "关系卡：让关系发生位移",
  "选择卡：让角色付出代价",
  "悬念卡：只暴露一点秘密",
  "章节卡：下一章只解决一个问题",
  "第一读者批注",
  "请选择一张卡片，用来推敲当前段落。",
  "取消选择",
  "用卡片推敲这一段",
  "继续讨论",
  "雨停之后",
  "写作编辑空间",
]) {
  assert.match(page, new RegExp(text), `Expected page to include ${text}`);
}

assert.match(page, /"use client"/, "Expected client-side interactions");
assert.match(page, /selectingParagraphId/, "Expected paragraph card-selection state");
assert.match(page, /associateCard/, "Expected click-to-associate card behavior");
assert.match(page, /removeAssociation/, "Expected annotation close behavior");
assert.match(page, /src="\/feather-pen\.png"/, "Expected the supplied feather pen icon");
assert.match(
  page,
  /选一张参考卡，和Reader一起讨论故事进展\.\.\.\.\.\./,
  "Expected the paragraph guidance after selecting the feather pen",
);
assert.match(
  page,
  /selectingParagraphId === paragraph\.id/,
  "Expected guidance to appear only beside the selected paragraph",
);
assert.match(
  page,
  /<p className="[^"]*font-sans[^"]*opacity-40">\s*选一张参考卡，和Reader一起讨论故事进展/,
  "Expected the original translucent sans-serif paragraph guidance",
);
assert.match(
  page,
  /suppressContentEditableWarning[\s\S]*选一张参考卡，和Reader一起讨论故事进展/,
  "Expected the guidance to render after the editable paragraph",
);
assert.doesNotMatch(
  page,
  /absolute[^"]*"[\s\S]{0,900}选一张参考卡，和Reader一起讨论故事进展/,
  "Expected the guidance to remain in document flow below the paragraph",
);
assert.doesNotMatch(
  page,
  /rotate\(-?4deg\)|-rotate-\[4deg\]|reader-guidance/,
  "Expected the later typography experiments to be removed",
);
assert.doesNotMatch(page, /<Plus /, "Expected the plus icon to be replaced");
assert.match(
  page,
  /function removeAssociation\(paragraphId: string\)[\s\S]*setSelectingParagraphId\(null\)/,
  "Expected closing an annotation to exit paragraph selection mode",
);
assert.match(
  page,
  /associatedCard \? "bg-\[#FCF8EE\]" : ""/,
  "Expected paragraph highlight to follow its annotation association",
);
assert.doesNotMatch(
  page,
  /paragraph\.highlighted/,
  "Paragraph selection styling should not remain after its annotation is closed",
);
assert.match(page, /title="用卡片推敲这一段"/, "Expected paragraph plus-button tooltip");
assert.match(page, /aria-label="关闭第一读者批注"/, "Expected accessible annotation close button");
assert.match(page, /contentEditable/, "Expected the writing canvas to be editable by default");
assert.match(page, /suppressContentEditableWarning/, "Expected React-safe editable paragraphs");
assert.match(page, /<blockquote/, "Expected anchored AI discussion blockquote");
assert.match(page, /desk-split-grid/, "Expected persistent split workspace");
assert.match(styles, /\.desk-split-grid/, "Expected two-column workspace CSS");
assert.match(styles, /3fr\) minmax\([^;]+7fr\)/, "Expected an approximate 3:7 card-to-editor ratio");
assert.match(styles, /#F9F9F7/, "Expected paper color token");
assert.match(styles, /#111111/, "Expected ink color token");
assert.doesNotMatch(page, /System Prompt/i, "Should not expose development prompt labels");
assert.doesNotMatch(page, /Block Anchors/i, "Should use writer-facing language");
assert.doesNotMatch(page, /AI 批注讨论/, "Should use editorial annotation language");
assert.doesNotMatch(page, /DropZone/, "Should not render persistent paragraph drop zones");
assert.doesNotMatch(page, /draggable/, "Cards should use click selection instead of drag interaction");
assert.doesNotMatch(page, /把卡片放在这一段旁边/, "Should not show persistent placement prompts");
assert.doesNotMatch(page, /继续写/, "Writing area should already be in editing mode");
assert.doesNotMatch(styles, /box-shadow:\s*4px 4px/, "AI notes should not use heavy hard shadows");
assert.match(styles, /\.writing-paragraph/, "Expected dedicated editor paragraph styling");
