"use client";

import { useState } from "react";
import "./portfolio.css";

const email = "vivian_yang@berkeley.edu";
const calendly = "https://calendly.com/vivian_yang-berkeley";
const cookieJar = process.env.NEXT_PUBLIC_COOKIE_JAR_URL || "https://cookiejar-vivian.vercel.app";
const resume = `mailto:${email}?subject=Request%20for%20Vivian%20Yang%27s%20resume`;

const reels = [
  {
    title: "LEGO shopping reel by Vivian Yang",
    href: "https://www.instagram.com/reel/DEg3KbuxS1o/",
    embed: "https://www.instagram.com/reel/DEg3KbuxS1o/embed",
  },
  {
    title: "rom&nd beauty haul by Vivian Yang",
    href: "https://www.instagram.com/reel/DfF9u1WSqO4/",
    embed: "https://www.instagram.com/reel/DfF9u1WSqO4/embed",
  },
];

const builds = [
  {
    index: "01",
    title: "STING",
    image: "/projects/sting.svg",
    imageAlt: "STING logo",
    meta: "Hackathon prototype · Solo build · 24 hours",
    copy: "Anti-scam browser extension. Built solo as a 24-hour prototype. 1st Place · Simular Sponsor Prize · Cal AI Hackathon 2026.",
    href: "https://cloak-sting.vercel.app/",
    linkLabel: "Try STING",
    featured: true,
  },
  {
    index: "02",
    title: "Skein",
    image: "/projects/skein.png",
    imageAlt: "Skein logo",
    meta: "AI video editing · Prototype",
    copy: "Explores turning one authentic take into multiple clips, with creator approval and control of source material and likeness built into the workflow.",
    href: "https://skein-peach.vercel.app/",
    linkLabel: "Explore Skein",
  },
  {
    index: "03",
    title: "Money Meow",
    image: "/projects/richard.svg",
    imageAlt: "Richard, the tuxedo cat from Money Meow",
    meta: "Personal finance · Hackathon prototype",
    copy: "A personal finance prototype for exploring budgeting, investment scenarios, and how trading strategies would have performed on historical data.",
    href: "https://money-meow.vercel.app/",
    linkLabel: "Explore Money Meow",
  },
  {
    index: "04",
    title: "ByoGlo",
    image: "/projects/byoglo.jpg",
    imageAlt: "ByoGlo skincare homepage with the Be Your Own Glow headline",
    meta: "Biodegradable skincare · High-school venture",
    copy: "Co-created a biodegradable pimple-patch business in high school and independently coded its entire customer-facing website.",
    href: "https://byoglo.neocities.org/",
    linkLabel: "Visit ByoGlo",
  },
  {
    index: "05",
    title: "Interaction Club",
    image: "/projects/interaction-club.png",
    imageAlt: "Interaction Club balloon wordmark and pink button",
    meta: "Built in 1 week · 36 first-week signups",
    copy: "Small-group friendship dinners. Built the product, reached 36 signups in the first week, and hosted the first Berkeley builder dinner on October 8, 2026. Outreach to potential company customers followed.",
    href: "https://www.interaction.club/",
    linkLabel: "Visit Interaction Club",
  },
  {
    index: "06",
    title: "SCET Innovation Intelligence Hackathon",
    image: "/projects/scet-innovation-intelligence.jpg",
    imageAlt: "Vivian pitching Interaction Club at the SCET Innovation Intelligence Hackathon",
    meta: "Top-10 Finalist · Week-long Hackathon · Solo Founder",
    copy: "Named a top-10 finalist on October 11, 2026, in the SCET Innovation Intelligence Hackathon during SF Tech Week.",
  },
  {
    index: "07",
    title: "Cookie Jar",
    meta: "Interactive portfolio · Musical UI",
    copy: "A draggable, flippable portfolio that turns project stories into a tactile interface, with every interaction mapped through the circle of fifths.",
    href: "https://cookiejar-vivian.vercel.app",
    linkLabel: "Open Cookie Jar",
  },
  {
    index: "08",
    title: "CareSide",
    meta: "Hospital companion · Hackathon prototype",
    copy: "A prototype that organizes information from a fictional hospital visit so patients can follow their care and prepare questions for their care team.",
    href: "https://careside.vercel.app/",
    linkLabel: "Explore CareSide",
  },
  {
    index: "09",
    title: "DopaMINE",
    meta: "Independent product build",
    copy: "An independent product experiment built through rapid prototyping, testing, and iteration.",
  },
  {
    index: "10",
    title: "Oski Sorting Trash Can",
    meta: "Team hardware prototype · CAD · Arduino",
    copy: "Worked with a Berkeley PREP team to design and build a sorting-trash-can prototype using CAD, Arduino, and 3D printing.",
    image: "/IMG_8690.jpg",
    imageAlt: "Oski Sorting Trash Can team with prototype",
  },
  {
    index: "11",
    title: "Animal Jam Values",
    image: "/projects/animal-jam-values.jpg",
    imageAlt: "Animal Jam Values homepage and trade calculator",
    meta: "Fan project · Trading tools",
    copy: "An unofficial Animal Jam item catalog and trade calculator that helps players compare offers using estimated item values.",
    href: "https://animal-jam-values.vercel.app/",
    linkLabel: "Explore Animal Jam Values",
  },
];


export default function PortfolioPage() {
  const [showCookieJar, setShowCookieJar] = useState(false);
  return <main className="studio">
    <nav className="navigation" aria-label="Main navigation">
      <a className="wordmark" href="#top">vy<span>✳</span></a>
      <div><a href="#work">Projects</a><a href="#creator">Creator</a><a href="#in-public">In public</a></div>
      <a href="#contact">Say hello ↗</a>
    </nav>
    <header id="top" className="opening">
      <div className="opening-label"><span>Engineer. Founder. Digital creator.</span><span>Berkeley, California</span></div>
      <h1>VIVIAN<span>YANG<i aria-hidden="true">✳</i></span></h1>
      <div className="opening-bottom"><p>I build products, make videos,<br />and bring people together.</p><a href="#work">Come see what I’m making ↓</a></div>
      <div className="opening-collage">
        <a className="collage-pitch" href="#in-public"><img src="/projects/scet-innovation-intelligence.jpg" alt="Vivian presenting Interaction Club at Berkeley" /><span>Ideas out in the world ↗</span></a>
        <a className="collage-invite" href="https://www.interaction.club/" target="_blank" rel="noreferrer"><img src="/projects/interaction-club.png" alt="Interaction Club logo with pink button" /><p>You’re invited.</p><span>Good company starts here ↗</span></a>
        <a className="collage-cat" href="https://money-meow.vercel.app/" target="_blank" rel="noreferrer"><img src="/projects/richard.svg" alt="Richard, Money Meow’s tuxedo cat" /><span>Meet my finance guy ↗</span></a>
      </div>
    </header>
    <section id="work" className="work-section">
      <div className="section-head"><p className="kicker">From idea to internet</p><h2>Things I’ve<br /><em>made happen.</em></h2><p>Software, small-group dinners, and experiments that became something you can use.</p></div>
      <article className="feature cloak-feature">
        <a className="feature-visual" href="https://cloak.build/" target="_blank" rel="noreferrer"><img src="/cloak-site-preview.png" alt="Cloak privacy product website" loading="lazy" /></a>
        <div className="feature-info"><p className="kicker">Consumer software · Founder</p><h3>Cloak</h3><p>Making online tracking visible and controllable. I built the browser extensions and the systems around them—from the website to checkout, activation, and support.</p><div className="project-facts"><span><b>131</b> installs</span><span>Chrome + Safari</span></div><a className="text-link" href="https://cloak.build/" target="_blank" rel="noreferrer">Explore Cloak ↗</a><details><summary>Behind the build</summary><p>I defined the product, directed AI-assisted implementation, debugged, and tested browser protections. Shipping also meant handling billing, activation, and user support.</p></details></div>
      </article>
      <article className="feature interaction-feature">
        <div className="feature-info"><p className="kicker">Product + community · Founder</p><h3>Interaction<br />Club</h3><p>Real plans. Your people. I built a product for small-group friendship dinners, brought in the first signups, and hosted our first Berkeley builder dinner.</p><div className="project-facts"><span><b>1 week</b> to first dinner</span><span><b>36</b> first-week signups</span></div><a className="text-link" href="https://www.interaction.club/" target="_blank" rel="noreferrer">You’re invited ↗</a></div>
        <a className="feature-visual" href="https://www.interaction.club/" target="_blank" rel="noreferrer"><img src="/interaction-club-preview.jpg" alt="Interaction Club’s playful invitation website" loading="lazy" /></a>
      </article>
    </section>
    <section id="creator" className="creator-section">
      <div className="creator-heading"><p className="kicker">On the other side of the camera</p><h2>Made to<br /><em>be watched.</em></h2><p>Beauty reviews, PR unboxings, campus life, and the things I’m excited to share. I make the content and do my own marketing.</p><a className="text-link" href="https://www.instagram.com/vivian.yan6/" target="_blank" rel="noreferrer">@vivian.yan6 ↗</a><a className="text-link secondary-link" href="https://www.instagram.com/reel/C_mJKXpSOV4/" target="_blank" rel="noreferrer">Campus life ↗</a><div className="creator-stat"><strong>2M+</strong><span>organic views across my<br />student and lifestyle content</span></div></div>
      <div className="video-gallery">{reels.map(reel => <article className="video-card" key={reel.href}><iframe src={reel.embed} title={reel.title} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /><a href={reel.href} target="_blank" rel="noreferrer">Watch on Instagram ↗</a></article>)}</div>
    </section>
    <section id="in-public" className="public-section">
      <figure><img src="/projects/scet-innovation-intelligence.jpg" alt="Vivian pitching Interaction Club at the SCET Innovation Intelligence Hackathon" loading="lazy" /><figcaption>Pitching Interaction Club · SCET Innovation Intelligence Hackathon · Top-10 finalist</figcaption></figure>
      <div><p className="kicker">Building in public</p><h2>Build it.<br />Share it.<br /><em>Keep going.</em></h2><p>I’m figuring things out in public—building products, sharing the process, and learning how to get people interested in what I make.</p><p>Follow the projects, experiments, and life around them.</p><a className="text-link" href="https://www.instagram.com/vivianbuilds/" target="_blank" rel="noreferrer">@vivianbuilds ↗</a><a className="text-link secondary-link" href="https://www.tiktok.com/@vivianbuilds" target="_blank" rel="noreferrer">On TikTok ↗</a></div>
    </section>
    <section id="builds" className="gallery-section">
      <div className="section-head"><p className="kicker">The rest of the workshop</p><h2>A little curiosity.<br /><em>A lot of projects.</em></h2></div>
      <div className="project-grid">{builds.filter(build => !["Interaction Club", "SCET Innovation Intelligence Hackathon"].includes(build.title)).map(build => <article className={`project ${build.image ? "" : "project-text"}`} key={build.title}>
        {build.image && <div className="project-image"><img src={build.image} alt={build.imageAlt} loading="lazy" /></div>}
        <div className="project-description"><p className="kicker">{build.meta}</p><h3>{build.title}</h3><p>{build.copy}</p>{build.href && <a className="text-link" href={build.href} target="_blank" rel="noreferrer">{build.linkLabel} ↗</a>}</div>
      </article>)}</div>
    </section>
    <section id="cookie-jar" className="cookie-section">
      <div><p className="kicker">Something to play with</p><h2>The Cookie Jar.</h2><p>A musical, interactive collection of my work. Drag a cookie, flip it, and explore.</p></div><button className="pill-button" onClick={() => setShowCookieJar(!showCookieJar)} aria-expanded={showCookieJar}>{showCookieJar ? "Close the jar −" : "Open the jar ↗"}</button>
      {showCookieJar && <iframe src={cookieJar} title="Vivian’s interactive Cookie Jar" allow="autoplay" />}
    </section>
    <section id="experience" className="about-section">
      <div><p className="kicker">A little more about me</p><h2>Engineering mind.<br /><em>Creative energy.</em></h2><p>I study mechanical engineering at UC Berkeley. My work moves between consumer software, physical prototypes, community, and content.</p><a className="text-link" href={resume}>Request my résumé ↗</a></div>
      <div className="experience-list"><article><h3>Piedmont Consulting Group</h3><p>Co-leading a six-person Berkeley team on Orcana AI’s product, onboarding, research, and go-to-market work.</p></article><article><h3>Engineering beyond the screen</h3><p>Berkeley Lab technical programs, workflow automation, and a team-built sorting-trash-can prototype using CAD, Arduino, and 3D printing.</p></article><details><summary>How I build with AI ↗</summary><p>I define specs, direct implementation, debug, and test. My October 17, 2026 Codex snapshot recorded 18.1B lifetime tokens.</p><a className="text-link" href="/codex-stats-oct-17-2026.jpg" target="_blank" rel="noreferrer">View the snapshot ↗</a></details></div>
    </section>
    <footer id="contact"><p className="kicker">Projects, collaborations, or a good idea</p><a className="footer-title" href={`mailto:${email}`}>Let’s make<br /><em>something.</em> ↗</a><div className="footer-bottom"><a href={`mailto:${email}`}>{email}</a><div><a href="https://github.com/billionairebumblebee" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/vivianbuilds/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={calendly} target="_blank" rel="noreferrer">Book a call ↗</a></div></div><p className="footer-verse">“Let all that you do be done in love.” · 1 Corinthians 16:14</p></footer>
  </main>;
}
