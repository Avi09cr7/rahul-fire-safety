import { useEffect, useRef, useState } from "react";
import EquipmentShowcase, {
  EquipmentIllustration,
} from "./components/EquipmentShowcase";
import HoseProgress from "./components/HoseProgress";

const PHONE_PRIMARY = "+919412525987";
const PHONE_SECONDARY = "+919719159819";
const PHONE_PRIMARY_DISPLAY = "+91 94125 25987";
const PHONE_SECONDARY_DISPLAY = "+91 97191 59819";
const EMAIL = "rahulfire2001@yahoo.com";
const EMAIL_SECONDARY = "contact@rahulfiresafety.com";
const INSTAGRAM = "rahulfiresafety";
const WHATSAPP = "919412525987";

const services = [
  [
    "01",
    "Designing",
    "Layouts engineered to NBC, TAC and NFPA standards using AutoCAD, Hydraulic Cal and Sprinkcad.",
    "compass",
  ],
  [
    "02",
    "System Installation",
    "Detection, hydrant, sprinkler and suppression systems executed by our own site teams.",
    "wrench",
  ],
  [
    "03",
    "Equipment Supply",
    "Extinguishers, hose reels and fire protection equipment — correctly specified and supplied.",
    "extinguisher",
  ],
  [
    "04",
    "Annual Maintenance",
    "AMC inspection and upkeep that keeps every system response-ready, year after year.",
    "refresh",
  ],
  [
    "05",
    "Audits",
    "Site risk reviews and compliance audits that hold up to scrutiny.",
    "shield",
  ],
  [
    "06",
    "Consultancy",
    "Guidance from qualified engineers across the full fire-protection project lifecycle.",
    "people",
  ],
];

const equipment = [
  [
    "Fire extinguishers",
    "CO₂, DCP, ABC, foam and clean-agent types — sized and sited to the hazard.",
    "extinguisher",
  ],
  [
    "Hydrant & wet riser hardware",
    "Landing valves, hoses, couplings, branch pipes and hose boxes.",
    "gauge",
  ],
  [
    "Hose reels & cabinets",
    "Swing-type reels, nozzles and enclosures for first-response cover.",
    "refresh",
  ],
  [
    "Detection & alarm",
    "Panels, smoke and heat detectors, hooters and manual call points.",
    "alarm",
  ],
  [
    "Sprinklers & spray nozzles",
    "Quartzoid bulbs, MV / HV spray nozzles and installation fittings.",
    "droplet",
  ],
  [
    "Signage & safety accessories",
    "Photoluminescent signage, fire buckets, blankets and PPE.",
    "shield",
  ],
];

const clientLogos = [
  { src: "/assets/trust/indianoil.svg", alt: "IndianOil" },
  {
    src: "/assets/client-originals/bharat-petroleum.svg",
    alt: "Bharat Petroleum",
  },
  {
    src: "/assets/trust/hindustan-petroleum.svg",
    alt: "Hindustan Petroleum",
  },
  { src: "/assets/trust/bhel.svg", alt: "BHEL" },
  {
    src: "/assets/client-originals/powergrid.svg",
    alt: "POWERGRID",
  },
  { src: "/assets/client-originals/iffco.svg", alt: "IFFCO" },
  { src: "/assets/clients/indian-railway.png", alt: "Indian Railway" },
  {
    src: "/assets/clients/upptcl.png",
    alt: "UP Power Transmission Corporation",
  },
  { src: "/assets/clients/mhada.png", alt: "MHADA" },
  { src: "/assets/partners/tata.svg", alt: "TATA" },
  {
    src: "/assets/client-originals/haldirams.svg",
    alt: "Haldiram's",
  },
  { src: "/assets/clients/star-paper.png", alt: "Star Paper" },
  { src: "/assets/clients/bajaj-sugar.png", alt: "Bajaj Sugar" },
  { src: "/assets/clients/uttam-sugar.png", alt: "Uttam Sugar" },
  { src: "/assets/clients/snj-bio-products.png", alt: "Uttam Energy" },
  { src: "/assets/clients/uttam-energy.png", alt: "SNJ Bio Products" },
  { src: "/assets/clients/indian-herbs.png", alt: "Indian Herbs" },
  {
    src: "/assets/clients/central-pulp-and-paper-research-institute.jpg",
    alt: "Central Pulp & Paper Research Institute",
  },
  { src: "/assets/clients/vapco-engineers.png", alt: "Vapco Engineers" },
  { src: "/assets/trust/icici-bank.svg", alt: "ICICI Bank" },
  { src: "/assets/partners/hdfc.svg", alt: "HDFC Bank" },
  {
    src: "/assets/client-originals/sbi.svg",
    alt: "State Bank of India",
  },
  { src: "/assets/client-originals/axis.svg", alt: "Axis Bank" },
  { src: "/assets/clients/pvr-cinemas.png", alt: "PVR Cinemas" },
  {
    src: "/assets/client-originals/dominos.svg",
    alt: "Domino's Pizza",
  },
  { src: "/assets/clients/taco-bell.png", alt: "Taco Bell" },
  { src: "/assets/clients/trends.png", alt: "Trends" },
  { src: "/assets/clients/shipra-mall.jpg", alt: "Shipra Mall" },
  { src: "/assets/clients/alm.png", alt: "ALM" },
  { src: "/assets/clients/amity-university.png", alt: "Amity University" },
  {
    src: "/assets/client-originals/iit-roorkee.svg",
    alt: "IIT Roorkee",
  },
  {
    src: "/assets/clients/dev-bhoomi-uttarakhand-university.jpg",
    alt: "Dev Bhoomi Uttarakhand University",
  },
  {
    src: "/assets/clients/delhi-public-school.png",
    alt: "Delhi Public School",
  },
  {
    src: "/assets/clients/mount-litera-zee-school.png",
    alt: "Mount Litera Zee School",
  },
  {
    src: "/assets/clients/nalanda-world-school.png",
    alt: "Nalanda World School",
  },
];

const iconPaths = {
  phone:
    "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7a2 2 0 011.7 2z",
  mail: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm-2 3l10 7L22 7",
  chat: "M21 11.5a8.5 8.5 0 01-8.5 8.5 9.2 9.2 0 01-4-.9L3 21l1.9-5.5a9.2 9.2 0 01-.9-4A8.5 8.5 0 0112.5 3H13a8.5 8.5 0 018 8v.5z",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1116 0zM15 10a3 3 0 11-6 0 3 3 0 016 0z",

  shield: "M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z",
  compass: "M12 3a9 9 0 100 18 9 9 0 000-18zm3.5 5.5l-2 5-5 2 2-5 5-2z",
  wrench:
    "M14.5 5.5a4 4 0 00-5 5L4 16v4h4l5.5-5.5a4 4 0 005-5l-3 3-2-2 3-3a4 4 0 00-2-2z",
  extinguisher:
    "M9 3h4v2l2 1v3H8V6l1-1V3zm-1 7h8v9a2 2 0 01-2 2h-4a2 2 0 01-2-2v-9zm-2-4l2 1M6 6v3",
  people:
    "M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM2 20a6 6 0 0112 0M13 20a6 6 0 019-5.2",
  refresh: "M4 12a8 8 0 0113.9-5.5M20 5v4h-4M20 12a8 8 0 01-13.9 5.5M4 19v-4h4",
  alarm:
    "M6 9a6 6 0 0112 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6zM10 20a2 2 0 004 0M4 5L2 7M20 5l2 2",
  gauge: "M3.5 14a8.5 8.5 0 0117 0M12 14l3.5-3M7 18h10",
  cylinder:
    "M9 4h6M10 4v2.2A4 4 0 008 9.7V19a2 2 0 002 2h4a2 2 0 002-2V9.7A4 4 0 0014 6.2V4M8 11h8",
  droplet: "M12 3c3 3.6 6 6.4 6 10a6 6 0 01-12 0c0-3.6 3-6.4 6-10z",
  spray:
    "M12 6c2.4 2.6 4 4.6 4 7a4 4 0 01-8 0c0-2.4 1.6-4.4 4-7zM6 4l-1-1M18 4l1-1M4 8H2M22 8h-2",
  flame:
    "M13 3c.4 2.7 3 3.8 3 7a4 4 0 01-8 0c0-1.2.5-2.2 1.3-3C9.6 8.9 11 9.5 11 8c0-1.6.9-3.4 2-5zM8 20h8",
  gas: "M12 3a5 5 0 015 5c0 2.8-2.2 4.3-2.2 7A2.8 2.8 0 0112 18a2.8 2.8 0 01-2.8-3C9.2 12.3 7 10.8 7 8a5 5 0 015-5zM10 8h4",
};

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

const EMPTY_ENQUIRY = {
  name: "",
  phone: "",
  facility: "",
  requirement: "",
  message: "",
};
function readEnquiryDraft() {
  try {
    const stored = JSON.parse(
      sessionStorage.getItem("rahul-enquiry-draft") || "{}",
    );
    return Object.fromEntries(
      Object.keys(EMPTY_ENQUIRY).map((key) => [
        key,
        typeof stored?.[key] === "string" ? stored[key] : "",
      ]),
    );
  } catch {
    return { ...EMPTY_ENQUIRY };
  }
}
function prepareEnquiry(details) {
  const message = [
    "Hello Rahul Fire Safety,",
    "",
    "I would like to discuss a fire safety requirement.",
    "",
    `Name: ${details.name.trim()}`,
    `Phone: ${details.phone.trim()}`,
    `Facility: ${details.facility}`,
    `Requirement: ${details.requirement}`,
    `Project details: ${details.message.trim() || "Please contact me to discuss my requirements."}`,
  ].join("\n");
  return {
    message,
    url: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
  };
}
function SurveyForm({ requestedService }) {
  const [details, setDetails] = useState(readEnquiryDraft);
  const [prepared, setPrepared] = useState(() => {
    try {
      if (sessionStorage.getItem("rahul-enquiry-ready") === "1")
        return prepareEnquiry(details);
    } catch {
      /* Storage can be disabled. */
    }
    return null;
  });
  useEffect(() => {
    try {
      sessionStorage.setItem("rahul-enquiry-draft", JSON.stringify(details));
    } catch {
      /* Form remains usable without storage. */
    }
  }, [details]);
  const [copyStatus, setCopyStatus] = useState("");
  useEffect(() => {
    if (requestedService) {
      setDetails((d) => ({ ...d, requirement: requestedService.requirement }));
      setPrepared(null);
      try {
        sessionStorage.removeItem("rahul-enquiry-ready");
      } catch {
        /* Optional storage. */
      }
    }
  }, [requestedService]);
  const update = (event) => {
    const { name, value } = event.target;
    setDetails((d) => ({ ...d, [name]: value }));
    setPrepared(null);
    try {
      sessionStorage.removeItem("rahul-enquiry-ready");
    } catch {
      /* Optional storage. */
    }
    setCopyStatus("");
  };
  const submit = (event) => {
    event.preventDefault();
    const enquiry = prepareEnquiry(details);
    setPrepared(enquiry);
    try {
      sessionStorage.setItem("rahul-enquiry-draft", JSON.stringify(details));
      sessionStorage.setItem("rahul-enquiry-ready", "1");
    } catch {
      /* Navigation does not depend on storage. */
    }
    window.location.assign(enquiry.url);
  };
  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(prepared.message);
      setCopyStatus("Copied. Paste your enquiry into WhatsApp or email.");
    } catch {
      setCopyStatus("Select and copy your enquiry below.");
    }
  };
  return (
    <form className="survey-form" onSubmit={submit} id="enquiry">
      <p className="survey-form-title">Tell us about your project</p>
      <p className="survey-form-intro">
        Share your requirements with our engineering team.
      </p>
      <div className="form-grid">
        <label className="form-field">
          <span>Name</span>
          <input
            required
            autoComplete="name"
            pattern={String.raw`.*\S.*`}
            title="Enter your name"
            maxLength={120}
            name="name"
            value={details.name}
            onChange={update}
            placeholder="Your name"
          />
        </label>
        <label className="form-field">
          <span>Phone</span>
          <input
            required
            autoComplete="tel"
            type="tel"
            pattern={String.raw`(?=(?:\D*\d){7,15}\D*$)[0-9\s\+\-\(\)]{7,24}`}
            title="Enter a valid phone number with 7–15 digits"
            inputMode="tel"
            name="phone"
            value={details.phone}
            onChange={update}
            placeholder="+91"
          />
        </label>
        <label className="form-field">
          <span>Facility</span>
          <select
            required
            name="facility"
            value={details.facility}
            onChange={update}
          >
            <option value="" disabled>
              Select type
            </option>
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
          <select
            required
            name="requirement"
            value={details.requirement}
            onChange={update}
          >
            <option value="" disabled>
              Select service
            </option>
            <option>Site survey or audit</option>
            <option>Design and consultancy</option>
            <option>New installation</option>
            <option>Equipment supply</option>
            <option>AMC and maintenance</option>
          </select>
        </label>
        <label className="form-field form-field--wide">
          <span>Project details</span>
          <textarea
            name="message"
            value={details.message}
            onChange={update}
            rows="3"
            maxLength={1500}
            placeholder="Location, facility size or required timeline"
          />
        </label>
      </div>
      <button className="button button--primary survey-submit" type="submit">
        <Icon name="chat" /> Continue on WhatsApp <Arrow />
      </button>
      <p className="form-note">
        Review your message in WhatsApp, then tap Send.
      </p>
      {prepared && (
        <div className="enquiry-handoff" role="status">
          <h3>Your enquiry is ready</h3>
          <p>
            If WhatsApp hasn’t opened, use the link below or copy your enquiry.
          </p>
          <div className="handoff-actions">
            <a className="contact-action" href={prepared.url}>
              <Icon name="chat" /> Open WhatsApp <Arrow />
            </a>
            <button
              type="button"
              className="contact-action"
              onClick={copyEnquiry}
            >
              Copy enquiry
            </button>
          </div>
          {copyStatus && <p>{copyStatus}</p>}
          {copyStatus.startsWith("Select") && (
            <textarea
              aria-label="Your enquiry to copy"
              readOnly
              value={prepared.message}
              rows={8}
              onFocus={(event) => event.target.select()}
            />
          )}
        </div>
      )}
    </form>
  );
}

const featuredClients = [
  { src: "/assets/trust/indianoil.svg", alt: "IndianOil", kind: "compact" },
  {
    src: "/assets/trust/hindustan-petroleum.svg",
    alt: "Hindustan Petroleum",
    kind: "compact",
  },
  { src: "/assets/trust/bhel.svg", alt: "BHEL", kind: "compact" },
  { src: "/assets/partners/tata.svg", alt: "Tata", kind: "compact" },
  { src: "/assets/partners/hdfc.svg", alt: "HDFC Bank", kind: "wide" },
  { src: "/assets/trust/icici-bank.svg", alt: "ICICI Bank", kind: "wide" },
];
const sectors = [
  {
    name: "Industrial & process",
    image: "/assets/industrial-scale.jpg",
    alt: "Wide view of an industrial refinery, illustrating the industrial sector",
    title: "Complex facilities.\nConsidered protection.",
    description:
      "Fire protection for production environments, process infrastructure and large industrial sites.",
    projects: [
      ["Distillery projects", "Raipur · Sangrur · Bareilly · Jabalpur · Mau"],
      ["Ethanol plants", "Bhatinda · Malda"],
      ["Paper mill", "Saharanpur"],
    ],
  },
  {
    name: "Commercial & residential",
    image: "/assets/projects/mall-ghaziabad-up.jpg",
    alt: "Exterior of Shipra Mall, shown as a facility reference",
    title: "Places people use.\nSystems they rely on.",
    description:
      "Protection for shared spaces, commercial developments and residential buildings.",
    projects: [
      ["Shipra Mall / North India Mall", "Indirapuram, Ghaziabad"],
      ["Residential apartment project", "Greater Noida"],
    ],
  },
  {
    name: "Food & manufacturing",
    image: "/assets/plant-installation.jpg",
    alt: "Process equipment and pipework, illustrating a manufacturing environment",
    title: "Built around\nyour operations.",
    description:
      "An integrated approach to fire protection for manufacturing and food-processing environments.",
    projects: [
      ["Haldiram’s plant", "Noida"],
      ["Other sectors served", "Hospitality · Retail · Institutions"],
    ],
  },
];
const systemDetails = [
  [
    "Fire extinguishers & safety equipment",
    "ABC, CO₂, DCP, foam and clean-agent extinguishers, alongside fire blankets, buckets, signage and personal protective equipment.",
  ],
  [
    "Hydrant & wet riser systems",
    "Integrated water-based infrastructure with hydrants, hose reels and landing valves, designed around the facility.",
  ],
  [
    "Sprinkler & water spray systems",
    "Automatic sprinklers, high-velocity water spray and medium-velocity spray systems specified for the application.",
  ],
  [
    "Clean agent & CO₂ suppression",
    "Suppression solutions selected for the assets, occupancy and operating requirements of each space.",
  ],
  [
    "Detection & alarm systems",
    "Fire alarm panels, smoke and heat detectors, manual call points and audible alerts.",
  ],
  [
    "Specialised protection",
    "Kitchen hood extinguishing and nitrogen injection systems for specialised applications.",
  ],
];
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Kicker({ children, number }) {
  return (
    <p className="kicker">
      <span aria-hidden="true">{number || "—"}</span>
      {children}
    </p>
  );
}
function Brand() {
  return (
    <img
      className="brand-logo"
      src="/assets/rahul-logo.png"
      alt="Rahul Fire Safety"
      width="1588"
      height="352"
    />
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "Tab") {
        const links = [...menuRef.current.querySelectorAll("a")];
        const first = links[0],
          last = buttonRef.current;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previous;
    };
  }, [open]);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1001px)");
    const closeOnDesktop = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", closeOnDesktop);
    return () => query.removeEventListener("change", closeOnDesktop);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="utility">
        <div className="container">
          <span>
            RAHUL ENTERPRISES <i /> FIRE PROTECTION SPECIALISTS
          </span>
          <a
            className="utility-call"
            href={`tel:${PHONE_PRIMARY}`}
            aria-label={`Call Rahul Fire Safety on ${PHONE_PRIMARY_DISPLAY}`}
          >
            <Icon name="phone" /> Call {PHONE_PRIMARY_DISPLAY}
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <a
            href="#home"
            className="brand"
            aria-label="Rahul Fire Safety home"
            onClick={() => setOpen(false)}
          >
            <Brand />
          </a>
          <nav
            ref={menuRef}
            id="navigation"
            className={`navigation ${open ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            {[
              ["about", "Our company"],
              ["services", "Expertise"],
              ["work", "Projects"],
              ["clients", "Clients"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a
              className="button button--small"
              href="#enquiry"
              onClick={() => setOpen(false)}
            >
              Discuss a project <Arrow />
            </a>
          </nav>
          <button
            ref={buttonRef}
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="navigation"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </header>
    </>
  );
}
function Hero() {
  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-grid container">
          <div className="hero-copy">
            <Kicker>Fire protection consultants & engineers</Kicker>
            <h1 id="hero-title">
              Fire safety.
              <br />
              No room for
              <br />
              <em>compromise.</em>
            </h1>
            <p className="hero-description">
              The right equipment. The right engineering. <br />
              Protecting life and property since 2003.
            </p>
          </div>
          <EquipmentShowcase />
          <div className="hero-action-area">
            <div className="hero-actions">
              <a className="button" href="#enquiry">
                Request a site survey <Arrow />
              </a>
              <a className="text-link" href="#work">
                Explore our work <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-founded">
              <span className="status-dot" /> ENGINEERING CONFIDENCE SINCE 2003
            </div>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>DESIGN</span>
          <i />
          <span>SUPPLY</span>
          <i />
          <span>INSTALLATION</span>
          <i />
          <span>MAINTENANCE</span>
          <span className="hero-bottom-note">
            ONE ACCOUNTABLE PARTNER <Arrow />
          </span>
        </div>
      </section>
      <section className="proof-bar" aria-label="Our experience">
        <div className="container proof-grid">
          <p>
            EXPERIENCE THAT
            <br />
            <strong>STANDS BEHIND YOU.</strong>
          </p>
          <div>
            <strong>
              20<span>+</span>
            </strong>
            <span>Years of experience</span>
          </div>
          <div>
            <strong>
              5,000<span>+</span>
            </strong>
            <span>Projects delivered</span>
          </div>
          <div>
            <strong>
              19<span>+</span>
            </strong>
            <span>Cities served</span>
          </div>
        </div>
      </section>
    </>
  );
}
function LogoGrid({ compact = false }) {
  return (
    <div className={`logo-grid ${compact ? "logo-grid--compact" : ""}`}>
      {featuredClients.map((c) => (
        <div className={`logo-cell logo-cell--${c.kind}`} key={c.alt}>
          <img src={c.src} alt={c.alt} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-v2">
        <div className="experience-seal">
          <div className="seal-outer">
            <span>ESTABLISHED 2003</span>
            <strong>
              20<span>+</span>
            </strong>
            <b>
              YEARS OF
              <br />
              FIRE PROTECTION
            </b>
          </div>
          <span className="seal-caption">Experience you can build on.</span>
        </div>
        <div className="about-copy">
          <Kicker>The people behind your protection</Kicker>
          <h2>
            Ready for risk.
            <br />
            <span>Built on experience.</span>
          </h2>
          <p>
            From the first drawing to the next inspection, Rahul Fire Safety
            brings engineering, equipment and on-site expertise together. One
            experienced team. Complete accountability.
          </p>
          <div className="standard-tags">
            <span>NBC</span>
            <span>TAC</span>
            <span>NFPA</span>
            <small>Our engineering framework</small>
          </div>
          <a className="text-link dark-link" href="#services">
            Meet your fire safety partner <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
function Services({ onEnquire }) {
  const shortCopy = [
    "System design & hydraulic calculations.",
    "Installation, testing & commissioning.",
    "Equipment specified for your site.",
    "Inspection, servicing & ongoing support.",
    "Understand risks. Identify the gaps.",
    "Expert input from planning to handover.",
  ];
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-heading">
          <div>
            <Kicker>End-to-end expertise</Kicker>
            <h2>
              We’ve got
              <br />
              safety covered.
            </h2>
          </div>
          <p>
            Six capabilities.
            <br />
            One accountable partner.
          </p>
        </div>
        <div className="services-grid">
          {services.map(([num, title, , icon], i) => (
            <a
              className="service-card"
              href="#enquiry"
              key={num}
              onClick={() =>
                onEnquire(
                  [
                    "Design and consultancy",
                    "New installation",
                    "Equipment supply",
                    "AMC and maintenance",
                    "Site survey or audit",
                    "Design and consultancy",
                  ][i],
                )
              }
            >
              <div className="service-top">
                <span className="service-graphic">
                  <Icon name={icon} />
                </span>
                <span className="service-index">{num}</span>
              </div>
              <h3>{title === "Designing" ? "Design & engineering" : title}</h3>
              <p>{shortCopy[i]}</p>
              <span className="service-bottom">
                Let’s talk <Arrow />
              </span>
            </a>
          ))}
        </div>
        <div className="hose-journey" aria-hidden="true">
          <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
            <path
              d="M0 45H190C230 45 220 75 260 75H530C570 75 570 15 610 15H925C965 15 965 45 1005 45H1200"
              fill="none"
              stroke="#9b4508"
              strokeWidth="15"
            />
            <path
              d="M0 42H190C230 42 220 72 260 72H530C570 72 570 12 610 12H925C965 12 965 42 1005 42H1200"
              fill="none"
              stroke="#f58220"
              strokeWidth="8"
            />
          </svg>
          <span>DESIGN</span>
          <span>INSTALL</span>
          <span>MAINTAIN</span>
        </div>
      </div>
    </section>
  );
}
function Work() {
  const [active, setActive] = useState(0);
  const sector = sectors[active];
  const refs = useRef([]);
  const selectWithKey = (e, i) => {
    let next;
    if (e.key === "ArrowRight") next = (i + 1) % sectors.length;
    if (e.key === "ArrowLeft") next = (i + sectors.length - 1) % sectors.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = sectors.length - 1;
    if (next !== undefined) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  };
  return (
    <section className="section work" id="work">
      <div className="container">
        <div className="section-heading">
          <div>
            <Kicker>Where we work</Kicker>
            <h2>
              Protection at
              <br />
              <span>an industrial scale.</span>
            </h2>
          </div>
          <p>
            From process plants to places of business.
            <br />
            Experience across the environments where safety matters every day.
          </p>
        </div>
        <div
          className="sector-tabs"
          role="tablist"
          aria-label="Project sectors"
        >
          {sectors.map((s, i) => (
            <button
              ref={(el) => (refs.current[i] = el)}
              type="button"
              key={s.name}
              id={`sector-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="sector-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => selectWithKey(e, i)}
            >
              <span>0{i + 1}</span>
              {s.name}
              <Arrow />
            </button>
          ))}
        </div>
        <div
          id="sector-panel"
          role="tabpanel"
          aria-labelledby={`sector-tab-${active}`}
          tabIndex={0}
          className="sector-panel"
        >
          <figure className="sector-image">
            <img
              key={sector.image}
              src={sector.image}
              srcSet={
                active === 0
                  ? "/assets/industrial-scale-960.jpg 960w, /assets/industrial-scale-1600.jpg 1600w, /assets/industrial-scale.jpg 2400w"
                  : undefined
              }
              sizes="(max-width: 700px) calc(100vw - 40px), 52vw"
              alt={sector.alt}
              loading="lazy"
              width="1360"
              height="900"
            />
            <figcaption>
              SECTOR PHOTOGRAPHY{" "}
              <span>Illustrative; not a record of our installation</span>
            </figcaption>
          </figure>
          <div className="sector-copy">
            <h3>{sector.title}</h3>
            <p>{sector.description}</p>
            <span className="micro-label">PROJECT REFERENCES</span>
            <ul>
              {sector.projects.map(([title, place]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{place}</span>
                </li>
              ))}
            </ul>
            <a href="#enquiry" className="text-link">
              Discuss a similar project <Arrow />
            </a>
          </div>
        </div>
        <p className="image-credit">
          Sector photography is illustrative.{" "}
          {active === 0 ? (
            <a
              href="https://unsplash.com/photos/1f3kODRtpxQ"
              target="_blank"
              rel="noreferrer"
            >
              Industrial photograph by Anthony Maw / Unsplash ↗
            </a>
          ) : active === 1 ? (
            <a
              href="https://creativecommons.org/licenses/by/3.0/"
              target="_blank"
              rel="noreferrer"
            >
              Shipra Mall: Андрей Коваль / CC BY 3.0 ↗
            </a>
          ) : null}
        </p>
      </div>
    </section>
  );
}
function Systems() {
  const supplyRef = useRef(null);
  const range = [
    [
      "Portable protection",
      "Fire extinguishers",
      "ABC · CO₂ · Foam · Clean agent",
    ],
    ["Immediate response", "Hose reels & hydrants", "Water where you need it."],
    [
      "Integrated systems",
      "Hydrant infrastructure",
      "Engineered around your facility.",
    ],
  ];
  return (
    <section className="section systems" id="systems">
      <div className="container">
        <div className="section-heading">
          <div>
            <Kicker>Equipment & systems</Kicker>
            <h2>
              Complete equipment.
              <br />
              Real protection.
            </h2>
          </div>
          <a className="text-link dark-link" href="#enquiry">
            Find the right solution <Arrow />
          </a>
        </div>
        <p className="equipment-scope">
          From extinguishers and alarms to hydrants, suppression systems and
          safety accessories. Explore a few essentials below, or view our{" "}
          <a
            href="#equipment"
            onClick={() => {
              if (supplyRef.current) supplyRef.current.open = true;
            }}
          >
            complete supply range
          </a>
          .
        </p>
        <div className="equipment-range">
          {range.map(([eyebrow, title, line], i) => (
            <a className="range-card" href="#enquiry" key={title}>
              <span className="range-eyebrow">{eyebrow}</span>
              <EquipmentIllustration type={i} />
              <div>
                <h3>{title}</h3>
                <p>{line}</p>
                <span className="range-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="systems-grid">
          <div>
            <Kicker>Beyond the equipment</Kicker>
            <h3 className="systems-title">
              Designed to work.
              <br />
              Together.
            </h3>
          </div>
          <div className="system-list">
            {systemDetails.map(([title, copy], i) => (
              <details key={title}>
                <summary>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <b aria-hidden="true">+</b>
                </summary>
                <p>{copy}</p>
              </details>
            ))}
          </div>
        </div>
        <details className="equipment-details" id="equipment" ref={supplyRef}>
          <summary>
            Explore our complete supply range <span aria-hidden="true">+</span>
          </summary>
          <div className="equipment-grid">
            {equipment.map(([title, description]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
function Clients() {
  return (
    <section className="section clients" id="clients">
      <div className="container">
        <div className="section-heading">
          <div>
            <Kicker>Trusted across industries</Kicker>
            <h2>
              Recognised names.
              <br />
              <span>Lasting trust.</span>
            </h2>
          </div>
          <div className="client-trust-mark">
            <Icon name="shield" />
            <span>
              Protecting businesses.
              <br />
              <strong>Building relationships.</strong>
            </span>
          </div>
        </div>
        <div className="client-logo-wall">
          {clientLogos.map((c) => (
            <div
              className={`client-logo-tile${c.alt === "SNJ Bio Products" ? " client-logo-tile--snj" : ""}`}
              key={c.alt}
              title={c.alt}
            >
              <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
        <div className="credentials-strip">
          <div>
            <span className="credential-check" aria-hidden="true">
              ✓
            </span>
            <strong>ISO 9001:2015</strong>
            <span>Quality certified</span>
          </div>
          <div>
            <span className="credential-check" aria-hidden="true">
              ✓
            </span>
            <strong>MSME</strong>
            <span>Registered enterprise</span>
          </div>
          <div>
            <span className="credential-check" aria-hidden="true">
              ✓
            </span>
            <strong>GeM</strong>
            <span>Government e-Marketplace</span>
          </div>
          <div className="partner-strip">
            <span>CHANNEL PARTNERS</span>
            <img
              src="/assets/partners/ceasefire.png"
              alt="Ceasefire"
              loading="lazy"
            />
            <img
              src="/assets/partners/mitras-white.png"
              alt="Mitras"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
function Contact({ requestedService }) {
  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <Kicker>Let’s talk fire safety</Kicker>
          <h2>
            Your site.
            <br />
            Our responsibility.
          </h2>
          <p>Tell us what you need to protect. We’ll take it from there.</p>
          <div className="contact-lines">
            <div>
              <span>CALL OUR TEAM</span>
              <a className="contact-action" href={`tel:${PHONE_PRIMARY}`}>
                <Icon name="phone" />
                <span>Call {PHONE_PRIMARY_DISPLAY}</span>
              </a>
              <a className="contact-action" href={`tel:${PHONE_SECONDARY}`}>
                <Icon name="phone" />
                <span>Call {PHONE_SECONDARY_DISPLAY}</span>
              </a>
            </div>
            <div>
              <span>EMAIL</span>
              <a className="contact-action" href={`mailto:${EMAIL}`}>
                <Icon name="mail" />
                <span>{EMAIL}</span>
              </a>
              <a className="contact-action" href={`mailto:${EMAIL_SECONDARY}`}>
                <Icon name="mail" />
                <span>{EMAIL_SECONDARY}</span>
              </a>
            </div>
            <div>
              <span>VISIT</span>
              <address>
                20, New Vaishali Vihar, Delhi Road
                <br />
                Saharanpur, Uttar Pradesh 247001
              </address>
              <a
                className="contact-action"
                href="https://www.google.com/maps/search/?api=1&query=Rahul+Fire+Safety+20+New+Vaishali+Vihar+Delhi+Road+Saharanpur+247001"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="pin" /> Get directions <Arrow />
              </a>
            </div>
          </div>
          <a
            className="contact-action contact-action--whatsapp"
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="chat" /> Chat on WhatsApp <Arrow />
          </a>
        </div>
        <div className="form-panel">
          <SurveyForm requestedService={requestedService} />
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a href="#home" aria-label="Rahul Fire Safety home">
              <Brand />
            </a>
            <p>
              Fire protection consultants & engineers.
              <br />
              Protecting life and property since 2003.
            </p>
          </div>
          <div className="footer-nav">
            <span>EXPLORE</span>
            <a href="#about">Our company</a>
            <a href="#services">Our expertise</a>
            <a href="#work">Project reach</a>
            <a href="#clients">Clients & credentials</a>
          </div>
          <div className="footer-nav">
            <span>LET’S CONNECT</span>
            <a className="contact-action" href={`tel:${PHONE_PRIMARY}`}>
              <Icon name="phone" />
              <span>Call {PHONE_PRIMARY_DISPLAY}</span>
            </a>
            <a className="contact-action" href={`mailto:${EMAIL}`}>
              <Icon name="mail" />
              <span>{EMAIL}</span>
            </a>
            <a
              href={`https://instagram.com/${INSTAGRAM}`}
              target="_blank"
              rel="noreferrer"
            >
              Instagram <Arrow />
            </a>
          </div>
        </div>
        <div className="footer-statement" aria-hidden="true">
          PROTECTION. WITHOUT COMPROMISE.
        </div>
        <div className="footer-base">
          <span>
            © {new Date().getFullYear()} Rahul Fire Safety · Rahul Enterprises
          </span>
          <a
            href="https://sketchfab.com/3d-models/realistic-fire-extinguisher-8b52b1f4c4c44bb9866146f60dbe534c"
            target="_blank"
            rel="noreferrer"
          >
            Extinguisher model: RED2000 · CC BY 4.0
          </a>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
export default function App() {
  const [requestedService, setRequestedService] = useState("");
  return (
    <>
      <Header />
      <HoseProgress />
      <main id="main">
        <Hero />
        <section className="client-intro" aria-label="Selected clients">
          <div className="container">
            <p>TRUSTED ACROSS INDUSTRY & INSTITUTIONS</p>
            <LogoGrid compact />
          </div>
        </section>
        <About />
        <Services
          onEnquire={(requirement) => setRequestedService({ requirement })}
        />
        <Work />
        <Systems />
        <Clients />
        <Contact requestedService={requestedService} />
      </main>
      <Footer />
      <div className="mobile-contact">
        <a href={`tel:${PHONE_PRIMARY}`}>
          <Icon name="phone" /> Call now
        </a>
        <a href="#enquiry">
          Get a quote <Arrow />
        </a>
      </div>
    </>
  );
}
