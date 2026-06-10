import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

for (const text of [
  "FIRST READER",
  "卡片架",
  "人设卡：夜盲症",
  "人设卡：毒舌军师",
  "你是一个写作导师。请结合【人设卡：毒舌军师】的设定",
  "AI 批注讨论",
  "就用这个",
  "齿轮震动手心的麻木感",
  "ATTACHED NOTE",
  "雨停之后",
  "写作编辑空间",
]) {
  assert.match(page, new RegExp(text), `Expected page to include ${text}`);
}

assert.match(page, /"use client"/, "Expected client-side interactions");
assert.match(page, /draggable/, "Expected draggable cards");
assert.match(page, /onDragStart/, "Expected drag start handler");
assert.match(page, /onDrop/, "Expected paragraph-boundary drop handler");
assert.match(page, /data-drop-position/, "Expected paragraph-boundary drop zones");
assert.match(page, /<blockquote/, "Expected anchored AI discussion blockquote");
assert.match(page, /applySuggestion/, "Expected suggestion replacement action");
assert.match(page, /desk-split-grid/, "Expected persistent split workspace");
assert.match(styles, /\.desk-split-grid/, "Expected two-column workspace CSS");
assert.match(styles, /#F9F9F7/, "Expected paper color token");
assert.match(styles, /#111111/, "Expected ink color token");
