"use client";

import Image from "next/image";
import { Bell, Download, FilePlus2, Search, UserRound, X } from "lucide-react";
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
};

const cards: Card[] = [
  {
    id: "worsen-situation",
    label: "推进卡：让局面变糟",
    type: "推进卡",
    summary: "加入新的阻碍，让角色无法按原计划前进。",
    detail: "让眼前的问题升级，但仍与当前段落的行动直接相关。",
  },
  {
    id: "shift-relationship",
    label: "关系卡：让关系发生位移",
    type: "关系卡",
    summary: "通过一个动作或一句话，改变双方的距离。",
    detail: "不解释关系，让信任、怀疑、依赖或对抗在场景中发生变化。",
  },
  {
    id: "pay-price",
    label: "选择卡：让角色付出代价",
    type: "选择卡",
    summary: "让角色必须放弃一样东西，才能继续行动。",
    detail: "代价应当具体、不可轻易撤销，并能影响之后的选择。",
  },
  {
    id: "partial-secret",
    label: "悬念卡：只暴露一点秘密",
    type: "悬念卡",
    summary: "给出足以改变判断的信息，但保留关键答案。",
    detail: "让读者获得新的问题，而不是一次性得到完整解释。",
  },
  {
    id: "one-question",
    label: "章节卡：下一章只解决一个问题",
    type: "章节卡",
    summary: "收束本章目标，避免同时处理过多线索。",
    detail: "选择一个必须回应的问题，其余冲突继续保持张力。",
  },
];

const initialParagraphs: Paragraph[] = [
  {
    id: "p1",
    text: "林墨握紧了手中的发条表，齿轮咬合的咔哒声在寂静的废墟里格外刺血。",
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

function IconButton({
  label,
  children,
}: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <button
      aria-label={label}
      className="sharp-corners flex h-10 w-10 items-center justify-center border border-neutral-soft bg-paper text-ink-soft transition-colors duration-100 hover:border-ink hover:text-ink"
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
        "sharp-corners min-h-10 border px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest transition-colors duration-100",
        primary
          ? "bg-ink text-paper hover:bg-paper hover:text-ink"
          : "border-neutral-soft bg-paper text-ink-soft hover:border-ink hover:text-ink",
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
  selectionMode,
  onSelect,
}: Readonly<{
  card: Card;
  selectionMode: boolean;
  onSelect: (card: Card) => void;
}>) {
  return (
    <button
      className={[
        "block w-full border-b border-neutral-soft px-4 py-3 text-left transition-colors duration-100",
        selectionMode
          ? "cursor-pointer bg-[#FBFBF9] hover:bg-[#EEECE6] hover:text-ink"
          : "cursor-default bg-[#FBFBF9] text-ink-soft",
      ].join(" ")}
      disabled={!selectionMode}
      onClick={() => onSelect(card)}
      type="button"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-muted">
          {card.type}
        </span>
        {selectionMode && <span className="font-sans text-[10px] text-editor-red">选择</span>}
      </div>
      <h3 className="mt-1 truncate font-serif text-lg font-bold">{card.label}</h3>
      <p className="mt-1 truncate text-xs text-[#8A8A84]">{card.summary}</p>
    </button>
  );
}

function DiscussionBlock({
  card,
  onClose,
}: Readonly<{ card: Card; onClose: () => void }>) {
  return (
    <blockquote className="ai-discussion relative mb-10 mt-3 border-l-2 border-[#B7A78C] bg-[#F5F2EA] px-6 py-5 text-sm leading-7 text-ink-soft">
      <button
        aria-label="关闭第一读者批注"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center text-ink-muted opacity-50 transition-colors duration-100 hover:bg-[#E8E2D6] hover:text-ink hover:opacity-100"
        onClick={onClose}
        title="关闭批注"
        type="button"
      >
        <X className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <div className="pr-8">
        <p className="font-serif text-lg font-bold text-editor-red">第一读者批注</p>
        <p className="mt-1 font-sans text-xs text-ink-muted">
          参考卡片：{card.type}「{card.label.replace(`${card.type}：`, "")}」
        </p>
      </div>
      <p className="mt-4">
        这一段的“刺血”很有力度。结合这张{card.type}，可以让发条表的异常不只制造气氛，
        而是进一步暴露林墨的位置，让远处的人注意到他。
      </p>
      <div className="mt-4 border-t border-[#D8D1C4] pt-3">
        <ActionButton>继续讨论</ActionButton>
      </div>
    </blockquote>
  );
}

export default function Home() {
  const [selectingParagraphId, setSelectingParagraphId] = useState<string | null>(null);
  const [associations, setAssociations] = useState<Record<string, Card>>({
    p1: cards[0],
  });

  function associateCard(card: Card) {
    if (!selectingParagraphId) return;
    setAssociations((current) => ({ ...current, [selectingParagraphId]: card }));
    setSelectingParagraphId(null);
  }

  function removeAssociation(paragraphId: string) {
    setSelectingParagraphId(null);
    setAssociations((current) => {
      const next = { ...current };
      delete next[paragraphId];
      return next;
    });
  }

  return (
    <main className="min-h-dvh bg-paper text-ink newsprint-dots">
      <header className="sticky top-0 z-40 border-b border-ink bg-paper">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-12">
          <div className="col-span-3 border-r border-neutral-soft px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              Vol. 02 | Interactive Desk
            </p>
            <h1 className="font-serif text-3xl font-black leading-none">FIRST READER</h1>
          </div>
          <nav className="col-span-6 flex border-r border-neutral-soft" aria-label="主导航">
            {["资产", "工作台", "我的"].map((item) => (
              <a
                className={[
                  "flex min-w-28 items-center justify-center border-r border-neutral-soft px-5 font-mono text-xs font-semibold text-ink-soft",
                  item === "工作台" ? "border-b-2 border-b-editor-red text-ink" : "",
                ].join(" ")}
                href="#"
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="col-span-3 flex items-center justify-between gap-2 p-2">
            <div className="flex gap-2">
              <IconButton label="搜索"><Search className="h-5 w-5" /></IconButton>
              <IconButton label="通知"><Bell className="h-5 w-5" /></IconButton>
            </div>
            <IconButton label="用户"><UserRound className="h-5 w-5" /></IconButton>
          </div>
        </div>
      </header>

      <div className="border-b border-neutral-soft bg-[#F1F0EC] px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        <div className="mx-auto flex max-w-screen-2xl items-center gap-6">
          <span className="bg-editor-red px-2 py-0.5 text-paper">段落批注</span>
          <span>在正文段落左侧添加参考卡</span>
          <span>第一读者随正文一起阅读</span>
        </div>
      </div>

      <div className="desk-split-grid mx-auto max-w-screen-2xl overflow-x-auto">
        <aside className="min-w-[320px] border-r border-neutral-soft bg-[#FBFBF9]">
          <div className="border-b border-neutral-soft px-4 py-5">
            {selectingParagraphId ? (
              <div className="border-l-2 border-editor-red pl-3">
                <p className="font-serif text-lg font-bold">选择参考卡</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                  请选择一张卡片，用来推敲当前段落。
                </p>
                <button
                  className="mt-3 font-sans text-xs text-ink-muted underline decoration-neutral-soft underline-offset-4 hover:text-ink"
                  onClick={() => setSelectingParagraphId(null)}
                  type="button"
                >
                  取消选择
                </button>
              </div>
            ) : (
              <>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  Writing Cards
                </p>
                <h2 className="mt-1 font-serif text-3xl font-bold">卡片架</h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                  点击正文段落旁的羽毛笔，再选择一张卡片辅助推敲。
                </p>
              </>
            )}
          </div>
          {cards.map((card) => (
            <CardShelfItem
              card={card}
              key={card.id}
              onSelect={associateCard}
              selectionMode={selectingParagraphId !== null}
            />
          ))}
        </aside>

        <section className="min-w-[760px] bg-[#FEFEFC]">
          <div className="border-b border-neutral-soft px-10 py-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  写作编辑空间
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ink-muted">第二章</p>
                <h2 className="mt-1 font-serif text-6xl font-black leading-[0.95]">雨停之后</h2>
              </div>
              <div className="flex gap-2">
                <ActionButton><FilePlus2 className="mr-2 inline h-4 w-4" />新建作品</ActionButton>
                <ActionButton><Download className="mr-2 inline h-4 w-4" />导出正文</ActionButton>
              </div>
            </div>
          </div>

          <article className="mx-auto min-h-[900px] max-w-4xl px-14 py-12">
            <div className="mb-12 flex items-center gap-5 border-b border-neutral-soft pb-3 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              <span>Draft 02</span>
              <span>1,486 字</span>
              <span>段落参考</span>
            </div>

            {initialParagraphs.map((paragraph) => {
              const associatedCard = associations[paragraph.id];
              return (
                <div className="group relative mb-10" key={paragraph.id}>
                  <div className="absolute -left-10 top-5 z-10 flex items-center">
                    <button
                      aria-label="用卡片推敲这一段"
                      className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center border border-neutral-soft bg-paper transition-all duration-150 hover:border-ink",
                        selectingParagraphId === paragraph.id
                          ? "opacity-100"
                          : "opacity-20 group-hover:opacity-70",
                      ].join(" ")}
                      onClick={() => setSelectingParagraphId(paragraph.id)}
                      title="用卡片推敲这一段"
                      type="button"
                    >
                      <Image
                        alt=""
                        className="h-7 w-7 object-contain mix-blend-multiply"
                        height={28}
                        src="/feather-pen.png"
                        width={28}
                      />
                    </button>
                  </div>
                  <p
                    contentEditable
                    className={[
                      "writing-paragraph font-body text-lg text-justify text-ink-soft",
                      associatedCard ? "bg-[#FCF8EE]" : "",
                    ].join(" ")}
                    suppressContentEditableWarning
                  >
                    {paragraph.text}
                  </p>
                  {selectingParagraphId === paragraph.id && (
                    <p className="ml-6 mt-2 font-sans text-xs text-ink opacity-40">
                      选一张参考卡，和Reader一起讨论故事进展......
                    </p>
                  )}
                  {associatedCard && (
                    <DiscussionBlock
                      card={associatedCard}
                      onClose={() => removeAssociation(paragraph.id)}
                    />
                  )}
                </div>
              );
            })}
          </article>
        </section>
      </div>
    </main>
  );
}
