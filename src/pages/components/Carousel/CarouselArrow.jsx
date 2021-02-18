import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

CarouselArrow.propTypes = {  // props come from responsive-react-carousel component
  onClickHandler: PropTypes.func.isRequired,
  hasNext: PropTypes.bool.isRequired,
  label: PropTypes.string,
  arrowDirection: PropTypes.string.isRequired,  // either "left" or "right"
}

export default function CarouselArrow(props) {
  let icon = '?'
  if (props.arrowDirection === 'left') {
    icon = <FontAwesomeIcon icon={faAngleLeft} />
  } else if (props.arrowDirection === 'right') {
    icon = <FontAwesomeIcon icon={faAngleRight} />
  }
  
  return props.hasNext && <button 
    className={classNames(styles.carouselArrow, styles[props.arrowDirection])} 
    type="button" 
    onClick={props.onClickHandler} 
    title={props.label}
  >
    {icon}
  </button>
}