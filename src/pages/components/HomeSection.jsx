import React from "react";

import { mapImgItemsToHTMLImgs } from "../../utils";

export default function HomeSection(props) {
  return (
    <div className="logo-container pt-3">
      {props.header}
      <div className="logos">{mapImgItemsToHTMLImgs(props.imgs)}</div>
      {props.content ? props.content : []}
    </div>
  )
}