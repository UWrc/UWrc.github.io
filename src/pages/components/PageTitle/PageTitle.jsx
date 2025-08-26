import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css"

HomeSection.propTypes = {
  title: PropTypes.element.isRequired,
}

export default function HomeSection(props) {
  return (
    <div className={styles.pageTitle}>
      <h1>{props.title}</h1>
    </div>
  )
}
