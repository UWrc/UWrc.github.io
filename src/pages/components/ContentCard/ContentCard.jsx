import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css"

import { mapImgItemsToHTMLImgs } from "utils"


ContentCard.propTypes = {
  header: PropTypes.element.isRequired,
  image: PropTypes.element.isRequired,
  caption: PropTypes.element.isRequired,
  link: PropTypes.element.isRequired,
  isvideo: PropTypes.boolean,
}

export default function ContentCard(props) {
  return (
    <div className={styles.contentCard}>
      <a href={props.link}>
      <div className={styles.imageContainer}>
        {props.isvideo ? <span className={styles.playButton}>▶</span> : []}
        <img className={styles.contentCardImage} src={props.image} alt=""/>
      </div>
      <div className={styles.contentCardTextContainer}>
        <h3>{props.header}</h3>
        <p>{props.caption}</p>
      </div>      
      </a>
    </div>
  )
}
