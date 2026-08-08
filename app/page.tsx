"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const coreServices = [
  {
    code: "BC",
    title: "Building Construction",
    intro: "Coordinated civil and building works shaped around the requirements of each site.",
    scope: ["Civil construction", "Structural works", "RCC works", "Masonry & finishing", "Foundation works"],
  },
  {
    code: "WTP",
    title: "Water Treatment Plants",
    intro: "Civil and associated infrastructure support for water treatment plant development.",
    scope: ["Civil works", "Plant infrastructure", "System development", "Equipment integration", "Piping works"],
  },
  {
    code: "STP",
    title: "Sewage Treatment Plants",
    intro: "Construction and integration support for sewage and wastewater infrastructure.",
    scope: ["STP civil infrastructure", "Plant construction", "Equipment integration", "Piping", "Associated civil works"],
  },
  {
    code: "EW",
    title: "Earthwork",
    intro: "Field-proven site preparation and earthmoving for construction-ready ground.",
    scope: ["Bulk excavation", "Site development", "Land grading", "Foundation excavation", "Backfilling"],
  },
  {
    code: "RB",
    title: "Rock Breaking",
    intro: "Controlled mechanical rock and boulder removal for difficult site conditions.",
    scope: ["Hard rock excavation", "Boulder breaking", "Rock removal", "Mechanical breaking", "Site preparation"],
  },
];

const deliveryFlow = [
  ["01", "Site preparation"],
  ["02", "Earthwork"],
  ["03", "Rock excavation"],
  ["04", "Civil construction"],
  ["05", "Water / sewage infrastructure"],
  ["06", "Project completion"],
];

const gallery = [
  { src: "/media/site-1.png", alt: "Excavator operating around large rock at an active site", category: "Rock Breaking", caption: "Rock excavation operations" },
  { src: "/media/site-2.png", alt: "Excavator bucket positioned beside a large boulder", category: "Rock Breaking", caption: "Boulder removal and site preparation" },
  { src: "/media/site-3.png", alt: "Excavator carrying out large boulder removal", category: "Rock Breaking", caption: "Controlled mechanical rock handling" },
  { src: "/media/site-4.png", alt: "Excavator progressing rock removal beside a site boundary", category: "Rock Breaking", caption: "Rock removal in a constrained work zone" },
  { src: "/media/site-5.png", alt: "Excavator loading red soil into a tractor trailer", category: "Earthwork", caption: "Earth excavation and material loading" },
  { src: "/media/site-6.png", alt: "Workers carrying out supervised rock work on site", category: "Rock Breaking", caption: "Supervised site operations" },
];

const filters = ["All", "Construction", "Water Infrastructure", "Sewage Infrastructure", "Earthwork", "Rock Breaking"];

type ModalState =
  | { type: "image"; src: string; title: string }
  | { type: "video"; src: string; title: string }
  | { type: "pdf"; src: string; title: string }
  | null;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modal, setModal] = useState<ModalState>(null);
  const [filter, setFilter] = useState("All");
  const [sent, setSent] = useState(false);

  const visibleGallery = filter === "All" ? gallery : gallery.filter((item) => item.category === filter);

  useEffect(() => {
    const started = performance.now();
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round((performance.now() - started) / 9));
      setProgress(next);
      if (next === 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setLoaded(true), 220);
      }
    }, 24);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!modal) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setModal(null);
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [modal]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main>
      <div className={`preloader ${loaded ? "preloader--done" : ""}`} aria-hidden={loaded}>
        <div className="loader-brand"><b>F</b><span>Futuregenic Enterprises</span></div>
        <div className="loader-copy"><small>Construction & Infrastructure</small><strong>{String(progress).padStart(2, "0")}</strong></div>
        <div className="loader-track"><i style={{ width: `${progress}%` }} /></div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Futuregenic Enterprises home">
          <span className="brand-box">F</span>
          <span><b>Futuregenic Enterprises</b><small>Private Limited</small></span>
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
          <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
          <details className="nav-services">
            <summary>Services</summary>
            <div>{coreServices.map((service) => <a key={service.code} href={`#service-${service.code.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{service.title}</a>)}</div>
          </details>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#certifications" onClick={() => setMenuOpen(false)}>Certifications</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="quick-actions"><a href="#contact">Call</a><a href="#contact">WhatsApp</a></div>
        <a className="header-cta" href="#contact">Request a quote <span>↗</span></a>
        <button type="button" className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><i /><i /></button>
      </header>

      <section className="hero" id="top">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/media/site-1.png">
          <source src="/media/rock-excavation.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Construction • Infrastructure • Engineering</p>
          <h1>Building infrastructure.<br /><em>Engineering progress.</em></h1>
          <div className="hero-bottom">
            <p>Integrated construction and infrastructure solutions for buildings, water treatment, sewage treatment, earthwork and specialized rock excavation.</p>
            <div className="button-row">
              <a className="button button--orange" href="#services">Explore our services <span>↓</span></a>
              <a className="button button--outline" href="#contact">Discuss your project <span>↗</span></a>
            </div>
          </div>
        </div>
        <div className="service-ticker" aria-label="Company capabilities"><div><span>Building Construction</span><i>•</i><span>Water Treatment</span><i>•</i><span>Sewage Treatment</span><i>•</i><span>Earthwork</span><i>•</i><span>Rock Breaking</span></div></div>
      </section>

      <section className="credential-strip" aria-label="Verified company credentials">
        <div><span>01</span><b>ISO 9001:2015</b><small>Quality Management System</small></div>
        <div><span>02</span><b>DPIIT Recognized Startup</b><small>Certificate DIPP247565</small></div>
        <div><span>03</span><b>Private Limited Company</b><small>Incorporated 25 February 2026</small></div>
        <div><span>04</span><b>Construction & Infrastructure</b><small>Integrated capability portfolio</small></div>
      </section>

      <section className="section introduction" id="about">
        <div className="section-kicker" data-reveal><span>01</span> Company overview</div>
        <div className="intro-grid">
          <div data-reveal>
            <h2>Integrated construction &<br /><em>infrastructure solutions.</em></h2>
            <p className="lead">Futuregenic Enterprises Private Limited serves construction and infrastructure requirements through coordinated capabilities spanning building works, water and sewage infrastructure, earthwork and specialized rock breaking.</p>
            <div className="intro-note"><b>One connected view of the site</b><span>From early ground preparation to civil and environmental infrastructure.</span></div>
          </div>
          <figure className="intro-visual" data-reveal>
            <Image src="/media/site-5.png" alt="Real earthwork execution at a construction site" width={1200} height={1600} sizes="(max-width: 1000px) 92vw, 38vw" />
            <figcaption><span>Real project execution</span><small>Site development & earthwork</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="section capabilities" id="services">
        <div className="section-head" data-reveal>
          <div className="section-kicker"><span>02</span> Five business verticals</div>
          <h2>Our core<br /><em>capabilities.</em></h2>
          <p>Balanced construction, environmental infrastructure and ground engineering services.</p>
        </div>
        <div className="capability-grid">
          {coreServices.map((service, index) => (
            <article key={service.code} id={`service-${service.code.toLowerCase()}`} className={index < 3 ? "capability-card capability-card--major" : "capability-card"} data-reveal>
              <div className="service-code">{service.code}</div>
              <small>0{index + 1} / Core service</small>
              <h3>{service.title}</h3>
              <p>{service.intro}</p>
              <ul>{service.scope.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href="#contact" aria-label={`Discuss ${service.title}`}>Discuss requirements <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="section delivery-story">
        <div className="story-head" data-reveal>
          <div><div className="section-kicker"><span>03</span> Connected execution</div><h2>From groundwork<br />to <em>infrastructure.</em></h2></div>
          <p>Excavation is one stage in a broader project journey. Our capability structure connects site readiness with civil construction and water or sewage infrastructure requirements.</p>
        </div>
        <div className="delivery-flow">
          {deliveryFlow.map(([number, title]) => <div key={number} data-reveal><b>{number}</b><i /><span>{title}</span></div>)}
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="projects-title" data-reveal><div className="section-kicker"><span>04</span> Genuine field documentation</div><h2>Projects<br /><em>in action.</em></h2><p>Actual site photographs documenting earthwork, boulder removal, rock excavation and field operations.</p></div>
        <article className="project-main" data-reveal>
          <Image src="/media/site-2.png" alt="Excavator positioned beside a large boulder on an active site" width={1600} height={1200} sizes="(max-width: 900px) 100vw, 68vw" />
          <div><small>Real site operation</small><h3>Rock excavation operations</h3><p>Mechanical handling and removal of large rock within an active work zone.</p></div>
        </article>
        <article className="project-side" data-reveal>
          <Image src="/media/site-5.png" alt="Earthmoving equipment loading excavated material" width={1200} height={1600} sizes="(max-width: 900px) 100vw, 32vw" />
          <div><small>Real site operation</small><h3>Earthwork & material loading</h3></div>
        </article>
      </section>

      <section className="water-section">
        <div className="water-intro" data-reveal>
          <div className="section-kicker"><span>05</span> Environmental infrastructure</div>
          <h2>Water & environmental<br /><em>infrastructure.</em></h2>
          <p>High-level construction and integration support for water and wastewater infrastructure requirements. The engineering graphics below are illustrative, not project photographs.</p>
        </div>
        <div className="treatment-grid">
          <article data-reveal>
            <div className="plant-diagram" aria-hidden="true"><span>IN</span><i /><i /><i /><span>OUT</span></div>
            <small>Illustrative process pathway</small>
            <h3>Water Treatment Plants</h3>
            <p>Civil works, plant infrastructure, equipment integration, piping and associated construction support.</p>
            <a href="#contact">Discuss WTP requirements ↗</a>
          </article>
          <article data-reveal>
            <div className="plant-diagram plant-diagram--round" aria-hidden="true"><span>IN</span><i /><i /><i /><span>OUT</span></div>
            <small>Illustrative process pathway</small>
            <h3>Sewage Treatment Plants</h3>
            <p>STP civil infrastructure, treatment plant construction, equipment integration and associated piping works.</p>
            <a href="#contact">Discuss STP requirements ↗</a>
          </article>
        </div>
      </section>

      <section className="building-section">
        <div className="building-copy" data-reveal>
          <div className="section-kicker"><span>06</span> Building construction</div>
          <h2>Building with purpose.<br /><em>Engineered for performance.</em></h2>
          <p>Building Construction is a principal Futuregenic vertical, covering coordinated civil, structural, RCC, foundation, masonry and finishing works according to project requirements.</p>
          <div className="building-scope">{["Civil works", "Structural construction", "Foundation works", "RCC", "Finishing", "Infrastructure support"].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>
          <a className="button button--orange" href="#contact">Discuss building works <span>↗</span></a>
        </div>
        <div className="building-graphic" aria-label="Illustrative architectural construction grid">
          <div className="grid-label">Illustrative construction framework</div><i /><i /><i /><i /><i /><i />
        </div>
      </section>

      <section className="section why-section">
        <div className="section-head" data-reveal><div className="section-kicker"><span>07</span> Why Futuregenic</div><h2>Structured for<br /><em>connected delivery.</em></h2></div>
        <div className="reason-grid">
          {["Integrated capabilities", "Execution-focused approach", "Quality management", "Safety-conscious operations", "Modern equipment", "Professional project coordination"].map((item, index) => <article key={item} data-reveal><b>0{index + 1}</b><h3>{item}</h3><p>{["A portfolio spanning buildings, water, sewage, earthwork and rock breaking.", "Project requirements translated into practical site execution pathways.", "A documented quality management system for the certified business scope.", "Planning, PPE awareness and responsible work-zone coordination.", "Equipment applied according to site condition and work requirements.", "Clear coordination across site preparation, civil and infrastructure activities."][index]}</p></article>)}
        </div>
      </section>

      <section className="certifications" id="certifications">
        <div className="cert-heading" data-reveal><div className="section-kicker"><span>08</span> Verified company credentials</div><h2>Certifications &<br /><em>recognition.</em></h2><p>View the original documents supplied by the company.</p></div>
        <article className="certificate-card" data-reveal>
          <div className="cert-mark">ISO</div><div><small>Quality Management System</small><h3>ISO 9001:2015</h3><p><b>Certified entity:</b> Futuregenic Enterprises Private Limited</p><p><b>Certificate scope:</b> Trading, supply and distribution of construction and building materials.</p><span>Certificate No. IN/75425132/6418 • Expires 15 May 2029</span></div>
          <button type="button" onClick={() => setModal({ type: "pdf", src: "/certificates/iso-9001-2015.pdf", title: "ISO 9001:2015 Certificate" })}>View certificate ↗</button>
        </article>
        <article className="certificate-card certificate-card--blue" data-reveal>
          <div className="cert-mark">DPIIT</div><div><small>Government of India recognition</small><h3>DPIIT Recognized Startup</h3><p><b>Industry:</b> Construction</p><p><b>Sector:</b> New-age Construction Technologies</p><span>Certificate DIPP247565 • Issued 02 March 2026 • Valid up to 24 February 2036</span></div>
          <button type="button" onClick={() => setModal({ type: "pdf", src: "/certificates/startup-india-recognition.pdf", title: "DPIIT Startup India Recognition Certificate" })}>View recognition certificate ↗</button>
        </article>
      </section>

      <section className="section leadership" id="leadership">
        <div className="leadership-copy" data-reveal><div className="section-kicker"><span>09</span> Leadership</div><h2>Direction with<br /><em>shared purpose.</em></h2><p>Leadership presented only with verified company roles.</p><a href="#about">Meet our leadership ↗</a></div>
        <div className="leader-grid">
          <article data-reveal><div className="initials">RS</div><small>Director</small><h3>Ragini Srivastava</h3></article>
          <article data-reveal><div className="initials">NS</div><small>Director</small><h3>Niraj Srivastav</h3></article>
        </div>
      </section>

      <section className="safety-section">
        <div className="safety-visual"><Image src="/media/site-6.png" alt="Workers wearing helmets during supervised site operations" width={1600} height={1200} sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className="safety-copy" data-reveal><div className="section-kicker"><span>10</span> Responsible operations</div><h2>Safety & quality<br /><em>at every stage.</em></h2><p>Site safety, quality control, planning, equipment management and responsible work-zone coordination support each phase of execution.</p><ul>{["Site safety", "Quality control", "Planning", "Responsible operations", "Equipment management"].map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></div>
      </section>

      <section className="section engineering-video">
        <div className="video-heading" data-reveal><div className="section-kicker"><span>11</span> Real project footage</div><h2>Engineering<br /><em>in action.</em></h2><p>Field documentation from active earthwork and rock excavation operations.</p></div>
        <button type="button" className="cinematic-player" onClick={() => setModal({ type: "video", src: "/media/earthwork.mp4", title: "Earthwork and material loading" })} data-reveal>
          <Image src="/media/site-5.png" alt="Earthwork and material loading video preview" width={1200} height={1600} sizes="90vw" />
          <span className="play">▶</span><div><small>Project film</small><b>Play engineering in action</b></div>
        </button>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-head" data-reveal><div><div className="section-kicker"><span>12</span> Real project archive</div><h2>Execution, documented.</h2></div><p>Only categories with genuine project media are populated.</p></div>
        <div className="gallery-filters" role="group" aria-label="Filter project gallery">{filters.map((item) => <button type="button" key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div>
        {visibleGallery.length ? <div className="gallery-grid">{visibleGallery.map((item, index) => <button type="button" key={item.src} className={`gallery-${index + 1}`} onClick={() => setModal({ type: "image", src: item.src, title: item.caption })} data-reveal><Image src={item.src} alt={item.alt} width={item.src.includes("site-5") ? 1200 : 1600} height={item.src.includes("site-5") ? 1600 : 1200} sizes="(max-width: 700px) 48vw, 32vw" /><span><small>{item.category}</small><b>{item.caption}</b></span></button>)}</div> : <div className="gallery-empty" role="status"><b>Portfolio category ready</b><p>Genuine {filter.toLowerCase()} project media will appear here when supplied.</p></div>}
      </section>

      <section className="contact" id="contact">
        <div className="contact-intro" data-reveal><div className="section-kicker"><span>13</span> Project enquiries</div><h2>Planning a construction or<br /><em>infrastructure project?</em></h2><p>Talk to our team about your project requirements.</p><div className="contact-actions"><a href="#enquiry-form">Request a quote</a><a href="#enquiry-form">Call us</a><a href="#enquiry-form">WhatsApp</a></div></div>
        <form id="enquiry-form" onSubmit={submit} data-reveal>
          <label><span>Your name *</span><input name="name" required autoComplete="name" placeholder="Full name" /></label>
          <label><span>Phone number *</span><input name="phone" required inputMode="tel" autoComplete="tel" placeholder="Phone number" /></label>
          <label><span>Project type *</span><select name="type" required defaultValue=""><option value="" disabled>Select service</option>{coreServices.map((service) => <option key={service.code}>{service.title}</option>)}</select></label>
          <label><span>Project location *</span><input name="location" required placeholder="City / site location" /></label>
          <label className="wide"><span>Project requirements *</span><textarea name="message" required rows={4} placeholder="Describe the scope, current stage and target timeline" /></label>
          <button className="button button--orange submit" type="submit">Submit project enquiry <span>↗</span></button>
          {sent && <p className="success" role="status">✓ Thank you. Your project requirements are ready for review.</p>}
        </form>
      </section>

      <footer>
        <div className="footer-top"><div className="brand"><span className="brand-box">F</span><span><b>Futuregenic Enterprises</b><small>Private Limited</small></span></div><h2>Construction. Infrastructure.<br /><em>Engineering.</em></h2></div>
        <div className="footer-grid"><div><b>Company</b><a href="#about">About Us</a><a href="#leadership">Leadership</a><a href="#projects">Projects</a><a href="#certifications">Certifications</a><a href="#contact">Contact</a></div><div><b>Services</b>{coreServices.map((service) => <a key={service.code} href={`#service-${service.code.toLowerCase()}`}>{service.title}</a>)}</div><div><b>Verified credentials</b><span>ISO 9001:2015</span><span>DPIIT Recognized Startup</span><span>Construction & Infrastructure</span></div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Futuregenic Enterprises Private Limited</span><span>Building • Water • Sewage • Earthwork • Rock Breaking</span><a href="#top">Back to top ↑</a></div>
      </footer>

      {modal && <div className={`modal modal--${modal.type}`} role="dialog" aria-modal="true" aria-label={modal.title} onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}>
        <button type="button" className="modal-close" onClick={() => setModal(null)}>Close ×</button>
        {modal.type === "video" && <video src={modal.src} autoPlay controls playsInline preload="metadata" poster="/media/site-5.png" />}
        {modal.type === "image" && <figure><Image src={modal.src} alt={modal.title} width={1600} height={1200} sizes="92vw" /><figcaption>{modal.title}</figcaption></figure>}
        {modal.type === "pdf" && <div className="pdf-viewer"><div><b>{modal.title}</b><a href={modal.src} target="_blank" rel="noreferrer">Open original PDF ↗</a></div><iframe src={modal.src} title={modal.title} /></div>}
      </div>}
    </main>
  );
}
