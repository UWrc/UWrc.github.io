import React from "react";
import { motion } from "framer-motion";

import SplashBox from "./SplashBox";
import SplashCircle from "./SplashCircle";


export default function SplashImage() {
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  return (
    <svg width={1075} height={340} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="blue-radial">
          <stop offset="0%"  stopColor="#fff" />
          <stop offset="5%"  stopColor="#c5b4e5" />
          <stop offset="65%"  stopColor="#fff" />
        </radialGradient>
        <linearGradient id="blue-indigo-magenta">
          <stop offset="0%" stopColor="#28d9f2" />
          <stop offset="50%" stopColor="#3578e5" />
          <stop offset="100%" stopColor="#f44af5" />
        </linearGradient>
        <marker id="arrowhead" markerWidth="6" markerHeight="6"
                refX="0" refY="3" orient="auto" fill="#001b3d">
          <polygon points="0 0, 6 3, 0 6" />
        </marker>
      </defs>
      <rect transform="translate(0, 10)" width={1075} height={330} fill="url(#blue-radial)" />
      <g id="boxes" transform="translate(390, 50)">
        <SplashBox x={0} y={130} width={300} height={100} yTransition={30} topColor="#6f46be" sideColor="#4B2E83" text="Text3" linkTo="" />
        <SplashBox x={0} y={80} width={300} height={100} topColor="#d098db" sideColor="#a541b8" text="Text2" linkTo=""/>
        <SplashBox x={0} y={30} width={300} height={100} yTransition={-30} topColor="#81d38e" sideColor="#3aa74c" text="Text1" linkTo=""/>
      </g>
      <g id="left-circles" transform="translate(50, 80)">
        <SplashCircle cx={0} cy={100} xTransform={100} yTransform={-100} r={48} c text="Circle1" linkTo="http://www.washington.edu"/>
        <SplashCircle cx={0} cy={100} r={48} text="Circle2" linkTo="http://www.washington.edu"/>
        <SplashCircle cx={0} cy={100} xTransform={100} yTransform={100} r={48} text="Circle3" linkTo="http://www.washington.edu"/>
      </g>
      <motion.g id="left-arrows" transform="translate(120, 120)" variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.5}}>
        <path fill="none" stroke="#001b3d" strokeWidth="3" markerEnd="url(#arrowhead)" d="M0 60 L230 60" />
        <path fill="none" stroke="#001b3d" strokeWidth="3" d="M90 0 Q130 60 230 60" />
        <path fill="none" stroke="#001b3d" strokeWidth="3" d="M90 120 Q130 60 230 60" />
      </motion.g>
      <g id="right-circles" transform="translate(890, 80)">
        <SplashCircle cx={80} cy={100} xTransform={-80} yTransform={-100} r={48} text="Circle4" linkTo="http://www.washington.edu"/>
        <SplashCircle cx={80} cy={100} r={48} text="Circle5" linkTo="http://www.washington.edu"/>
        <SplashCircle cx={80} cy={100} xTransform={-80} yTransform={100} r={48} text="Circle6" linkTo="http://www.washington.edu"/>
      </g>
      <motion.g id="right-arrows" transform="translate(710, 80)" variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.5}}>
        <path d="M0 0 L100 0" fill="none" stroke="#001b3d" strokeWidth="3" markerEnd="url(#arrowhead)" strokeDasharray="4" />
        <path d="M0 100 L180 100" fill="none" stroke="#001b3d" strokeWidth="3" markerEnd="url(#arrowhead)" strokeDasharray="4" />
        <path d="M0 200 L100 200" fill="none" stroke="#001b3d" strokeWidth="3" markerEnd="url(#arrowhead)" strokeDasharray="4" />
      </motion.g>
    </svg>
  )
}