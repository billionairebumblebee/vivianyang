"use client";

import { useEffect, useMemo, useState } from "react";
import "./portfolio.css";

const fooziImage = "/IMG_4043.JPG";
const byogloImage = "/IMG_2146.jpg";
const oskiImage = "/IMG_8690.jpg";

const heroFacts = [
  "⚙️ UC Berkeley Mechanical Engineering",
  "🧸 Founder, engineer, builder",
  "📈 Product, GTM, and creator instinct",
];

const proofStats = [
  {
    label: "Build speed",
    value: "14 days",
    note: "idea to working Foozi system",
  },
  {
    label: "Angle",
    value: "Founder + engineer",
    note: "technical execution with product instinct",
  },
  {
    label: "Signal",
    value: "Shipped proof",
    note: "AI systems, prototypes, and market-facing work",
  },
];

const featuredProjects = [
  {
    title: "Foozi / OpenClaw",
    meta: "AI systems • product • execution",
    description: "Built a multi-agent personal operating system with workflow routing, memory, and a polished portfolio surface.",
    image: fooziImage,
    alt: "Foozi project work",
  },
  {
    title: "Oski Sorting Trash Can",
    meta: "mechanical • CAD • Arduino",
    description: "Physical engineering build combining prototyping, systems thinking, and practical interaction design.",
    image: oskiImage,
    alt: "Oski can project work",
  },
  {
    title: "ByoGlo",
    meta: "product • packaging • pricing",
    description: "Prototype and market-facing concept work with strong taste around packaging, positioning, and customer experience.",
    image: byogloImage,
    alt: "ByoGlo project work",
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
  "AI systems and multi-agent product building",
  "Mechanical engineering + physical prototyping",
  "Product instinct, GTM taste, and founder velocity",
  "Fast execution across software, hardware, and interfaces",
];

const calendlyLink = "https://calendly.com/vivian-yang";
const cookieJarLink = "https://cookiejar-five.vercel.app/";

const chatFlows = {
  vc: {
    label: "VC",
    messages: [
      "Hi, I’m Foozi. Are you actively investing right now, or mostly tracking strong founders early?",
      "Vivian is a Berkeley mechanical engineering founder who built Foozi, a multi-agent operating system, and ships unusual proof fast.",
      "Her edge is the combo: engineering depth, product instinct, and real distribution energy in one person.",
      "If you want the quick read, I can give you founder context and hand you her booking link and contact card.",
      "Drop your name, firm, and best contact and I’ll pass it along cleanly.",
    ],
    founderIntro: "Here’s the founder context...",
    founderMessage: "Hi, I’m Vivian. I’m building AI-native systems that feel less like software tools and more like leverage. I care a lot about speed, product taste, and making technical systems actually useful to real people.",
    closingMessage: "Thanks for stopping by. I’ll pass this along to Vivian. In the meantime, here’s her booking link and virtual business card.",
    leadPrompt: "Name, firm, and best contact",
    leadInterest: "VC inbound from portfolio chat",
    ctaLabel: "Get Vivian’s booking link",
  },
  recruiter: {
    label: "Recruiter",
    messages: [
      "Hi, I’m Foozi. Are you hiring for product-minded engineers, founder associates, or technical operators?",
      "Vivian is a Berkeley mechanical engineering student who builds like a founder, not just a candidate.",
      "She ships across AI systems, product surfaces, prototyping, and fast execution with strong taste.",
      "She is especially strong in roles where initiative, technical depth, and communication all matter at once.",
      "Send your name, team, and best contact and I’ll route you the clean next step.",
    ],
    founderIntro: "Here’s the founder context...",
    founderMessage: "Hi, I’m Vivian. The roles I’m best in are the ones where I can think technically, move quickly, and help shape the product instead of just taking tickets.",
    closingMessage: "Thanks, I’ve got it. I’ll pass this along to Vivian. Here’s her booking link and contact card so you can keep the conversation moving.",
    leadPrompt: "Name, team, and best contact",
    leadInterest: "Recruiter inbound from portfolio chat",
    ctaLabel: "Get Vivian’s contact card",
  },
  intrigued: {
    label: "Just intrigued",
    messages: [
      "Hi, I’m Foozi. Are you here because of the portfolio, the projects, or the vibe?",
      "Vivian is a Berkeley engineer and founder building AI-native systems, product experiments, and memorable technical artifacts.",
      "The pattern is speed plus taste, not just isolated school projects.",
      "If you want the fast version, I can give you the founder summary and point you to the right next step.",
      "Drop your name and best contact and I’ll route you cleanly.",
    ],
    founderIntro: "Here’s the founder context...",
    founderMessage: "Hi, I’m Vivian. I like building things that feel sharp, alive, and actually useful, whether that’s AI systems, prototypes, or product surfaces people remember.",
    closingMessage: "Thanks for stopping by. I’ll pass this along to Vivian. Here’s her booking link and virtual business card if you want to keep talking.",
    leadPrompt: "Name and best contact",
    leadInterest: "General inbound from portfolio chat",
    ctaLabel: "Get Vivian’s info",
  },
} as const;

type ChatRole = keyof typeof chatFlows;
type ChatMessage = { sender: "bot" | "human" | "founder"; text: string };

export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<ChatRole | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [leadInput, setLeadInput] = useState("");
  const [isBookedState, setIsBookedState] = useState(false);
  const [isSendingLead, setIsSendingLead] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [founderConnected, setFounderConnected] = useState(false);

  const activeFlow = activeRole ? chatFlows[activeRole] : null;

  const chatMessages = useMemo<ChatMessage[]>(() => {
    if (!activeFlow) {
      return [{ sender: "bot", text: "Hi, I’m Foozi. Are you a VC, recruiter, or visitor?" }];
    }

    const messages: ChatMessage[] = activeFlow.messages.slice(0, currentStep + 1).map((text): ChatMessage => ({
      sender: "bot",
      text,
    }));

    if (currentStep >= activeFlow.messages.length - 1 && leadInput.trim()) {
      messages.push({ sender: "human", text: leadInput.trim() });
    }

    if (founderConnected) {
      messages.push({ sender: "bot", text: activeFlow.founderIntro });
      messages.push({ sender: "founder", text: activeFlow.founderMessage });
    }

    if (leadSaved) {
      messages.push({ sender: "bot", text: activeFlow.closingMessage });
    }

    return messages;
  }, [activeFlow, currentStep, founderConnected, leadInput, leadSaved]);

  useEffect(() => {
    const log = document.querySelector('.chatbot-log');
    if (log) {
      log.scrollTop = log.scrollHeight;
    }
  }, [chatMessages, isChatOpen]);

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
    setFounderConnected(false);
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
            interest: activeFlow.leadInterest,
          }),
        });
      }
      setFounderConnected(true);
      setLeadSaved(true);
    } finally {
      setIsSendingLead(false);
    }
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("vivian-portfolio-theme");
    const dark = saved === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    setIsDark(dark);
  }, []);

  return (
    <main className="portfolio-shell min-h-screen">
      <div className="portfolio-bg" />
      <section className="portfolio-container mx-auto max-w-[1280px] px-5 py-6 md:px-8 md:py-8">
        <header className="portfolio-nav glass-panel mb-4 flex items-center justify-between gap-3 rounded-[1.2rem] px-4 py-3">
          <div className="portfolio-nav-brand">
            <div className="portfolio-name">Vivian Yang</div>
            <div className="portfolio-nav-sub">Berkeley engineer · founder · builder</div>
            <a className="portfolio-email-inline" href="mailto:vivian_yang@berkeley.edu">vivian_yang@berkeley.edu</a>
          </div>
          <div className="portfolio-nav-links">
            <a className="secondary-chip" href="#featured">Projects</a>
            <a className="primary-chip" href={calendlyLink} target="_blank" rel="noreferrer">Calendly</a>
            <a className="secondary-chip" href="https://github.com/billionairebumblebee" target="_blank" rel="noreferrer">GitHub</a>
            <a className="secondary-chip" href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">LinkedIn</a>
            <button id="theme-toggle" className="theme-toggle" aria-label="Toggle dark mode" onClick={() => setTheme(!isDark)}>
              <span className="theme-toggle__sun">☀️</span>
              <span className="theme-toggle__moon">🌙</span>
            </button>
          </div>
        </header>

        <section className="hero-layout hero-grid mt-4">
          <div className="glass-panel hero-panel rounded-[1.4rem] p-5 md:p-6">
            <div className="hero-badge">✿ portfolio</div>
            <h1 className="hero-title mt-3">UC Berkeley engineer and founder, shipping technical systems with taste.</h1>
            <p className="hero-copy mt-3 max-w-xl">
              I build AI-native tools, hardware prototypes, product systems, and market-facing experiences that feel sharp, intentional, and shipped.
            </p>

            <div className="hero-facts mt-4 flex flex-wrap gap-2">
              {heroFacts.map((fact) => (
                <span key={fact} className="fact-pill">{fact}</span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a className="primary-chip" href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="secondary-chip" href="mailto:vivian_yang@berkeley.edu">Contact</a>
              <a className="secondary-chip" href="#featured">Project gallery</a>
            </div>
          </div>

          <div className="hero-side-stack">
            <aside className="glass-panel skills-panel rounded-[1.4rem] p-5 md:p-6">
              <div className="eyebrow mb-3">Top skills</div>
              <div className="quick-stack space-y-3">
                {proofBullets.map((item) => (
                  <div key={item} className="quick-item">{item}</div>
                ))}
              </div>
              <div className="mini-links mt-5">
                <div><strong>School:</strong> UC Berkeley</div>
                <div><strong>Major:</strong> Mechanical Engineering</div>
                <div><strong>Instagram:</strong> @vivian.yan6</div>
                <div className="soft-muted"><strong>TikTok:</strong> @vivibearreviews</div>
              </div>
            </aside>

            <article className="glass-panel cookiejar-hero-card rounded-[1.4rem] p-3 md:p-4">
              <div className="cookiejar-hero-top">
                <div>
                  <div className="eyebrow">Cookie Jar</div>
                  <h2 className="section-title mt-2">Interactive proof of range.</h2>
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
          </div>
        </section>

        <section className="stats-strip stats-grid mt-5">
          {proofStats.map((stat) => (
            <article key={stat.label} className="glass-panel stat-card rounded-[1.6rem] p-6">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-big">{stat.value}</div>
              <div className="stat-note">{stat.note}</div>
            </article>
          ))}
        </section>

        <section id="featured" className="mt-5 glass-panel rounded-[2rem] p-6 md:p-7">
          <div className="section-top">
            <div>
              <div className="eyebrow mb-3">Project gallery</div>
              <h2 className="section-title">A more visual snapshot of what I build</h2>
            </div>
          </div>
          <div className="project-gallery project-grid mt-5">
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

        <section className="story-grid story-layout mt-5">
          <article className="glass-panel rounded-[1.4rem] p-5 md:p-6 hobbies-card">
            <div className="eyebrow mb-3">About me</div>
            <h2 className="section-title">Gaming, development, and building cute things that still go hard.</h2>
            <p className="section-copy mt-3">
              I like systems that feel alive. A lot of my work sits at the overlap of engineering, playful interfaces, visual identity, and late-night builder energy.
            </p>
            <div className="hobby-pill-grid mt-5">
              {hobbies.map((hobby) => (
                <span key={hobby} className="hobby-pill">{hobby}</span>
              ))}
            </div>
          </article>

          <article className="glass-panel rounded-[1.4rem] p-4 md:p-5 reels-section muted-section">
            <div className="section-top">
              <div>
                <div className="eyebrow mb-3">Content</div>
                <h2 className="section-title">Visual instinct and creator energy</h2>
              </div>
            </div>
            <div className="reels-grid reels-layout mt-4">
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

        <section className="mt-5 footer-grid footer-layout">
          <article className="glass-panel rounded-[2rem] p-7 md:p-8">
            <div className="eyebrow mb-3">Best fit</div>
            <h2 className="section-title">YC, startups, and teams that move fast.</h2>
            <p className="section-copy mt-4">
              I do best where technical execution, product taste, and initiative all matter at the same time.
            </p>
          </article>

          <article className="glass-panel rounded-[2rem] p-7 md:p-8">
            <div className="eyebrow mb-3">Links</div>
            <div className="footer-button-stack">
              <a className="primary-chip" href={calendlyLink} target="_blank" rel="noreferrer">Calendly</a>
              <a className="secondary-chip" href="https://github.com/billionairebumblebee" target="_blank" rel="noreferrer">GitHub</a>
              <a className="secondary-chip" href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="secondary-chip" href="mailto:vivian_yang@berkeley.edu">Email</a>
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
            <span>Hi, I’m Foozi❕</span>
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
                <div key={`${message.sender}-${index}`} className={`chat-bubble ${message.sender}`}>
                  {message.text}
                </div>
              ))}
            </div>

            {!activeRole && (
              <div className="chatbot-actions mt-4 flex flex-wrap gap-2">
                <button className="chatbot-chip" onClick={() => startFlow("vc")}>VC</button>
                <button className="chatbot-chip" onClick={() => startFlow("recruiter")}>Recruiter</button>
                <button className="chatbot-chip" onClick={() => startFlow("intrigued")}>Visitor</button>
              </div>
            )}

            {activeRole && !leadSaved && (
              <div className="chatbot-flow-controls mt-4 space-y-3">
                {currentStep >= (activeFlow?.messages.length || 1) - 1 && (
                  <textarea
                    className="chatbot-input"
                    placeholder={activeFlow?.leadPrompt}
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
                  Book Meeting
                </a>
                <a className="secondary-chip" href="mailto:vivian_yang@berkeley.edu?subject=Portfolio%20inbound" target="_blank" rel="noreferrer">
                  vivian_yang@berkeley.edu
                </a>
                {isBookedState && <div className="chatbot-footer-note">Perfect. If you booked, Vivian will see it there too.</div>}
              </div>
            )}

            <div className="chatbot-footer-note">Foozi routes serious people to Vivian’s real contact options.</div>
          </div>
        )}
      </div>
    </main>
  );
}

