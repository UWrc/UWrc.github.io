import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

HyakCarouselItem.propTypes = {
  image: PropTypes.string.isRequired,  // path to image
  title: PropTypes.string,
  caption: PropTypes.string,
  linkUrl: PropTypes.string  // href url
}

export default function HyakCarouselItem(props) {

  let itemContent = <div className={styles.carouselContainer}>
    <img className={styles.carouselImage} src={props.image} alt={props.title} />
    <h3 className={styles.carouselTitle}><span>{props.title}</span></h3>
    <p className={styles.carouselCaption}><span>{props.caption}</span></p>
  </div>

  if (props.linkUrl) {
    return <a href={props.linkUrl} target='_blank'>
      {itemContent}
    </a>
  } else {
    return itemContent
  }
}