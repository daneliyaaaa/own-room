"use client";

import { Bell, Download, FilePlus2, GripVertical, Search, UserRound } from "lucide-react";
import { useState } from "react";

type Card = {
  id: string;
  label: string;
  type: string;
  summary: string;
  detail: string;
};

type Paragraph = {
  id: string;
  text: string;
  highlighted?: boolean;
};

type Discussion = {
  id: string;
  card: Card;
  paragraphId: string;
  position: "before" | "after";
};

const cards: Card[] = [
  {
    id: "night-blindness",
    label: "人设卡：夜盲症",
    type: "人设卡",
    summary: "黑暗环境下无法稳定辨识细节。",
    detail: "废墟、夜晚、密闭空间里的视觉描写需要谨慎处理。",
  },
  {
    id: "sharp-strategist",
    label: "人设卡：毒舌军师",
    type: "人设卡",
    summary: "擅长快速指出逻辑漏洞，说话锋利但有效。",
    detail: "批注会直接质疑动机、感官合理性和动作落点。",
  },
  {
    id: "clockwork",
    label: "物件卡：发条表",
    type: "物件卡",
    summary: "锈蚀、震动、咔哒声，是主角父亲留下的遗物。",
    detail: "可作为听觉和触觉锚点，替代看不清表盘的视觉描述。",
  },
  {
    id: "ruin",
    label: "场景卡：漆黑废墟",
    type: "场景卡",
    summary: "坍塌钢梁、潮湿灰尘、远处有低频机械回声。",
    detail: "空间信息需要通过回声、触碰和空气流动来建立。",
  },
];

const initialParagraphs: Paragraph[] = [
  {
    id: "p1",
    text: "林墨握紧了手中的发条表，齿轮咬合的咔哒声在寂静的废墟里格外刺血。",
    highlighted: true,
  },
  {
    id: "p2",
    text: "他抬头看向断裂的拱顶，黑色尘埃像一场迟来的雪，落在他肩上。",
  },
  {
    id: "p3",
    text: "远处传来一声金属摩擦的回响，他知道，有人比他更早抵达这里。",
  },
];

const suggestedText =
  "林墨握紧了手中的发条表，咔哒声在寂静里放大，齿轮细密的震动顺着指尖传过来，带来一阵冰冷的麻木感。";

const systemPrompt =
  "你是一个写作导师。请结合【人设卡：毒舌军师】的设定，点评用户选中的这段正文描写是否合理，并给出修改建议。";

function IconButton({
  label,
  children,
}: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <button
      aria-label={label}
      className="sharp-corners flex h-11 w-11 items-center justify-center border border-ink bg-paper transition-colors duration-100 hover:bg-ink hover:text-paper"
      type="button"
    >
      {children}
    </button>
  );
}

function ActionButton({
  children,
  onClick,
  primary = false,
}: Readonly<{
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}>) {
  return (
    <button
      className={[
        "sharp-corners min-h-11 border border-ink px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest transition-colors duration-100",
        primary
          ? "bg-ink text-paper hover:bg-paper hover:text-ink"
          : "bg-paper text-ink hover:bg-ink hover:text-paper",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function CardShelfItem({
  card,
  selected,
  onDragStart,
}: Readonly<{
  card: Card;
  selected: boolean;
  onDragStart: (card: Card) => void;
}>) {
  return (
    <article
      className={[
        "cursor-grab border-b border-ink p-4 active:cursor-grabbing",
        selected ? "bg-neutral-soft" : "bg-paper hover:bg-neutral-soft",
      ].join(" ")}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", card.id);
        event.dataTransfer.effectAllowed = "copy";
        onDragStart(card);
      }}
    >
      <div className="flex gap-3">
        <GripVertical className="mt-1 h-4 w-4 shrink-0" strokeWidth={1.5} />
        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-editor-red">
              {card.type}
            </span>
            <span className="font-mono text-[10px] text-ink-muted">DRAG</span>
          </div>
          <h3 className="mt-1 truncate font-serif text-xl font-black">{card.label}</h3>
          <p className="mt-1 truncate text-xs text-ink-muted">{card.summary}</p>
          {selected && (
            <p className="mt-3 border-t border-ink pt-3 font-body text-sm leading-relaxed">
              {card.detail}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function DropZone({
  paragraphId,
  position,
  onDropCard,
}: Readonly<{
  paragraphId: string;
  position: "before" | "after";
  onDropCard: (paragraphId: string, position: "before" | "after") => void;
}>) {
  return (
    <div
      className="drop-zone my-3 border border-dashed border-ink px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted"
      data-drop-position={position}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onDropCard(paragraphId, position);
      }}
      role="button"
      tabIndex={0}
    >
      Drop card {position} this paragraph
    </div>
  );
}

function DiscussionBlock({
  discussion,
  onApply,
}: Readonly<{ discussion: Discussion; onApply: (paragraphId: string) => void }>) {
  return (
    <blockquote className="ai-discussion my-5 border-l-4 border-ink bg-[#EFE8D8] px-5 py-4 text-sm leading-relaxed">
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-editor-red">
        AI 批注讨论 / Anchored by {discussion.card.label}
      </p>
      <p className="mt-3">
        <strong>AI：</strong>这里的“刺血”是个好词，很有工业朋克感。但注意到你左侧挂了
        <code className="mx-1 border border-ink bg-paper px-1 font-mono text-xs">
          「人设卡：夜盲症」
        </code>
        ，此时废墟一片漆黑，他可能看不清表盘，要不要强化一下“听觉”或“触觉”？
      </p>
      <p className="mt-3">
        <strong>作者：</strong>有道理，改成“齿轮震动手心的麻木感”怎么接？
      </p>
      <p className="mt-3">
        <strong>AI：</strong>可以这样接：“...咔哒声在寂静里放大，齿轮细密的震动顺着指尖传过来，带来一阵冰冷的麻木感。”
      </p>
      <div className="mt-4 flex gap-2 border-t border-ink pt-3">
        <ActionButton onClick={() => onApply(discussion.paragraphId)} primary>
          就用这个
        </ActionButton>
        <ActionButton>稍后讨论</ActionButton>
      </div>
    </blockquote>
  );
}

export default function Home() {
  const [paragraphs, setParagraphs] = useState(initialParagraphs);
  const [selectedCard, setSelectedCard] = useState<Card>(cards[1]);
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "demo",
      card: cards[1],
      paragraphId: "p1",
      position: "after",
    },
  ]);

  function handleDrop(paragraphId: string, position: "before" | "after") {
    const item: Discussion = {
      id: `${selectedCard.id}-${paragraphId}-${position}`,
      card: selectedCard,
      paragraphId,
      position,
    };
    setDiscussions((current) => [...current.filter((entry) => entry.id !== item.id), item]);
  }

  function applySuggestion(paragraphId: string) {
    setParagraphs((current) =>
      current.map((paragraph) =>
        paragraph.id === paragraphId
          ? { ...paragraph, highlighted: true, text: suggestedText }
          : paragraph,
      ),
    );
  }

  return (
    <main className="min-h-dvh bg-paper text-ink newsprint-dots">
      <header className="sticky top-0 z-40 border-b-4 border-ink bg-paper">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-12 border-l border-ink">
          <div className="col-span-3 border-r border-ink p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              Vol. 02 | Interactive Desk
            </p>
            <h1 className="font-serif text-4xl font-black leading-none">FIRST READER</h1>
          </div>
          <nav className="col-span-6 flex border-r border-ink" aria-label="主导航">
            {["资产", "工作台", "我的"].map((item) => (
              <a
                className={[
                  "flex min-w-28 items-center justify-center border-r border-ink px-5 font-mono text-xs font-bold",
                  item === "工作台" ? "bg-ink text-paper" : "",
                ].join(" ")}
                href="#"
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="col-span-3 flex items-center justify-between gap-2 border-r border-ink p-3">
            <div className="flex gap-2">
              <IconButton label="搜索"><Search className="h-5 w-5" /></IconButton>
              <IconButton label="通知"><Bell className="h-5 w-5" /></IconButton>
            </div>
            <IconButton label="用户"><UserRound className="h-5 w-5" /></IconButton>
          </div>
        </div>
      </header>

      <div className="border-b border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper">
        <div className="mx-auto flex max-w-screen-2xl gap-7">
          <span className="bg-editor-red px-2">Drag Cards</span>
          <span>段落前后可投放</span>
          <span>段落内部禁插入</span>
          <span>系统提示词自动组装</span>
        </div>
      </div>

      <div className="desk-split-grid mx-auto max-w-screen-2xl overflow-x-auto border-l border-ink">
        <aside className="min-w-[420px] border-r border-ink bg-paper">
          <div className="border-b-4 border-ink p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-editor-red">
              Structured Card Shelf
            </p>
            <h2 className="font-serif text-4xl font-black">卡片架</h2>
            <p className="mt-2 font-body text-sm leading-relaxed">
              按住左侧「xx卡：xxxxx」拖到正文段落前后。投放线仅出现在段落边界。
            </p>
          </div>
          {cards.map((card) => (
            <CardShelfItem
              card={card}
              key={card.id}
              onDragStart={setSelectedCard}
              selected={selectedCard.id === card.id}
            />
          ))}
          <div className="border-t-4 border-ink bg-neutral-soft p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest">Selected</p>
            <p className="mt-2 font-serif text-2xl font-black">{selectedCard.label}</p>
          </div>
        </aside>

        <section className="min-w-[680px] border-r border-ink bg-paper">
          <div className="border-b-4 border-ink p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-editor-red">
                  写作编辑空间
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest">第一章</p>
                <h2 className="font-serif text-7xl font-black leading-[0.9]">雨停之后</h2>
              </div>
              <div className="flex gap-2">
                <ActionButton><FilePlus2 className="mr-2 inline h-4 w-4" />新建作品</ActionButton>
                <ActionButton><Download className="mr-2 inline h-4 w-4" />导出正文</ActionButton>
                <ActionButton primary>继续写</ActionButton>
              </div>
            </div>
            <div className="mt-5 border border-ink bg-neutral-soft p-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-editor-red">
                System Prompt
              </p>
              <p className="mt-2 font-mono text-xs leading-relaxed">{systemPrompt}</p>
            </div>
          </div>

          <article className="mx-auto min-h-[780px] max-w-4xl p-10">
            <div className="mb-8 grid grid-cols-4 border border-ink font-mono text-xs uppercase tracking-widest">
              <div className="border-r border-ink p-3">Draft 02</div>
              <div className="border-r border-ink p-3">1,486 字</div>
              <div className="border-r border-ink p-3 text-editor-red">可拖拽</div>
              <div className="p-3">Block Anchors</div>
            </div>

            {paragraphs.map((paragraph) => {
              const before = discussions.filter(
                (discussion) =>
                  discussion.paragraphId === paragraph.id && discussion.position === "before",
              );
              const after = discussions.filter(
                (discussion) =>
                  discussion.paragraphId === paragraph.id && discussion.position === "after",
              );
              return (
                <div key={paragraph.id}>
                  <DropZone paragraphId={paragraph.id} position="before" onDropCard={handleDrop} />
                  {before.map((discussion) => (
                    <DiscussionBlock
                      discussion={discussion}
                      key={discussion.id}
                      onApply={applySuggestion}
                    />
                  ))}
                  <p
                    className={[
                      "px-4 py-3 font-body text-lg leading-8 text-justify",
                      paragraph.highlighted
                        ? "border-l-4 border-editor-red bg-[#F7F0CF]"
                        : "",
                    ].join(" ")}
                  >
                    {paragraph.text}
                  </p>
                  {after.map((discussion) => (
                    <DiscussionBlock
                      discussion={discussion}
                      key={discussion.id}
                      onApply={applySuggestion}
                    />
                  ))}
                  <DropZone paragraphId={paragraph.id} position="after" onDropCard={handleDrop} />
                </div>
              );
            })}

            <aside className="my-8 border-4 border-ink bg-neutral-soft p-4">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-editor-red">
                ATTACHED NOTE
              </p>
              <div className="mt-4 border-t border-ink pt-4">
                <h3 className="font-serif text-2xl font-bold">夜盲症</h3>
                <p className="mt-2 font-body text-sm leading-relaxed">
                  夜间行动时视觉信息不可靠；建议用声音、触感和空间回声承载危险。
                </p>
              </div>
            </aside>
          </article>
        </section>
      </div>
    </main>
  );
}
