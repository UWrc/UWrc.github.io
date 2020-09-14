import React from 'react'
import StatSlotMachineItem from "./StatSlotMachineItem";
import StatRow from "./StatRow";


const Colors = {
  GLAUCOUS: '#6883BA',
  YALE_BLUE: '#033860',
  CHINA_ROSE: '#AB4E68',
  SPANISH_VIOLET: '#4B2E83',
  LIGHT_FRENCH_BEIGE: '#B7A57A',
}

function buildStatContainer(statItems) {
  let statItemMapping = Object.entries(statItems)
  let colors = Object.values(Colors)
  let statRows = []
  let currentRow = [
    <StatSlotMachineItem key={0} idx={0} caption={statItemMapping[0][0]} number={statItemMapping[0][1]} boxColor={colors[0]} />
  ]
  for (let i = 1; i < statItemMapping.length; i++) {
    if (i % 3 == 0) {  // rows have <= 3 items
      statRows.push(currentRow)
      currentRow = []
    }
    let currentItem = <StatSlotMachineItem
      key={i}
      idx={i}
      caption={statItemMapping[i][0]}
      number={statItemMapping[i][1]}
      boxColor={colors[i % colors.length]}
    />
    currentRow.push(currentItem)
  }
  statRows.push(currentRow)
  return statRows.map((row, i) => StatRow(i, row))
}

export default function StatContainer({ statItems }) {
  return <div>
    {buildStatContainer(statItems)}
  </div>
}