import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import styles from "./styles.module.css"

SplashCircle.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  text: PropTypes.string,
  linkTo: PropTypes.string,
  xTransform: PropTypes.number,
  yTransform: PropTypes.number
}

export default function SplashCircle(props) {
  return (
    <motion.g
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        x: props.xTransform || 0,
        y: props.yTransform || 0
      }} transition={{ duration: 0.2 }}
    >
      <a className={styles.splashText} href={props.linkTo} target="_blank">
          <circle cx={props.cx} cy={props.cy} r={props.r} fill="#001b3d"  />
          <text x={props.cx} y={props.cy} dominantBaseline="middle" textAnchor="middle">
            {props.text}
          </text>
      </a>
    </motion.g>
  )
}
