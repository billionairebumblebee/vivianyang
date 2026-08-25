"use client";

import { useEffect, useState } from "react";
import "./portfolio.css";

const projects = [
  { title: "OpenClaw & Hermes", eyebrow: "AI systems · product · execution", description: "A multi-agent personal operating system with workflow routing, memory, and a polished human-facing surface.", image: "/IMG_4043.JPG", alt: "Foozi project work" },
  { title: "Oski Sorting Trash Can", eyebrow: "Mechanical engineering · CAD · Arduino", description: "A physical engineering build that combines prototyping, systems thinking, and practical interaction design.", image: "/IMG_8690.jpg", alt: "Oski sorting trash can prototype" },
  { title: "Cloak", eyebrow: "Stealth startup · privacy · product", description: "A consumer privacy-defense product focused on reducing tracking, manipulation, and messy shopping flows.", image: "/cloak-logo.PNG", alt: "Cloak logo" },
];
const strengths = [
  ["Build end-to-end", "Turns ambiguous ideas into product surfaces, systems, and prototypes."],
  ["Think in systems", "Connects technical constraints, user behavior, and the path to a real release."],
  ["Move with taste", "Pairs founder urgency with clear communication and an eye for the details people notice."],
];
const calendlyLink = "https://calendly.com/vivian_yang-berkeley/";
const email = "vivian_yang@berkeley.edu";

export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => { const dark = window.localStorage.getItem("vivian-portfolio-theme") === "dark"; document.documentElement.dataset.theme = dark ? "dark" : "light"; setIsDark(dark); }, []);
  const toggleTheme = () => { const next = !isDark; setIsDark(next); document.documentElement.dataset.theme = next ? "dark" : "light"; window.localStorage.setItem("vivian-portfolio-theme", next ? "dark" : "light"); };
  return <main className="portfolio-shell">
    <div className="portfolio-glow glow-one" /><div className="portfolio-glow glow-two" />
    <nav className="nav-wrap" aria-label="Primary navigation"><a className="wordmark" href="#top">vivian<span>yang</span></a><div className="nav-actions"><a href="#work">Selected work</a><a href="#fit">How I work</a><button className="theme-button" onClick={toggleTheme} aria-label="Toggle color theme">{isDark ? "Light" : "Dark"}</button><a className="nav-cta" href={`mailto:${email}`}>Let’s talk <span>↗</span></a></div></nav>
    <section id="top" className="hero"><div className="hero-copy"><p className="kicker"><span /> Available for high-ownership opportunities</p><h1>Engineer by training.<br /><em>Founder</em> by instinct.</h1><p className="intro">I’m Vivian Yang, a UC Berkeley mechanical engineering student building AI-native tools, physical prototypes, and product experiences people remember.</p><div className="hero-actions"><a className="button button-primary" href={`mailto:${email}?subject=Portfolio%20inbound`}>Email Vivian <span>↗</span></a><a className="button button-secondary" href="#work">See selected work <span>↓</span></a></div><div className="proof-row" aria-label="Quick facts"><div><strong>UC Berkeley</strong><span>Mechanical Engineering</span></div><div><strong>1st place</strong><span>Sponsor prize · Cal AI Hacks</span></div><div><strong>4B tokens / month</strong><span>12B lifetime total</span></div></div></div><aside className="hero-note"><p className="note-label">The short version</p><p className="note-quote">“I’m at my best where technical depth, product judgment, and initiative all matter at once.”</p><div className="note-rule" /><p className="note-detail">Product-minded engineer · Founder energy · Fast, thoughtful execution</p></aside></section>
    <section id="work" className="work-section"><div className="section-heading"><div><p className="kicker"><span /> Selected work</p><h2>Proof, not just potential.</h2></div><p>Work across intelligent systems, physical engineering, and consumer product. Each project reflects a bias toward making the idea real.</p></div><div className="achievement"><span className="achievement-mark">✦</span><div><p>Recognition</p><strong>1st Place Sponsor Prize · Cal AI Hacks</strong></div><span className="achievement-detail">Built and presented under hackathon pressure</span></div><div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.title}><div className="project-image-wrap"><img src={project.image} alt={project.alt} className="project-image" /><span className="project-number">0{index + 1}</span></div><p className="project-eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.description}</p></article>)}</div></section>
    <section id="fit" className="fit-section"><div className="fit-intro"><p className="kicker"><span /> What you get</p><h2>A builder who sees the whole picture.</h2><p>Especially useful to early teams and ambitious product groups where the job is larger than the spec.</p></div><div className="strength-list">{strengths.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className="contact-section"><p className="kicker"><span /> Open to conversations</p><h2>Have a role where <em>ownership</em> matters?</h2><p>For product-minded engineering, technical operator, founder-associate, and early-stage opportunities.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${email}?subject=Portfolio%20inbound`}>{email} <span>↗</span></a><a className="button button-secondary" href={calendlyLink} target="_blank" rel="noreferrer">Book a conversation <span>↗</span></a></div></section>
    <footer><span>© {new Date().getFullYear()} Vivian Yang</span><div><a href="https://github.com/billionairebumblebee" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/viviany31" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></footer>
  </main>;
}
