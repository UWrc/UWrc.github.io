import React from "react";
import Layout from "@theme/Layout";

import styles from "./symposium.module.css";

// Event details.
const EVENT = {
  title: "Accelerating Research Day",
  tagline: "From Strategy to Practice",
  date: "Thursday, Nov 12, 2026",
  time: "12 – 4 p.m.",
  location: "Student Union Building (HUB), Room 214, University of Washington",
};

const REGISTRATION_URL =
  "https://events.dell.com/event/04ddc80c-c06c-4a40-a419-47f6ef31bd62/regProcessStep1:d3587934-f7bc-4ca4-b172-704eb74c89ff";

const MORE_INFO_URL =
  "https://events.dell.com/event/04ddc80c-c06c-4a40-a419-47f6ef31bd62/summary";

// Sessions grouped by track.
const TRACKS = [
  {
    name: "Strategy Track",
    sessions: [
      {
        title: "Future of Research Computing",
        detail:
          "Explore how AI, simulation, and data-intensive workloads are reshaping research infrastructure. Discuss emerging architectures and strategies that enable universities to build scalable, flexible environments that can support both today's HPC needs and tomorrow's AI-driven discoveries.",
      },
      {
        title: "Balancing AI Performance with Scientific Precision",
        detail:
          "Discuss the evolving role of FP64 and mixed-precision computing in scientific research. Explore how organizations can balance computational accuracy, performance, and efficiency across diverse workloads such as simulations, modeling, machine learning, and AI.",
      },
      {
        title: "Accelerating Scientific Discovery Through AI",
        detail:
          "Explore how AI is transforming the research lifecycle, from data analysis and modeling to hypothesis generation and simulation. Discuss practical approaches for reducing time-to-insight, increasing research impact, and unlocking new opportunities for innovation and discovery.",
      },
    ],
  },
  {
    name: "Researchers' Hands-on Track",
    sessions: [
      {
        title: "Introduction to Large Language Models: Research Use Cases",
        detail:
          "Powered by NVIDIA's AI platforms and accelerated computing, Large Language Models are transforming research by enabling rapid literature analysis, intelligent data exploration, and domain-specific AI assistants. Researchers can leverage NVIDIA-optimized frameworks to scale LLMs efficiently, accelerating discovery and streamlining workflows across disciplines.",
      },
      {
        title: "NeMo Claw Hands-on Lab",
        detail:
          "Stop watching AI demos. Start running them. The NemoClaw Lab is a hands-on experience where you'll build and run an agentic AI workflow using Dell infrastructure and NVIDIA technology. Rather than seeing a scripted demo, you'll actively work through how these systems operate—connecting agents to real tools and data, and observing how they reason, act, and deliver outcomes.",
      },
    ],
  },
];

const SPONSORS = [
  {
    name: "Dell Technologies",
    image: "/img/logos/dell_technologies.png",
    link: "https://www.dell.com/en-us",
  },
  {
    name: "NVIDIA",
    image: "/img/logos/nvidia_logo.webp",
    link: "https://www.nvidia.com/en-us/",
  },
];

function ActionButton({ href, children, primary }) {
  const className = `${styles.actionButton} ${primary ? styles.actionButtonPrimary : ""}`;
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function LogoGrid({ items }) {
  return (
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
  );
}

export default function AcceleratingResearchDay() {
  return (
    <Layout
      title="Accelerating Research Day"
      description="Accelerating Research Day — Your Way to AI"
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
            <ActionButton href={MORE_INFO_URL}>More Information</ActionButton>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        {/* About */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>You're Invited</h2>
          <p>
            AI is reshaping industries, unlocking unparalleled potential for
            innovation and efficiency. But how do you cut through the noise and
            deploy a strategy that drives tangible value, fast?
          </p>
          <p>
            <a
              href="https://www.dell.com/en-us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dell Technologies
            </a>{" "}
            and{" "}
            <a
              href="https://www.nvidia.com/en-us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NVIDIA
            </a>{" "}
            invite you to join us for Accelerating
            Research Day, an exclusive half-day engagement designed specifically
            for visionary leaders like yourself. Together, we'll explore the
            transformative power of AI and the impact it can have on your
            organization.
          </p>
          <p>
            This is a unique opportunity to learn from experts, network with
            valued peers, and dive deep into the technology that is reshaping how
            we live and work. Lunch will be provided!
          </p>
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <img
              src="/img/events/Social Media Post DTD.jpg"
              alt="Accelerating Research Day flyer"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          </div>
        </section>

        {/* Sessions */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sessions — Choose Your Track</h2>
          <p>Sessions you won't want to miss!</p>
          {TRACKS.map((track) => (
            <div key={track.name} style={{ marginTop: "1.5rem" }}>
              <h3>{track.name}</h3>
              {track.sessions.map((session) => (
                <div key={session.title} style={{ marginBottom: "1.25rem" }}>
                  <strong>{session.title}</strong>
                  <p>{session.detail}</p>
                </div>
              ))}
            </div>
          ))}
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
          </p>
          <div className={styles.mapWrapper}>
            <iframe
              title="Husky Union Building map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.4944963773387!2d-122.30508449999999!3d47.65538929999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490148d64534c71%3A0xc91793fd02335246!2sHusky%20Union%20Building!5e0!3m2!1sen!2sus!4v1788912813488!5m2!1sen!2sus"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p>
            Plan Your Visit:{" "}
            <a
              href="https://hub.washington.edu/about/plan-your-visit/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HUB directions, parking guidance, floor plans, and FAQs.
            </a>
          </p>
        </section>

        {/* Sponsors */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Event Sponsors</h2>
          <LogoGrid items={SPONSORS} />
        </section>

        {/* Related event */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Related Event</h2>
          <h3>Research Computing Symposium</h3>
          <p>
            A full-day event on Friday, November 13, 2026 showcasing research
            enabled by advanced computing at the University of Washington.
            Connect with researchers, campus and industry partners, and UWIT
            Research Computing experts through lightning talks, discussions, and
            networking sessions.
          </p>
          <p>
            <a href="/symposium">Learn more about the Symposium →</a>
          </p>
        </section>
      </main>
    </Layout>
  );
}
