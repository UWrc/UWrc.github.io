import React from "react";
import styles from "./styles.module.css";

export default function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroBannerContent}>
        <h2 className={styles.heroBannerTitle}>New to Hyak?</h2>
        <a href="/docs" className={styles.heroBannerButton}>
          Get Started →
        </a>
      </div>
    </div>
  );
}
