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
  let statItemMappings = Object.entries(statItems)
  let colors = Object.values(Colors)
  return statItemMappings.map((item, i) => 
    <StatSlotMachineItem
      key={i}
      idx={i}
      caption={item[0]}
      value={item[1]}
      backgroundColor={colors[i]}
    />
  )
}

StatContainer.propTypes = {
  statItems: PropTypes.object.isRequired
}

export default function StatContainer(props) {
  return <div className={styles.statContainer}>
    {props.statItems && buildStatContainer(props.statItems)}
  </div>
}
