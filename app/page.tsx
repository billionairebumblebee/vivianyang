"use client";

import { useEffect, useState } from "react";
import "./portfolio.css";

const email = "vivian_yang@berkeley.edu";
const calendly = "https://calendly.com/vivian_yang-berkeley/";
const cookieJar = "https://cookiejar-five.vercel.app/";
const resume = `mailto:${email}?subject=Request%20for%20Vivian%20Yang%27s%20resume`;

const reels = [
  {
    title: "Featured reel by @vivian.yan6 — one",
    href: "https://www.instagram.com/reel/DEg3KbuxS1o/",
    embed: "https://www.instagram.com/reel/DEg3KbuxS1o/embed",
  },
  {
    title: "Featured reel by @vivian.yan6 — two",
    href: "https://www.instagram.com/reel/C_mJKXpSOV4/",
    embed: "https://www.instagram.com/reel/C_mJKXpSOV4/embed",
  },
];

const proof = [
  { value: "131", label: "Cloak installs" },
  { value: "24 hours", label: "STING · solo hackathon build" },
  { value: "2M+", label: "organic creator views" },
  { value: "1st place", label: "Simular sponsor prize" },
];

const builds = [
  {
    index: "01",
    title: "STING",
    meta: "Hackathon prototype · Solo build · 24 hours",
    copy: "A scam-intelligence product for suspicious calls, links, and messages. Built solo in 24 hours and awarded Simular’s first-place sponsor prize at the 2026 Cal AI Hackathon.",
    href: "https://cloak-sting-hackathon-2026.vercel.app/",
    linkLabel: "Try STING",
    featured: true,
  },
  {
    index: "02",
    title: "Skein",
    meta: "AI video editing · Prototype",
    copy: "Explores turning one authentic take into multiple clips, with creator approval and control of source material and likeness built into the workflow.",
    href: "https://skein-peach.vercel.app/",
    linkLabel: "Explore Skein",
  },
  {
    index: "03",
    title: "Field Office",
    meta: "AI operations · MVP experiment",
    copy: "An MVP exploring approval-based workflows for service businesses, from lead intake and scheduling to jobs, invoicing, and dispatch.",
    href: "https://field-office-eta.vercel.app/",
    linkLabel: "Open Field Office",
  },
  {
    index: "04",
    title: "Interaction",
    meta: "Community product · Experiment",
    copy: "A social product experiment around small-group plans in the Bay Area, exploring how availability, budget, location, and shared interests can help people meet.",
    href: "https://interaction-omega.vercel.app/",
    linkLabel: "Visit Interaction",
  },
  {
    index: "05",
    title: "Cookie Jar",
    meta: "Interactive portfolio · Musical UI",
    copy: "A draggable, flippable portfolio that turns project stories into a tactile interface, with every interaction mapped through the circle of fifths.",
    href: "https://cookiejar-five.vercel.app/",
    linkLabel: "Open Cookie Jar",
  },
  {
    index: "06",
    title: "ByoGlo",
    meta: "Biodegradable skincare · High-school venture",
    copy: "Co-created a biodegradable pimple-patch business in high school and independently coded its entire customer-facing website.",
    href: "https://byoglo.neocities.org/",
    linkLabel: "Visit ByoGlo",
  },
  {
    index: "07",
    title: "DopaMINE",
    meta: "Independent product build",
    copy: "An independent product experiment built through rapid prototyping, testing, and iteration.",
  },
  {
    index: "08",
    title: "Oski Sorting Trash Can",
    meta: "Team hardware prototype · CAD · Arduino",
    copy: "Worked with a Berkeley PREP team to design and build a sorting-trash-can prototype using CAD, Arduino, and 3D printing.",
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
          <a href="#experience">Experience</a>
          <a href="#builds">Projects</a>
          <a href="#cookie-jar">Cookie Jar</a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}><span aria-hidden="true">{isDark ? "☀" : "☾"}</span>{isDark ? "Light mode" : "Dark mode"}</button>
          <a className="nav-connect" href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a className="nav-cta" href={calendly} target="_blank" rel="noreferrer">Book a call</a>
        </div>
      </nav>

      <section id="top" className="hero glass">
        <div className="hero-main">
          <p className="eyebrow">UC Berkeley · Mechanical Engineering</p>
          <h1>From an idea to <em>something you can use.</em></h1>
          <p className="hero-lede">
            I’m Vivian Yang. I build consumer software and physical prototypes, lead AI product consulting, and create content that reaches real audiences. My work connects engineering, product judgment, and hands-on execution.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#builds">Explore my work ↓</a>
            <a className="button secondary" href={resume}>Request résumé ↗</a>
          </div>
          <div className="recruiter-links" aria-label="Recruiter links"><a href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/billionairebumblebee" target="_blank" rel="noreferrer">GitHub ↗</a><a href={`mailto:${email}`}>Email me ↗</a></div>
          <p className="founder-status"><span /> Completing my Berkeley Mechanical Engineering degree while building across disciplines.</p>
        </div>
        <a className="hero-preview" href="https://cloak.build/" target="_blank" rel="noreferrer" aria-label="Open the live Cloak website">
          <img src="/cloak-site-preview.png" alt="Preview of the Cloak privacy extension website" />
          <span><strong>Cloak · Shipped work</strong><em>cloak.build ↗</em></span>
        </a>
      </section>

      <section className="proof-grid" aria-label="Selected results">
        {proof.map((item) => <article className="proof-card glass" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}
      </section>

      <section id="experience" className="experience-grid" aria-label="Consulting and engineering experience">
        <article className="student-card glass"><p className="eyebrow">AI product consulting · Piedmont Consulting Group</p><h3>Orcana AI</h3><p>Co-leading a client engagement and managing a six-person Berkeley consulting team across MVP development, pharma segmentation, onboarding, competitive research, and go-to-market strategy.</p><p className="student-note">Total client project value: $3,000 · Engagement in progress</p></article>
        <article className="student-card glass"><p className="eyebrow">Engineering beyond the screen</p><h3>Code, research, and physical prototypes.</h3><p>My work spans browser software, Berkeley Lab workflow automation and data science projects, and a team-built sorting-trash-can prototype at Berkeley.</p><a className="build-link" href="#builds">See selected projects ↓</a></article>
      </section>

      <section id="cookie-jar" className="cookie-section cookie-section-featured glass">
        <div className="cookie-copy"><p className="eyebrow">Interactive portfolio</p><h2>The Cookie Jar.</h2><p>Explore the work through a tactile, musical interface. Drag each cookie, flip it for the story, and hear the notes move through the circle of fifths.</p><a className="button secondary" href={cookieJar} target="_blank" rel="noreferrer">Open full Cookie Jar ↗</a></div>
        <div className="cookie-frame"><iframe src={cookieJar} title="Vivian Yang Cookie Jar" loading="eager" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" /></div>
      </section>

      <section id="cloak" className="cloak-section section-space">
        <div className="section-intro">
          <p className="eyebrow">01 · Shipped software</p>
          <h2>Make invisible tracking visible—and controllable.</h2>
          <p>Cloak is my browser privacy project: an exercise in taking a consumer product through implementation, distribution, activation, and support. It reached 131 installs.</p>
        </div>
        <article className="cloak-detail glass">
          <div className="cloak-detail-head"><div><p className="mini-label">Cloak · Founder & builder</p><h3>From browser protection to checkout and support.</h3></div><a href="https://cloak.build/" target="_blank" rel="noreferrer">Visit Cloak ↗</a></div>
          <ul>
            <li>Built and shipped Chrome and Safari privacy products, the public website, subscription checkout, activation system, and support loop in five months while enrolled at UC Berkeley.</li>
            <li>Defined product specifications and directed AI coding agents through implementation, debugging, testing, and QA, with responsibility for product and technical decisions.</li>
            <li>Built protections for selected tracker requests, recognizable URL identifiers, readable tracking state, and fingerprinting surfaces, with local session receipts showing users what changed.</li>
            <li>The work gave me hands-on experience with the systems around a product: browser behavior, billing, activation, and user-facing explanations.</li>
          </ul>
        </article>
      </section>

      <section id="builds" className="builds-section section-space">
        <div className="section-heading"><div><p className="eyebrow">02 · Selected work</p><h2>Selected projects.</h2></div><p>Shipped websites, software experiments, and hardware prototypes—work spanning product design, implementation, and testing.</p></div>
        <div className="build-grid">
          {builds.map((build) => <article className={`build-card glass ${build.featured ? "featured" : ""}`} key={build.title}>
            {build.image && <img className="build-image-contain" src={build.image} alt="Oski Sorting Trash Can team with prototype" />}
            <div className="build-body"><span className="build-index">{build.index}</span><p className="mini-label">{build.meta}</p><h3>{build.title}</h3><p className="build-copy">{build.copy}</p>{build.href && <a className="build-link" href={build.href} target="_blank" rel="noreferrer">{build.linkLabel} ↗</a>}</div>
          </article>)}
        </div>
      </section>

      <section className="distribution section-space">
        <article className="creator-card glass">
          <div><p className="eyebrow">03 · Distribution</p><h2>2M+ organic views.</h2><p>My student and lifestyle content on @vivian.yan6 reached more than two million organic views. The reels below are from that account. I now share my building work on @vivianbuilds.</p></div>
          <div className="creator-links"><a href="https://www.instagram.com/vivian.yan6/" target="_blank" rel="noreferrer">Featured reels · @vivian.yan6 ↗</a><a href="https://www.instagram.com/vivianbuilds/" target="_blank" rel="noreferrer">Building now · @vivianbuilds ↗</a><a href="https://www.tiktok.com/@vivianbuilds" target="_blank" rel="noreferrer">TikTok · @vivianbuilds ↗</a></div>
        </article>
        <div className="reels-grid" aria-label="Featured Instagram videos">
          {reels.map((reel) => <article className="reel-card glass" key={reel.href}><div className="reel-frame"><iframe src={reel.embed} title={reel.title} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen /></div><a href={reel.href} target="_blank" rel="noreferrer">Watch on Instagram ↗</a></article>)}
        </div>
      </section>

      <section className="codex-proof glass" aria-labelledby="codex-proof-title">
        <div className="codex-proof-copy"><p className="eyebrow">How I build with AI</p><h2 id="codex-proof-title">13.2B lifetime Codex tokens.</h2><p>I define specifications, direct implementation, debug failures, and test edge cases. This usage snapshot documents the tools behind the work; the projects above show what I built with them.</p><div className="codex-proof-notes"><span>789.8M peak tokens</span><span>66-day streak at capture</span></div></div>
        <figure className="codex-proof-image"><img src="/codex-stats-sep-2026.png" alt="September 3 Codex usage snapshot showing 13.2 billion lifetime tokens and a 66 day streak" loading="lazy" /><figcaption>Historical usage snapshot · September 3, 2026</figcaption></figure>
      </section>

      <section id="story" className="story-section section-space">
        <article className="story-card glass"><p className="eyebrow">04 · How I operate</p><h2>Ask directly. Find a way. Keep moving.</h2><p>The Berkeley polo story captures how I work: I go to the source, make the ask, and turn uncertainty into forward motion.</p><span className="story-hook">Ask me how I got the polo ↗</span></article>
        <article className="student-card glass"><p className="eyebrow">Berkeley, beyond class</p><h3>Engineering, consulting, and founder programs.</h3><div className="activity-list"><div><strong>UC Berkeley</strong><span>Mechanical Engineering</span></div><div><strong>Piedmont Consulting Group</strong><span>Consultant · product, GTM, onboarding, and UX</span></div><div><strong>Founder Summit · SkyDeck ACE</strong><span>Selected founder programs</span></div></div><p className="student-note">Earlier recognition: Berkeley Lab technical programs · DECA placement</p></article>
      </section>

      <footer className="footer glass"><div className="footer-copy"><p className="eyebrow">Build something consequential</p><h2>Talk with Vivian.</h2><blockquote>“Let all that you do be done in love.” <cite>1 Corinthians 16:14</cite></blockquote></div><div className="footer-cta-group"><a className="button primary" href={calendly} target="_blank" rel="noreferrer">Book a call</a><a className="button secondary" href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a><div className="footer-actions"><a href={`mailto:${email}`}>{email}</a><a href="https://github.com/billionairebumblebee" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.instagram.com/vivianbuilds/" target="_blank" rel="noreferrer">Instagram ↗</a></div></div></footer>
    </main>
  );
}
