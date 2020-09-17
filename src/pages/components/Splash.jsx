import React from "react";
import classnames from "classnames";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import SplashColumn from "./SplashColumn";

import styles from "../styles.module.css";


export default function Splash(props) {
  return (
    <header className={classnames("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="splash-wrapper">
          <SplashColumn imgs={props.leftImgs} side="left" key="left" />
          <div className="splash-middle" key="middle">
            <img className="hyak-splash" src={useBaseUrl(props.logo)} alt="Hyak Logo" />
            <p className="tagline">{props.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className={classnames(
                  "button button--outline button--secondary button--lg",
                  styles.getStarted,
                )}
                to={useBaseUrl("docs/setup")}>
                Get Started
              </Link>
            </div>
          </div>
          <SplashColumn imgs={props.rightImgs} side="right" key="right" />
        </div>
      </div>
    </header>
  )
}