import React from "react";
import styles from "./styles.module.css";

export default function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroBannerContent}>
        <h2 className={styles.heroBannerTitle}>New to Hyak?</h2>
        <p className={styles.heroBannerSubtitle}>
          Get started with our documentation to set up your account, connect to the cluster, and run your first job.
        </p>
        <a href="/docs" className={styles.heroBannerButton}>
          Get Started →
        </a>
      </div>
    </div>
  );
}
