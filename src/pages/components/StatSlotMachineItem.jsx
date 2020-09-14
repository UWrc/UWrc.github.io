import React from "react";
import Reel from 'react-reel'
import InViewMonitor from "react-inview-monitor";

const REEL_THEME = {
  reel: {
    height: "1em",
    display: "flex",
    alignItems: "flex-end",
    overflowY: "hidden",
    fontSize: "64px",
    fontWeight: "300",
    color: "white",
    lineHeight: "0.95em"
  },
  group: {
    transitionDelay: "0ms",
    transitionTimingFunction: "ease-in-out",
    transform: "translate(0, 0)",
    height: "1em"
  },
  number: {
    height: "1em"
  }
};

export default function StatSlotMachineItem({ idx, number, caption, boxColor, slideInClass='animate__slideInUp' }) {
  return <InViewMonitor
    key={idx}
    classNameNotInView="col-4 vis-hidden"
    classNameInView={`col-4 fadeineffects__item animate__animated ${slideInClass}`}
  >
    <div
      className="rounded d-flex justify-content-center align-items-center flex-column"
      style={{
        height: '200px',
        backgroundColor: boxColor
      }}
    >
      <Reel text={number} theme={REEL_THEME} />
      <p className="stat-caption text-white">{caption}</p>
    </div>
  </InViewMonitor>
}