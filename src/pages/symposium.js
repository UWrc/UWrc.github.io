import React from "react";
import Layout from "@theme/Layout";

import styles from "./symposium.module.css";

// Event details — update these as plans are finalized.
const EVENT = {
  title: "Research Computing Symposium",
  tagline: "Supporting Research, Strengthening Partnerships, and Connecting People",
  date: "Friday, November 13, 2026",
  time: "All Day (9:00 AM – 5:00 PM)",
  location: "HUB 250, 238 & 307, University of Washington",
};

// Room legend — rooms used for the parallel Research Showcase blocks.
const ROOMS = {
  main: "HUB 250",
  r238: "HUB 238",
  r307: "HUB 307",
};

// Draft agenda — source of truth is the symposium schedule CSV.
// Single-track items run in HUB 250. The two Research Showcase blocks run as
// three parallel tracks across HUB 250, HUB 238, and HUB 307.
//
// `start`/`end` are minutes since midnight (24h) and drive the timeline layout.
// Each entry is one of:
//   { start, end, time, title, type }                   -> single-track (HUB 250)
//   { start, end, time, title, type, parallel: [ ... ] } -> parallel block
const AGENDA = [
  { start: 540, end: 560, time: "9:00 – 9:20 AM", title: "Check-in", type: "General" },
  { start: 560, end: 570, time: "9:20 – 9:30 AM", title: "Opening Remarks", type: "General" },
  { start: 570, end: 600, time: "9:30 – 10:00 AM", title: "Keynote 1 — Natasha Jacques", type: "Keynote" },
  { start: 600, end: 630, time: "10:00 – 10:30 AM", title: "Keynote 2 — Paul Atkins", type: "Keynote" },
  { start: 630, end: 640, time: "10:30 – 10:40 AM", title: "Break", type: "Break" },
  {
    start: 640,
    end: 720,
    time: "10:40 AM – 12:00 PM",
    title: "Research Showcase A",
    type: "Showcase",
    parallel: [
      {
        room: ROOMS.main,
        track: "Research Showcase A",
        sessions: [
          { start: 640, end: 652, label: "Presentation 1" },
          { start: 652, end: 664, label: "Presentation 2" },
          { start: 664, end: 676, label: "Presentation 3" },
          { start: 676, end: 688, label: "Presentation 4" },
          { start: 688, end: 700, label: "Presentation 5" },
          { start: 700, end: 712, label: "Presentation 6" },
        ],
      },
      {
        room: ROOMS.r238,
        track: "Libraries",
        detail: "Partner track — UW Libraries",
      },
      {
        room: ROOMS.r307,
        track: "GCP",
        detail: "Partner track — Google Cloud",
      },
    ],
  },
  { start: 720, end: 780, time: "12:00 – 1:00 PM", title: "Lunch", type: "General" },
  { start: 780, end: 810, time: "1:00 – 1:30 PM", title: "Industry Session — Dell", type: "Partners" },
  { start: 810, end: 840, time: "1:30 – 2:00 PM", title: "Research Computing + eScience + RCC", type: "Partners" },
  { start: 840, end: 870, time: "2:00 – 2:30 PM", title: "Keynote 3 — Patrick Boyle", type: "Keynote" },
  { start: 870, end: 880, time: "2:30 – 2:40 PM", title: "Break", type: "Break" },
  {
    start: 880,
    end: 960,
    time: "2:40 – 4:00 PM",
    title: "Research Showcase B",
    type: "Showcase",
    parallel: [
      {
        room: ROOMS.main,
        track: "Research Showcase B",
        sessions: [
          { start: 880, end: 892, label: "Presentation 1" },
          { start: 892, end: 904, label: "Presentation 2" },
          { start: 904, end: 916, label: "Presentation 3" },
          { start: 916, end: 928, label: "Presentation 4" },
          { start: 928, end: 940, label: "Presentation 5" },
          { start: 940, end: 952, label: "Presentation 6" },
        ],
      },
      {
        room: ROOMS.r238,
        track: "AWS",
        detail: "Partner track — Amazon Web Services",
      },
      {
        room: ROOMS.r307,
        track: "Azure",
        detail: "Partner track — Microsoft Azure",
      },
    ],
  },
  { start: 960, end: 970, time: "4:00 – 4:10 PM", title: "Closing Remarks", type: "General" },
  { start: 970, end: 1020, time: "4:10 – 5:00 PM", title: "Networking Reception", type: "Reception" },
];

// Timeline layout constants.
const DAY_START = 540; // 9:00 AM
const DAY_END = 1020; // 5:00 PM
const PX_PER_MIN = 4.8; // vertical scale of the timeline (true-to-scale)
const AXIS_STEP = 30; // left-axis tick interval, in minutes

function minutesToLabel(mins) {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = ((h24 + 11) % 12) + 1;
  return `${h12}${m ? ":" + String(m).padStart(2, "0") : ""} ${period}`;
}



// When available, set these URLs to enable the action buttons.
const REGISTRATION_URL = "https://calendar.washington.edu/sea_uwit-rc/Research-Computing-Symposium/E208855324"; // e.g. "https://..."

// Add partner/sponsor logos here as they are confirmed.
// Example: { name: "eScience Institute", image: "/img/partners/escience.png", link: "https://escience.washington.edu" }
const PARTNERS = [
  {
    name: "UW Office of Research",
    image: "/img/logos/Office_of_Research.png",
    link: "https://www.washington.edu/research/",
  },
  {
    name: "eScience Institute",
    image: "/img/logos/escience-logo-768x193.png",
    link: "https://escience.washington.edu",
  },
  {
    name: "UW Libraries",
    image: "/img/logos/UW_Libraries.png",
    link: "https://www.lib.washington.edu",
  },
];
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

// Maps a session type to its color-coding CSS class.
const TYPE_CLASS = {
  General: styles.typeGeneral,
  Keynote: styles.typeKeynote,
  Break: styles.typeBreak,
  Partners: styles.typePartners,
  Showcase: styles.typeShowcase,
  Reception: styles.typeReception,
};

const TYPE_LEGEND = [
  { type: "General", label: "General / Program" },
  { type: "Keynote", label: "Keynote" },
  { type: "Partners", label: "Partner & Industry" },
  { type: "Showcase", label: "Research Showcase" },
  { type: "Break", label: "Break" },
  { type: "Reception", label: "Reception" },
];

// True-to-scale position/size for a block, by actual clock time.
function rowBox(start, end) {
  return {
    top: `${(start - DAY_START) * PX_PER_MIN}px`,
    height: `${(end - start) * PX_PER_MIN}px`,
  };
}

// Position/size for a sub-block relative to its parent window's start.
function subBox(offsetStart, offsetEnd) {
  return {
    top: `${offsetStart * PX_PER_MIN}px`,
    height: `${(offsetEnd - offsetStart) * PX_PER_MIN}px`,
  };
}

function SessionBlock({ type, title, startLabel, endLabel, children }) {
  return (
    <div className={`${styles.block} ${TYPE_CLASS[type] || ""}`}>
      <span className={styles.blockTitle}>{title}</span>
      <span className={styles.blockTime}>
        {startLabel} – {endLabel}
      </span>
      {children}
    </div>
  );
}

// Half-hour axis ticks across the day.
const AXIS_MARKS = [];
for (let m = DAY_START; m <= DAY_END; m += AXIS_STEP) {
  AXIS_MARKS.push(m);
}

function Timeline() {
  const totalHeight = (DAY_END - DAY_START) * PX_PER_MIN;

  return (
    <div className={styles.timelineScroll}>
      {/* Sticky room column headers — stay pinned while the body scrolls */}
      <div className={styles.roomHeaders}>
        <div className={styles.roomHeaderSpacer} />
        <div className={styles.roomHeaderGrid}>
          <div className={styles.roomHeader}>{ROOMS.main}</div>
          <div className={styles.roomHeader}>{ROOMS.r238}</div>
          <div className={styles.roomHeader}>{ROOMS.r307}</div>
        </div>
      </div>

      <div className={styles.timeline} style={{ height: `${totalHeight}px` }}>
        {/* Time axis — half-hour increments */}
        <div className={styles.axis}>
          {AXIS_MARKS.map((m) => (
            <div
              key={`axis-${m}`}
              className={styles.axisMark}
              style={{ top: `${(m - DAY_START) * PX_PER_MIN}px` }}
            >
              <span className={styles.axisLabel}>{minutesToLabel(m)}</span>
            </div>
          ))}
        </div>

        {/* Gridlines at each half-hour */}
        <div className={styles.gridlines}>
          {AXIS_MARKS.map((m) => (
            <div
              key={`grid-${m}`}
              className={styles.gridline}
              style={{ top: `${(m - DAY_START) * PX_PER_MIN}px` }}
            />
          ))}
        </div>

        {/* Session blocks — positioned true-to-scale by clock time */}
        <div className={styles.tracks}>
          {AGENDA.map((item) => (
            <div
              className={styles.row}
              style={rowBox(item.start, item.end)}
              key={item.start}
            >
              {item.parallel ? (
                <div className={styles.rowGrid}>
                  {item.parallel.map((p) => (
                    <div className={styles.trackCol} key={`${item.start}-${p.room}`}>
                      {p.sessions ? (
                        // Each presentation is its own to-scale block, positioned
                        // relative to the start of this parallel window.
                        p.sessions.map((s) => (
                          <div
                            className={styles.subRow}
                            style={subBox(s.start - item.start, s.end - item.start)}
                            key={s.start}
                          >
                            <SessionBlock
                              type={item.type}
                              title={s.label}
                              startLabel={minutesToLabel(s.start)}
                              endLabel={minutesToLabel(s.end)}
                            />
                          </div>
                        ))
                      ) : (
                        <SessionBlock
                          type={item.type}
                          title={p.track}
                          startLabel={minutesToLabel(item.start)}
                          endLabel={minutesToLabel(item.end)}
                        >
                          {p.detail && (
                            <span className={styles.blockDetail}>{p.detail}</span>
                          )}
                        </SessionBlock>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.rowGrid}>
                  <div className={styles.trackCol}>
                    <SessionBlock
                      type={item.type}
                      title={item.title}
                      startLabel={minutesToLabel(item.start)}
                      endLabel={minutesToLabel(item.end)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineLegend() {
  return (
    <div className={styles.legend}>
      {TYPE_LEGEND.map((item) => (
        <span className={styles.legendItem} key={item.type}>
          <span className={`${styles.legendSwatch} ${TYPE_CLASS[item.type]}`} />
          {item.label}
        </span>
      ))}
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
            Draft schedule — subject to change. Most of the day runs as a single
            program in {ROOMS.main}. During the two Research Showcase blocks,
            three sessions run at the same time — one in each room.
          </p>
          <Timeline />
          <TimelineLegend />
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
