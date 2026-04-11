"use client";

import { useMemo, useState } from "react";
import "./portfolio.css";

const fooziImage = "/IMG_4043.JPG";
const oskiImage = "/IMG_8690.JPG";
const byogloImage = "/IMG_2146.JPG";

const heroFacts = [
  "⚙️ UC Berkeley Mechanical Engineering",
  "🧸 Founder, engineer, builder",
  "📈 Product, GTM, and creator instinct",
];

const proofStats = [
  {
    label: "Build speed",
    value: "14 days",
    note: "from idea to Foozi as a working system",
  },
  {
    label: "Angle",
    value: "Founder + engineer",
    note: "technical execution with product and distribution instinct",
  },
  {
    label: "Signal",
    value: "Shipped proof",
    note: "AI systems, prototypes, portfolio, and content",
  },
];

const featuredProjects = [
  {
    title: "Foozi / OpenClaw",
    meta: "AI systems • product • execution",
    description: "Built a multi-agent personal operating system with workflow routing, memory, and a polished portfolio surface.",
    image: fooziImage,
    alt: "Photo for Foozi project work",
  },
  {
    title: "Oski Sorting Trash Can",
    meta: "mechanical • CAD • Arduino",
    description: "Physical engineering build combining prototyping, systems thinking, and practical interaction design.",
    image: oskiImage,
    alt: "Photo for Oski trash can project work",
  },
  {
    title: "ByoGlo",
    meta: "product • packaging • pricing",
    description: "https://byoglo.neocities.org/ Prototype and market-facing concept work with positioning and customer experience.",
    image: byogloImage,
    alt: "Photo for ByoGlo project work",
  },
];

const hobbies = [
  "gaming and playful systems",
  "building cute but capable interfaces",
  "late-night coding sprints",
  "turning ideas into demos fast",
  "mixing engineering with aesthetic taste",
  "learning by shipping",
];

const reels = [
  {
    title: "Featured reel",
    href: "https://www.instagram.com/reel/DEg3KbuxS1o/?igsh=NTc4MTIwNjQ2YQ==",
    embed: "https://www.instagram.com/reel/DEg3KbuxS1o/embed",
  },
  {
    title: "Featured reel",
    href: "https://www.instagram.com/reel/C_mJKXpSOV4/?igsh=NTc4MTIwNjQ2YQ==",
    embed: "https://www.instagram.com/reel/C_mJKXpSOV4/embed",
  },
];

const proofBullets = [
  "Berkeley mechanical engineering student building like a founder, not just a student",
  "Built Foozi, a multi-agent personal operating system, in about two weeks",
  "Strong across software, hardware, prototyping, product, GTM, and creator-style distribution",
  "Moves from idea to shipped visual proof unusually fast",
];

const calendlyLink = "https://calendly.com/vivian_yang-berkeley/30min";
const cookieJarLink = "https://cookiejar-five.vercel.app/";

const chatFlows = {
  vc: {
    label: "VC",
    messages: [
      "Hi, I’m Foozi. Are you actively investing right now, or just tracking strong founders early?",
      "Vivian is a Berkeley mechanical engineering founder who built Foozi, a multi-agent personal operating system, in about two weeks.",
      "Her angle is rare: she combines engineering depth, product instinct, and real distribution energy in one package.",
      "She moves from concept to working demo fast, across AI systems, hardware-adjacent prototyping, and founder-led GTM.",
      "If this sounds investable, drop your name, firm, and best contact so I can route you cleanly.",
    ],
  },
  recruiter: {
    label: "Recruiter",
    messages: [
      "Hi, I’m Foozi. Are you hiring for product-minded engineers, founder associates, or technical operators?",
      "Vivian is a Berkeley mechanical engineering student who builds like a founder, not just a candidate.",
      "She ships across AI systems, product surfaces, prototyping, and fast execution with strong taste.",
      "She is especially strong in roles where initiative, technical depth, and communication all matter at once.",
      "If you want to talk, send your name, team, and best contact and I’ll tee it up.",
    ],
  },
  intrigued: {
    label: "Just intrigued",
    messages: [
      "Hi, I’m Foozi. Are you here because of the portfolio, the projects, or the vibe?",
      "Vivian is a Berkeley engineer and founder building AI-native systems, product experiments, and memorable technical artifacts.",
      "The pattern is speed plus taste, not just isolated school projects.",
      "She thinks like an engineer, builds like a founder, and knows how to make the work legible to other people.",
      "If you want to connect, leave your name and contact and I’ll point you to the right next step.",
    ],
  },
} as const;

type ChatRole = keyof typeof chatFlows;
type ChatMessage = { sender: "bot" | "human"; text: string };

export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<ChatRole | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [leadInput, setLeadInput] = useState("");
  const [isBookedState, setIsBookedState] = useState(false);
  const [isSendingLead, setIsSendingLead] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  const activeFlow = activeRole ? chatFlows[activeRole] : null;

  const chatMessages = useMemo<ChatMessage[]>(() => {
    if (!activeFlow) {
      return [{ sender: "bot", text: "Hi, I’m Foozi. Are you a VC, recruiter, or just intrigued?" }];
    }

    const messages: ChatMessage[] = activeFlow.messages.slice(0, currentStep + 1).map((text): ChatMessage => ({
      sender: "bot",
      text,
    }));

    if (currentStep >= activeFlow.messages.length - 1 && leadInput.trim()) {
      messages.push({ sender: "human", text: leadInput.trim() });
    }

    if (leadSaved) {
      messages.push({ sender: "bot", text: "Thank you. You’re routed. You can book time with Vivian below." });
    }

    return messages;
  }, [activeFlow, currentStep, leadInput, leadSaved]);

  const setTheme = (dark: boolean) => {
    setIsDark(dark);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      window.localStorage.setItem("vivian-portfolio-theme", dark ? "dark" : "light");
    }
  };

  const startFlow = (role: ChatRole) => {
    setActiveRole(role);
    setCurrentStep(0);
    setLeadInput("");
    setLeadSaved(false);
    setIsBookedState(false);
  };

  const advanceFlow = async () => {
    if (!activeFlow) return;

    const lastStep = activeFlow.messages.length - 1;
    if (currentStep < lastStep) {
      setCurrentStep((step) => step + 1);
      return;
    }

    if (!leadInput.trim() || isSendingLead) return;

    setIsSendingLead(true);
    try {
      if (activeRole === "vc") {
        await fetch("/api/portfolio/vc-alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: leadInput.trim(),
            contact: leadInput.trim(),
            interest: "VC inbound from portfolio chat",
          }),
        });
      }
      setLeadSaved(true);
    } finally {
      setIsSendingLead(false);
    }
  };

  if (typeof window !== "undefined" && !window.localStorage.getItem("vivian-portfolio-theme-booted")) {
    const saved = window.localStorage.getItem("vivian-portfolio-theme");
    if (saved === "dark") {
      document.documentElement.dataset.theme = "dark";
    }
    window.localStorage.setItem("vivian-portfolio-theme-booted", "1");
  }
  return (
    <main className="portfolio-shell min-h-screen">
      <div className="portfolio-bg" />
      <section className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">
        <header className="portfolio-nav glass-panel mb-6 flex items-center justify-between gap-4 rounded-[1.75rem] px-5 py-4">
          <div>
            <div className="eyebrow">Vivian Yang</div>
            <div className="text-sm opacity-80">engineer, founder, creative technologist</div>
          </div>
          <div className="flex items-center gap-3">
            <button id="theme-toggle" className="theme-toggle" aria-label="Toggle dark mode" onClick={() => setTheme(!isDark)}>
              <span className="theme-toggle__sun">☀️</span>
              <span className="theme-toggle__moon">🌙</span>
            </button>
            <a className="soft-link" href="https://www.instagram.com/vivian.yan6/" target="_blank" rel="noreferrer">Instagram</a>
            <a className="soft-link" href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </header>

        <section className="hero-layout mt-6 grid gap-6 lg:grid-cols-[1.02fr_0.98fr] items-start">
          <div className="glass-panel hero-panel rounded-[2rem] p-7 md:p-10">
            <div className="hero-badge">✿ portfolio</div>
            <h1 className="hero-title mt-4">UC Berkeley engineer and founder, shipping technical systems with taste.</h1>
            <p className="hero-copy mt-5 max-w-2xl">
              I build AI-native tools, hardware prototypes, product systems, and market-facing experiences that feel sharp, intentional, and shipped.
            </p>

            <div className="hero-facts mt-6 flex flex-wrap gap-3">
              {heroFacts.map((fact) => (
                <span key={fact} className="fact-pill">{fact}</span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a className="primary-chip" href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="secondary-chip" href="mailto:vivian_yang@berkeley.edu">Contact</a>
              <a className="secondary-chip" href="#featured">Project gallery</a>
            </div>
          </div>

          <div className="cookiejar-column grid gap-6">
            <article className="glass-panel cookiejar-hero-card rounded-[2rem] p-4 md:p-5">
              <div className="cookiejar-hero-top">
                <div>
                  <div className="eyebrow">Cookie Jar</div>
                  <h2 className="section-title mt-3">Interactive proof of range.</h2>
                </div>
                <a className="secondary-chip" href={cookieJarLink} target="_blank" rel="noreferrer">Open full Cookie Jar</a>
              </div>
              <div className="cookiejar-embed-shell cookiejar-iframe-shell">
                <iframe
                  src={cookieJarLink}
                  title="Vivian Yang Cookie Jar"
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                />
              </div>
            </article>

            <aside className="proof-column grid gap-6">
              <div className="glass-panel rounded-[2rem] p-6">
                <div className="eyebrow mb-4">Proof</div>
                <div className="quick-stack space-y-3">
                  {proofBullets.map((item) => (
                    <div key={item} className="quick-item">{item}</div>
                  ))}
                </div>
                <div className="mini-links mt-6">
                  <div><strong>School:</strong> UC Berkeley</div>
                  <div><strong>Major:</strong> Mechanical Engineering</div>
                  <div><strong>Instagram:</strong> @vivian.yan6</div>
                  <div className="soft-muted"><strong>TikTok:</strong> @vivibearreviews</div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {proofStats.map((stat) => (
            <article key={stat.label} className="glass-panel stat-card rounded-[1.6rem] p-6">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-big">{stat.value}</div>
              <div className="stat-note">{stat.note}</div>
            </article>
          ))}
        </section>

        <section id="featured" className="mt-6 glass-panel rounded-[2rem] p-7 md:p-9">
          <div className="section-top">
            <div>
              <div className="eyebrow mb-3">Project gallery</div>
              <h2 className="section-title">A more visual snapshot of what I build</h2>
            </div>
          </div>
          <div className="project-gallery mt-6 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.title} className="project-visual-card">
                <img src={project.image} alt={project.alt} className="project-visual-image" />
                <div className="project-visual-content">
                  <div className="feature-meta">{project.meta}</div>
                  <h3 className="card-title mt-3">{project.title}</h3>
                  <p className="card-copy mt-3">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="glass-panel rounded-[2rem] p-7 md:p-8 hobbies-card">
            <div className="eyebrow mb-3">About me</div>
            <h2 className="section-title">Gaming, development, and building cute things that still go hard.</h2>
            <p className="section-copy mt-4">
              I like systems that feel alive. A lot of my work sits at the overlap of engineering, playful interfaces, visual identity, and late-night builder energy.
            </p>
            <div className="hobby-pill-grid mt-6">
              {hobbies.map((hobby) => (
                <span key={hobby} className="hobby-pill">{hobby}</span>
              ))}
            </div>
          </article>

          <article className="glass-panel rounded-[2rem] p-5 md:p-6 reels-section muted-section">
            <div className="section-top">
              <div>
                <div className="eyebrow mb-3">Content</div>
                <h2 className="section-title">Visual instinct and creator energy</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {reels.map((reel) => (
                <article key={reel.href} className="reel-embed-card">
                  <div className="reel-frame">
                    <iframe
                      src={reel.embed}
                      title={reel.title}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <a className="soft-link mt-4 inline-block" href={reel.href} target="_blank" rel="noreferrer">Open on Instagram</a>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 footer-grid grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-panel rounded-[2rem] p-7 md:p-8">
            <div className="eyebrow mb-3">Best fit</div>
            <h2 className="section-title">YC, startups, and teams that move fast.</h2>
            <p className="section-copy mt-4">
              I do best where technical execution, product taste, and initiative all matter at the same time.
            </p>
          </article>

          <article className="glass-panel rounded-[2rem] p-7 md:p-8">
            <div className="eyebrow mb-3">Links</div>
            <div className="space-y-3 text-sm">
              <a className="soft-link block" href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="soft-link block" href="mailto:vivian_yang@berkeley.edu">Email</a>
              <a className="soft-link block" href="https://www.instagram.com/vivian.yan6/" target="_blank" rel="noreferrer">Instagram, @vivian.yan6</a>
              <span className="soft-muted block subtle-link">TikTok, @vivibearreviews</span>
            </div>
            <div className="footer-verse">Let all that you do be done in love. 1 Corinthians 16:14</div>
          </article>
        </section>
      </section>

      <div className={`foozi-chat-widget ${isChatOpen ? "open" : "collapsed"}`} aria-live="polite">
        {!isChatOpen && (
          <button
            id="foozi-chat-toggle"
            className="foozi-chat-toggle"
            aria-expanded={isChatOpen}
            aria-controls="foozi-chat-panel"
            onClick={() => setIsChatOpen(true)}
          >
            <span className="foozi-chat-toggle-emoji">🧸</span>
            <span>Hi, I’m Foozi</span>
          </button>
        )}
        {isChatOpen && (
          <div id="foozi-chat-panel" className="foozi-chat-panel">
            <div className="foozi-chat-head">
              <div>
                <div className="foozi-chat-title">Foozi</div>
                <div className="foozi-chat-sub">tiny concierge, real filter</div>
              </div>
              <button className="foozi-chat-close" aria-label="Close Foozi chat" onClick={() => setIsChatOpen(false)}>×</button>
            </div>
            <div className="chatbot-log">
              {chatMessages.map((message, index) => (
                <div key={`${message.sender}-${index}`} className={`chat-bubble ${message.sender === "bot" ? "bot" : "human"}`}>
                  {message.text}
                </div>
              ))}
            </div>

            {!activeRole && (
              <div className="chatbot-actions mt-4 flex flex-wrap gap-2">
                <button className="chatbot-chip" onClick={() => startFlow("vc")}>VC</button>
                <button className="chatbot-chip" onClick={() => startFlow("recruiter")}>Recruiter</button>
                <button className="chatbot-chip" onClick={() => startFlow("intrigued")}>Just intrigued</button>
              </div>
            )}

            {activeRole && !leadSaved && (
              <div className="chatbot-flow-controls mt-4 space-y-3">
                {currentStep >= (activeFlow?.messages.length || 1) - 1 && (
                  <textarea
                    className="chatbot-input"
                    placeholder={activeRole === "vc" ? "Name, firm, and best contact" : "Name and best contact"}
                    value={leadInput}
                    onChange={(event) => setLeadInput(event.target.value)}
                  />
                )}
                <div className="chatbot-button-row">
                  {currentStep < (activeFlow?.messages.length || 1) - 1 ? (
                    <button className="primary-chip" onClick={advanceFlow}>Next</button>
                  ) : (
                    <button className="primary-chip" onClick={advanceFlow} disabled={!leadInput.trim() || isSendingLead}>
                      {isSendingLead ? "Routing..." : "Submit"}
                    </button>
                  )}
                  <button className="secondary-chip" onClick={() => startFlow(activeRole)}>Restart</button>
                </div>
              </div>
            )}

            {leadSaved && (
              <div className="chatbot-booking mt-4">
                <a className="primary-chip" href={calendlyLink} target="_blank" rel="noreferrer" onClick={() => setIsBookedState(true)}>
                  Book with Vivian
                </a>
                {isBookedState && <div className="chatbot-footer-note">Perfect. If you booked, Vivian will see it there too.</div>}
              </div>
            )}

            <div className="chatbot-footer-note">Foozi qualifies intent, gives a tight founder pitch, then routes the right people forward.</div>
          </div>
        )}
      </div>
    </main>
  );
}
