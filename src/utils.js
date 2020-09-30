import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { motion } from "framer-motion";

export function capitalizeStr(str) {
  return str.replace(/^\w/, c => c.toUpperCase())
}

export function mapImgItemsToHTMLImgs(imgItems) {
  return imgItems.map(item => {
    return (
      item.link ?
        <a key={item.caption} href={item.link}>
          <motion.img src={useBaseUrl(item.image)} alt={item.caption}
                      whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} />
        </a> :
        <img key={item.caption} src={useBaseUrl(item.image)} alt={item.caption} />
    )
  })
}