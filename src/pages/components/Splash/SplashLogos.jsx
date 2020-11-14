import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import { mapImgItemsToHTMLImgs } from "~/src/utils";


export default function SplashLogos() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
    <div className={styles.splashLogo}>
      {mapImgItemsToHTMLImgs(siteConfig.customFields.Graphics.SPLASH_LOGOS)}
    </div>
  )
}
