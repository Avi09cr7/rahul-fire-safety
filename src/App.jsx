import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const PHONE_PRIMARY = "+919412525987";
const PHONE_SECONDARY = "+919719159819";
const PHONE_PRIMARY_DISPLAY = "+91 94125 25987";
const PHONE_SECONDARY_DISPLAY = "+91 97191 59819";
const EMAIL = "rahulfire2001@yahoo.com";
const WHATSAPP = "919412525987";

const stats = [
  ["25+", "Years protecting life & property", "Since 2001"],
  ["ISO", "9001:2015 certified quality", "Accountable delivery"],
  ["10+", "Landmark PSUs & brands served", "Public & private sector"],
  ["08", "Engineered suppression systems", "Matched to the hazard"],
];

const services = [
  ["01", "Survey & Audit", "Site risk reviews and practical compliance guidance that hold up to scrutiny.", "shield"],
  ["02", "Design & Engineering", "Layouts engineered to NBC, TAC, NFPA and FM Global — not just the checklist.", "compass"],
  ["03", "Installation", "Detection, hydrant, sprinkler and suppression execution by our own teams.", "wrench"],
  ["04", "Equipment Supply", "Extinguishers, hose reels and essential fire protection, correctly specified.", "extinguisher"],
  ["05", "Training", "Safety demonstrations and preparedness drills for your operating teams.", "people"],
  ["06", "AMC & Maintenance", "Inspection and upkeep that keeps every system response-ready, year after year.", "refresh"],
];

const systems = [
  ["Fire detection & alarm systems", "alarm"],
  ["Automatic hydrant & wet riser systems", "gauge"],
  ["CO₂ flooding systems", "cylinder"],
  ["Clean agent suppression systems", "shield"],
  ["High velocity water spray systems", "droplet"],
  ["Medium velocity water spray systems", "spray"],
  ["Kitchen hood extinguishing systems", "flame"],
  ["Nitrogen injection systems", "gas"],
];

const whyUs = [
  [
    "One partner, start to finish",
    "Survey, design, installation, equipment and AMC under a single accountable roof — no coordination gaps, no finger-pointing.",
  ],
  [
    "Engineered to code, every time",
    "Every layout is worked to NBC, TAC, NFPA and FM Global standards, so what we install passes audit and performs when it matters.",
  ],
  [
    "25 years, still answering the phone",
    "A quarter-century of continuous practice since 2001. The systems we commissioned years ago are still maintained by the same hands.",
  ],
  [
    "Proven where failure isn't an option",
    "Refineries, power utilities, defence, banking and hospitality trust us with their people and assets. The standard doesn't drop.",
  ],
];

const projects = [
  {
    src: "/assets/plant-installation.jpg",
    alt: "Fire hydrant piping installed in an industrial plant",
    caption: "Industrial protection system",
    place: "Process plant · hydrant & sprinkler network",
  },
  {
    src: "/assets/industrial-site.jpg",
    alt: "Large industrial facility protected by fire safety systems",
    caption: "Large-scale process facility",
    place: "Heavy industry · full fire protection",
  },
  {
    src: "/assets/hospitality-installation.jpg",
    alt: "Fire hose reel and extinguisher installation in a commercial premises",
    caption: "Commercial & hospitality premises",
    place: "Hospitality · hose reel & extinguishers",
  },
  {
    src: "/assets/extinguisher-range.jpg",
    alt: "Range of portable fire extinguishers",
    caption: "Fire protection equipment supply",
    place: "Equipment · specification & supply",
  },
];

const trustMarks = [
  { src: "/assets/trust/msme.png", alt: "MSME registration mark", label: "MSME" },
  { src: "/assets/trust/gem.png", alt: "Government e-Marketplace mark", label: "GeM" },
  { src: "/assets/trust/iso.png", alt: "ISO 9001:2015 certification mark", label: "ISO 9001:2015" },
];

const clientLogos = [
  { src: "/assets/trust/powergrid.png", alt: "POWERGRID" },
  { src: "/assets/trust/indianoil.svg", alt: "IndianOil" },
  { src: "/assets/trust/hindustan-petroleum.svg", alt: "Hindustan Petroleum" },
  { src: "/assets/trust/haldirams.png", alt: "Haldiram's" },
  { src: "/assets/trust/pvr.png", alt: "PVR Cinemas" },
  { src: "/assets/trust/icici-bank.svg", alt: "ICICI Bank" },
  { src: "/assets/trust/bhel.svg", alt: "BHEL" },
  { src: "/assets/trust/iffco.png", alt: "IFFCO" },
  { src: "/assets/trust/uttam-sugar.png", alt: "Uttam Sugar" },
  { src: "/assets/trust/indian-navy.png", alt: "Indian Navy" },
];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const iconPaths = {
  shield: "M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z",
  compass: "M12 3a9 9 0 100 18 9 9 0 000-18zm3.5 5.5l-2 5-5 2 2-5 5-2z",
  wrench: "M14.5 5.5a4 4 0 00-5 5L4 16v4h4l5.5-5.5a4 4 0 005-5l-3 3-2-2 3-3a4 4 0 00-2-2z",
  extinguisher: "M9 3h4v2l2 1v3H8V6l1-1V3zm-1 7h8v9a2 2 0 01-2 2h-4a2 2 0 01-2-2v-9zm-2-4l2 1M6 6v3",
  people: "M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM2 20a6 6 0 0112 0M13 20a6 6 0 019-5.2",
  refresh: "M4 12a8 8 0 0113.9-5.5M20 5v4h-4M20 12a8 8 0 01-13.9 5.5M4 19v-4h4",
  alarm: "M6 9a6 6 0 0112 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6zM10 20a2 2 0 004 0M4 5L2 7M20 5l2 2",
  gauge: "M3.5 14a8.5 8.5 0 0117 0M12 14l3.5-3M7 18h10",
  cylinder: "M9 4h6M10 4v2.2A4 4 0 008 9.7V19a2 2 0 002 2h4a2 2 0 002-2V9.7A4 4 0 0014 6.2V4M8 11h8",
  droplet: "M12 3c3 3.6 6 6.4 6 10a6 6 0 01-12 0c0-3.6 3-6.4 6-10z",
  spray: "M12 6c2.4 2.6 4 4.6 4 7a4 4 0 01-8 0c0-2.4 1.6-4.4 4-7zM6 4l-1-1M18 4l1-1M4 8H2M22 8h-2",
  flame: "M13 3c.4 2.7 3 3.8 3 7a4 4 0 01-8 0c0-1.2.5-2.2 1.3-3C9.6 8.9 11 9.5 11 8c0-1.6.9-3.4 2-5zM8 20h8",
  gas: "M12 3a5 5 0 015 5c0 2.8-2.2 4.3-2.2 7A2.8 2.8 0 0112 18a2.8 2.8 0 01-2.8-3C9.2 12.3 7 10.8 7 8a5 5 0 015-5zM10 8h4",
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => (typeof document !== "undefined" && document.documentElement.getAttribute("data-theme")) || "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* storage unavailable */
    }
  }, [theme]);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="wordmark" href="#home" aria-label="Rahul Fire Safety home" onClick={close}>
          <span className="wordmark-mark" aria-hidden="true">R</span>
          <span className="wordmark-text">
            <strong>RAHUL</strong>
            <small>FIRE SAFETY</small>
          </span>
        </a>

        <nav id="site-navigation" className={open ? "site-nav is-open" : "site-nav"}>
          <a href="#about" onClick={close}>About</a>
          <a href="#services" onClick={close}>Services</a>
          <a href="#systems" onClick={close}>Systems</a>
          <a href="#work" onClick={close}>Work</a>
          <a href="#clients" onClick={close}>Clients</a>
          <a href="#contact" onClick={close}>Contact</a>
          <a className="nav-cta nav-cta--mobile" href="#contact" onClick={close}>Request a survey</a>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={`tel:${PHONE_PRIMARY}`}>
            <span className="header-phone-icon" aria-hidden="true">✆</span>
            <span>{PHONE_PRIMARY_DISPLAY}</span>
          </a>
          <a className="nav-cta" href="#contact">Request a survey</a>
          <ThemeToggle />
          <button
            type="button"
            className="menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-navigation"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-media" aria-hidden="true">
        <img src="/assets/hero.jpg" alt="" fetchPriority="high" />
        <div className="hero-scrim" />
      </div>
      <div className="hero-inner">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Since 2001 · ISO 9001:2015 · Rahul Enterprises
          </p>
          <h1>
            Fire protection<br />
            <span className="text-flame">built to stand ready.</span>
          </h1>
          <p className="hero-lead">
            For 25 years, Rahul Fire Safety has designed, installed and maintained
            the systems that protect people and property across North India — from
            refineries and power utilities to hospitality and banking.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#contact">Request a site survey</a>
            <a className="button button--ghost" href={`tel:${PHONE_PRIMARY}`}>
              <span aria-hidden="true">✆</span> Call an engineer
            </a>
          </div>
          <ul className="hero-trust">
            <li><strong>25+ yrs</strong> in the field</li>
            <li><strong>NBC · NFPA</strong> engineered</li>
            <li><strong>Design → AMC</strong> one partner</li>
          </ul>
        </div>
      </div>
      <a className="hero-scroll" href="#clients" aria-label="Scroll to see our clients">
        <span>Trusted by India's landmarks</span>
        <span className="hero-scroll-line" />
      </a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Client bar                                                         */
/* ------------------------------------------------------------------ */

function ClientBar() {
  return (
    <section className="client-bar" id="clients">
      <div className="client-bar-inner">
        <p className="client-bar-label">Trusted to protect</p>
        <div className="client-bar-marquee">
          <div className="client-bar-track">
            {clientLogos.map((c) => (
              <img key={c.alt} src={c.src} alt={c.alt} decoding="async" />
            ))}
            {clientLogos.map((c) => (
              <img key={`${c.alt}-dup`} src={c.src} alt="" aria-hidden="true" decoding="async" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                   */
/* ------------------------------------------------------------------ */

function Kicker({ children }) {
  return (
    <p className="kicker" data-reveal>
      <span className="kicker-bar" /> {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                             */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section className="section about" id="about">
      <div className="about-grid">
        <div className="about-copy">
          <Kicker>Who we are</Kicker>
          <h2 data-reveal>A quarter-century of fire engineering you can rely on.</h2>
          <p data-reveal>
            Founded in the early 2000s by Mr. Neeraj Singh, Rahul Fire Safety (a unit of
            Rahul Enterprises) executes practical fire engineering and mechanical projects
            built to protect people and property from fire risk.
          </p>
          <p data-reveal>
            A dedicated design and engineering capability — backed by quality control at
            both site and workshop — lets us deliver accountable, audit-ready work for
            industrial and commercial facilities across the NCR and beyond.
          </p>
          <div className="standard-strip" data-reveal>
            <span className="standard-strip-label">Engineered to</span>
            <span>NBC</span><span>TAC</span><span>NFPA</span><span>FM Global</span>
          </div>
          <a className="button button--primary" href="#contact" data-reveal>Start your safety plan</a>
        </div>
        <div className="about-media" data-reveal>
          <img src="/assets/about-team.jpg" alt="Rahul Fire Safety engineers inspecting a fire control panel" loading="lazy" decoding="async" />
          <div className="about-media-badge">
            <strong>Est. 2001</strong>
            <span>Neeraj Singh, Founder</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats                                                             */
/* ------------------------------------------------------------------ */

function Stats() {
  return (
    <section className="stats" style={{ backgroundImage: "url(/assets/installation.jpg)" }}>
      <div className="stats-scrim" />
      <div className="stats-inner">
        <div className="stats-head" data-reveal>
          <Kicker>The record</Kicker>
          <h2>Numbers that carry weight.</h2>
        </div>
        <div className="stats-grid">
          {stats.map(([value, label, note]) => (
            <div className="stat" key={label} data-reveal>
              <strong className="stat-value">{value}</strong>
              <span className="stat-label">{label}</span>
              <span className="stat-note">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Services                                                          */
/* ------------------------------------------------------------------ */

function Services() {
  return (
    <section className="section services" id="services">
      <div className="section-head">
        <div>
          <Kicker>What we do</Kicker>
          <h2 data-reveal>One team from fire risk to readiness.</h2>
        </div>
        <p className="section-head-note" data-reveal>
          Most clients come to us for one thing and stay for all six. Every stage is
          handled in-house, so nothing falls between vendors.
        </p>
      </div>
      <div className="services-grid">
        {services.map(([num, title, text, icon]) => (
          <article className="service-card" key={title} data-reveal>
            <div className="service-card-top">
              <span className="service-icon"><Icon name={icon} /></span>
              <span className="service-num">{num}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <a className="service-link" href="#contact">Enquire <span aria-hidden="true">→</span></a>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Systems                                                           */
/* ------------------------------------------------------------------ */

function Systems() {
  return (
    <section className="systems" id="systems" style={{ backgroundImage: "url(/assets/embers.jpg)" }}>
      <div className="systems-scrim" />
      <div className="systems-inner">
        <div className="systems-copy">
          <Kicker>Engineered solutions</Kicker>
          <h2 data-reveal>Systems selected for the hazard — not the checklist.</h2>
          <p data-reveal>
            The right suppression system depends on what you're protecting. We design,
            supply and commission the full range, then keep them response-ready.
          </p>
          <a className="button button--primary" href="#contact" data-reveal>Discuss your facility</a>
        </div>
        <ul className="systems-list" data-reveal>
          {systems.map(([s, icon]) => (
            <li key={s}><span className="systems-icon" aria-hidden="true"><Icon name={icon} /></span>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Why us                                                            */
/* ------------------------------------------------------------------ */

function WhyUs() {
  return (
    <section className="section why" id="why">
      <div className="section-head">
        <div>
          <Kicker>Why Rahul Fire Safety</Kicker>
          <h2 data-reveal>The edge is accountability.</h2>
        </div>
        <p className="section-head-note" data-reveal>
          Fire safety is bought on trust. Here's what 25 years of it looks like in practice.
        </p>
      </div>
      <div className="why-grid">
        {whyUs.map(([title, text], i) => (
          <article className="why-card" key={title} data-reveal>
            <span className="why-num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Work (real photos)                                                */
/* ------------------------------------------------------------------ */

function Work() {
  return (
    <section className="section work" id="work">
      <div className="section-head">
        <div>
          <Kicker>Our work</Kicker>
          <h2 data-reveal>Installed where performance matters.</h2>
        </div>
        <p className="section-head-note" data-reveal>
          Real installations delivered by our teams — a sample of the sites we protect.
        </p>
      </div>
      <div className="work-grid">
        {projects.map((p) => (
          <figure className="work-item" key={p.caption} data-reveal>
            <div className="work-image">
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
            </div>
            <figcaption>
              <strong>{p.caption}</strong>
              <span>{p.place}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Credentials                                                       */
/* ------------------------------------------------------------------ */

function Credentials() {
  return (
    <section className="section credentials">
      <div className="section-head">
        <div>
          <Kicker>Credentials & clients</Kicker>
          <h2 data-reveal>Certified, registered, and chosen by the best.</h2>
        </div>
      </div>
      <div className="credential-marks" data-reveal>
        {trustMarks.map((m) => (
          <figure key={m.label}>
            <img src={m.src} alt={m.alt} loading="lazy" decoding="async" />
            <figcaption>{m.label}</figcaption>
          </figure>
        ))}
      </div>
      <p className="credential-clients-title" data-reveal>Organisations that trust us</p>
      <div className="credential-clients" data-reveal>
        {clientLogos.map((c) => (
          <figure key={c.alt}>
            <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
      <p className="credential-note" data-reveal>
        Marks reproduced from the Rahul Fire Safety company profile. Supporting credentials
        and customer references can be shared during project evaluation.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Enquiry form                                                      */
/* ------------------------------------------------------------------ */

function SurveyForm() {
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    facility: "",
    requirement: "",
    message: "",
  });

  const update = (e) => {
    const { name, value } = e.target;
    setDetails((d) => ({ ...d, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const subject = `Website enquiry: ${details.requirement} - ${details.name}`;
    const body = [
      "Hello Rahul Fire Safety,",
      "",
      "I would like to discuss a fire safety requirement.",
      "",
      `Name: ${details.name}`,
      `Phone: ${details.phone}`,
      `Facility type: ${details.facility}`,
      `Requirement: ${details.requirement}`,
      `Details: ${details.message || "Please contact me to discuss the site."}`,
      "",
      "Regards,",
      details.name,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="survey-form" onSubmit={submit} id="enquiry">
      <p className="survey-form-title">Lodge an enquiry</p>
      <p className="survey-form-intro">Tell us about your site — our engineering team will respond.</p>
      <div className="form-grid">
        <label className="form-field">
          <span>Name</span>
          <input required autoComplete="name" name="name" value={details.name} onChange={update} placeholder="Your name" />
        </label>
        <label className="form-field">
          <span>Phone</span>
          <input required autoComplete="tel" inputMode="tel" name="phone" value={details.phone} onChange={update} placeholder="+91" />
        </label>
        <label className="form-field">
          <span>Facility</span>
          <select required name="facility" value={details.facility} onChange={update}>
            <option value="" disabled>Select type</option>
            <option>Industrial facility</option>
            <option>Commercial building</option>
            <option>Hospitality or retail</option>
            <option>Institutional premises</option>
            <option>Residential project</option>
            <option>Other</option>
          </select>
        </label>
        <label className="form-field">
          <span>Requirement</span>
          <select required name="requirement" value={details.requirement} onChange={update}>
            <option value="" disabled>Select service</option>
            <option>Site survey or audit</option>
            <option>Design and consultancy</option>
            <option>New installation</option>
            <option>Equipment supply</option>
            <option>AMC and maintenance</option>
          </select>
        </label>
        <label className="form-field form-field--wide">
          <span>Project details</span>
          <textarea name="message" value={details.message} onChange={update} rows="3" placeholder="Location, facility size or required timeline" />
        </label>
      </div>
      <button className="button button--primary survey-submit" type="submit">Prepare enquiry email</button>
      <p className="form-note">Opens in your email app for a final review before sending.</p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                           */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="contact-grid">
        <div className="contact-copy">
          <Kicker>Let's stay connected</Kicker>
          <h2 data-reveal>Bring your premises into a prepared plan.</h2>
          <p data-reveal>
            Whether it's a fresh installation, an audit, or an AMC handover, a short
            conversation is the fastest way to a safer site.
          </p>
          <div className="contact-details" data-reveal>
            <div className="contact-row">
              <span className="contact-row-label">Call</span>
              <div>
                <a href={`tel:${PHONE_PRIMARY}`}>{PHONE_PRIMARY_DISPLAY}</a>
                <a href={`tel:${PHONE_SECONDARY}`}>{PHONE_SECONDARY_DISPLAY}</a>
              </div>
            </div>
            <div className="contact-row">
              <span className="contact-row-label">Email</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div className="contact-row">
              <span className="contact-row-label">Visit</span>
              <p>20, New Vaishali Vihar, Delhi Road,<br />Saharanpur, UP 247001</p>
            </div>
          </div>
          <div className="contact-cta-row" data-reveal>
            <a className="button button--primary" href={`tel:${PHONE_PRIMARY}`}>Call now</a>
            <a className="button button--whatsapp" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          </div>
        </div>
        <div className="contact-form-wrap" data-reveal>
          <SurveyForm />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Finale + footer                                                   */
/* ------------------------------------------------------------------ */

function Finale() {
  return (
    <section className="finale" style={{ backgroundImage: "url(/assets/equipment.jpg)" }}>
      <div className="finale-scrim" />
      <div className="finale-inner" data-reveal>
        <p className="finale-kicker">Rahul Fire Safety · Since 2001</p>
        <h2>Protecting life<br /><span className="text-flame">&amp; property.</span></h2>
        <a className="button button--primary button--lg" href="#contact">Request a site survey</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="wordmark wordmark--footer">
            <span className="wordmark-mark" aria-hidden="true">R</span>
            <span className="wordmark-text"><strong>RAHUL</strong><small>FIRE SAFETY</small></span>
          </div>
          <p>Fire protection consultants &amp; engineers. Design, supply, installation, audits and maintenance across North India.</p>
          <p className="footer-iso">ISO 9001:2015 · MSME · GeM registered</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <p>Explore</p>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#systems">Systems</a>
          <a href="#work">Work</a>
          <a href="#clients">Clients</a>
        </nav>
        <div className="footer-contact">
          <p>Contact</p>
          <a href={`tel:${PHONE_PRIMARY}`}>{PHONE_PRIMARY_DISPLAY}</a>
          <a href={`tel:${PHONE_SECONDARY}`}>{PHONE_SECONDARY_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <p className="footer-address">Saharanpur, Uttar Pradesh 247001</p>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Rahul Fire Safety · Rahul Enterprises</span>
        <span>Save life &amp; property</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating contact                                                  */
/* ------------------------------------------------------------------ */

function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`fab ${open ? "is-open" : ""}`}>
      <div className="fab-menu" role="menu" aria-hidden={!open}>
        <a className="fab-item fab-item--call" href={`tel:${PHONE_PRIMARY}`} role="menuitem" tabIndex={open ? 0 : -1}>
          <span aria-hidden="true">✆</span> Call now
        </a>
        <a className="fab-item fab-item--whatsapp" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" role="menuitem" tabIndex={open ? 0 : -1}>
          <span aria-hidden="true">◍</span> WhatsApp
        </a>
        <a className="fab-item fab-item--enquiry" href="#contact" role="menuitem" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          <span aria-hidden="true">✎</span> Enquiry form
        </a>
      </div>
      <button
        type="button"
        className="fab-toggle"
        aria-label={open ? "Close contact menu" : "Contact us"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="fab-toggle-label">{open ? "Close" : "Contact"}</span>
        <span className="fab-toggle-icon" aria-hidden="true">{open ? "×" : "✆"}</span>
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                               */
/* ------------------------------------------------------------------ */

export default function App() {
  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClientBar />
        <About />
        <Stats />
        <Services />
        <Systems />
        <WhyUs />
        <Work />
        <Credentials />
        <Contact />
        <Finale />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
