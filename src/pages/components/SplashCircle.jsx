import React from "react";
import {motion} from "framer-motion";

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
      <a href={props.linkTo} target="_blank">
          <circle cx={props.cx} cy={props.cy} r={props.r} fill="#001b3d"  />
          <text x={props.cx} y={props.cy} dominantBaseline="middle" textAnchor="middle" style={{
            fill: "white",
            fontWeight: "bold",
            fontSize: "24px",
            textDecoration: "none"
          }}>{props.text}</text>
      </a>
    </motion.g>
  )
}