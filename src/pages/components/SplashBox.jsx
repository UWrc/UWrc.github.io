import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";


function topPath({ x, y, width, height }) {
  let svgPath = [
    `M${x} ${y + height / 4}`,
    `L${x + width / 2} ${y}`,
    `L${x + width} ${y + height / 4}`,
    `L${x + width / 2} ${y + height / 2}`,
    'Z'
  ]
  return svgPath.join(' ')
}

function sidePath({ x, y, width, height }) {
  let svgPath = [
    `M${x} ${y + height / 4}`,
    `L${x} ${y + 3 / 4 * height}`,
    `L${x + width / 2} ${y + height}`,
    `L${x + width} ${y + 3 / 4 * height}`,
    `L${x + width} ${y + height / 4}`,
    `L${x + width / 2} ${y + height / 2}`,
    'Z'
  ]
  return svgPath.join(' ')
}

function textRotationAngle({ width, height }) {
  return -1 * Math.atan((height / 4) / (width / 2)) * (180 / Math.PI)
}

SplashBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  yTransition: PropTypes.number,
  topColor: PropTypes.string.isRequired,
  sideColor: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  text: PropTypes.string
}

export default function SplashBox(props) {
  return (
    <motion.g
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: props.yTransition || 0 }}
      transition={{ duration: 0.2 }}
    >
      <a href={props.linkTo} target="_blank">
        <path fill={props.sideColor} d={sidePath(props)} />
        <path fill={props.topColor} d={topPath(props)} />
        <text
          x={props.x + 7 / 10 * props.width - props.y / 5}
          y={props.y + props.height}
          dominantBaseline="middle"
          textAnchor="middle"
          transform={`rotate(${textRotationAngle(props)})`}
          style={{
            fill: "white",
            fontWeight: "bold",
            fontStyle: "italic"
          }}
        >
          {props.text}
        </text>
      </a>
    </motion.g>
  )
}