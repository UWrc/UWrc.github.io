import classnames from "classnames";
import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import PropTypes from 'prop-types';

import styles from "../styles.module.css";

SplashButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.exact({
    label: PropTypes.string,
    path: PropTypes.string
  })).isRequired
}

export default function SplashButtons(props) {
  return (
    <div className={styles.buttons}>
      {
        props.buttons && props.buttons.map(button => {
          return (
            <Link
              key={button.label}
              className={classnames(
                "button button--outline button--secondary button--lg",
                styles.getStarted,
              )}
              to={useBaseUrl(button.path)}>
              {button.label}
            </Link>
          )
        })
      }
    </div>
  )
}