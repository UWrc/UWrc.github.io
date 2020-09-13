import React from "react";
import useBaseUrl from '@docusaurus/useBaseUrl';


function mapImgItemsToHTMLImgs(imgItems) {
  return imgItems.map(item => <img key={item.caption} src={useBaseUrl(item.image)} alt={item.caption} />)
}

export default function HomeSection({ header, imgs, content = [] }) {
  return (
    <div className="logo-container pt-3">
      {header}
      <div className="logos">{mapImgItemsToHTMLImgs(imgs)}</div>
      {content}
    </div>
  )
}