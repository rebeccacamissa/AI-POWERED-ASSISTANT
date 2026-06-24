import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  Mail, FileText, CalendarClock, Search, MessageSquare,
  Sparkles, Copy, Check, Send, ShieldCheck, Clock, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      { name: "description", content: "An elegant AI-powered workplace assistant: smart email, meeting summaries, task planning, research, and chat." },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      { property: "og:description", content: "Premium AI productivity suite for the modern professional." },
    ],
  }),
  component: Index,
});

type ViewKey = "email" | "notes" | "planner" | "research" | "chat";

const NAV: { key: ViewKey; label: string; icon: typeof Mail }[] = [
  { key: "email", label: "Smart Email", icon: Mail },
  { key: "notes", label: "Meeting Notes", icon: FileText },
  { key: "planner", label: "Task Planner", icon: CalendarClock },
  { key: "research", label: "Research Assistant", icon: Search },
  { key: "chat", label: "AI Chat", icon: MessageSquare },
];

function Index() {
  const [view, setView] = useState<ViewKey>("email");
  const today = useMemo(
    () => new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    []
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex sticky top-0 h-screen w-72 flex-col bg-secondary/60 border-r border-border/60 px-6 py-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-[var(--shadow-gold)]">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="font-serif text-lg leading-tight text-primary">Atelier AI</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Workplace Suite</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map(({ key, label, icon: Icon }) => {
            const active = view === key;
            return (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`group w-full flex items-center gap-3 px-4 py-3 rounded-md font-serif text-[17px] transition-all
                  ${active
                    ? "bg-card text-primary border-l-2 border-accent shadow-sm"
                    : "text-primary/75 hover:text-primary hover:bg-card/60 border-l-2 border-transparent"}`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-accent" : "text-primary/60"}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
        <div className="pt-6 mt-6 border-t border-border/60">
          <p className="font-serif italic text-sm text-primary/70 leading-relaxed">
            "Elegance is refusal."
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">— Coco Chanel</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-10 bg-background/85 backdrop-blur-md border-b border-border/60">
          <div className="px-6 md:px-10 py-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <h1 className="font-serif text-2xl md:text-3xl text-primary truncate">
                Welcome back, <span className="italic">Alexandra</span>
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{today}</p>
            </div>
            <div className="flex items-center gap-3 md:gap-5 shrink-0">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/40">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span className="text-[11px] font-medium tracking-wide text-primary uppercase">
                  Responsible AI
                </span>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-sm shadow-[var(--shadow-luxury)]">
                AM
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden px-4 pb-3 flex gap-2 overflow-x-auto">
            {NAV.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-serif border
                  ${view === key ? "bg-primary text-primary-foreground border-primary" : "bg-card text-primary border-border"}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 md:px-10 py-8 md:py-10">
          {view === "email" && <EmailModule />}
          {view === "notes" && <NotesModule />}
          {view === "planner" && <PlannerModule />}
          {view === "research" && <ResearchModule />}
          {view === "chat" && <ChatModule />}
        </main>

        {/* Footer disclaimer */}
        <footer className="border-t border-border/60 bg-secondary/40">
          <div className="px-6 md:px-10 py-5 text-center">
            <p className="font-serif italic text-sm md:text-[15px] text-primary/85 max-w-3xl mx-auto leading-relaxed">
              <ShieldCheck className="inline-block h-4 w-4 text-accent mr-2 -mt-0.5" />
              AI-generated content can contain inaccuracies. Please review, verify, and edit all outputs before professional use.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ============== Shared primitives ============== */

function ModuleHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">{eyebrow}</p>
      <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">{title}</h2>
      <p className="text-sm md:text-base text-muted-foreground mt-3 leading-relaxed">{description}</p>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-xl border border-border/70 shadow-[var(--shadow-luxury)] ${className}`}>
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, className = "" }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; className?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-serif text-[15px]
        hover:bg-[color:var(--navy-soft)] transition-colors shadow-[var(--shadow-luxury)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[11px] uppercase tracking-[0.18em] text-primary/70 font-medium mb-2">{children}</label>;
}

const inputCls =
  "w-full px-4 py-3 rounded-md border border-border bg-card text-primary placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition";

/* ============== 1. Smart Email Generator ============== */

function EmailModule() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<"Formal" | "Friendly" | "Persuasive">("Formal");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!topic.trim()) return;
    const greetings = { Formal: "Dear Colleague,", Friendly: "Hi there,", Persuasive: "Hello," };
    const closings = {
      Formal: "Kindly let me know your thoughts at your earliest convenience.\n\nWarm regards,\nAlexandra",
      Friendly: "Let me know what you think — would love to hear from you soon!\n\nCheers,\nAlexandra",
      Persuasive: "I'm confident this represents a meaningful opportunity, and I'd welcome the chance to discuss it further.\n\nSincerely,\nAlexandra",
    };
    const bodies = {
      Formal: `I hope this message finds you well. I am writing to discuss ${topic}. Based on recent developments, I believe this matter warrants our shared attention and a coordinated response.`,
      Friendly: `Hope you're having a great week! I wanted to reach out about ${topic} — I think it's something we should chat about. It could be a really good fit for what we're working on.`,
      Persuasive: `I wanted to bring to your attention an important matter: ${topic}. The case for moving forward is compelling, both in terms of impact and timing, and I'd love your support in taking the next step.`,
    };
    setOutput(`${greetings[tone]}\n\n${bodies[tone]}\n\n${closings[tone]}`);
    setCopied(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div>
      <ModuleHeader
        eyebrow="Module 01"
        title="Smart Email Generator"
        description="Compose pitch-perfect correspondence in seconds. Choose your tone — we'll handle the elegance."
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 md:p-8">
          <Label>Topic / Context</Label>
          <textarea
            rows={5}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Following up on the Q4 partnership proposal with Maison Bellême..."
            className={inputCls + " resize-none mb-5"}
          />
          <Label>Tone</Label>
          <div className="relative mb-6">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as "Formal" | "Friendly" | "Persuasive")}
              className={inputCls + " appearance-none pr-10 cursor-pointer"}
            >
              <option>Formal</option>
              <option>Friendly</option>
              <option>Persuasive</option>
            </select>
            <ArrowRight className="h-4 w-4 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-accent pointer-events-none" />
          </div>
          <PrimaryButton onClick={generate}>
            <Sparkles className="h-4 w-4" /> Generate Email
          </PrimaryButton>
        </Card>

        <Card className="p-6 md:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="font-serif text-xl text-primary">Draft</p>
            {output && (
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-primary text-xs uppercase tracking-wider font-medium hover:bg-[color:var(--gold-soft)] transition shadow-[var(--shadow-gold)]"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Your composed message will appear here..."
            rows={14}
            className={inputCls + " flex-1 resize-none font-serif text-[15px] leading-relaxed bg-secondary/40"}
          />
        </Card>
      </div>
    </div>
  );
}

/* ============== 2. Meeting Notes Summarizer ============== */

function NotesModule() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<null | { summary: string; actions: string[]; decisions: string[] }>(null);

  const summarize = () => {
    if (!notes.trim()) return;
    const wc = notes.split(/\s+/).length;
    setResult({
      summary: `The meeting covered ${wc} words of discussion centered on strategic priorities, cross-functional alignment, and upcoming deliverables. Stakeholders agreed on accelerated timelines and clarified ownership for the next sprint cycle.`,
      actions: [
        "Alexandra to circulate revised proposal by Friday, EOD",
        "Marketing team to deliver creative brief within 5 business days",
        "Schedule follow-up review session for next Tuesday at 10:00 AM",
        "Finance to validate Q4 budget allocation by month-end",
      ],
      decisions: [
        "Approved rollout of the Atelier brand refresh in EMEA markets",
        "Confirmed shift to quarterly OKR cadence beginning Q1",
        "Greenlit partnership exploration with two flagship vendors",
      ],
    });
  };

  return (
    <div>
      <ModuleHeader
        eyebrow="Module 02"
        title="Meeting Notes Summarizer"
        description="Distill long conversations into clear, actionable intelligence — structured for executive review."
      />
      <Card className="p-6 md:p-8 mb-6">
        <Label>Raw Meeting Notes</Label>
        <textarea
          rows={9}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your meeting transcript or notes here..."
          className={inputCls + " resize-none mb-5"}
        />
        <PrimaryButton onClick={summarize}>
          <FileText className="h-4 w-4" /> Summarize Notes
        </PrimaryButton>
      </Card>

      {result && (
        <div className="grid md:grid-cols-3 gap-5">
          <SummaryCard title="Executive Summary">
            <p className="text-sm leading-relaxed text-primary/85">{result.summary}</p>
          </SummaryCard>
          <SummaryCard title="Action Items & Deadlines">
            <ul className="space-y-3">
              {result.actions.map((a, i) => (
                <li key={i} className="flex gap-3 text-sm text-primary/85">
                  <span className="text-accent font-serif text-lg leading-none">·</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </SummaryCard>
          <SummaryCard title="Key Decisions">
            <ul className="space-y-3">
              {result.decisions.map((d, i) => (
                <li key={i} className="flex gap-3 text-sm text-primary/85">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </SummaryCard>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-xl border border-accent/50 shadow-[var(--shadow-luxury)] overflow-hidden">
      <div className="px-6 py-4 border-b border-accent/30 bg-accent/5">
        <h3 className="font-serif text-lg text-primary">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ============== 3. AI Task Planner ============== */

function PlannerModule() {
  const [raw, setRaw] = useState("");
  const [schedule, setSchedule] = useState<{ time: string; task: string; priority: "High" | "Medium" | "Low" }[] | null>(null);

  const structure = () => {
    const items = raw.split("\n").map((t) => t.trim()).filter(Boolean);
    if (!items.length) return;
    const times = ["09:00 AM", "10:30 AM", "11:45 AM", "01:30 PM", "03:00 PM", "04:15 PM", "05:30 PM"];
    const prios: ("High" | "Medium" | "Low")[] = ["High", "High", "Medium", "High", "Medium", "Low", "Low"];
    setSchedule(
      items.slice(0, 7).map((task, i) => ({
        time: times[i] ?? "06:00 PM",
        task,
        priority: prios[i] ?? "Low",
      }))
    );
  };

  const pillCls = (p: "High" | "Medium" | "Low") =>
    p === "High"
      ? "bg-primary text-primary-foreground"
      : p === "Medium"
      ? "bg-accent/80 text-primary"
      : "bg-secondary text-primary/70";

  return (
    <div>
      <ModuleHeader
        eyebrow="Module 03"
        title="AI Task Planner"
        description="Transform a scattered list into a refined, chronological agenda — purpose-built for a productive day."
      />
      <Card className="p-6 md:p-8 mb-6">
        <Label>Today's Tasks (one per line)</Label>
        <textarea
          rows={7}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={"Review Q4 board deck\nCall with Antoine re: contract\nWrite team update\n..."}
          className={inputCls + " resize-none mb-5 font-mono text-sm"}
        />
        <PrimaryButton onClick={structure}>
          <CalendarClock className="h-4 w-4" /> Structure My Day
        </PrimaryButton>
      </Card>

      {schedule && (
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-secondary/40 flex items-center justify-between">
            <h3 className="font-serif text-xl text-primary">Today's Itinerary</h3>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{schedule.length} items</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground border-b border-border">
                  <th className="px-6 py-3 font-medium w-40">Time</th>
                  <th className="px-6 py-3 font-medium">Task</th>
                  <th className="px-6 py-3 font-medium w-36">Priority</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-secondary/30 transition">
                    <td className="px-6 py-4 font-serif text-primary flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-accent" /> {row.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-primary/85">{row.task}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-medium ${pillCls(row.priority)}`}>
                        {row.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ============== 4. Research Assistant ============== */

function ResearchModule() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<null | { points: string[]; recs: string[] }>(null);

  const analyze = () => {
    if (!topic.trim()) return;
    setResult({
      points: [
        `${topic} is experiencing accelerated momentum across leading enterprise markets.`,
        "Adoption is being driven by demand for measurable efficiency and refined user experience.",
        "Regulatory frameworks are evolving rapidly — early movers gain meaningful strategic advantage.",
        "Competitive landscape consolidation is anticipated within the next 12 to 18 months.",
      ],
      recs: [
        "Establish a dedicated initiative with clear ownership and quarterly milestones.",
        "Invest in foundational capabilities before pursuing breadth of application.",
        "Pilot in a contained business unit to validate assumptions before scale.",
        "Build advisory relationships with two to three domain experts for ongoing perspective.",
      ],
    });
  };

  return (
    <div>
      <ModuleHeader
        eyebrow="Module 04"
        title="Research Assistant"
        description="Move from question to insight — structured analysis and recommendations, ready for the boardroom."
      />
      <Card className="p-6 md:p-8 mb-6">
        <Label>Topic or Article Subject</Label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. The rise of agentic AI in financial services"
            className={inputCls + " flex-1"}
          />
          <PrimaryButton onClick={analyze} className="shrink-0">
            <Search className="h-4 w-4" /> Research & Analyze
          </PrimaryButton>
        </div>
      </Card>

      {result && (
        <div className="grid md:grid-cols-2 gap-5">
          <SummaryCard title="Key Summary Points">
            <ul className="space-y-3">
              {result.points.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm text-primary/85">
                  <span className="font-serif text-accent text-sm mt-0.5">0{i + 1}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </SummaryCard>
          <SummaryCard title="Strategic Recommendations">
            <ul className="space-y-3">
              {result.recs.map((r, i) => (
                <li key={i} className="flex gap-3 text-sm text-primary/85">
                  <ArrowRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </SummaryCard>
        </div>
      )}
    </div>
  );
}

/* ============== 5. Chatbot ============== */

type Msg = { role: "user" | "ai"; text: string };

const QUICK = ["Summarize my inbox", "Draft a thank-you note", "Plan a focus block", "Suggest a meeting agenda"];

function ChatModule() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Good day, Alexandra. I'm Atelier — your discreet workplace assistant. How may I be of service?" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: `A thoughtful question. Regarding "${t}" — here's how I'd approach it: begin with the outcome you wish to achieve, then work backwards through the two or three decisions that will most influence it. I can draft, schedule, or research as needed — simply ask.`,
        },
      ]);
    }, 600);
  };

  return (
    <div>
      <ModuleHeader
        eyebrow="Module 05"
        title="AI Concierge"
        description="A conversational partner for every moment of the working day — composed, considered, and always available."
      />
      <Card className="flex flex-col h-[68vh] min-h-[520px] overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 md:px-8 py-6 space-y-4 bg-secondary/20">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[78%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm
                  ${m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-primary rounded-bl-sm font-serif"}`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 md:px-8 pt-4 pb-3 flex flex-wrap gap-2 border-t border-border/60 bg-card">
          {QUICK.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/40 text-xs text-primary hover:bg-accent/25 transition font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="px-5 md:px-8 pb-5 flex gap-3 bg-card"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className={inputCls + " flex-1"}
          />
          <button
            type="submit"
            className="shrink-0 h-12 w-12 grid place-items-center rounded-md bg-primary text-primary-foreground hover:bg-[color:var(--navy-soft)] transition shadow-[var(--shadow-luxury)]"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </Card>
    </div>
  );
}
