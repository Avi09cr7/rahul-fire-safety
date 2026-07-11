import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const PHONE_PRIMARY = "+919412525987";
const PHONE_SECONDARY = "+919719159819";
const PHONE_PRIMARY_DISPLAY = "+91 94125 25987";
const PHONE_SECONDARY_DISPLAY = "+91 97191 59819";
const EMAIL = "rahulfire2001@yahoo.com";
const EMAIL_SECONDARY = "contact@rahulfiresafety.com";
const WEBSITE_DISPLAY = "www.rahulfiresafety.com";
const INSTAGRAM = "rahulfiresafety";
const WHATSAPP = "919412525987";

// Paste the free access key from https://web3forms.com (enter rahulfire2001@yahoo.com
// there to receive it) between the quotes. Until then, the form falls back to
// opening the visitor's email app with a pre-filled draft.
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

const stats = [
  ["23+", "Years protecting life & property", "Since 2003"],
  ["5000+", "Projects delivered", "Across two decades"],
  ["19+", "Cities served", "North & central India"],
  ["ISO", "9001:2015 certified quality", "Accountable delivery"],
];

// "Area's we deal in" — straight from the company profile.
const services = [
  ["01", "Designing", "Layouts engineered to NBC, TAC and NFPA standards using AutoCAD, Hydraulic Cal and Sprinkcad.", "compass"],
  ["02", "System Installation", "Detection, hydrant, sprinkler and suppression systems executed by our own site teams.", "wrench"],
  ["03", "Equipment Supply", "Extinguishers, hose reels and fire protection equipment — correctly specified and supplied.", "extinguisher"],
  ["04", "Annual Maintenance", "AMC inspection and upkeep that keeps every system response-ready, year after year.", "refresh"],
  ["05", "Audits", "Site risk reviews and compliance audits that hold up to scrutiny.", "shield"],
  ["06", "Consultancy", "Guidance from qualified engineers across the full fire-protection project lifecycle.", "people"],
];

// "Systems we provide" — the seven from the brochure.
const systems = [
  ["Automatic hydrant & wet riser systems", "gauge"],
  ["Clean agent fire suppression systems", "shield"],
  ["CO₂ flooding systems", "cylinder"],
  ["Nitrogen injection systems", "gas"],
  ["High velocity water spray systems", "droplet"],
  ["Kitchen hood extinguishing systems", "flame"],
  ["Medium velocity water spray systems", "spray"],
];

const whyUs = [
  [
    "One partner, start to finish",
    "Design, installation, equipment supply, audits and AMC under a single accountable roof — no coordination gaps, no finger-pointing.",
  ],
  [
    "Engineered to code, every time",
    "A dedicated design & engineering division works every layout to NBC, TAC and NFPA standards, so what we install passes audit and performs when it matters.",
  ],
  [
    "Two decades, still answering the phone",
    "Over 20 years of continuous practice since 2003. The systems we commissioned years ago are still maintained by the same hands.",
  ],
  [
    "Proven where failure isn't an option",
    "Distilleries, ethanol plants, paper mills, malls, hospitality and institutions across 19+ cities trust us with their people and assets.",
  ],
];

/* Projects grouped by type — each group becomes an auto-scrolling row. */
const projectGroups = [
  {
    title: "Distilleries",
    items: [
      { src: "/assets/projects/distillery-raipur-chhattisgarh.jpg", label: "Distillery", place: "Raipur, Chhattisgarh" },
      { src: "/assets/projects/distillery-sangrur-punjab.jpg", label: "Distillery", place: "Sangrur, Punjab" },
      { src: "/assets/projects/distillery-bareilly-up.jpg", label: "Distillery", place: "Bareilly, UP" },
      { src: "/assets/projects/distillery-jabalpur-mp.jpg", label: "Distillery", place: "Jabalpur, MP" },
      { src: "/assets/projects/distillery-mau-up.jpg", label: "Distillery", place: "Mau, UP" },
    ],
  },
  {
    title: "Ethanol & process plants",
    items: [
      { src: "/assets/projects/ethanol-plant-bhatinda-punjab.jpg", label: "Ethanol Plant", place: "Bhatinda, Punjab" },
      { src: "/assets/projects/ethanol-plant-malda-west-bengal.jpg", label: "Ethanol Plant", place: "Malda, West Bengal" },
      { src: "/assets/projects/paper-mill-saharanpur-up.jpg", label: "Paper Mill", place: "Saharanpur, UP" },
      { src: "/assets/projects/haldirams-plant-noida-up.jpg", label: "Haldiram's Plant", place: "Noida, UP" },
    ],
  },
  {
    title: "Commercial & residential",
    items: [
      { src: "/assets/projects/mall-ghaziabad-up.jpg", label: "Mall", place: "Ghaziabad, UP" },
      { src: "/assets/projects/residential-apartment-greater-noida-up.jpg", label: "Residential Apartment", place: "Greater Noida, UP" },
    ],
  },
];

/* Marquee clients & government tenders — named accounts from the profile. */
const marqueeClients = [
  "Goenka — Star Paper Mill, Saharanpur",
  "Devbhoomi Group, Uttarakhand",
  "ITC, Haridwar",
  "Marriott, Haridwar",
  "Mall of Dehradun, Uttarakhand",
  "Haldiram's",
  "BCL Ethanol, Punjab",
];

/* Certifications, registrations and channel partners — one uniform rail. */
const credentialMarks = [
  { src: "/assets/certs/iso.png", alt: "ISO 9001:2015 certification mark", label: "ISO 9001:2015", type: "Certified" },
  { src: "/assets/certs/msme.png", alt: "MSME registration mark", label: "MSME", type: "Registered" },
  { src: "/assets/certs/gem-government-e-marketplace.png", alt: "Government e-Marketplace mark", label: "GeM", type: "Registered" },
  { src: "/assets/certs/isi-mark.png", alt: "ISI mark", label: "ISI", type: "Marked" },
  { src: "/assets/certs/ce-mark.png", alt: "CE mark", label: "CE", type: "Marked" },
  { src: "/assets/certs/channel-partner-cease-fire.png", alt: "Ceasefire logo", label: "Ceasefire", type: "Channel partner" },
  { src: "/assets/certs/channel-partner-mitras.png", alt: "Mitras logo", label: "Mitras", type: "Channel partner" },
  { src: "/assets/certs/channel-partner-newtech.png", alt: "Newtech logo", label: "Newtech", type: "Channel partner" },
  { src: "/assets/certs/channel-partner-rapidex.png", alt: "Rapidex Worldwide Express logo", label: "Rapidex", type: "Channel partner" },
];

/* Equipment we supply — stated plainly instead of a brochure collage. */
const equipment = [
  ["Fire extinguishers", "CO₂, DCP, ABC, foam and clean-agent types — sized and sited to the hazard.", "extinguisher"],
  ["Hydrant & wet riser hardware", "Landing valves, hoses, couplings, branch pipes and hose boxes.", "gauge"],
  ["Hose reels & cabinets", "Swing-type reels, nozzles and enclosures for first-response cover.", "refresh"],
  ["Detection & alarm", "Panels, smoke and heat detectors, hooters and manual call points.", "alarm"],
  ["Sprinklers & spray nozzles", "Quartzoid bulbs, MV / HV spray nozzles and installation fittings.", "droplet"],
  ["Signage & safety accessories", "Photoluminescent signage, fire buckets, blankets and PPE.", "shield"],
];

/* Full client roster (transparent logos shown on white tiles). */
const clientLogos = [
  { src: "/assets/clients/indian-oil.png", alt: "IndianOil" },
  { src: "/assets/clients/bharat-petroleum.png", alt: "Bharat Petroleum" },
  { src: "/assets/clients/hindustan-petroleum.png", alt: "Hindustan Petroleum" },
  { src: "/assets/clients/bhel.png", alt: "BHEL" },
  { src: "/assets/clients/powergrid.png", alt: "POWERGRID" },
  { src: "/assets/clients/iffco.png", alt: "IFFCO" },
  { src: "/assets/clients/indian-railway.png", alt: "Indian Railway" },
  { src: "/assets/clients/upptcl.png", alt: "UP Power Transmission Corporation" },
  { src: "/assets/clients/mhada.png", alt: "MHADA" },
  { src: "/assets/clients/tata.png", alt: "TATA" },
  { src: "/assets/clients/haldirams.png", alt: "Haldiram's" },
  { src: "/assets/clients/star-paper.png", alt: "Star Paper" },
  { src: "/assets/clients/bajaj-sugar.png", alt: "Bajaj Sugar" },
  { src: "/assets/clients/uttam-sugar.png", alt: "Uttam Sugar" },
  { src: "/assets/clients/uttam-energy.png", alt: "Uttam Energy" },
  { src: "/assets/clients/snj-bio-products.png", alt: "SNJ Bio Products" },
  { src: "/assets/clients/indian-herbs.png", alt: "Indian Herbs" },
  { src: "/assets/clients/central-pulp-and-paper-research-institute.jpg", alt: "Central Pulp & Paper Research Institute" },
  { src: "/assets/clients/vapco-engineers.png", alt: "Vapco Engineers" },
  { src: "/assets/clients/icici-bank.png", alt: "ICICI Bank" },
  { src: "/assets/clients/hdfc-bank.png", alt: "HDFC Bank" },
  { src: "/assets/clients/sbi.png", alt: "State Bank of India" },
  { src: "/assets/clients/axis-bank.png", alt: "Axis Bank" },
  { src: "/assets/clients/pvr-cinemas.png", alt: "PVR Cinemas" },
  { src: "/assets/clients/dominos-pizza.png", alt: "Domino's Pizza" },
  { src: "/assets/clients/taco-bell.png", alt: "Taco Bell" },
  { src: "/assets/clients/trends.png", alt: "Trends" },
  { src: "/assets/clients/shipra-mall.jpg", alt: "Shipra Mall" },
  { src: "/assets/clients/alm.png", alt: "ALM" },
  { src: "/assets/clients/amity-university.png", alt: "Amity University" },
  { src: "/assets/clients/iit-roorkee-emblem.png", alt: "IIT Roorkee" },
  { src: "/assets/clients/dev-bhoomi-uttarakhand-university.jpg", alt: "Dev Bhoomi Uttarakhand University" },
  { src: "/assets/clients/delhi-public-school.png", alt: "Delhi Public School" },
  { src: "/assets/clients/mount-litera-zee-school.png", alt: "Mount Litera Zee School" },
  { src: "/assets/clients/nalanda-world-school.png", alt: "Nalanda World School" },
];

/* Curated subset for the top marquee strip (strongest, most recognisable). */
const marqueeLogos = [
  "indian-oil.png", "bharat-petroleum.png", "hindustan-petroleum.png", "bhel.png",
  "powergrid.png", "iffco.png", "indian-railway.png", "tata.png", "haldirams.png",
  "icici-bank.png", "hdfc-bank.png", "sbi.png", "pvr-cinemas.png", "amity-university.png",
].map((f) => clientLogos.find((c) => c.src.endsWith(f))).filter(Boolean);

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
  // Always start in dark; the choice is intentionally NOT persisted, so a
  // refresh reverts to dark (the reliable default) while the light theme is
  // still a work in progress.
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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
          <img className="wordmark-logo" src="/assets/rahul-logo.png" alt="Rahul Fire Safety" width="1588" height="352" />
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
            <span className="eyebrow-dot" /> Since 2003 · ISO 9001:2015 · Save life, save property
          </p>
          <h1>
            Fire protection<br />
            <span className="text-flame">built to stand ready.</span>
          </h1>
          <div className="hero-actions">
            <a className="button button--primary" href="#contact">Request a site survey</a>
            <a className="button button--ghost" href={`tel:${PHONE_PRIMARY}`}>
              <span aria-hidden="true">✆</span> Call an engineer
            </a>
          </div>
          <dl className="hero-stats">
            <div className="hero-stat">
              <dt>23<span>+</span></dt>
              <dd>Years of experience</dd>
            </div>
            <div className="hero-stat">
              <dt>5000<span>+</span></dt>
              <dd>Projects delivered</dd>
            </div>
            <div className="hero-stat">
              <dt>19<span>+</span></dt>
              <dd>Cities served</dd>
            </div>
            <div className="hero-stat hero-stat--code">
              <dt>NBC · TAC · NFPA</dt>
              <dd>Engineered to standard</dd>
            </div>
          </dl>
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
            {marqueeLogos.map((c) => (
              <span className="client-cell" key={c.alt}>
                <img src={c.src} alt={c.alt} decoding="async" />
              </span>
            ))}
            {marqueeLogos.map((c) => (
              <span className="client-cell" key={`${c.alt}-dup`} aria-hidden="true">
                <img src={c.src} alt="" decoding="async" />
              </span>
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
          <h2 data-reveal>Over two decades of fire engineering you can rely on.</h2>
          <p data-reveal>
            Founded in the early 2000s by Mr. Neeraj Singh and today led by its managing
            partners, Rahul Fire Safety is one of the leading names in fire safety projects —
            protecting people and property from fire risk with over two decades of major
            project experience.
          </p>
          <p data-reveal>
            A dedicated design & engineering division of qualified engineers works to National
            and International standards — NBC, TAC and NFPA — using AutoCAD, Hydraulic Cal and
            Sprinkcad. A standing quality-control team assures standards at both site and
            workshop, for a one-stop, accountable fire-protection solution.
          </p>
          <div className="standard-strip" data-reveal>
            <span className="standard-strip-label">Engineered to</span>
            <span>NBC</span><span>TAC</span><span>NFPA</span>
          </div>
          <a className="button button--primary" href="#contact" data-reveal>Start your safety plan</a>
        </div>
        <div className="about-media" data-reveal>
          <img src="/assets/about-team.jpg" alt="Rahul Fire Safety engineers inspecting a fire control panel" loading="lazy" decoding="async" />
          <div className="about-media-badge">
            <strong>Est. 2003</strong>
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
          <h2>Serving 19+ cities with 5000+ projects.</h2>
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
          <Kicker>Areas we deal in</Kicker>
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
          <Kicker>Systems we provide</Kicker>
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
/*  Equipment we supply                                               */
/* ------------------------------------------------------------------ */

function Equipment() {
  return (
    <section className="section equipment" id="equipment">
      <div className="section-head">
        <div>
          <Kicker>Our products</Kicker>
          <h2 data-reveal>The equipment we supply — correctly specified.</h2>
        </div>
        <p className="section-head-note" data-reveal>
          Sourced and supplied alongside every installation and AMC, so what arrives on
          site matches what the design demands.
        </p>
      </div>
      <div className="equip-grid">
        {equipment.map(([title, text, icon]) => (
          <article className="equip-card" key={title} data-reveal>
            <span className="service-icon" aria-hidden="true"><Icon name={icon} /></span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
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
          Fire safety is bought on trust. Here's what two decades of it looks like in practice.
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
/*  Work — auto-scrolling rows, one per project type                  */
/* ------------------------------------------------------------------ */

// Repeat a short list until it comfortably fills a marquee row.
function fill(items, min) {
  if (items.length === 0) return items;
  const out = [];
  while (out.length < min) out.push(...items);
  return out;
}

function WorkRow({ group, reverse }) {
  const base = fill(group.items, 6);
  const loop = [...base, ...base]; // second copy makes the -50% translate seamless
  return (
    <div className="work-row" data-reveal>
      <p className="work-row-title"><span className="kicker-bar" /> {group.title}</p>
      <div className="work-marquee">
        <div className={`work-track ${reverse ? "work-track--rev" : ""}`}>
          {loop.map((p, i) => {
            const dup = i >= base.length;
            return (
              <figure className="work-card" key={i} aria-hidden={dup}>
                <div className="work-card-image">
                  <img src={p.src} alt={dup ? "" : `${p.label} — ${p.place}`} loading="lazy" decoding="async" />
                </div>
                <figcaption>
                  <strong>{p.label}</strong>
                  <span>{p.place}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Work() {
  return (
    <section className="section work" id="work">
      <div className="section-head">
        <div>
          <Kicker>Our work</Kicker>
          <h2 data-reveal>Installed where performance matters.</h2>
        </div>
        <p className="section-head-note" data-reveal>
          Real installations delivered by our teams — grouped by the kind of site we protect.
        </p>
      </div>
      <div className="work-rows">
        {projectGroups.map((group, i) => (
          <WorkRow key={group.title} group={group} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Clients & credentials                                             */
/* ------------------------------------------------------------------ */

function Credentials() {
  return (
    <section className="section credentials" id="credentials">
      <div className="section-head">
        <div>
          <Kicker>Clients & credentials</Kicker>
          <h2 data-reveal>Certified, registered, and chosen by the best.</h2>
        </div>
        <p className="section-head-note" data-reveal>
          Serving 19+ cities with 5000+ projects across two decades — for public-sector
          undertakings, industry leaders and government tenders alike.
        </p>
      </div>

      <div className="marks-rail" data-reveal>
        {credentialMarks.map((m) => (
          <figure className="mark" key={m.label}>
            <span className="mark-logo"><img src={m.src} alt={m.alt} loading="lazy" decoding="async" /></span>
            <figcaption>
              <strong>{m.label}</strong>
              <span>{m.type}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="marquee-clients" data-reveal>
        <p className="cred-block-title">MEP clients & government tenders</p>
        <ul className="marquee-clients-list">
          {marqueeClients.map((name) => (
            <li key={name}><span className="marquee-client-dot" aria-hidden="true" />{name}</li>
          ))}
        </ul>
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
        Client and certification marks are reproduced from the Rahul Fire Safety company profile.
        Supporting credentials and customer references can be shared during project evaluation.
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
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error

  const update = (e) => {
    const { name, value } = e.target;
    setDetails((d) => ({ ...d, [name]: value }));
  };

  const mailtoFallback = () => {
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

  const submit = async (e) => {
    e.preventDefault();

    // Until a Web3Forms key is set, keep the reliable mailto behaviour.
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      mailtoFallback();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Website enquiry: ${details.requirement || "General"} — ${details.name}`,
          from_name: "Rahul Fire Safety website",
          name: details.name,
          phone: details.phone,
          facility_type: details.facility,
          requirement: details.requirement,
          message: details.message || "(no additional details)",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("ok");
        setDetails({ name: "", phone: "", facility: "", requirement: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

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
            <option>Distillery or ethanol plant</option>
            <option>Industrial or process facility</option>
            <option>Commercial building or mall</option>
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
      <button className="button button--primary survey-submit" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send enquiry"}
      </button>
      {status === "ok" && (
        <p className="form-note form-note--ok" role="status">Thank you — your enquiry has been sent. We'll be in touch shortly.</p>
      )}
      {status === "error" && (
        <p className="form-note form-note--error" role="alert">
          Something went wrong. Please call {PHONE_PRIMARY_DISPLAY} or email {EMAIL}.
        </p>
      )}
      {status === "idle" && (
        <p className="form-note">Your details go straight to our team at {EMAIL}.</p>
      )}
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
              <div>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <a href={`mailto:${EMAIL_SECONDARY}`}>{EMAIL_SECONDARY}</a>
              </div>
            </div>
            <div className="contact-row">
              <span className="contact-row-label">Online</span>
              <div>
                <a href={`https://${WEBSITE_DISPLAY}`} target="_blank" rel="noopener noreferrer">{WEBSITE_DISPLAY}</a>
                <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer">@{INSTAGRAM}</a>
              </div>
            </div>
            <div className="contact-row">
              <span className="contact-row-label">Visit</span>
              <p>Delhi Road, Saharanpur,<br />Uttar Pradesh 247001, India</p>
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
        <p className="finale-kicker">Rahul Fire Safety · Since 2003</p>
        <h2>Save life<br /><span className="text-flame">&amp; property.</span></h2>
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
          <img className="wordmark-logo wordmark-logo--footer" src="/assets/rahul-logo.png" alt="Rahul Fire Safety" width="1588" height="352" />
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
          <p className="footer-address">Delhi Road, Saharanpur, Uttar Pradesh 247001</p>
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
        <Equipment />
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
