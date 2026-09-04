"use client";

import { useEffect, useState } from "react";
import "./portfolio.css";

const email = "vivian_yang@berkeley.edu";
const calendly = "https://calendly.com/vivian_yang-berkeley/";
const cookieJar = "https://cookiejar-five.vercel.app/";

const reels = [
  {
    title: "Vivian Builds featured reel one",
    href: "https://www.instagram.com/reel/DEg3KbuxS1o/",
    embed: "https://www.instagram.com/reel/DEg3KbuxS1o/embed",
  },
  {
    title: "Vivian Builds featured reel two",
    href: "https://www.instagram.com/reel/C_mJKXpSOV4/",
    embed: "https://www.instagram.com/reel/C_mJKXpSOV4/embed",
  },
];

const proof = [
  { value: "131", label: "Cloak installs" },
  { value: "5 months", label: "to ship Cloak end to end" },
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
    copy: "An independent product experiment built through rapid prototyping, testing, and iteration.",
  },
  {
    index: "03",
    title: "Oski Sorting Trash Can",
    meta: "CAD · Arduino · 3D printing · IoT",
    copy: "Designed and built an automated sorting trash can using CAD, Arduino, 3D printing, and IoT systems.",
    image: "/IMG_8690.jpg",
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
          <a href="#cookie-jar">Cookie Jar</a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}><span aria-hidden="true">{isDark ? "☀" : "☾"}</span>{isDark ? "Light mode" : "Dark mode"}</button>
          <a className="nav-connect" href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">Connect</a>
          <a className="nav-cta" href={calendly} target="_blank" rel="noreferrer">Book a call</a>
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
            <a className="button secondary" href={calendly} target="_blank" rel="noreferrer">Book a call</a>
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

      <section className="codex-proof glass" aria-labelledby="codex-proof-title">
        <div className="codex-proof-copy"><p className="eyebrow">AI-native execution</p><h2 id="codex-proof-title">13.2B lifetime Codex tokens.</h2><p>The operating system behind my speed: I define the product, direct implementation, debug failures, test edge cases, and own the final result.</p><div className="codex-proof-notes"><span>789.8M peak tokens</span><span>66-day streak</span><span>1h 56m longest chat</span></div></div>
        <figure className="codex-proof-image"><img src="/codex-stats-sep-2026.png" alt="Codex usage dashboard showing 13.2 billion lifetime tokens, 789.8 million peak tokens, a 1 hour 56 minute longest chat, and a 66 day streak" /><figcaption>Codex usage · September 2026</figcaption></figure>
      </section>

      <section id="cookie-jar" className="cookie-section cookie-section-featured glass">
        <div className="cookie-copy"><p className="eyebrow">Interactive portfolio</p><h2>The Cookie Jar.</h2><p>Explore the work through a tactile, musical interface. Drag each cookie, flip it for the story, and hear the notes move through the circle of fifths.</p><a className="button secondary" href={cookieJar} target="_blank" rel="noreferrer">Open full Cookie Jar ↗</a></div>
        <div className="cookie-frame"><iframe src={cookieJar} title="Vivian Yang Cookie Jar" loading="eager" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" /></div>
      </section>

      <section id="cloak" className="cloak-section section-space">
        <div className="section-intro">
          <p className="eyebrow">01 · Product thesis</p>
          <h2>Make invisible tracking visible—and controllable.</h2>
          <p>Cloak begins in the browser, where users can see what changed, understand their tracking state, and take meaningful control.</p>
        </div>
        <article className="cloak-detail glass">
          <div className="cloak-detail-head"><div><p className="mini-label">Cloak · Founder & CEO</p><h3>I built and operate Cloak end to end.</h3></div><a href="https://cloak.build/" target="_blank" rel="noreferrer">Live product ↗</a></div>
          <ul>
            <li>Built and shipped Chrome and Safari privacy products, the public website, subscription checkout, activation system, and support loop in five months while enrolled at UC Berkeley.</li>
            <li>Define product specifications and direct AI coding agents through implementation, debugging, testing, and QA; own all product and technical decisions.</li>
            <li>Built protections for selected tracker requests, recognizable URL identifiers, readable tracking state, and fingerprinting surfaces, with local session receipts showing users what changed.</li>
            <li>Expanding Cloak from browser privacy products into a consumer privacy carrier spanning identity compartments and privacy-first mobile infrastructure.</li>
          </ul>
        </article>
      </section>

      <section id="builds" className="builds-section section-space">
        <div className="section-heading"><div><p className="eyebrow">02 · Selected work</p><h2>Selected projects.</h2></div><p>Three projects that demonstrate speed, range, and ownership across software and hardware.</p></div>
        <div className="build-grid">
          {builds.map((build) => <article className={`build-card glass ${build.featured ? "featured" : ""}`} key={build.title}>
            {build.image && <img className="build-image-contain" src={build.image} alt="Oski Sorting Trash Can team with prototype" />}
            <div className="build-body"><span className="build-index">{build.index}</span><p className="mini-label">{build.meta}</p><h3>{build.title}</h3><p>{build.copy}</p></div>
          </article>)}
        </div>
      </section>

      <section className="distribution section-space">
        <article className="creator-card glass">
          <div><p className="eyebrow">03 · Distribution</p><h2>2M+ organic views.</h2><p>I grew @vivianbuilds without paid distribution—evidence that I can shape a message, earn attention, and learn from real audiences.</p></div>
          <div className="creator-links"><a href="https://www.instagram.com/vivianbuilds/" target="_blank" rel="noreferrer">Instagram · @vivianbuilds ↗</a><a href="https://www.tiktok.com/@vivianbuilds" target="_blank" rel="noreferrer">TikTok · @vivianbuilds ↗</a><span>Consumer storytelling</span><span>Organic distribution</span></div>
        </article>
        <div className="reels-grid" aria-label="Featured Instagram videos">
          {reels.map((reel) => <article className="reel-card glass" key={reel.href}><div className="reel-frame"><iframe src={reel.embed} title={reel.title} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen /></div><a href={reel.href} target="_blank" rel="noreferrer">Watch on Instagram ↗</a></article>)}
        </div>
      </section>

      <section id="story" className="story-section section-space">
        <article className="story-card glass"><p className="eyebrow">04 · How I operate</p><h2>Ask directly. Find a way. Keep moving.</h2><p>The Berkeley polo story captures how I work: I go to the source, make the ask, and turn uncertainty into forward motion.</p><span className="story-hook">Ask me how I got the polo ↗</span></article>
        <article className="student-card glass"><p className="eyebrow">Berkeley, beyond class</p><h3>Engineering, consulting, and founder programs.</h3><div className="activity-list"><div><strong>UC Berkeley</strong><span>Mechanical Engineering</span></div><div><strong>Piedmont Consulting Group</strong><span>Consultant · product, GTM, onboarding, and UX</span></div><div><strong>Founder Summit · SkyDeck ACE</strong><span>Selected founder programs</span></div></div><p className="student-note">Earlier recognition: Berkeley Lab technical programs · DECA placement</p></article>
      </section>

      <footer className="footer glass"><div className="footer-copy"><p className="eyebrow">Build something consequential</p><h2>Talk with Vivian.</h2><blockquote>“Let all that you do be done in love.” <cite>1 Corinthians 16:14</cite></blockquote></div><div className="footer-cta-group"><a className="button primary" href={calendly} target="_blank" rel="noreferrer">Book a call</a><a className="button secondary" href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a><div className="footer-actions"><a href={`mailto:${email}`}>{email}</a><a href="https://github.com/billionairebumblebee" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.instagram.com/vivianbuilds/" target="_blank" rel="noreferrer">Instagram ↗</a></div></div></footer>
    </main>
  );
}
