import React from "react";
import { motion } from "framer-motion";

import SplashBox from "./SplashBox";
import SplashCircle from "./SplashCircle";


export default function SplashImage(props) {

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  return (
    <svg width="100%" height="48%" viewBox="0 0 1020 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pink-radial">
          <stop offset="0%"  stopColor="#fff" />
          <stop offset="5%"  stopColor="#c5b4e5" />
          <stop offset="65%"  stopColor="#fff" />
        </radialGradient>
        <radialGradient id="dark-mode-white">
          <stop offset="0%"  stopColor="#18191a" />
          <stop offset="5%"  stopColor="#4b2e83" />
          <stop offset="65%"  stopColor="#18191a" />
        </radialGradient>
        <marker id="arrowhead" markerWidth="6" markerHeight="6"
                refX="0" refY="3" orient="auto" fill={"#001b3d"/*props.isDarkTheme ? "white" : "#001b3d"*/}>
          <polygon points="0 0, 6 3, 0 6" />
        </marker>
      </defs>
      <rect transform="translate(0, 10)" width={1020} height={330} fill={"url(#pink-radial)" /*props.isDarkTheme ? "url(#dark-mode-white)" : "url(#pink-radial)"*/} />
      <g id="boxes" transform="translate(320, 50)">
        <SplashBox x={0} y={130} width={400} height={100} yTransition={30} topColor="#6f46be" sideColor="#4B2E83" text="Consulting" linkTo="/docs/support/consulting" />
        <SplashBox x={0} y={80} width={400} height={100} topColor="#d098db" sideColor="#a541b8" text="Storage" linkTo="/docs/storage/data"/>
        <SplashBox x={0} y={30} width={400} height={100} yTransition={-30} topColor="#dbc63b" sideColor="#c2a800" text="Compute" linkTo="/docs/compute/compute"/>
      </g>
      {/*
      <g id="left-circles" transform="translate(50, 80)">
        <SplashCircle cx={0} cy={100} xTransform={100} yTransform={-100} r={48} text="ML/AI" 
          linkTo="http://www.washington.edu" isDarkTheme={props.isDarkTheme}
        />
        <SplashCircle cx={0} cy={100} r={48} text="Data" 
          linkTo="http://www.washington.edu" isDarkTheme={props.isDarkTheme}
        />
        <SplashCircle cx={0} cy={100} xTransform={100} yTransform={100} r={48} text="Circle3" 
          linkTo="http://www.washington.edu" isDarkTheme={props.isDarkTheme}
        />
      </g>
      <motion.g id="left-arrows" transform="translate(120, 120)" variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.5}}>
        <path fill="none" stroke={props.isDarkTheme ? "white" : "#001b3d"} strokeWidth="3" markerEnd="url(#arrowhead)" d="M0 60 L210 60" />
        <path fill="none" stroke={props.isDarkTheme ? "white" : "#001b3d"} strokeWidth="3" d="M90 0 Q130 60 210 60" />
        <path fill="none" stroke={props.isDarkTheme ? "white" : "#001b3d"} strokeWidth="3" d="M90 120 Q130 60 210 60" />
      </motion.g>
      <g id="right-circles" transform="translate(890, 80)">
        <SplashCircle cx={80} cy={100} xTransform={-80} yTransform={-100} r={48} text="Results" 
          linkTo="http://www.washington.edu" isDarkTheme={props.isDarkTheme}
        />
        <SplashCircle cx={80} cy={100} r={48} text="Pubs" 
          linkTo="/publications" isDarkTheme={props.isDarkTheme}
        />
        <SplashCircle cx={80} cy={100} xTransform={-80} yTransform={100} r={48} text="Grants" 
          linkTo="http://www.washington.edu" isDarkTheme={props.isDarkTheme}
        />
      </g>
      <motion.g id="right-arrows" transform="translate(710, 80)" variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.5}}>
        <path d="M0 0 L100 0" fill="none" stroke={props.isDarkTheme ? "white" : "#001b3d"} strokeWidth="3" markerEnd="url(#arrowhead)" strokeDasharray="4" />
        <path d="M0 100 L180 100" fill="none" stroke={props.isDarkTheme ? "white" : "#001b3d"} strokeWidth="3" markerEnd="url(#arrowhead)" strokeDasharray="4" />
        <path d="M0 200 L100 200" fill="none" stroke={props.isDarkTheme ? "white" : "#001b3d"} strokeWidth="3" markerEnd="url(#arrowhead)" strokeDasharray="4" />
      </motion.g>
      */}
    </svg>
  )
}