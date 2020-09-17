import React from "react";
import Reel from "react-reel";
import useInView from "react-cool-inview";

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

export default function StatSlotMachineItem(props) {
  const { ref, inView } = useInView({
    unobserveOnEnter: true
  })

  let reel = inView ? <Reel text={props.number} theme={REEL_THEME} /> : <></>

  return <div className="col-4" ref={ref}>
    <div
      className="rounded d-flex justify-content-center align-items-center flex-column"
      style={{
        height: '200px',
        backgroundColor: props.backgroundColor
      }}
    >
      {reel}
      <p className="stat-caption text-white">{props.caption}</p>
    </div>
  </div>

}