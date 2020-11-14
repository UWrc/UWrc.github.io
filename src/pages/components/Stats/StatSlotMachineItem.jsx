import React from "react";
import Reel from "react-reel";
import useInView from "react-cool-inview";
import PropTypes from "prop-types";
import styles from "./styles.module.css"


StatSlotMachineItem.propTypes = {
  value: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  caption: PropTypes.string.isRequired
}

export default function StatSlotMachineItem(props) {
  const { ref, inView } = useInView({
    unobserveOnEnter: true
  })

  let reel = inView ? <Reel text={props.value} theme={styles} /> : <></>

  return <div ref={ref}>
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
