import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css"

import { mapImgItemsToHTMLImgs } from "~/src/utils"


HomeSection.propTypes = {
  header: PropTypes.element.isRequired,
  imgs: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string
  })).isRequired,
  content: PropTypes.arrayOf(PropTypes.element)
}

export default function HomeSection(props) {
  return (
    <div className={`${styles.logoContainer} pt-3`}>
      {props.header}
      <div className={styles.logos}>{mapImgItemsToHTMLImgs(props.imgs)}</div>
      {props.content ? props.content : []}
    </div>
  )
}
