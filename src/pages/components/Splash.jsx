import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import SplashImage from "./SplashImage";
import TypingTagline from "./TypingTagline";

import styles from "../styles.module.css"
import classnames from "classnames";

import { mapImgItemsToHTMLImgs } from "../../utils";


export default function Splash() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
    <div className="splash" style={{
      textAlign: "center",
    }}>
      <SplashImage />
      <TypingTagline />
      <div className="splash-logos">
        {mapImgItemsToHTMLImgs(siteConfig.customFields.Graphics.SPLASH_LOGOS)}
      </div>
      <div className={styles.buttons}>
        <Link
          className={classnames(
            "button button--outline button--secondary button--lg",
            styles.getStarted,
          )}
          to={useBaseUrl("docs/setup")}>
          Button1
        </Link>
        <Link
          className={classnames(
            "button button--outline button--secondary button--lg",
            styles.getStarted,
          )}
          to={useBaseUrl("docs/setup")}>
          Button2
        </Link>
      </div>
    </div>
  )
}