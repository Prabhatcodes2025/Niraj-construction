"use client";

import { FormEvent, useEffect, useState } from "react";

const services = [
  ["01", "Rock excavation", "Controlled removal through excavator-assisted breaking and precise bench preparation."],
  ["02", "Bulk earthwork", "Cut, load, transport and grade soil for large industrial and infrastructure sites."],
  ["03", "Site development", "End-to-end clearing, formation, leveling and access preparation for construction."],
  ["04", "Boulder removal", "Safe handling and relocation of oversized rock in constrained working zones."],
  ["05", "Foundation excavation", "Accurate excavation to line, level and depth for heavy foundations and structures."],
  ["06", "Machinery support", "Reliable excavator and tipper deployment matched to site conditions and output targets."],
];

const process = ["Site visit", "Survey", "Work plan", "Mobilisation", "Execution", "Quality check", "Handover"];

const gallery = [1, 2, 3, 4, 5, 6].map((n) => ({
  src: `/media/site-${n}.png`,
  alt: [
    "Tata Hitachi excavator working around large boulders",
    "Excavator bucket positioning beside a large boulder",
    "Large boulder removal operation on an active site",
    "Excavator moving rock beside a retaining wall",
    "Excavator loading red soil into a tractor trailer",
    "Site crew carrying out controlled rock work",
  ][n - 1],
}));

const faqs = [
  ["What kinds of excavation do you undertake?", "We handle rock excavation, bulk earthwork, foundation excavation, site clearance, land leveling and boulder removal for industrial, commercial and infrastructure sites."],
  ["Can you work on hard-rock and mixed-ground sites?", "Yes. We first review access, strata, working space and disposal requirements, then plan the right machine and safe working sequence for the ground condition."],
  ["Do you provide machinery with operators?", "Equipment is deployed with experienced operators and coordinated site supervision so output, safety and quality remain under one accountable team."],
  ["How do you prepare a quotation?", "After a site visit, we assess quantities, material type, lead distance, access, timeline and machinery requirements. This keeps the commercial proposal clear and site-specific."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<(typeof gallery)[number] | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const started = performance.now();
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round((performance.now() - started) / 11));
      setProgress(next);
      if (next === 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setLoaded(true), 280);
      }
    }, 24);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main>
      <div className={`preloader ${loaded ? "preloader--done" : ""}`} aria-hidden={loaded}>
        <div className="loader-mark"><span>NS</span><b>C</b></div>
        <div className="loader-machine"><i /><span /></div>
        <div className="loader-row"><small>Mobilising</small><strong>{String(progress).padStart(2, "0")}</strong></div>
        <div className="loader-track"><i style={{ width: `${progress}%` }} /></div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Niraj Shrivastav Construction home">
          <span className="brand-box">NS</span><span><b>Niraj Shrivastav</b><small>Construction</small></span>
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
          {["About", "Services", "Projects", "Gallery", "Safety", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">Request a quote <span>↗</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><i /><i /></button>
      </header>

      <section className="hero" id="top">
        <video className="hero-video" autoPlay muted loop playsInline poster="/media/site-1.png">
          <source src="/media/rock-excavation.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="eyebrow hero-eyebrow">Excavation • Earthwork • Site Development</div>
        <div className="hero-content">
          <h1><span>Engineering strong</span><br />foundations. <em>Shaping</em><br />tomorrow.</h1>
          <div className="hero-bottom">
            <p>Heavy civil capability for demanding ground conditions—planned precisely, executed safely and delivered with control.</p>
            <div className="button-row">
              <a className="button button--orange" href="#contact">Discuss your project <span>↗</span></a>
              <a className="button button--glass" href="#projects">Explore our work <span>↓</span></a>
            </div>
          </div>
        </div>
        <div className="hero-index"><span>01</span><i /><small>Field operations</small></div>
      </section>

      <section className="capability-strip" aria-label="Core capabilities">
        {["Rock excavation", "Earth moving", "Site formation", "Boulder removal", "Foundation works"].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
      </section>

      <section className="section about" id="about">
        <div className="section-kicker" data-reveal><span>01</span> Built for difficult ground</div>
        <div className="about-grid">
          <div data-reveal>
            <h2>We move what stands<br />between <em>plan</em> and progress.</h2>
            <p className="lead">Niraj Shrivastav Construction delivers excavation, earthwork and site-development packages for projects where ground conditions demand more than ordinary execution.</p>
            <div className="values">
              <div><b>01</b><span>Site-first planning</span><p>Every method starts with access, strata, sequence and safety.</p></div>
              <div><b>02</b><span>Accountable execution</span><p>Clear supervision from mobilisation through final levels.</p></div>
            </div>
          </div>
          <figure className="about-visual" data-reveal>
            <img src="/media/site-5.png" alt="Excavator loading earth into a tractor trailer" />
            <figcaption><span>Real work. Real sites.</span><small>Bulk excavation & loading</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="section-head" data-reveal>
          <div className="section-kicker"><span>02</span> What we deliver</div>
          <h2>Ground engineering,<br /><em>without compromise.</em></h2>
          <p>One execution partner across critical early-stage construction work.</p>
        </div>
        <div className="service-list">
          {services.map(([number, title, text]) => (
            <article key={title} data-reveal><b>{number}</b><h3>{title}</h3><p>{text}</p><span>↗</span></article>
          ))}
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-head light" data-reveal>
          <div className="section-kicker"><span>03</span> Selected field operations</div>
          <h2>Capability,<br /><em>proven on site.</em></h2>
        </div>
        <article className="project-feature" data-reveal>
          <img src="/media/site-2.png" alt="Excavator positioned to remove a large site boulder" />
          <div className="project-number">01 / 03</div>
          <div className="project-copy"><small>Rock & obstruction removal</small><h3>Large-boulder<br />excavation</h3><p>Excavator-controlled rock handling beside an existing boundary—sequenced to protect access and surrounding works.</p><ul><li>Tata Hitachi excavator</li><li>Constrained work zone</li><li>Active supervision</li></ul></div>
        </article>
        <div className="project-pair">
          <article data-reveal><img src="/media/site-6.png" alt="Workers carrying out rock excavation in a foundation area" /><div><small>Foundation preparation</small><h3>Controlled rock breaking</h3><span>02 ↗</span></div></article>
          <article data-reveal><img src="/media/site-5.png" alt="Excavator loading earth for removal" /><div><small>Bulk earthwork</small><h3>Cut, load & haul</h3><span>03 ↗</span></div></article>
        </div>
      </section>

      <section className="equipment-band">
        <div className="equipment-copy" data-reveal>
          <div className="section-kicker"><span>04</span> Plant & equipment</div>
          <h2>The right machine.<br /><em>The right method.</em></h2>
          <p>Equipment selection is matched to strata, access, output and working radius—not simply availability.</p>
          <div className="equipment-tags"><span>Hydraulic excavator</span><span>Rock bucket</span><span>Breaker support</span><span>Tractor & tipper logistics</span></div>
        </div>
        <img src="/media/site-1.png" alt="Tata Hitachi EX130 excavator on a rock excavation site" data-reveal />
      </section>

      <section className="section process" id="process">
        <div className="section-head" data-reveal><div className="section-kicker"><span>05</span> Delivery method</div><h2>From first survey<br />to <em>final level.</em></h2></div>
        <div className="process-line">
          {process.map((item, index) => <div key={item} data-reveal><b>{String(index + 1).padStart(2, "0")}</b><i /><span>{item}</span></div>)}
        </div>
      </section>

      <section className="safety" id="safety">
        <div className="safety-image"><img src="/media/site-6.png" alt="Helmeted workers carrying out supervised rock work" /></div>
        <div className="safety-copy" data-reveal>
          <div className="section-kicker"><span>06</span> Safety is the method</div>
          <h2>Productivity only counts<br />when people are <em>protected.</em></h2>
          <p>We plan machine movement, personnel zones and the work sequence before production begins.</p>
          <ul><li><span>✓</span> PPE-led site discipline</li><li><span>✓</span> Experienced machine operators</li><li><span>✓</span> Risk review before execution</li><li><span>✓</span> Controlled work and access zones</li></ul>
        </div>
      </section>

      <section className="section video-section">
        <div className="section-head" data-reveal><div className="section-kicker"><span>07</span> In the field</div><h2>See the work<br /><em>in motion.</em></h2></div>
        <div className="video-grid">
          <button onClick={() => setActiveVideo("/media/rock-excavation.mp4")} data-reveal><img src="/media/site-3.png" alt="Rock excavation video cover" /><span className="play">▶</span><div><small>Field film 01</small><b>Boulder removal operation</b></div></button>
          <button onClick={() => setActiveVideo("/media/earthwork.mp4")} data-reveal><img src="/media/site-5.png" alt="Earthwork video cover" /><span className="play">▶</span><div><small>Field film 02</small><b>Earth excavation & loading</b></div></button>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-head" data-reveal><div><div className="section-kicker"><span>08</span> Site archive</div><h2>Work, documented.</h2></div><p>No stock imagery.<br />Every frame is from the field.</p></div>
        <div className="gallery-grid">
          {gallery.map((image, index) => <button key={image.src} className={`gallery-${index + 1}`} onClick={() => setActiveImage(image)} data-reveal><img src={image.src} alt={image.alt} loading="lazy" /><span>View image ↗</span></button>)}
        </div>
      </section>

      <section className="industries">
        <div className="section-kicker" data-reveal><span>09</span> Sectors we support</div>
        <div className="industry-list">
          {["Industrial", "Warehousing", "Infrastructure", "Commercial", "Roadworks", "Residential"].map((item, index) => <div key={item} data-reveal><b>0{index + 1}</b><span>{item}</span><i>↗</i></div>)}
        </div>
      </section>

      <section className="section faq">
        <div className="faq-title" data-reveal><div className="section-kicker"><span>10</span> Before mobilisation</div><h2>Clear answers.<br /><em>Better starts.</em></h2><p>Still assessing the scope? Start with a site discussion.</p></div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => <details key={question} data-reveal><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-intro" data-reveal>
          <div className="section-kicker"><span>11</span> Start a conversation</div>
          <h2>Bring us the site.<br />We&apos;ll bring the <em>method.</em></h2>
          <p>Share the location, work type and expected timeline. Our team will review the requirement and arrange the next step.</p>
          <div className="contact-note"><b>What helps us respond faster</b><span>Site location • Approximate quantity • Ground condition • Target start date</span></div>
        </div>
        <form onSubmit={submit} data-reveal>
          <label><span>Your name *</span><input name="name" required placeholder="Full name" /></label>
          <label><span>Phone number *</span><input name="phone" required inputMode="tel" placeholder="+91 00000 00000" /></label>
          <label><span>Project type *</span><select name="type" required defaultValue=""><option value="" disabled>Select work type</option>{services.map(([, title]) => <option key={title}>{title}</option>)}</select></label>
          <label><span>Project location *</span><input name="location" required placeholder="City / site location" /></label>
          <label><span>Target timeline</span><select name="timeline" defaultValue=""><option value="" disabled>Select timeline</option><option>Immediately</option><option>Within 30 days</option><option>1–3 months</option><option>Planning stage</option></select></label>
          <label><span>Estimated budget</span><select name="budget" defaultValue=""><option value="" disabled>Select range</option><option>Under ₹5 lakh</option><option>₹5–15 lakh</option><option>₹15–50 lakh</option><option>₹50 lakh+</option></select></label>
          <label className="wide"><span>Tell us about the work *</span><textarea name="message" required rows={4} placeholder="Scope, quantities, site conditions and any access constraints" /></label>
          <label className="wide upload"><span>Site drawing or photos</span><input type="file" name="attachment" accept="image/*,.pdf" /></label>
          <button className="button button--orange submit" type="submit">Request project review <span>↗</span></button>
          {sent && <p className="success" role="status">✓ Thank you. Your project details are ready for review.</p>}
        </form>
      </section>

      <footer>
        <div className="footer-top"><div className="brand"><span className="brand-box">NS</span><span><b>Niraj Shrivastav</b><small>Construction</small></span></div><h2>Built below ground.<br /><em>Trusted above it.</em></h2></div>
        <div className="footer-grid"><div><b>Capabilities</b><a href="#services">Rock excavation</a><a href="#services">Earthwork</a><a href="#services">Site development</a><a href="#services">Boulder removal</a></div><div><b>Company</b><a href="#about">About</a><a href="#projects">Projects</a><a href="#safety">Safety</a><a href="#gallery">Gallery</a></div><div><b>Project enquiries</b><a href="#contact">Request a quote</a><span>Site visits by appointment</span><span>India</span></div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Niraj Shrivastav Construction</span><span>Heavy civil • Earthwork • Excavation</span><a href="#top">Back to top ↑</a></div>
      </footer>

      {activeVideo && <div className="modal" role="dialog" aria-modal="true" aria-label="Project video"><button className="modal-close" onClick={() => setActiveVideo(null)}>Close ×</button><video src={activeVideo} autoPlay controls playsInline /></div>}
      {activeImage && <div className="modal" role="dialog" aria-modal="true" aria-label="Gallery image"><button className="modal-close" onClick={() => setActiveImage(null)}>Close ×</button><img src={activeImage.src} alt={activeImage.alt} /></div>}
    </main>
  );
}
