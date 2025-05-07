import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css"

import StatSlotMachineItem from "./StatSlotMachineItem";

const Colors = {
  GLAUCOUS: "#6883BA",
  YALE_BLUE: "#033860",
  CHINA_ROSE: "#AB4E68",
}

function buildStatContainer(statItems) {
  if (!statItems || typeof statItems !== 'object') {
    return null;
  }

  let statItemMappings = Object.entries(statItems)
  let colors = Object.values(Colors)
  return statItemMappings.map((item, i) => {
    const [caption, value] = item;
    if (!caption || value === undefined) {
      return null;
    }
    return (
      <StatSlotMachineItem
        key={i}
        idx={i}
        caption={caption}
        value={value.toString()}
        backgroundColor={colors[i]}
      />
    );
  }).filter(Boolean); // Remove any null items
}

StatContainer.propTypes = {
  statItems: PropTypes.object.isRequired
}

export default function StatContainer(props) {
  return <div className={styles.statContainer}>
    {props.statItems && buildStatContainer(props.statItems)}
  </div>
}
