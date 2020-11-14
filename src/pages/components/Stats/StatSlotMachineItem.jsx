import React from "react";
import Reel from "react-reel";
import useInView from "react-cool-inview";
import PropTypes from "prop-types";
import styles from "./styles.module.css"

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

StatSlotMachineItem.propTypes = {
  value: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  caption: PropTypes.string.isRequired
}

export default function StatSlotMachineItem(props) {
  const { ref, inView } = useInView({
    unobserveOnEnter: true
  })

  let reel = inView ? <Reel text={props.value} theme={REEL_THEME} /> : <></>

  return <div className="col-4" ref={ref}>
    <div
      className={styles.statItem}
      style={{
        height: '200px',
        backgroundColor: props.backgroundColor
      }}
    >
      {reel}
      <p className={styles.statCaption}>{props.caption}</p>
    </div>
  </div>

}
