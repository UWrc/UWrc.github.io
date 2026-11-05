import React, { useState, useEffect, useRef } from "react";
import Layout from "@theme/Layout";

import styles from "./symposium.module.css";

// Event details — update these as plans are finalized.
const EVENT = {
  title: "Research Computing Symposium",
  tagline: "Supporting Research, Strengthening Partnerships, and Connecting People",
  date: "Friday, November 13, 2026",
  time: "All Day (9:00 AM – 5:00 PM)",
  location: "HUB 332, 334, 238 & 307, University of Washington",
};

// Room legend.
//   lobby   — hospitality (check-in, breaks, lunch, reception)
//   main    — main session speakers / showcase main track
//   r238/307 — side sessions during the parallel showcase blocks
const ROOMS = {
  lobby: "HUB 332",
  main: "HUB 334",
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
  { start: 540, end: 570, time: "9:00 – 9:30 AM", title: "Check-in", type: "General", room: ROOMS.lobby },
  { start: 570, end: 585, time: "9:30 – 9:45 AM", title: "Opening Remarks", type: "General", room: ROOMS.main },
  { start: 585, end: 615, time: "9:45 – 10:15 AM", title: "Research Highlight — Paul Atkins", type: "Highlight", room: ROOMS.main, talkId: "atkins" },
  { start: 615, end: 630, time: "10:15 – 10:30 AM", title: "Break", type: "Break", room: ROOMS.lobby },
  {
    start: 630,
    end: 720,
    time: "10:30 AM – 12:00 PM",
    title: "Research Showcase — Morning",
    type: "Showcase",
    parallel: [
      {
        room: ROOMS.main,
        track: "Research Showcase — Morning",
        sessions: [
          { start: 630, end: 645, label: "Xu Lu", talkId: "lu" },
          { start: 645, end: 660, label: "Dylan Weissenkampe", talkId: "weissenkampe" },
          { start: 660, end: 675, label: "Aodong Liu", talkId: "liu" },
          { start: 675, end: 690, label: "Lakshitha Premathilake", talkId: "premathilake" },
          { start: 690, end: 705, label: "Bojun Chen", talkId: "chen" },
          { start: 705, end: 720, label: "William Noble", talkId: "noble" },
        ],
      },
      {
        room: ROOMS.r238,
        track: "Google Cloud Track",
        detail: "Partner track — Google Cloud",
      },
      {
        room: ROOMS.r307,
        track: "UW Libraries Track",
        detail: "Partner track — UW Libraries",
        trackId: "uw-libraries-track",
      },
    ],
  },
  { start: 720, end: 780, time: "12:00 – 1:00 PM", title: "Lunch", type: "General", room: ROOMS.lobby },
  { start: 780, end: 810, time: "1:00 – 1:30 PM", title: "Industry Session — Dell", type: "Partners", room: ROOMS.main, trackId: "dell-track" },
  {
    start: 810,
    end: 840,
    time: "1:30 – 2:00 PM",
    title: "Research Computing at UW Panel with UWIT, eScience, and RCC",
    type: "Partners",
    room: ROOMS.main,
    trackId: "uw-panel-track",
  },
  { start: 840, end: 870, time: "2:00 – 2:30 PM", title: "Research Highlight — Patrick Boyle", type: "Highlight", room: ROOMS.main, talkId: "boyle" },
  { start: 870, end: 885, time: "2:30 – 2:45 PM", title: "Break", type: "Break", room: ROOMS.lobby },
  {
    start: 885,
    end: 960,
    time: "2:45 – 4:00 PM",
    title: "Research Showcase — Afternoon",
    type: "Showcase",
    parallel: [
      {
        room: ROOMS.main,
        track: "Research Showcase — Afternoon",
        sessions: [
          { start: 885, end: 900, label: "Ben Williams", talkId: "williams" },
          { start: 900, end: 915, label: "Kate Hewett", talkId: "hewett" },
          { start: 915, end: 930, label: "Yueyao Fan & Thomas Huang", talkId: "fan" },
          { start: 930, end: 945, label: "Emerson Turner", talkId: "turner" },
          { start: 945, end: 960, label: "Joseph Lee", talkId: "lee" },
        ],
      },
      {
        room: ROOMS.r238,
        track: "Microsoft Azure Track",
        detail: "Partner track — Microsoft Azure",
        trackId: "azure-track",
      },
      {
        room: ROOMS.r307,
        track: "AWS Track",
        detail: "Partner track — Amazon Web Services",
        trackId: "aws-track",
      },
    ],
  },
  { start: 960, end: 970, time: "4:00 – 4:10 PM", title: "Closing Remarks", type: "General", room: ROOMS.main },
  { start: 970, end: 1020, time: "4:10 – 5:00 PM", title: "Networking Reception", type: "Reception", room: ROOMS.lobby },
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

// Speaker talk data. `id` is used as the anchor for in-page linking.
const TALKS = [
  {
    id: "atkins",
    speaker: "Paul S. Atkins",
    affiliation: "Asian Languages and Literature",
    title: "Training a Deep-Learning Model to Decipher Classical Japanese Calligraphy",
    abstract: "Premodern Japanese manuscripts were written in a cursive hand called kuzushiji, literally \"collapsed characters,\" which few readers today can decipher. The phonetic symbols of these manuscripts, called hentaigana, are allographic, meaning that a single sound could be written with any of several forms, each a cursive version of a Chinese character known as its jibo. Many of the texts have been transcribed and printed, but those editions normally render each hentaigana as a modern kana and so discard the jibo. A scribe's choice among jibo is a feature of orthography that differs from scribe to scribe, so statistical analysis of jibo data can help answer who inscribed a manuscript, a question that has traditionally required extensive manual work. Our project applies computational paleography to this problem, training a deep-learning model to read the handwriting down to the jibo so that the analysis can be carried out at scale. The model was first trained in 2025 on a single GPU on Amazon Web Services (AWS), with cloud credits from AWS and the UW eScience Institute. The next phase is a collaboration with Tohoku University to develop a new model for retraining on H200 GPUs on Tillicum.",
    resources: ["Tillicum", "Cloud Computing - AWS"],
    session: "highlight",
  },
  {
    id: "boyle",
    speaker: "Patrick Boyle",
    affiliation: "Bioengineering; Institute for Stem Cell and Regenerative Medicine; Center for Cardiovascular Biology; eScience Institute",
    title: "Virtual Hearts and AI for Better Cardiovascular Care",
    abstract: "In the Cardiac Systems Simulation Lab, we use computational physiology and machine learning to understand cardiovascular disease and develop more personalized approaches to care. Our work centers on virtual hearts — computer models built from medical images that simulate how electrical signals travel through healthy and diseased tissue. These models help us investigate why abnormal heart rhythms arise, explore connections between changes in heart structure and stroke risk, and evaluate potential treatments. We also use simulations to study emerging therapies, including why heart tissue grown from stem cells can cause rhythm disturbances. Research computing supports this work by enabling detailed, three-dimensional simulations across many patients, physiological conditions, and treatment scenarios. Alongside these simulations, we use machine learning and AI to find patterns in clinical data, including electrocardiograms and cardiac imaging, with an emphasis on interpretable methods that support earlier identification of cardiovascular risk.",
    resources: ["Hyak Klone"],
    session: "highlight",
  },
  {
    id: "lu",
    speaker: "Xu Lu",
    affiliation: "Foster School of Business",
    title: "Banking on Inattention",
    abstract: "Banking on Inattention studies how depositor inattention shapes bank deposit pricing and monetary policy transmission. Using transaction-level data from millions of U.S. depositors, we measure inattention from how long unscheduled cash inflows remain in low-interest accounts and show that banks with more inattentive depositors pay lower rates and experience more stable funding. Research computing was essential for processing billions of account-level observations, reconstructing household cash flows, and running the analysis at scale. In the lightning talk, I will highlight how large-scale research computing makes it possible to measure a traditionally difficult-to-observe economic friction — attention — and connect it to bank behavior and monetary policy.",
    resources: ["Cloud Computing - AWS"],
    session: "showcase-a",
  },
    {
    id: "weissenkampe",
    speaker: "Dylan Weissenkampe",
    affiliation: "Diabetes Institute",
    title: "Making a Small Study Count: Computational Robustness for Multi-Omic Human Kidney Biopsies",
    abstract: "When a study has only a dozen participants, the hardest question is whether to believe the results. We profiled kidney biopsies from 11 people with type 2 diabetes measuring ~7,800 proteins and ~18,000 phosphorylation sites in each. Research computing let us test which signals were real: we re-ran the entire pipeline across 30 independent random seeds, built permutation-based null models over a network of ~7,800 proteins, and checked findings against matched single-cell RNA-seq data and public kidney atlases of hundreds of thousands of cells. Kopah, UW-IT's S3-compatible research storage, held the large single-cell objects and analysis outputs. Two lessons emerged: repeating an analysis many times separated robust signals from fragile ones, and a network-propagation filter only became a calibrated test after adding a permutation null.",
    resources: ["Hyak Klone"],
    session: "showcase-a",
  },
    {
    id: "liu",
    speaker: "Aodong Liu",
    affiliation: "Chemistry",
    title: "Simulating Nuclear Quantum Effects at Scale with High-Performance Computing",
    abstract: "Nuclear quantum effects such as zero-point motion and proton delocalization play a central role in hydrogen-bonded networks and proton-transfer chemistry, yet most molecular simulations treat atomic nuclei as classical point charges. The nuclear–electronic orbital (NEO) framework provides a first-principles approach for capturing these effects. Using Hyak's Klone cluster, we developed a distributed-memory Cholesky decomposition algorithm that enabled a NEO calculation on a water cluster with 500 quantum protons — the largest NEO calculation reported to date. We have also developed GPU-accelerated NEO methods on Tillicum to further accelerate the most computationally demanding steps, enabling simulations of coupled electron–nuclear dynamics in real time.",
    resources: ["Hyak Klone", "Tillicum"],
    session: "showcase-a",
  },
    {
    id: "premathilake",
    speaker: "Lakshitha (Laki) Premathilake",
    affiliation: "Salish Sea Modeling Center — UW / Pacific Northwest National Laboratory",
    title: "Oceanographic Modeling Research at the Salish Sea Modeling Center",
    abstract: "The Salish Sea Modeling Center (SSMC), operating under the Center for Urban Waters at UW Tacoma, is a coastal modeling research laboratory dedicated to advancing scientific understanding of Puget Sound and the Salish Sea through hydrodynamics, biogeochemistry, and ecosystem modeling. SSMC leverages UW's Hyak supercomputing system for high-resolution model simulations and data dissemination. The real-world impact of this work spans environmental management, navigation, maritime activities, and regional stewardship — from ecosystem restoration to water quality management, marine life health, and the Salish Sea Columbia River Operational Forecast System (SSCOFS), which delivers real-time and predictive data for safe navigation and search-and-rescue operations.",
    resources: ["Hyak Klone"],
    session: "showcase-a",
  },
    {
    id: "chen",
    speaker: "Bojun Chen",
    affiliation: "Biostatistics",
    title: "CARDIAC-FM: A multimodal foundation model integrating electrocardiography and cardiac MRI for cardiovascular risk prediction",
    abstract: "Atrial fibrillation and heart failure impose substantial health burdens worldwide, yet accurate and generalizable risk prediction remains challenging. We developed CARDIAC-FM, a multimodal foundation model that integrates 12-lead ECG and cardiac MRI through self-supervised representation learning and cross-modal contrastive alignment. Developed on 57,609 paired ECG–cardiac MRI samples from UK Biobank, CARDIAC-FM improved prediction of incident atrial fibrillation and heart failure over contemporary ECG AI models and generalized zero-shot to two external cohorts. The learned representation transferred to continuous cardiac MRI phenotype prediction, time-to-event modeling, and additional cardiovascular outcomes with limited fine-tuning, including myocardial infarction, ischemic stroke, cardiovascular death, and all-cause mortality.",
    resources: ["Tillicum"],
    session: "showcase-a",
  },
  {
    id: "noble",
    speaker: "William Noble",
    affiliation: "Department of Genome Sciences",
    title: "A generalizable Hi-C foundation model for chromatin architecture, single-cell and multiomics analysis across species",
    abstract: "Nuclear DNA is organized into a three-dimensional structure that impacts critical cellular processes. We have developed HiCFoundation, a foundation model trained on massive Hi-C data for integrative analysis linking chromatin structure to downstream regulatory function. The model achieves state-of-the-art performance and generalizability across species on various 3D genome analysis tasks, including reproducibility analysis, resolution enhancement, and loop detection. Additionally, HiCFoundation can predict various epigenomic activities from Hi-C to reveal how 3D structure links to regulatory function, and can adapt to single-cell Hi-C data.",
    resources: ["Cloud Computing - AWS", "Cloud Computing - Azure"],
    session: "showcase-a",
  },
    {
    id: "williams",
    speaker: "Ben Williams",
    affiliation: "Astronomy",
    title: "Resolving Nearby Galaxies into Individual Stars",
    abstract: "We have built automated pipelines to measure photometry for individual stars from high-resolution space-based imaging of nearby galaxies using both the Hubble Space Telescope and the James Webb Space Telescope. Using UW-IT and other cloud-based resources, we have cataloged hundreds of millions of stars across many galaxies in the nearby universe. The large imaging datasets and the number of stars involved require a large amount of parallel computing. I will discuss some of the computing challenges, as well as how these stars can be treated as a type of fossil record that encodes the formation and evolution of galaxies.",
    resources: ["Hyak Klone", "Cloud Computing - AWS"],
    session: "showcase-b",
  },
  {
    id: "hewett",
    speaker: "Kate Hewett",
    affiliation: "UW Applied Physics Laboratory",
    title: "LiveOcean: 3-Day Coastal Ocean Forecasting in the Pacific Northwest",
    abstract: "LiveOcean is a computer modeling system developed by the UW Coastal Modeling Group that makes 3-day forecasts of water properties in the Salish Sea and coastal waters of the Pacific Northwest. Leveraging UW Hyak Klone, LiveOcean delivers complex forecasts of currents, temperature, salinity, oxygen levels, carbon chemistry, and harmful algal blooms. Beyond forecasting, LiveOcean is run over an extended historical period (2013–present) to produce long hindcast data, allowing scientists to reconstruct past events, validate model accuracy, and explore data-driven solutions to ecological challenges. Model output is made publicly available to facilitate communication between resource users, managers, and scientists.",
    resources: ["Hyak Klone", "Kopah"],
    session: "showcase-b",
  },
    {
    id: "fan",
    speaker: "Yueyao Fan & Thomas Huang",
    affiliation: "Materials Science and Engineering",
    title: "Machine Learning-Accelerated Atomistic Simulations of Moiré Quantum Materials at Scale",
    abstract: "Moiré quantum materials exhibit exotic electronic phenomena highly sensitive to atomic structure. We present machine learning-accelerated approaches that bridge first-principles accuracy and large-scale atomistic simulations, enabling the exploration of structure-property relationships in twisted transition metal dichalcogenide (TMD) systems. We introduce a physics-informed training-data generation strategy to develop a bespoke machine-learning interatomic potential transferable across layer numbers, stacking configurations, and twist angles. Applied to twisted multilayer MoTe₂, the model reveals layerwise structural and electronic stratification, giving rise to tunable topological states and nonlinear polarization. We further develop MoiréMLIP, a generalizable framework enabling simulations of up to one million atoms on a single GPU, revealing emergent polarization networks spanning tens of nanometers in complex moiré-of-moiré structures.",
    resources: ["Hyak Klone", "Tillicum"],
    session: "showcase-b",
  },
  {
    id: "turner",
    speaker: "Emerson Turner",
    affiliation: "Materials Science and Engineering",
    title: "Full-Chip Electromagnetic Simulation for Quantum Device Design",
    abstract: "Resonators and qubits are fundamental components of superconducting quantum computers, each requiring extensive fabrication and characterization at millikelvin temperatures. Small design changes have significant impacts: a single micrometer can shift a qubit's frequency by several megahertz. Our research group added Palace (PArallel LArge-scale Computational Electromagnetics), developed by Amazon Web Services, to Hyak for large-scale simulations essential to designing quantum computing hardware. Utilizing full-wave 3D electromagnetic modeling and finite-element analysis enabled accurate extraction of eigenmodes, field distributions, and quality factors from entire multicomponent chips. A workflow that previously took many hours to days now takes minutes to a few hours, with simulation results consistent with measurements of fabricated devices.",
    resources: ["Hyak Klone"],
    session: "showcase-b",
  },
  {
    id: "lee",
    speaker: "Joseph Lee",
    affiliation: "Computer Science and Engineering",
    title: "Designing Protein Structures from Natural Language",
    abstract: "A central challenge in de novo protein design is generating proteins with desired structural and functional properties. We develop Prompteina, the first all-atom structure generation model that supports design objectives specified in natural language, analogous to text-to-image generation. We construct Prompteina-Data, a paired text–protein structure dataset of 1.8M structures and 50M+ captions describing structural and functional properties. Prompteina outperforms baselines on 15 of 18 structural properties and improves interface confidence by 14% over the strongest baseline in binder design. We experimentally validated designs against GM2A, a target with no reported de novo binders, identifying nine binders with the strongest at an apparent affinity of 107 nM. UW research computing resources including Hyak and Tillicum were essential in dataset generation and in training and evaluating our models.",
    resources: ["Hyak Klone", "Tillicum"],
    session: "showcase-b",
  },
];

// Vendor and partner track descriptions.
const VENDOR_TRACKS = [
  {
    id: "uw-libraries-track",
    name: "UW Libraries",
    title: "Your Job Ran, You Got Your Results. Now What?",
    description:
      "If you want your research to have an impact, it's not enough to do good work; you've got to share it. But you've got terabytes of output, a journal asking for your data and code, a funder with its own rules, and no money for publishing. UW librarians are here to help you understand the research communications landscape and think through your options. Bring your thorniest publishing and data sharing questions, and together we'll work through what you can share, what you should share, where it might go, and who owns what.",
    agenda: [],
  },
  {
    id: "azure-track",
    name: "Microsoft Azure",
    title: "The Next Era of Scientific Discovery",
    description: "How cloud, HPC, and AI are changing what's possible in research, and what that means for your institution.",
    agenda: [
      {
        label: "Welcome & Framing",
        detail: "The Next Era of Scientific Discovery. How cloud, HPC, and AI are changing what's possible in research, and what that means for your institution.",
      },
      {
        label: "Researcher Spotlight: Lessons from the Field",
        detail: "Researchers talk candidly about what worked, what didn't, and the results they measured.",
      },
      {
        label: "Introducing Microsoft Discovery",
        detail: "A first look at Microsoft's agentic AI platform. It speeds up the full research lifecycle, from hypothesis to insight, and includes built-in data collaboration.",
      },
      {
        label: "Live Demo: Azure HPC + Azure AI Foundry in Action",
        detail: "A hands-on walkthrough of how researchers can scale simulations, build AI models, and get to discovery faster.",
      },
      {
        label: "Open Q&A & Next Steps",
        detail: "Bring your questions. We'll also cover how to get started, including pilots, credits, MACC agreement, and technical support.",
      },
    ],
  },
  {
    id: "aws-track",
    name: "Amazon Web Services",
    title: "Rapidly turn ideas into working solutions with Kiro — free for UW students!",
    description:
      "Meet Kiro, an agentic, spec-driven IDE that helps you quickly set up research projects, pipelines, and tools, even if you aren't a coder. Simply describe what you need in plain language. Kiro turns that into requirements and a design plan, then writes, tests, and documents the code with you. In this session we'll give a quick overview of Kiro, walk through some demonstrations, and then show you how UW students can get it for free. Drop in and learn how you can get to research outcomes faster.",
    agenda: [],
  },
  {
    id: "uw-panel-track",
    name: "Research Computing at UW",
    title: "Research Computing at UW Panel with UWIT, eScience, and RCC",
    description:
      "Discover how UW supports research through computing resources, training, and student programs. Representatives from UWIT Research Computing, the eScience Institute, and the Research Computing Club (RCC) will share an overview of their services, training opportunities, and student support programs. The session will also introduce two new research computing services coming in 2027. Join us to learn about the resources available to support your research and ask questions during a dedicated Q&A.",
    agenda: [],
  },
  {
    id: "dell-track",
    name: "Dell Technologies",
    title: "Dell Technologies' Vision for Academic Research",
    speaker: "Varun Chhabra",
    speakerTitle: "SVP Product Marketing at Dell Technologies (AI, Storage, Compute, Networking, Cyber Resilience)",
    description:
      "How can research computing infrastructure evolve to meet the demands of tomorrow's scientific discoveries? In this talk, Varun Chhabra, Senior Vice President of Product Marketing at Dell Technologies, will share Dell's vision and roadmap for supporting academic research in an era of rapidly advancing AI and high-performance computing. Drawing on Dell's work across AI, storage, compute, networking, and cyber resilience, Varun will explore how emerging technologies and integrated infrastructure can help universities address growing computational demands, manage increasingly complex research data, and accelerate scientific discovery. He will also discuss how Dell's evolving technology roadmap and partnerships with research institutions can help shape the future of research computing.",
    agenda: [],
  },
];

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
const SPONSORS = [
  {
    name: "Dell Technologies",
    image: "/img/logos/dell_technologies.png",
    link: "https://www.dell.com",
  },
  {
    name: "Redesign",
    image: "/img/logos/redesign_logo.webp",
    link: "https://www.redesign-group.com/",
  },
];

const INDUSTRY_PARTICIPANTS = [
  {
    name: "Amazon Web Services",
    image: "/img/logos/aws_logo.webp",
    link: "https://aws.amazon.com",
  },
  {
    name: "Google Cloud",
    image: "/img/logos/google_cloud_logo.png",
    link: "https://cloud.google.com",
  },
  {
    name: "Microsoft Azure",
    image: "/img/logos/azure_logo.png",
    link: "https://azure.microsoft.com",
  },
];

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

function TalkCard({ talk }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // When the page loads (or hash changes), open and scroll to this card if it matches.
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === `#${talk.id}`) {
        setOpen(true);
        // Wait a tick so the element is visible before scrolling.
        setTimeout(() => {
          ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [talk.id]);

  return (
    <details
      id={talk.id}
      ref={ref}
      className={styles.talkCard}
      open={open}
      onToggle={(e) => setOpen(e.target.open)}
    >
      <summary className={styles.talkSummary}>
        <span className={styles.talkSpeaker}>
          {talk.speaker}
          {talk.affiliation && <span className={styles.talkAffiliation}> — {talk.affiliation}</span>}
        </span>
        <span className={styles.talkTitle}>{talk.title}</span>
      </summary>
      <div className={styles.talkBody}>
        <p className={styles.talkAbstract}>{talk.abstract}</p>
        {talk.resources && talk.resources.length > 0 && (
          <p className={styles.talkResources}>
            <strong>Computing resources: </strong>
            {talk.resources.join(", ")}
          </p>
        )}
      </div>
    </details>
  );
}

function VendorTrackCard({ track }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === `#${track.id}`) {
        setOpen(true);
        setTimeout(() => {
          ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [track.id]);

  return (
    <details
      id={track.id}
      ref={ref}
      className={styles.talkCard}
      open={open}
      onToggle={(e) => setOpen(e.target.open)}
    >
      <summary className={styles.talkSummary}>
        <span className={styles.talkSpeaker}>
          {track.name}
          {track.speaker && (
            <span className={styles.talkAffiliation}> — {track.speaker}{track.speakerTitle ? `, ${track.speakerTitle}` : ""}</span>
          )}
        </span>
        <a
          className={styles.talkTitle}
          href={`#${track.id}`}
          onClick={(e) => {
            e.stopPropagation();
            // Copy the link to clipboard as a convenience, then navigate.
            history.pushState(null, "", `#${track.id}`);
            setOpen(true);
            setTimeout(() => {
              ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
          }}
        >
          {track.title}
        </a>
      </summary>
      <div className={styles.talkBody}>
        <p className={styles.talkAbstract}>{track.description}</p>
        {track.agenda && track.agenda.length > 0 && (
          <ul className={styles.vendorAgenda}>
            {track.agenda.map((item, i) => (
              <li key={i}>
                <strong>{item.label}:</strong> {item.detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}

// Maps a session type to its color-coding CSS class.
const TYPE_CLASS = {
  General: styles.typeGeneral,
  Highlight: styles.typeHighlight,
  Break: styles.typeBreak,
  Partners: styles.typePartners,
  Showcase: styles.typeShowcase,
  Reception: styles.typeReception,
};

const TYPE_LEGEND = [
  { type: "General", label: "General / Program" },
  { type: "Highlight", label: "Research Highlight" },
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

// Lookup map for quick access to talk data by id.
const TALK_BY_ID = Object.fromEntries(TALKS.map((t) => [t.id, t]));

// Lookup map for vendor track data by id.
const VENDOR_TRACK_BY_ID = Object.fromEntries(VENDOR_TRACKS.map((t) => [t.id, t]));

function SessionBlock({ type, title, startLabel, endLabel, talkId, trackId, children }) {
  const talk = talkId ? TALK_BY_ID[talkId] : null;
  const vendorTrack = trackId ? VENDOR_TRACK_BY_ID[trackId] : null;
  const linkId = talkId || trackId;
  const nameEl = linkId ? (
    <a className={styles.blockTitleLink} href={`#${linkId}`}>{title}</a>
  ) : (
    <span className={styles.blockTitle}>{title}</span>
  );
  return (
    <div className={`${styles.block} ${TYPE_CLASS[type] || ""}`}>
      {nameEl}
      {talk && (
        <span className={styles.blockSubtitle}>{talk.title}</span>
      )}
      {vendorTrack && (
        <span className={styles.blockSubtitle}>{vendorTrack.title}</span>
      )}
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
                      {/* Per-track room header, above the track's blocks */}
                      <div className={styles.trackRoom}>{p.room}</div>
                      <div className={styles.trackBody}>
                        {p.sessions ? (
                          // Each presentation is its own to-scale block,
                          // positioned relative to this parallel window's start.
                          p.sessions.map((s) => (
                            <div
                              className={styles.subRow}
                              style={subBox(s.start - item.start, s.end - item.start)}
                              key={s.start}
                            >
                              <SessionBlock
                                type={item.type}
                                title={s.label}
                                talkId={s.talkId}
                                startLabel={minutesToLabel(s.start)}
                                endLabel={minutesToLabel(s.end)}
                              />
                            </div>
                          ))
                        ) : (
                          <SessionBlock
                            type={item.type}
                            title={p.track}
                            trackId={p.trackId}
                            startLabel={minutesToLabel(item.start)}
                            endLabel={minutesToLabel(item.end)}
                          >
                            {p.detail && (
                              <span className={styles.blockDetail}>{p.detail}</span>
                            )}
                          </SessionBlock>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.trackCol}>
                  <div className={styles.trackRoom}>{item.room}</div>
                  <div className={styles.trackBody}>
                    {item.sessions ? (
                      // A single-track block subdivided into back-to-back
                      // sub-sessions, each its own to-scale block.
                      item.sessions.map((s) => (
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
                        title={item.title}
                        talkId={item.talkId}
                        trackId={item.trackId}
                        startLabel={minutesToLabel(item.start)}
                        endLabel={minutesToLabel(item.end)}
                      />
                    )}
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
            Main sessions are in {ROOMS.main};
            check-in, breaks, lunch, and the reception are in {ROOMS.lobby}.
            During the two Research Showcase blocks, three sessions run at the
            same time: the main track in {ROOMS.main} and partner tracks in{" "}
            {ROOMS.r238} and {ROOMS.r307}.
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
                    Plan Your Visit: 
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

        {/* Talks */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Talks</h2>
          <h3 className={styles.talksSubheading}>Research Highlights</h3>
          {TALKS.filter((t) => t.session === "highlight").map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
          <h3 className={styles.talksSubheading}>Research Showcase — Morning</h3>
          {TALKS.filter((t) => t.session === "showcase-a").map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
          <h3 className={styles.talksSubheading}>Research Showcase — Afternoon</h3>
          {TALKS.filter((t) => t.session === "showcase-b").map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
          <h3 className={styles.talksSubheading}>Vendor and Partner Tracks</h3>
          <p>
            During the two Research Showcase blocks, partner sessions run in parallel in HUB 238 and HUB 307. These sessions are led by industry partners and campus organizations.
          </p>
          {VENDOR_TRACKS.map((track) => (
            <VendorTrackCard key={track.id} track={track} />
          ))}
        </section>

        {/* Partners & Sponsors */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Campus Partners &amp; Sponsors</h2>
          <p>
            We are grateful to the campus partners and sponsors who make this event
            possible.
          </p>
          <div className={styles.logos}>
            <LogoGrid title="Event Sponsors" items={SPONSORS} />
            <LogoGrid title="Industry Participants" items={INDUSTRY_PARTICIPANTS} />
            <LogoGrid title="Campus Partners" items={PARTNERS} />
          </div>
        </section>

        {/* Related event */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Related Event</h2>
          <h3>Accelerating Research Day</h3>
          <p>
            A half-day engagement on Thursday, November 12, 2026 hosted by Dell
            Technologies and NVIDIA. Explore the transformative power of AI
            through strategy sessions and hands-on labs, learn from experts, and
            network with peers. Lunch will be provided.
          </p>
          <p>
            <a href="/accelerating-research-day">
              Learn more about Accelerating Research Day →
            </a>
          </p>
        </section>
      </main>
    </Layout>
  );
}
