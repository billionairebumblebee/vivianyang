"use client";

import { useEffect, useState } from "react";
import "./portfolio.css";

const email = "vivian_yang@berkeley.edu";
const calendly = "https://calendly.com/vivian_yang-berkeley/";
const cookieJar = "https://cookiejar-five.vercel.app/";

const proof = [
  { value: "131", label: "Cloak installs" },
  { value: "5 months", label: "from build to support loop" },
  { value: "2M+", label: "organic creator views" },
  { value: "1st place", label: "Simular sponsor prize" },
];

const builds = [
  {
    index: "01",
    title: "STING",
    meta: "Solo build · AI agent · 24 hours",
    copy: "Built solo in 24 hours and awarded Simular’s first-place sponsor prize at the 2026 Cal AI Hackathon.",
    featured: true,
  },
  {
    index: "02",
    title: "DopaMINE",
    meta: "Independent product build",
    copy: "A selected product experiment shaped through rapid prototyping and direct iteration.",
  },
  {
    index: "03",
    title: "Oski Sorting Trash Can",
    meta: "CAD · Arduino · 3D printing · IoT",
    copy: "A physical sorting system that joined mechanical design, electronics, and an approachable interaction layer.",
    image: "/IMG_8690.jpg",
  },
  {
    index: "04",
    title: "Combat Robot",
    meta: "Mechanical design · fabrication",
    copy: "A hands-on mechanical build developed through design, fabrication, testing, and iteration.",
  },
];

export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = window.localStorage.getItem("vivian-portfolio-theme") === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("vivian-portfolio-theme", next ? "dark" : "light");
  };

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="site-nav glass" aria-label="Primary navigation">
        <a className="brand" href="#top">Vivian Yang</a>
        <div className="nav-links">
          <a href="#cloak">Cloak</a>
          <a href="#builds">Builds</a>
          <a href="#story">Story</a>
          <button onClick={toggleTheme} aria-label={isDark ? "Use light theme" : "Use dark theme"}>{isDark ? "Light" : "Dark"}</button>
          <a className="nav-cta" href={`mailto:${email}`}>Contact ↗</a>
        </div>
      </nav>

      <section id="top" className="hero glass">
        <div className="hero-main">
          <p className="eyebrow">Solo founder · Consumer identity defense</p>
          <h1>Building the consumer <em>privacy carrier.</em></h1>
          <p className="hero-lede">
            I’m Vivian Yang, founder and CEO of Cloak. We’re beginning with Chrome and Safari privacy products and building toward identity compartments and privacy-first mobile infrastructure.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="https://cloak.build/" target="_blank" rel="noreferrer">Explore Cloak ↗</a>
            <a className="button secondary" href={calendly} target="_blank" rel="noreferrer">Meet Vivian</a>
          </div>
          <p className="founder-status"><span /> Building while enrolled at UC Berkeley · prepared to take leave for the company</p>
        </div>
        <aside className="hero-mark" aria-label="Cloak">
          <img src="/cloak-logo-black-icon-cropped.png" alt="Cloak manta ray mark" />
          <div><strong>Cloak</strong><span>Founder & CEO · Mar 2026–Present</span></div>
        </aside>
      </section>

      <section className="proof-grid" aria-label="Founder proof">
        {proof.map((item) => <article className="proof-card glass" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}
      </section>

      <section id="cloak" className="cloak-section section-space">
        <div className="section-intro">
          <p className="eyebrow">01 · Founder thesis</p>
          <h2>Privacy people can see—and eventually carry everywhere.</h2>
          <p>Cloak started as a browser wedge: make invisible tracking legible, give users useful control, and show what changed.</p>
        </div>
        <article className="cloak-detail glass">
          <div className="cloak-detail-head"><div><p className="mini-label">Cloak · Founder & CEO</p><h3>Shipped, operated, and owned end to end.</h3></div><a href="https://cloak.build/" target="_blank" rel="noreferrer">Live product ↗</a></div>
          <ul>
            <li>Built and shipped Chrome and Safari privacy products, the public website, subscription checkout, activation system, and support loop in five months while enrolled at UC Berkeley.</li>
            <li>Define product specifications and direct AI coding agents through implementation, debugging, testing, and QA; own all product and technical decisions.</li>
            <li>Built protections for selected tracker requests, recognizable URL identifiers, readable tracking state, and fingerprinting surfaces, with local session receipts showing users what changed.</li>
            <li>Developing Cloak from a browser wedge into a consumer privacy carrier spanning identity compartments and privacy-first mobile infrastructure.</li>
          </ul>
        </article>
      </section>

      <section id="builds" className="builds-section section-space">
        <div className="section-heading"><div><p className="eyebrow">02 · Selected builds</p><h2>A small set of things worth remembering.</h2></div><p>Software, hardware, and product experiments—selected for ownership and evidence, not chronology.</p></div>
        <div className="build-grid">
          {builds.map((build) => <article className={`build-card glass ${build.featured ? "featured" : ""}`} key={build.title}>
            {build.image && <img src={build.image} alt="Oski Sorting Trash Can team with prototype" />}
            <div className="build-body"><span className="build-index">{build.index}</span><p className="mini-label">{build.meta}</p><h3>{build.title}</h3><p>{build.copy}</p></div>
          </article>)}
        </div>
      </section>

      <section className="distribution section-space">
        <article className="creator-card glass">
          <div><p className="eyebrow">03 · Distribution proof</p><h2>2M+ organic views.</h2><p>I grew a consumer content channel organically—proof that I can find a message, earn attention, and learn from real audiences.</p></div>
          <div className="creator-links"><a href="https://www.instagram.com/vivian.yan6/" target="_blank" rel="noreferrer">Instagram ↗</a><span>Consumer storytelling</span><span>Organic distribution</span></div>
        </article>
        <article className="pcg-card glass"><p className="eyebrow">Operating range</p><h3>Piedmont Consulting Group</h3><p className="role">Consultant</p><p>Advised startup projects across product, GTM, onboarding, UX, and operations.</p></article>
      </section>

      <section id="story" className="story-section section-space">
        <article className="story-card glass"><p className="eyebrow">04 · Founder story</p><h2>Direct enough to ask. Resourceful enough to find a way.</h2><p>The Berkeley polo story is a small but accurate preview of how I operate: I go to the source, make the ask, and keep moving.</p><span className="story-hook">Ask me how I got the polo ↗</span></article>
        <article className="operating-card glass"><p className="eyebrow">Operating system</p><h3>AI-native, not AI-delegated.</h3><p>I use coding agents to move unusually fast, but specifications, product judgment, debugging, testing, and final decisions stay mine.</p><details><summary>One small easter egg</summary><p>12B lifetime Codex tokens. Useful as a measure of reps—not a substitute for shipped products.</p></details></article>
      </section>

      <section className="cookie-section glass">
        <div className="cookie-copy"><p className="eyebrow">A playful index</p><h2>The Cookie Jar</h2><p>Drag a cookie. Click to flip it. The notes move through a circle-of-fifths progression as you explore.</p><a className="button secondary" href={cookieJar} target="_blank" rel="noreferrer">Open full jar ↗</a></div>
        <div className="cookie-frame"><iframe src={cookieJar} title="Vivian Yang Cookie Jar" loading="lazy" allow="autoplay" /></div>
      </section>

      <section className="credentials section-space">
        <div><p className="eyebrow">Education</p><h3>UC Berkeley</h3><p>Mechanical Engineering</p></div>
        <div><p className="eyebrow">Programs</p><h3>Founder Summit · SkyDeck ACE</h3><p>Selected founder programs</p></div>
        <div><p className="eyebrow">Earlier awards</p><h3>Berkeley Lab selectivity · DECA placement</h3><p>Selective technical programs and competitive placement</p></div>
      </section>

      <footer className="footer glass"><div><p className="eyebrow">Build something consequential</p><h2>Talk with Vivian.</h2></div><div className="footer-actions"><a href={`mailto:${email}`}>{email}</a><a href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/billionairebumblebee" target="_blank" rel="noreferrer">GitHub ↗</a></div></footer>
    </main>
  );
}
