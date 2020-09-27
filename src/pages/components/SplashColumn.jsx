import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { capitalizeStr } from "../../utils";


function mapSplashImgItemsToImgColumn(imgs, side) {
  return imgs.map((item, i) => (
    <div
      className={
        `splash-side-img animate__animated animate__fadeIn${capitalizeStr(side)} animate__delay-${i+1}s ` + side
      }
      key={i}
    >
      <img src={useBaseUrl(item.image)} key={item.caption} alt={item.caption} />
    </div>
  ))
}

export default function SplashColumn({ imgs, side }) {
  return <div className="splash-side">
    {mapSplashImgItemsToImgColumn(imgs, side)}
  </div>
}