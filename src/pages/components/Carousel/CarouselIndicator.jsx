import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles.module.css";

CarouselIndicator.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string
}

export default function CarouselIndicator(props) {
  if (props.isSelected) {
    return <li
      className={classNames(styles.carouselIndicator, styles.active)} 
      title={`${props.label} ${props.index + 1}`}
    />
  } else {
    return <li
      className={styles.carouselIndicator}
      onClick={props.onClickHandler}
      onKeyDown={props.onClickHandler}
      value={props.index}
      key={props.index}
      role="button"
      tabIndex={0}
      title={`${props.label} ${props.index + 1}`}
    />
  }
}