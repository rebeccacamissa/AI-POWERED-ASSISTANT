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

/* ---------- Starry Night vector art ---------- */
function StarryNightArt() {
  return (
    <svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="snSky" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#2d3e6b" />
          <stop offset="55%" stopColor={NAVY} />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <radialGradient id="snStar" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8d6" stopOpacity="1" />
          <stop offset="40%" stopColor={GOLD} stopOpacity="0.95" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="snMoon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbe9a8" />
          <stop offset="60%" stopColor={GOLD} stopOpacity="0.9" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="snHill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a2540" />
          <stop offset="100%" stopColor="#0a1124" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="300" height="380" fill="url(#snSky)" />

      {/* Swirling brushstroke wind */}
      <g fill="none" stroke={GOLD} strokeLinecap="round">
        <path d="M-20,140 C40,80 110,200 170,140 C220,90 260,170 320,120" strokeWidth="2.2" opacity="0.85" />
        <path d="M-20,160 C40,100 110,220 170,160 C220,110 260,190 320,140" strokeWidth="1.2" opacity="0.55" />
        <path d="M-20,180 C40,120 110,240 170,180 C220,130 260,210 320,160" strokeWidth="0.8" opacity="0.35" />

        {/* Central great swirl */}
        <path d="M120,170 C150,150 190,170 190,200 C190,235 140,240 130,210 C123,188 150,180 165,195 C175,205 168,222 152,220" strokeWidth="1.8" opacity="0.9" />
        <path d="M115,175 C150,145 200,170 200,205 C200,250 130,255 120,215" strokeWidth="1" opacity="0.55" />

        {/* Secondary swirl */}
        <path d="M30,90 C50,75 80,90 80,110 C80,130 50,135 45,118 C42,108 55,103 62,112" strokeWidth="1.4" opacity="0.8" />

        {/* Distant wind streams */}
        <path d="M-10,250 C60,210 140,270 220,230 C260,210 290,225 320,215" strokeWidth="1" opacity="0.5" />
        <path d="M-10,270 C60,230 140,290 220,250 C260,230 290,245 320,235" strokeWidth="0.7" opacity="0.35" />
      </g>

      {/* Stars */}
      <g>
        <circle cx="60" cy="80" r="18" fill="url(#snStar)" />
        <circle cx="60" cy="80" r="4" fill="#fff8d6" />
        <circle cx="155" cy="200" r="22" fill="url(#snStar)" />
        <circle cx="155" cy="200" r="5" fill="#fff8d6" />
        <circle cx="230" cy="115" r="14" fill="url(#snStar)" />
        <circle cx="230" cy="115" r="3" fill="#fff8d6" />
        <circle cx="105" cy="55" r="10" fill="url(#snStar)" />
        <circle cx="105" cy="55" r="2" fill="#fff8d6" />
        <circle cx="200" cy="60" r="9" fill="url(#snStar)" />
        <circle cx="200" cy="60" r="2" fill="#fff8d6" />
        <circle cx="265" cy="180" r="11" fill="url(#snStar)" />
        <circle cx="265" cy="180" r="2.5" fill="#fff8d6" />

        {/* Crescent moon top right */}
        <g>
          <circle cx="260" cy="55" r="26" fill="url(#snMoon)" />
          <circle cx="260" cy="55" r="11" fill="#fbe9a8" />
          <circle cx="266" cy="52" r="9" fill={NAVY} opacity="0.85" />
        </g>
      </g>

      {/* Rolling hill horizon */}
      <path d="M0,300 C60,275 130,305 200,285 C250,272 280,295 300,290 L300,380 L0,380 Z" fill="url(#snHill)" />
      <g fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.4">
        <path d="M0,310 C60,288 130,315 200,295 C250,283 280,304 300,300" />
        <path d="M0,325 C70,308 140,330 210,312 C260,300 285,318 300,316" opacity="0.7" />
      </g>

      {/* Village windows */}
      <g fill={GOLD} opacity="0.9">
        <rect x="170" y="285" width="2" height="3" />
        <rect x="180" y="288" width="2" height="3" />
        <rect x="195" y="287" width="2" height="3" />
        <rect x="215" y="290" width="2" height="3" />
      </g>

      {/* Cypress silhouette on the left edge */}
      <g>
        <path
          d="M55,380 C40,340 38,300 48,250 C40,220 50,180 42,140 C56,150 60,180 58,210 C70,200 75,230 68,260 C78,280 72,320 70,380 Z"
          fill="#0a1020"
          stroke={NAVY}
          strokeWidth="0.5"
        />
        <path
          d="M50,360 C44,330 46,300 52,270 M58,300 C56,280 62,260 60,240 M54,220 C52,200 58,180 56,160"
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.25"
          strokeWidth="0.8"
        />
      </g>
    </svg>
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
  const AnyTag = Tag as unknown as React.ElementType;

  // Set text once when entering edit mode / value changes externally
  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value, editMode]);

  return (
    <AnyTag
      ref={ref}
      contentEditable={editMode}
      suppressContentEditableWarning
      onBlur={(e: any) => onChange(e.currentTarget.innerText)}
      onKeyDown={(e: any) => {
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
    </AnyTag>
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
            <div className="relative h-full w-full overflow-hidden rounded-sm" style={{ background: NAVY, border: `1px solid ${GOLD}88` }}>
              <StarryNightArt />
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
  const STORAGE_KEY = "atelier.s7.shots";
  const SHOT_COUNT = 9;
  const defaults = useMemo(() => {
    const formal = "https://i.postimg.cc/QFyKnwGc/FORMAL-EMAIL-TEST.png";
    return [
      formal,
      "https://i.postimg.cc/Hrh8PRDz/FRIENDLY-EMAIL-TEST.png",
      "https://i.postimg.cc/18jVY2hC/PERSUASIVE-EMAIL-TEST.png",
      "https://i.postimg.cc/K1H3swSn/MEETING-NOTES-TEST-1.png",
      "https://i.postimg.cc/bZBSFWc6/MEETING-NOTES-TEST-2.png",
      "https://i.postimg.cc/PCRvF9sR/TASK-PLANNER-1.png",
      "https://i.postimg.cc/dhxZSpcM/TASK-PLANNER-2.png",
      "https://i.postimg.cc/LJbg0wKL/AI-CHAT-TEST.png",
      formal,
    ];
  }, []);
  const empty = useMemo(() => Array.from({ length: SHOT_COUNT }, () => ""), []);
  const [shots, setShots] = useState<string[]>(defaults);
  const [active, setActive] = useState(0);
  const [consoleOpen, setConsoleOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const next = defaults.map((def, i) =>
            typeof parsed[i] === "string" && parsed[i].trim() ? parsed[i] : def,
          );
          setShots(next);
        }
      }
    } catch {
      /* ignore */
    }
  }, [defaults]);

  const persist = (next: string[]) => {
    setShots(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const updateShot = (i: number, v: string) => {
    const next = [...shots];
    next[i] = v;
    persist(next);
  };

  const clearAll = () => persist([...empty]);
  const resetDefaults = () => persist([...defaults]);

  const go = (n: number) => setActive((n + SHOT_COUNT) % SHOT_COUNT);
  const next = () => go(active + 1);
  const prev = () => go(active - 1);

  const currentUrl = shots[active]?.trim() ?? "";

  return (
    <SlideShell theme="dark">
      <div className="flex h-full flex-col">
        <div className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD, ...sans }}>
          Demonstration
        </div>
        <div className="flex items-center justify-between gap-4">
          <Editable
            as="h2"
            value={d.s7.heading}
            onChange={(v) => set({ ...d, s7: { ...d.s7, heading: v } })}
            editMode={edit}
            className="mt-2 text-4xl md:text-5xl font-medium"
            style={{ ...display, color: BEIGE }}
          />
          {edit && (
            <button
              onClick={() => setConsoleOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs"
              style={{ border: `1px solid ${GOLD}`, color: GOLD, ...sans }}
            >
              <TerminalSquare size={14} />
              {consoleOpen ? "Hide Console" : "Open URL Console"}
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-1 items-center justify-center">
          <div
            className="w-full max-w-4xl overflow-hidden rounded-lg"
            style={{ background: "#0f1626", border: `1px solid ${GOLD}55`, boxShadow: `0 40px 80px -30px ${GOLD}44` }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: `${GOLD}33` }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f56" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: GOLD }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27c93f" }} />
              <div
                className="ml-4 flex-1 truncate rounded px-3 py-1 text-xs"
                style={{ background: "#1a2236", color: BEIGE, ...sans }}
              >
                atelier-ai.lovable.app/tour/{String(active + 1).padStart(2, "0")}
              </div>
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] tracking-[0.2em] uppercase"
                style={{ background: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}55`, ...sans }}
              >
                {active + 1} / {SHOT_COUNT}
              </span>
            </div>

            {/* Screenshot stage */}
            <div className="relative" style={{ aspectRatio: "16 / 9", background: NAVY }}>
              {currentUrl ? (
                <img
                  src={currentUrl}
                  alt={`Screenshot ${active + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
                  <span className="text-xs uppercase tracking-[0.35em]" style={{ color: GOLD, ...sans }}>
                    Screenshot {active + 1}
                  </span>
                  <span className="text-sm" style={{ ...sans, color: "#d4c9af", opacity: 0.7 }}>
                    No image yet — open Edit Mode and paste a direct image URL.
                  </span>
                </div>
              )}

              {/* Arrow controls */}
              <button
                onClick={prev}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur transition hover:scale-105"
                style={{ background: `${NAVY}cc`, border: `1px solid ${GOLD}88`, color: GOLD }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur transition hover:scale-105"
                style={{ background: `${NAVY}cc`, border: `1px solid ${GOLD}88`, color: GOLD }}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Pagination dots */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-t px-4 py-3" style={{ borderColor: `${GOLD}33` }}>
              {shots.map((s, i) => {
                const isActive = i === active;
                const hasImg = Boolean(s.trim());
                return (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] transition"
                    style={{
                      background: isActive ? GOLD : "transparent",
                      color: isActive ? NAVY : BEIGE,
                      border: `1px solid ${hasImg ? GOLD : `${GOLD}55`}`,
                      ...sans,
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Edit-mode console */}
        {edit && consoleOpen && (
          <div
            className="mt-4 w-full max-w-4xl self-center rounded-lg p-4"
            style={{ background: "#0a1124", border: `1px solid ${GOLD}55` }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2" style={{ color: GOLD }}>
                <TerminalSquare size={14} />
                <span className="text-[10px] uppercase tracking-[0.3em]" style={sans}>
                  Screenshot URL Console · saved to localStorage
                </span>
              </div>
              <button
                onClick={clearAll}
                className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
                style={{ border: `1px solid ${GOLD}55`, color: BEIGE, ...sans }}
              >
                Clear all
              </button>
            </div>
            <div className="grid max-h-60 grid-cols-1 gap-2 overflow-auto pr-1 md:grid-cols-3">
              {shots.map((s, i) => (
                <label key={i} className="flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px]"
                    style={{ background: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}55`, ...sans }}
                  >
                    {i + 1}
                  </span>
                  <input
                    value={s}
                    onChange={(e) => updateShot(i, e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    placeholder="https://…/screenshot.png"
                    className="flex-1 rounded px-2 py-1 text-[11px] outline-none"
                    style={{ background: "#1a2236", color: BEIGE, border: `1px solid ${GOLD}33`, ...mono }}
                  />
                </label>
              ))}
            </div>
          </div>
        )}
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