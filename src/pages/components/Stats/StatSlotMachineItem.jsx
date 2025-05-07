import React from "react";
import Reel from "react-reel";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import styles from "./styles.module.css"

StatSlotMachineItem.propTypes = {
  value: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  caption: PropTypes.string.isRequired
}

export default function StatSlotMachineItem(props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Ensure we have a valid string value, defaulting to '0' if undefined
  const textValue = props.value?.toString() || '0';

  let reel = inView ? <Reel text={textValue} theme={styles} /> : <></>;

  return <div ref={ref}>
    <div
      className={styles.statItem}
      style={{
        height: '100%',
        backgroundColor: props.backgroundColor
      }}
    >
      {reel}
      <p className={styles.statCaption}>{props.caption || ''}</p>
    </div>
  </div>
}
