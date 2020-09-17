import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";


function mapImgItemsToHTMLImgs(imgItems) {
  return imgItems.map(item => <img key={item.caption} src={useBaseUrl(item.image)} alt={item.caption} />)
}

export default function HomeSection(props) {
  return (
    <div className="logo-container pt-3">
      {props.header}
      <div className="logos">{mapImgItemsToHTMLImgs(props.imgs)}</div>
      {props.content ? props.content : []}
    </div>
  )
}