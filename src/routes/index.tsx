import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Pencil,
  Eye,
  Mail,
  ListChecks,
  CalendarClock,
  Cpu,
  Cloud,
  ShieldCheck,
  AlertTriangle,
  TerminalSquare,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: DeckPage,
});

/* ---------- Palette ---------- */
const NAVY = "#1F2A44";
const BEIGE = "#E8DCC8";
const GOLD = "#C6A75E";

const serif: CSSProperties = { fontFamily: "'Cinzel', 'Playfair Display', serif" };
const display: CSSProperties = { fontFamily: "'Playfair Display', serif" };
const sans: CSSProperties = { fontFamily: "'Inter', 'Montserrat', system-ui, sans-serif" };
const mono: CSSProperties = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

/* ---------- Van Gogh decorative SVG ---------- */
function StarryBackdrop({ dense = true }: { dense?: boolean }) {
  const stars = useMemo(
    () =>
      Array.from({ length: dense ? 36 : 14 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 3,
      })),
    [dense],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" viewBox="0 0 1200 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id="goldStroke" x1="0" x2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.05" />
            <stop offset="50%" stopColor={GOLD} stopOpacity="0.9" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#goldStroke)" strokeWidth="1.2">
          <path d="M-50,520 C200,420 320,640 540,500 C740,380 900,560 1250,420" />
          <path d="M-50,300 C220,220 380,420 600,300 C820,180 980,360 1250,260" opacity="0.6" />
          <path d="M-50,640 C200,560 420,720 640,620 C840,540 1020,680 1250,580" opacity="0.5" />
        </g>
        <g fill="none" stroke={NAVY} strokeOpacity="0.35" strokeWidth="1">
          <circle cx="240" cy="180" r="70" />
          <circle cx="240" cy="180" r="110" opacity="0.5" />
          <circle cx="960" cy="520" r="90" />
          <circle cx="960" cy="520" r="140" opacity="0.45" />
        </g>
      </svg>
      <div className="absolute inset-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute animate-pulse rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.r * 2}px`,
              height: `${s.r * 2}px`,
              background: GOLD,
              boxShadow: `0 0 ${s.r * 6}px ${GOLD}`,
              animationDelay: `${s.delay}s`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SwirlLight() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute -right-20 -top-20 h-[420px] w-[420px] opacity-30" viewBox="0 0 200 200">
        <g fill="none" stroke={GOLD} strokeWidth="1.2">
          <circle cx="100" cy="100" r="30" />
          <circle cx="100" cy="100" r="50" opacity="0.7" />
          <circle cx="100" cy="100" r="72" opacity="0.5" />
          <circle cx="100" cy="100" r="94" opacity="0.3" />
        </g>
      </svg>
      <svg className="absolute -bottom-24 -left-16 h-[360px] w-[360px] opacity-25" viewBox="0 0 200 200">
        <g fill="none" stroke={NAVY} strokeWidth="1">
          <path d="M20,120 C60,80 100,160 180,100" />
          <path d="M20,140 C60,100 100,180 180,120" opacity="0.6" />
          <path d="M20,160 C60,120 100,200 180,140" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- Editable primitive ---------- */
function Editable({
  value,
  onChange,
  editMode,
  as: Tag = "div",
  className = "",
  style,
  multiline = false,
}: {
  value: string;
  onChange: (v: string) => void;
  editMode: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  multiline?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  // Set text once when entering edit mode / value changes externally
  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value, editMode]);

  return (
    <Tag
      // @ts-expect-error ref polymorphic
      ref={ref}
      contentEditable={editMode}
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) => onChange(e.currentTarget.innerText)}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
        e.stopPropagation();
      }}
      className={`${className} ${editMode ? "outline-dashed outline-1 outline-offset-4 rounded-sm" : ""}`}
      style={{ ...style, outlineColor: editMode ? GOLD : undefined }}
    >
      {value}
    </Tag>
  );
}

/* ---------- Slide data model ---------- */
type Deck = {
  s1: { title: string; subtitle: string; intro: string };
  s2: { heading: string; bullets: string[]; caption: string };
  s3: { heading: string; cards: { title: string; body: string }[] };
  s4: { heading: string; left: { title: string; body: string }; right: { title: string; body: string } };
  s5: { heading: string; body: string; code: string };
  s6: { heading: string; challenge: string; resolution: string };
  s7: { heading: string; mediaUrl: string };
  s8: { thanks: string; name: string; contact: string };
};

const DEFAULT_DECK: Deck = {
  s1: {
    title: "Atelier AI",
    subtitle: "Workplace Productivity Assistant",
    intro:
      "An elegant, single-platform AI atelier — crafting the everyday rituals of modern professionals into something effortless, refined, and remarkably human.",
  },
  s2: {
    heading: "The Administrative Drag",
    bullets: [
      "Professionals spend over 40% of the workday drafting emails, summarising notes, and planning tasks.",
      "Context is lost between tools — calendar, inbox, transcript, and to-do list rarely speak the same language.",
      "Cognitive overhead grows with every tab; deep work shrinks to the margins of the day.",
      "Manual triage of meeting notes and follow-ups delays decisions by hours, sometimes days.",
    ],
    caption: "An artistic study of the modern desk — paperwork in midnight and gold.",
  },
  s3: {
    heading: "A Single Atelier for Three Crafts",
    cards: [
      {
        title: "Smart Email Generator",
        body: "Tone-aware drafting — formal, friendly, persuasive — grounded in recipient context and intent.",
      },
      {
        title: "Meeting Notes Summarizer",
        body: "Extracts decisions, action items, owners and deadlines from raw transcripts in seconds.",
      },
      {
        title: "AI Task Planner",
        body: "Time-blocks the day into a chronological 9-to-5 schedule, balancing focus and recovery.",
      },
    ],
  },
  s4: {
    heading: "Technological Foundation",
    left: {
      title: "AI Model Integration",
      body: "Gemini 1.5 Flash for high-throughput generation. GPT-4o for nuanced, contextual tone. Routed per task for cost and quality.",
    },
    right: {
      title: "Deployment Framework",
      body: "Built on Lovable's full-stack builder nodes. Distributed via Vercel's edge cloud for sub-100ms global delivery.",
    },
  },
  s5: {
    heading: "Elite Prompt Engineering",
    body: "Atelier AI is governed by a structured prompt matrix: Role-Grounded Personas anchor identity, Hard Boundary Constraints enforce scope, and Ethical Safeguard filters review every response before it leaves the model.",
    code:
`SYSTEM DIRECTIVE — Atelier AI v1.2
--------------------------------------
role        : "Executive productivity concierge"
persona     : grounded, gracious, precise
constraints :
  - no fabricated names, dates, or figures
  - decline requests outside professional scope
  - always cite source when summarising
safeguards  :
  - PII redaction pass
  - tone audit (formal | friendly | persuasive)
  - hallucination self-check before emit
output      : structured, review-ready, human-editable`,
  },
  s6: {
    heading: "Challenges & Resolutions",
    challenge:
      "A security advisory surfaced against @tanstack/react-start and its transitive undici dependency — a blocker for production deployment.",
    resolution:
      "A single directive to Lovable's terminal: run a dependency audit, align versions, and pin router-core. Lockfile cleared with zero manual struggle.",
  },
  s7: {
    heading: "Live Demonstration",
    mediaUrl: "",
  },
  s8: {
    thanks: "Thank You",
    name: "Rebecca Adams",
    contact: "rebeccaadams.dev  |  hello@capaciti.org.za",
  },
};

/* ---------- Slide chrome ---------- */
function SlideShell({
  theme,
  children,
}: {
  theme: "dark" | "light";
  children: ReactNode;
}) {
  const dark = theme === "dark";
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: dark
          ? `radial-gradient(1200px 700px at 20% 20%, #2a3a5e 0%, ${NAVY} 55%, #141c30 100%)`
          : `linear-gradient(180deg, #f3ead7 0%, ${BEIGE} 100%)`,
        color: dark ? BEIGE : NAVY,
      }}
    >
      {dark ? <StarryBackdrop /> : <SwirlLight />}
      <div className="relative z-10 h-full w-full px-10 py-12 md:px-20 md:py-16">{children}</div>
    </div>
  );
}

/* ---------- Individual slides ---------- */
function Slide1({ d, set, edit }: { d: Deck; set: (d: Deck) => void; edit: boolean }) {
  return (
    <SlideShell theme="dark">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em]" style={{ color: GOLD, ...sans }}>
          <Sparkles size={14} /> An evening with productivity
        </div>
        <Editable
          as="h1"
          value={d.s1.title}
          onChange={(v) => set({ ...d, s1: { ...d.s1, title: v } })}
          editMode={edit}
          className="text-6xl md:text-8xl font-medium leading-none"
          style={{ ...serif, color: BEIGE, letterSpacing: "0.08em" }}
        />
        <div className="my-6 h-px w-40" style={{ background: GOLD }} />
        <Editable
          as="h2"
          value={d.s1.subtitle}
          onChange={(v) => set({ ...d, s1: { ...d.s1, subtitle: v } })}
          editMode={edit}
          className="text-xl md:text-2xl italic"
          style={{ ...display, color: GOLD }}
        />
        <Editable
          value={d.s1.intro}
          onChange={(v) => set({ ...d, s1: { ...d.s1, intro: v } })}
          editMode={edit}
          multiline
          className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed"
          style={{ ...sans, color: "#dcd2ba", opacity: 0.85 }}
        />
      </div>
    </SlideShell>
  );
}

function Slide2({ d, set, edit }: { d: Deck; set: (d: Deck) => void; edit: boolean }) {
  return (
    <SlideShell theme="light">
      <div className="grid h-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col justify-center">
          <div className="mb-3 text-xs uppercase tracking-[0.4em]" style={{ color: GOLD, ...sans }}>
            Problem Statement
          </div>
          <Editable
            as="h2"
            value={d.s2.heading}
            onChange={(v) => set({ ...d, s2: { ...d.s2, heading: v } })}
            editMode={edit}
            className="text-4xl md:text-6xl font-medium leading-tight"
            style={{ ...display, color: NAVY }}
          />
          <ul className="mt-8 space-y-4">
            {d.s2.bullets.map((b, i) => (
              <li key={i} className="flex gap-3" style={sans}>
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <Editable
                  value={b}
                  onChange={(v) => {
                    const next = [...d.s2.bullets];
                    next[i] = v;
                    set({ ...d, s2: { ...d.s2, bullets: next } });
                  }}
                  editMode={edit}
                  multiline
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: NAVY }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="relative aspect-[4/5] w-full max-w-md rounded-sm p-4"
            style={{ background: "#fff", boxShadow: `0 30px 60px -30px ${NAVY}55`, border: `1px solid ${GOLD}55` }}
          >
            <div className="relative h-full w-full overflow-hidden" style={{ background: NAVY }}>
              <svg viewBox="0 0 300 380" className="h-full w-full">
                <defs>
                  <pattern id="paper" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill={NAVY} />
                    <path d="M0 10 H20" stroke={GOLD} strokeOpacity="0.08" />
                  </pattern>
                </defs>
                <rect width="300" height="380" fill="url(#paper)" />
                {Array.from({ length: 9 }).map((_, i) => (
                  <rect
                    key={i}
                    x={30 + (i % 3) * 80}
                    y={30 + Math.floor(i / 3) * 110}
                    width="70"
                    height="95"
                    fill="none"
                    stroke={GOLD}
                    strokeOpacity={0.5 + (i % 3) * 0.15}
                    transform={`rotate(${(i - 4) * 3} ${65 + (i % 3) * 80} ${78 + Math.floor(i / 3) * 110})`}
                  />
                ))}
                <circle cx="240" cy="60" r="22" fill="none" stroke={GOLD} />
                <circle cx="240" cy="60" r="34" fill="none" stroke={GOLD} strokeOpacity="0.5" />
              </svg>
              <div
                className="absolute bottom-3 left-3 right-3 text-center text-xs italic"
                style={{ ...display, color: BEIGE, opacity: 0.7 }}
              >
                <Editable
                  value={d.s2.caption}
                  onChange={(v) => set({ ...d, s2: { ...d.s2, caption: v } })}
                  editMode={edit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide3({ d, set, edit }: { d: Deck; set: (d: Deck) => void; edit: boolean }) {
  const icons = [Mail, ListChecks, CalendarClock];
  return (
    <SlideShell theme="dark">
      <div className="flex h-full flex-col">
        <div className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD, ...sans }}>
          Solution Overview
        </div>
        <Editable
          as="h2"
          value={d.s3.heading}
          onChange={(v) => set({ ...d, s3: { ...d.s3, heading: v } })}
          editMode={edit}
          className="mt-2 text-4xl md:text-5xl font-medium"
          style={{ ...display, color: BEIGE }}
        />
        <div className="mt-12 grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
          {d.s3.cards.map((c, i) => {
            const Icon = icons[i] ?? Mail;
            return (
              <div
                key={i}
                className="relative flex flex-col rounded-lg p-7 backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${GOLD}33`,
                  boxShadow: `0 20px 50px -20px ${NAVY}`,
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-md"
                  style={{ background: `${GOLD}22`, border: `1px solid ${GOLD}66`, color: GOLD }}
                >
                  <Icon size={22} />
                </div>
                <Editable
                  as="h3"
                  value={c.title}
                  onChange={(v) => {
                    const cards = [...d.s3.cards];
                    cards[i] = { ...c, title: v };
                    set({ ...d, s3: { ...d.s3, cards } });
                  }}
                  editMode={edit}
                  className="mt-5 text-2xl"
                  style={{ ...display, color: BEIGE }}
                />
                <Editable
                  value={c.body}
                  onChange={(v) => {
                    const cards = [...d.s3.cards];
                    cards[i] = { ...c, body: v };
                    set({ ...d, s3: { ...d.s3, cards } });
                  }}
                  editMode={edit}
                  multiline
                  className="mt-3 text-sm leading-relaxed"
                  style={{ ...sans, color: "#d4c9af", opacity: 0.85 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

function Slide4({ d, set, edit }: { d: Deck; set: (d: Deck) => void; edit: boolean }) {
  const Tile = ({
    icon,
    title,
    body,
    onTitle,
    onBody,
  }: {
    icon: ReactNode;
    title: string;
    body: string;
    onTitle: (v: string) => void;
    onBody: (v: string) => void;
  }) => (
    <div className="rounded-lg bg-white p-8" style={{ border: `1px solid ${GOLD}55`, boxShadow: `0 20px 40px -25px ${NAVY}55` }}>
      <div className="flex items-center gap-3" style={{ color: GOLD }}>
        {icon}
        <Editable as="h3" value={title} onChange={onTitle} editMode={edit} className="text-2xl" style={{ ...display, color: NAVY }} />
      </div>
      <div className="my-4 h-px w-12" style={{ background: GOLD }} />
      <Editable
        value={body}
        onChange={onBody}
        editMode={edit}
        multiline
        className="text-base leading-relaxed"
        style={{ ...sans, color: NAVY, opacity: 0.85 }}
      />
    </div>
  );
  return (
    <SlideShell theme="light">
      <div className="flex h-full flex-col">
        <div className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD, ...sans }}>
          Architecture
        </div>
        <Editable
          as="h2"
          value={d.s4.heading}
          onChange={(v) => set({ ...d, s4: { ...d.s4, heading: v } })}
          editMode={edit}
          className="mt-2 text-4xl md:text-5xl font-medium"
          style={{ ...display, color: NAVY }}
        />
        <div className="mt-10 grid flex-1 grid-cols-1 gap-8 md:grid-cols-2">
          <Tile
            icon={<Cpu size={24} />}
            title={d.s4.left.title}
            body={d.s4.left.body}
            onTitle={(v) => set({ ...d, s4: { ...d.s4, left: { ...d.s4.left, title: v } } })}
            onBody={(v) => set({ ...d, s4: { ...d.s4, left: { ...d.s4.left, body: v } } })}
          />
          <Tile
            icon={<Cloud size={24} />}
            title={d.s4.right.title}
            body={d.s4.right.body}
            onTitle={(v) => set({ ...d, s4: { ...d.s4, right: { ...d.s4.right, title: v } } })}
            onBody={(v) => set({ ...d, s4: { ...d.s4, right: { ...d.s4.right, body: v } } })}
          />
        </div>
      </div>
    </SlideShell>
  );
}

function Slide5({ d, set, edit }: { d: Deck; set: (d: Deck) => void; edit: boolean }) {
  return (
    <SlideShell theme="dark">
      <div className="flex h-full flex-col">
        <div className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD, ...sans }}>
          Prompt Architecture
        </div>
        <Editable
          as="h2"
          value={d.s5.heading}
          onChange={(v) => set({ ...d, s5: { ...d.s5, heading: v } })}
          editMode={edit}
          className="mt-2 text-4xl md:text-5xl font-medium"
          style={{ ...display, color: BEIGE }}
        />
        <div className="mt-10 grid flex-1 grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <Editable
              value={d.s5.body}
              onChange={(v) => set({ ...d, s5: { ...d.s5, body: v } })}
              editMode={edit}
              multiline
              className="text-base md:text-lg leading-relaxed"
              style={{ ...sans, color: "#d4c9af" }}
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {["Role-Grounded Personas", "Hard Boundary Constraints", "Ethical Safeguards"].map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ border: `1px solid ${GOLD}55`, color: GOLD, ...sans }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div
            className="relative overflow-hidden rounded-md"
            style={{ background: "#0f1626", border: `1px solid ${GOLD}44`, boxShadow: `0 30px 60px -30px ${GOLD}33` }}
          >
            <div className="flex items-center gap-2 border-b px-4 py-2" style={{ borderColor: `${GOLD}33` }}>
              <span className="h-2 w-2 rounded-full" style={{ background: "#ff5f56" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: GOLD }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "#27c93f" }} />
              <span className="ml-3 text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD, ...sans }}>
                system.prompt.matrix
              </span>
            </div>
            <Editable
              as="pre"
              value={d.s5.code}
              onChange={(v) => set({ ...d, s5: { ...d.s5, code: v } })}
              editMode={edit}
              multiline
              className="overflow-auto p-5 text-xs leading-relaxed whitespace-pre"
              style={{ ...mono, color: BEIGE }}
            />
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide6({ d, set, edit }: { d: Deck; set: (d: Deck) => void; edit: boolean }) {
  return (
    <SlideShell theme="light">
      <div className="flex h-full flex-col">
        <div className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD, ...sans }}>
          Engineering Story
        </div>
        <Editable
          as="h2"
          value={d.s6.heading}
          onChange={(v) => set({ ...d, s6: { ...d.s6, heading: v } })}
          editMode={edit}
          className="mt-2 text-4xl md:text-5xl font-medium"
          style={{ ...display, color: NAVY }}
        />
        <div className="mt-10 grid flex-1 grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-8" style={{ border: `1px solid ${GOLD}55` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2" style={{ color: NAVY }}>
                <AlertTriangle size={20} style={{ color: "#b3261e" }} />
                <span className="text-sm uppercase tracking-[0.3em]" style={sans}>Challenge</span>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] uppercase"
                style={{ background: "#b3261e", color: "#fff", ...sans }}
              >
                CVE Alert
              </span>
            </div>
            <Editable
              value={d.s6.challenge}
              onChange={(v) => set({ ...d, s6: { ...d.s6, challenge: v } })}
              editMode={edit}
              multiline
              className="mt-5 text-base leading-relaxed"
              style={{ ...sans, color: NAVY }}
            />
            <pre
              className="mt-5 overflow-auto rounded p-3 text-xs"
              style={{ ...mono, background: "#fbf3e4", color: NAVY, border: `1px dashed ${GOLD}` }}
            >{`! @tanstack/react-start  vulnerable
! undici (transitive)    advisory`}</pre>
          </div>
          <div className="rounded-lg p-8" style={{ background: NAVY, border: `1px solid ${GOLD}55`, color: BEIGE }}>
            <div className="flex items-center gap-2" style={{ color: GOLD }}>
              <ShieldCheck size={20} />
              <span className="text-sm uppercase tracking-[0.3em]" style={sans}>Resolution</span>
            </div>
            <Editable
              value={d.s6.resolution}
              onChange={(v) => set({ ...d, s6: { ...d.s6, resolution: v } })}
              editMode={edit}
              multiline
              className="mt-5 text-base leading-relaxed"
              style={{ ...sans, color: "#dcd2ba" }}
            />
            <div
              className="mt-5 overflow-hidden rounded"
              style={{ background: "#0f1626", border: `1px solid ${GOLD}33` }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5" style={{ borderBottom: `1px solid ${GOLD}22` }}>
                <TerminalSquare size={14} style={{ color: GOLD }} />
                <span className="text-[10px] uppercase tracking-[0.3em]" style={{ ...sans, color: GOLD }}>
                  lovable › terminal
                </span>
              </div>
              <pre className="overflow-auto p-3 text-xs" style={{ ...mono, color: BEIGE }}>{`$ bun update --latest @tanstack/react-start
✔ aligned router-core 1.171.13
✔ undici advisory cleared
✔ lockfile committed`}</pre>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide7({ d, set, edit }: { d: Deck; set: (d: Deck) => void; edit: boolean }) {
  const [draftUrl, setDraftUrl] = useState(d.s7.mediaUrl);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const url = d.s7.mediaUrl.trim();

  const isIframe = /^<iframe[\s\S]+<\/iframe>$/i.test(url);
  const isImage = /\.(gif|png|jpe?g|webp)$/i.test(url);
  const isVideo = /\.(mp4|webm|mov)$/i.test(url);
  const isYouTube = /youtube\.com|youtu\.be/.test(url);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <SlideShell theme="dark">
      <div className="flex h-full flex-col">
        <div className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD, ...sans }}>
          Demonstration
        </div>
        <Editable
          as="h2"
          value={d.s7.heading}
          onChange={(v) => set({ ...d, s7: { ...d.s7, heading: v } })}
          editMode={edit}
          className="mt-2 text-4xl md:text-5xl font-medium"
          style={{ ...display, color: BEIGE }}
        />
        <div className="mt-8 flex flex-1 items-center justify-center">
          <div
            className="w-full max-w-4xl overflow-hidden rounded-lg"
            style={{ background: "#0f1626", border: `1px solid ${GOLD}55`, boxShadow: `0 40px 80px -30px ${GOLD}44` }}
          >
            <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: `${GOLD}33` }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f56" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: GOLD }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27c93f" }} />
              <div
                className="ml-4 flex-1 truncate rounded px-3 py-1 text-xs"
                style={{ background: "#1a2236", color: BEIGE, ...sans }}
              >
                atelier-ai.lovable.app/demo
              </div>
            </div>
            <div className="relative" style={{ aspectRatio: "16 / 9", background: NAVY }}>
              {!url && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="text-sm" style={{ ...sans, color: "#d4c9af", opacity: 0.7 }}>
                    Paste a video URL, GIF link, or full &lt;iframe&gt; embed below.
                  </span>
                </div>
              )}
              {url && isIframe && (
                <div className="absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full" dangerouslySetInnerHTML={{ __html: url }} />
              )}
              {url && isYouTube && !isIframe && (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={url.replace("watch?v=", "embed/")}
                  title="Demo"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
              {url && isImage && <img src={url} alt="Demo" className="absolute inset-0 h-full w-full object-cover" />}
              {url && isVideo && (
                <video ref={videoRef} src={url} className="absolute inset-0 h-full w-full object-cover" />
              )}
              {url && !isIframe && !isYouTube && !isImage && !isVideo && (
                <iframe className="absolute inset-0 h-full w-full" src={url} title="Demo" />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t px-4 py-3" style={{ borderColor: `${GOLD}33` }}>
              {isVideo && (
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs"
                  style={{ background: GOLD, color: NAVY, ...sans }}
                >
                  {playing ? <Pause size={14} /> : <Play size={14} />}
                  {playing ? "Pause" : "Play"}
                </button>
              )}
              <input
                value={draftUrl}
                onChange={(e) => setDraftUrl(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="https://… or paste <iframe …></iframe>"
                className="flex-1 rounded px-3 py-1.5 text-xs outline-none"
                style={{ background: "#1a2236", color: BEIGE, border: `1px solid ${GOLD}33`, ...sans }}
              />
              <button
                onClick={() => set({ ...d, s7: { ...d.s7, mediaUrl: draftUrl } })}
                className="rounded-full px-4 py-1.5 text-xs"
                style={{ border: `1px solid ${GOLD}`, color: GOLD, ...sans }}
              >
                Load
              </button>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide8({ d, set, edit }: { d: Deck; set: (d: Deck) => void; edit: boolean }) {
  return (
    <SlideShell theme="dark">
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <svg className="pointer-events-none absolute inset-0 m-auto h-[80%] w-[80%] opacity-30" viewBox="0 0 400 400">
          <g fill="none" stroke={GOLD} strokeWidth="1.2">
            <circle cx="200" cy="200" r="60" />
            <circle cx="200" cy="200" r="100" opacity="0.7" />
            <circle cx="200" cy="200" r="140" opacity="0.5" />
            <circle cx="200" cy="200" r="180" opacity="0.3" />
            <path d="M40,200 C120,140 280,260 360,200" />
            <path d="M40,220 C120,160 280,280 360,220" opacity="0.6" />
          </g>
        </svg>
        <div className="relative">
          <Editable
            as="h1"
            value={d.s8.thanks}
            onChange={(v) => set({ ...d, s8: { ...d.s8, thanks: v } })}
            editMode={edit}
            className="text-6xl md:text-8xl font-medium"
            style={{ ...serif, color: BEIGE, letterSpacing: "0.12em" }}
          />
          <div className="my-6 mx-auto h-px w-32" style={{ background: GOLD }} />
          <Editable
            as="div"
            value={d.s8.name}
            onChange={(v) => set({ ...d, s8: { ...d.s8, name: v } })}
            editMode={edit}
            className="text-2xl italic"
            style={{ ...display, color: GOLD }}
          />
          <Editable
            value={d.s8.contact}
            onChange={(v) => set({ ...d, s8: { ...d.s8, contact: v } })}
            editMode={edit}
            className="mt-3 text-sm tracking-[0.25em] uppercase"
            style={{ ...sans, color: "#d4c9af" }}
          />
        </div>
      </div>
    </SlideShell>
  );
}

/* ---------- Page ---------- */
const TOTAL = 8;

function DeckPage() {
  const [deck, setDeck] = useState<Deck>(DEFAULT_DECK);
  const [index, setIndex] = useState(0);
  const [edit, setEdit] = useState(false);
  const [fs, setFs] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const go = useCallback((n: number) => setIndex((i) => Math.max(0, Math.min(TOTAL - 1, n))), []);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (edit) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, edit]);

  useEffect(() => {
    const onFs = () => setFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFs = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const slides = [
    <Slide1 key={0} d={deck} set={setDeck} edit={edit} />,
    <Slide2 key={1} d={deck} set={setDeck} edit={edit} />,
    <Slide3 key={2} d={deck} set={setDeck} edit={edit} />,
    <Slide4 key={3} d={deck} set={setDeck} edit={edit} />,
    <Slide5 key={4} d={deck} set={setDeck} edit={edit} />,
    <Slide6 key={5} d={deck} set={setDeck} edit={edit} />,
    <Slide7 key={6} d={deck} set={setDeck} edit={edit} />,
    <Slide8 key={7} d={deck} set={setDeck} edit={edit} />,
  ];

  return (
    <div ref={containerRef} className="flex h-screen w-screen flex-col" style={{ background: "#0a0f1c" }}>
      <div className="relative flex-1 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${TOTAL * 100}%`, transform: `translateX(-${index * (100 / TOTAL)}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="h-full"
              style={{ width: `${100 / TOTAL}%`, opacity: i === index ? 1 : 0.4, transition: "opacity 0.6s" }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Control bar */}
      <div
        className="flex items-center justify-between gap-4 border-t px-6 py-3"
        style={{ background: NAVY, borderColor: `${GOLD}33`, color: BEIGE }}
      >
        <div className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase" style={{ ...sans, color: GOLD }}>
          <Sparkles size={14} />
          Atelier AI
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full transition disabled:opacity-30"
            style={{ border: `1px solid ${GOLD}55`, color: BEIGE }}
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="min-w-[110px] text-center text-xs tracking-[0.25em] uppercase" style={{ ...sans, color: BEIGE }}>
            Slide <span style={{ color: GOLD }}>{index + 1}</span> of {TOTAL}
          </div>
          <button
            onClick={next}
            disabled={index === TOTAL - 1}
            className="flex h-9 w-9 items-center justify-center rounded-full transition disabled:opacity-30"
            style={{ border: `1px solid ${GOLD}55`, color: BEIGE }}
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setEdit((v) => !v)}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition"
            style={{
              background: edit ? GOLD : "transparent",
              color: edit ? NAVY : BEIGE,
              border: `1px solid ${GOLD}`,
              ...sans,
            }}
            aria-label="Toggle edit mode"
          >
            {edit ? <Pencil size={14} /> : <Eye size={14} />}
            {edit ? "Edit Mode" : "View Mode"}
          </button>
          <button
            onClick={toggleFs}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ border: `1px solid ${GOLD}55`, color: BEIGE }}
            aria-label="Toggle fullscreen"
          >
            {fs ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}