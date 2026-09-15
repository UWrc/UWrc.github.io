import React from "react";
import Layout from "@theme/Layout";

import styles from "./symposium.module.css";

// Event details — update these as plans are finalized.
const EVENT = {
  title: "Research Computing Symposium",
  tagline: "Supporting Research, Strengthening Partnerships, and Connecting People",
  date: "Friday, November 13, 2026",
  time: "All Day (9:00 AM – 5:15 PM)",
  location: "HUB 250 and HUB 238/307, University of Washington",
};

// Draft agenda — subject to change. Main program is in HUB 250.
const AGENDA = [
  ["9:00–9:30", "Check-in & Coffee", "Registration, coffee, informal networking"],
  ["9:30–9:40", "Welcome & Opening Remarks", "Welcome and introduction to the symposium"],
  ["9:40–10:25", "Keynote", "Featured speaker on research, computing, AI, or research infrastructure"],
  ["10:25–10:40", "Morning Break", "Refreshments, networking, partner engagement"],
  ["10:40–12:00", "UW Research Showcase I", "~5–6 researcher presentations, 10–12 minutes each"],
  ["12:00–1:00", "Lunch & Networking", "Lunch and informal networking"],
  ["1:00–1:45", "Industry parallel session", "Perspectives on HPC, AI, GPUs, cloud, and emerging technologies"],
  ["1:45–2:15", "Partner parallel sessions", "Sessions led by UW research Computing Partners"],
  ["2:15–2:45", "UW Research Computing parallel sessions", "Current services, what's coming, priorities, and moderated discussion/Q&A"],
  ["2:45–3:00", "Afternoon Break", "Refreshments and networking"],
  ["3:00–4:00", "UW Research Showcase II", "~4–5 additional researcher presentations"],
  ["4:00–4:15", "Closing Remarks", "Key takeaways, acknowledgements, and future engagement"],
  ["4:15–5:15", "Networking Reception", "Networking, partner engagement, and social activities"],
];

// When available, set these URLs to enable the action buttons.
const REGISTRATION_URL = ""; // e.g. "https://..."

// Add partner/sponsor logos here as they are confirmed.
// Example: { name: "eScience Institute", image: "/img/partners/escience.png", link: "https://escience.washington.edu" }
const PARTNERS = [];
const SPONSORS = [];

function ActionButton({ href, children, primary }) {
  const disabled = !href;
  const className = `${styles.actionButton} ${primary ? styles.actionButtonPrimary : ""} ${
    disabled ? styles.actionButtonDisabled : ""
  }`;

  if (disabled) {
    return (
      <span className={className} aria-disabled="true">
        {children}
        <span className={styles.comingSoon}>Coming soon</span>
      </span>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function LogoGrid({ title, items }) {
  if (!items || items.length === 0) {
    return (
      <div className={styles.logoGroup}>
        <h3 className={styles.logoGroupTitle}>{title}</h3>
        <p className={styles.logoPlaceholder}>Details coming soon.</p>
      </div>
    );
  }

  return (
    <div className={styles.logoGroup}>
      <h3 className={styles.logoGroupTitle}>{title}</h3>
      <div className={styles.logoGrid}>
        {items.map((item) => {
          const logo = (
            <img className={styles.logo} src={item.image} alt={item.name} />
          );
          return (
            <div className={styles.logoCard} key={item.name}>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {logo}
                </a>
              ) : (
                logo
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Symposium() {
  return (
    <Layout
      title="Symposium"
      description="Research Computing Symposium"
    >
      {/* Banner */}
      <header className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>{EVENT.title}</h1>
          <p className={styles.bannerTagline}>{EVENT.tagline}</p>
          <div className={styles.bannerDetails}>
            <span>📅 {EVENT.date}</span>
            <span>🕘 {EVENT.time}</span>
            <span>📍 {EVENT.location}</span>
          </div>
          <div className={styles.bannerButtons}>
            <ActionButton href={REGISTRATION_URL} primary>
              Register
            </ActionButton>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        {/* About / Event concept */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>You're Invited</h2>
          <p>
            We invite you to join us for our first ever Research Computing Symposium, a full-day event showcasing research enabled by advanced computing at the University of Washington. Connect with and hear from researchers, campus and industry partners, and UWIT Research Computing experts through lightning talks, discussions, and networking sessions. The symposium will highlight current work, emerging capabilities, and the future of research computing across on-premises, cloud, and other research infrastructure. 
          </p>
        </section>

        {/* Agenda */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Agenda</h2>
          <p className={styles.agendaNote}>
            Draft schedule — subject to change. The main program takes place in
            HUB 250, with smaller rooms (HUB 238 &amp; 307) used for targeted
            conversations and sessions.
          </p>
          <div className={styles.agendaTableWrapper}>
            <table className={styles.agendaTable}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Session</th>
                </tr>
              </thead>
              <tbody>
                {AGENDA.map(([time, session]) => (
                  <tr key={time}>
                    <td className={styles.agendaTime}>{time}</td>
                    <td className={styles.agendaSession}>{session}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Location */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Location</h2>
          <p>
            {EVENT.location}.{" "}
            <a
              href="https://www.google.com/maps/place/Husky+Union+Building"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps →
            </a>
          <div className={styles.mapWrapper}>
            <iframe
              title="Husky Union Building map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.4944963773387!2d-122.30508449999999!3d47.65538929999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490148d64534c71%3A0xc91793fd02335246!2sHusky%20Union%20Building!5e0!3m2!1sen!2sus!4v1788912813488!5m2!1sen!2sus"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
                    </p>
                    Plant Your Visit: 
                    <p>
            <a
              href="https://hub.washington.edu/about/plan-your-visit/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HUB directions, parking guidance, floor plans, and FAQs.
            </a>
          </p>
        </section>

        {/* Partners & Sponsors */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Campus Partners &amp; Sponsors</h2>
          <p>
            We are grateful to the campus partners and sponsors who make this event
            possible.
          </p>
          <div className={styles.logos}>
            <LogoGrid title="Campus Partners" items={PARTNERS} />
            <LogoGrid title="Sponsors" items={SPONSORS} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
