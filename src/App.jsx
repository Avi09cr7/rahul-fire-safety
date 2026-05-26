import { lazy, Suspense, useEffect, useRef, useState } from "react";

const ExtinguisherStage = lazy(() => import("./components/ExtinguisherStage"));

const services = [
  ["01", "Survey & audit", "Site risk reviews and practical compliance guidance."],
  ["02", "Design", "Engineering layouts guided by NBC, TAC, NFPA and FM Global."],
  ["03", "Installation", "Detection, hydrant, sprinkler and suppression execution."],
  ["04", "Equipment", "Extinguishers, hose reels and essential fire protection supply."],
  ["05", "Training", "Safety demonstrations and preparedness for operating teams."],
  ["06", "AMC", "Inspection and maintenance to keep systems response-ready."],
];

const systems = [
  "Fire detection and alarm systems",
  "Automatic hydrant wet riser systems",
  "CO2 flooding systems",
  "Clean agent suppression systems",
  "High velocity water spray systems",
  "Medium velocity water spray systems",
  "Kitchen hood extinguishing systems",
  "Nitrogen injection systems",
];

const projects = [
  {
    src: "/assets/plant-installation.jpg",
    alt: "Fire hydrant piping installed in an industrial plant",
    caption: "Industrial protection system installation",
    width: 1024,
    height: 768,
  },
  {
    src: "/assets/industrial-site.jpg",
    alt: "Large industrial facility protected by fire safety systems",
    caption: "Large-scale process facility",
    width: 1360,
    height: 765,
  },
  {
    src: "/assets/hospitality-installation.jpg",
    alt: "Fire hose reel and extinguisher installation in a commercial premises",
    caption: "Commercial and hospitality premises",
    width: 765,
    height: 1020,
  },
  {
    src: "/assets/extinguisher-range.jpg",
    alt: "Range of portable fire extinguishers",
    caption: "Fire protection equipment supply",
    width: 1360,
    height: 643,
  },
];

const trustMarks = [
  {
    src: "/assets/trust/msme.png",
    alt: "Ministry of Micro, Small and Medium Enterprises mark",
    label: "MSME",
  },
  {
    src: "/assets/trust/gem.png",
    alt: "Government e Marketplace mark",
    label: "GeM",
  },
  {
    src: "/assets/trust/iso.png",
    alt: "ISO mark presented in the Rahul Fire Safety company profile",
    label: "ISO 9001:2015",
  },
];

const clientLogos = [
  { src: "/assets/trust/powergrid.png", alt: "POWERGRID", width: 206, height: 80 },
  { src: "/assets/trust/indianoil.png", alt: "IndianOil", width: 90, height: 104 },
  { src: "/assets/trust/hindustan-petroleum.svg", alt: "Hindustan Petroleum" },
  { src: "/assets/trust/haldirams.png", alt: "Haldiram's", width: 106, height: 66 },
  { src: "/assets/trust/pvr.png", alt: "PVR Cinemas", width: 90, height: 81 },
  { src: "/assets/trust/icici-bank.png", alt: "ICICI Bank", width: 214, height: 59 },
  { src: "/assets/trust/bhel.png", alt: "BHEL", width: 103, height: 88 },
  { src: "/assets/trust/iffco.png", alt: "IFFCO", width: 158, height: 83 },
  { src: "/assets/trust/uttam-sugar.png", alt: "Uttam Sugar", width: 128, height: 88 },
  { src: "/assets/trust/indian-navy.png", alt: "Indian Navy", width: 92, height: 139 },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 28);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <a className="wordmark" href="#home" aria-label="Rahul Fire Safety home" onClick={closeMenu}>
        <span>rahul</span>
        <small>FIRE SAFETY</small>
      </a>
      <button
        type="button"
        className="menu-button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav id="site-navigation" className={open ? "site-nav site-nav--open" : "site-nav"}>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#services" onClick={closeMenu}>Solutions</a>
        <a href="#projects" onClick={closeMenu}>Work</a>
        <a href="#contact" className="nav-cta" onClick={closeMenu}>Request survey</a>
      </nav>
    </header>
  );
}

function SurveyForm() {
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    facility: "",
    requirement: "",
    message: "",
  });

  const updateDetail = (event) => {
    const { name, value } = event.target;
    setDetails((currentDetails) => ({ ...currentDetails, [name]: value }));
  };

  const prepareEmail = (event) => {
    event.preventDefault();
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

    window.location.href = `mailto:rahulfire2001@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="survey-form" onSubmit={prepareEmail}>
      <p className="survey-form-title">Request a site survey</p>
      <p className="survey-form-intro">Prepare an enquiry for our engineering team.</p>
      <div className="form-grid">
        <label className="form-field">
          <span>Name</span>
          <input required autoComplete="name" name="name" value={details.name} onChange={updateDetail} placeholder="Your name" />
        </label>
        <label className="form-field">
          <span>Phone</span>
          <input required autoComplete="tel" inputMode="tel" name="phone" value={details.phone} onChange={updateDetail} placeholder="+91" />
        </label>
        <label className="form-field">
          <span>Facility</span>
          <select required name="facility" value={details.facility} onChange={updateDetail}>
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
          <select required name="requirement" value={details.requirement} onChange={updateDetail}>
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
          <textarea name="message" value={details.message} onChange={updateDetail} rows="3" placeholder="Location, facility size or required timeline" />
        </label>
      </div>
      <button className="button button--primary survey-submit" type="submit">Prepare enquiry email</button>
      <p className="form-note">Review and send from your email application.</p>
    </form>
  );
}

function ChapterHeading({ code, kicker, children }) {
  return (
    <div className="chapter-heading">
      <p className="chapter-code">{code}</p>
      <p className="section-kicker">{kicker}</p>
      <h2>{children}</h2>
    </div>
  );
}

export default function App() {
  const storyRef = useRef(null);
  const [showMobileActions, setShowMobileActions] = useState(false);

  useEffect(() => {
    let frameId;
    const updateHeroExit = () => {
      frameId = undefined;
      if (!storyRef.current) {
        return;
      }
      const progress = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.62), 0), 1);
      storyRef.current.style.setProperty("--hero-exit", progress.toFixed(3));
    };
    const queueHeroExit = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateHeroExit);
      }
    };
    updateHeroExit();
    window.addEventListener("scroll", queueHeroExit, { passive: true });
    window.addEventListener("resize", queueHeroExit);
    return () => {
      window.removeEventListener("scroll", queueHeroExit);
      window.removeEventListener("resize", queueHeroExit);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

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
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateMobileActions = () => {
      const opening = document.getElementById("home");
      const contact = document.getElementById("contact");
      const heroPassed = opening ? opening.getBoundingClientRect().bottom < 0 : false;
      const contactArrived = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.45 : false;
      setShowMobileActions(heroPassed && !contactArrived);
    };
    updateMobileActions();
    window.addEventListener("scroll", updateMobileActions, { passive: true });
    window.addEventListener("resize", updateMobileActions);
    return () => {
      window.removeEventListener("scroll", updateMobileActions);
      window.removeEventListener("resize", updateMobileActions);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="story" ref={storyRef}>
        <div className="story-stage" aria-hidden="true">
          <Suspense fallback={<div className="model-fallback">Preparing protection record</div>}>
            <ExtinguisherStage storyRef={storyRef} />
          </Suspense>
          <div className="stage-surface" />
          <p className="model-hint">Scroll to unroll</p>
        </div>

        <section className="opening" id="home">
          <div className="opening-copy" data-reveal>
            <p className="eyebrow">Rahul Fire Safety | Rahul Enterprises</p>
            <h1>
              Fire protection that <span>stands ready.</span>
            </h1>
            <p className="opening-description">
              Consultants and engineers for design, supply, installation,
              audits and maintenance of dependable fire safety systems.
            </p>
            <div className="opening-actions">
              <a className="button button--primary" href="#contact">Request a site survey</a>
              <a className="button button--secondary" href="#about">Enter our record</a>
            </div>
            <div className="opening-proof">
              <strong>ISO 9001:2015 Certified</strong>
              <span>More than two decades of practical experience</span>
            </div>
          </div>
          <p className="scroll-instruction">Scroll to open the protection record</p>
        </section>

        <section className="threshold" aria-label="Enter the Rahul Fire Safety protection record">
          <div className="threshold-copy" data-reveal>
            <p className="section-kicker">The safety record</p>
            <h2>Every layer of protection begins with engineering.</h2>
            <p>
              Follow the extinguisher as it turns sideways into a living record
              of the systems, people and site work behind Rahul Fire Safety.
            </p>
          </div>
        </section>

        <div className="label-run" id="label-story">
          <article className="scroll-label" aria-label="Rahul Fire Safety protection record">
            <header className="label-cover" data-reveal>
              <div className="label-brand">
                <div className="wordmark wordmark--label"><span>rahul</span><small>FIRE SAFETY</small></div>
                <p>Protection record / RFS-2001</p>
              </div>
              <p className="label-classification">Fire protection consultants & engineers</p>
              <h2>Save life<br /><span>&amp; property</span></h2>
              <div className="label-verification">
                <span>ISO 9001:2015</span>
                <span>Design to AMC</span>
                <span>Site-proven</span>
              </div>
              <div className="instruction-band" aria-label="Protection approach">
                <span>Assess</span>
                <span>Engineer</span>
                <span>Install</span>
                <span>Maintain</span>
              </div>
            </header>

            <section className="label-page page-about" id="about">
              <ChapterHeading code="01 / COMPANY" kicker="About us">
                Experience built into every protection plan.
              </ChapterHeading>
              <div className="about-record" data-reveal>
                <p>
                  Founded in the early 2000s by Mr. Neeraj Singh, Rahul Fire Safety
                  executes practical fire engineering and mechanical projects designed
                  to protect people and property from fire risk.
                </p>
                <p>
                  A dedicated design and engineering capability, supported by quality
                  control at site and workshop, enables accountable delivery for
                  industrial and commercial facilities.
                </p>
              </div>
              <div className="standard-strip" data-reveal>
                <p>Engineering knowledge</p>
                <div><span>NBC</span><span>TAC</span><span>NFPA</span><span>FM Global</span></div>
              </div>
            </section>

            <section className="label-page page-services" id="services">
              <ChapterHeading code="02 / CAPABILITY" kicker="Complete service">
                One partner from fire risk to readiness.
              </ChapterHeading>
              <div className="label-services">
                {services.map(([number, title, text]) => (
                  <article key={title} data-reveal>
                    <span>{number}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="label-page page-systems" id="systems">
              <ChapterHeading code="03 / SYSTEMS" kicker="Engineered solutions">
                Systems selected for the hazard, not just the checklist.
              </ChapterHeading>
              <div className="system-panel" data-reveal>
                <p className="system-panel-title">Systems we provide</p>
                <ul>
                  {systems.map((system) => <li key={system}>{system}</li>)}
                </ul>
              </div>
            </section>

            <section className="label-page page-projects" id="projects">
              <ChapterHeading code="04 / EVIDENCE" kicker="Project work">
                Installed where performance matters.
              </ChapterHeading>
              <div className="evidence-grid">
                {projects.map((project) => (
                  <figure key={project.caption} data-reveal>
                    <img
                      loading="lazy"
                      decoding="async"
                      src={project.src}
                      alt={project.alt}
                      width={project.width}
                      height={project.height}
                    />
                    <figcaption>{project.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="label-page page-trust" id="trust">
              <ChapterHeading code="05 / TRUST" kicker="Confidence">
                Credentials and customers that speak to continuity.
              </ChapterHeading>
              <p className="trust-group-title" data-reveal>Certifications &amp; registrations</p>
              <div className="credential-band" data-reveal>
                {trustMarks.map((mark) => (
                  <figure key={mark.label}>
                    <img loading="lazy" decoding="async" src={mark.src} alt={mark.alt} />
                    <figcaption>{mark.label}</figcaption>
                  </figure>
                ))}
              </div>
              <p className="client-title" data-reveal>Organisations featured in our company profile</p>
              <div className="client-list" data-reveal>
                {clientLogos.map((client) => (
                  <figure key={client.alt}>
                    <img
                      loading="lazy"
                      decoding="async"
                      src={client.src}
                      alt={client.alt}
                      width={client.width}
                      height={client.height}
                    />
                  </figure>
                ))}
              </div>
              <p className="profile-note" data-reveal>
                Marks reproduced from the Rahul Fire Safety company profile.
                Supporting credentials and customer references can be shared during project evaluation.
              </p>
            </section>

            <section className="label-page page-contact" id="contact">
              <ChapterHeading code="06 / RESPONSE" kicker="Contact us">
                Bring your premises into a prepared plan.
              </ChapterHeading>
              <div className="record-contact" data-reveal>
                <address className="contact-details">
                  <p className="contact-label">Speak to our team</p>
                  <a href="tel:+919412525987">+91 94125 25987</a>
                  <a href="tel:+919719159819">+91 97191 59819</a>
                  <a href="mailto:rahulfire2001@yahoo.com">rahulfire2001@yahoo.com</a>
                  <p className="contact-address">20, New Vaishali Vihar, Delhi Road, Saharanpur, UP 247001</p>
                </address>
                <SurveyForm />
              </div>
            </section>

            <footer className="label-footer">
              <p>RAHUL FIRE SAFETY</p>
              <span>Save life &amp; property</span>
            </footer>
          </article>
        </div>

        <section className="finale" aria-label="Speak to Rahul Fire Safety">
          <div className="finale-copy" data-reveal>
            <p className="section-kicker">Protection ready</p>
            <h2>Your fire safety plan starts with a conversation.</h2>
            <a className="button button--primary" href="tel:+919412525987">Speak to an engineer</a>
          </div>
        </section>
      </main>

      {showMobileActions && (
        <nav className="mobile-actions mobile-actions--visible" aria-label="Quick contact">
          <a href="tel:+919412525987">Call now</a>
          <a href="#contact">Get a survey</a>
        </nav>
      )}
    </>
  );
}
