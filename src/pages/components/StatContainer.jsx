import React from 'react'
import InViewMonitor from 'react-inview-monitor'


const Colors = {
  GLAUCOUS: '#6883BA',
  YALE_BLUE: '#033860',
  CHINA_ROSE: '#AB4E68',
  SPANISH_VIOLET: '#4B2E83',
  LIGHT_FRENCH_BEIGE: '#B7A57A',
}

function StatItem({ idx, color, caption='caption', number='number', slideInClass = 'animate__slideInUp' }) {
  return <InViewMonitor
    key={idx}
    classNameNotInView="col-4 vis-hidden"
    classNameInView={`col-4 fadeineffects__item animate__animated ${slideInClass}`}
  >
    <div
      className="rounded d-flex justify-content-center align-items-center flex-column"
      style={{
        height: '200px',
        backgroundColor: color // Object.values(Colors)[idx]
      }}
    >
      <h2 className="display-3 pt-4 text-white">{number}</h2>
      <p className="stat-caption text-white">{caption}</p>
    </div>
  </InViewMonitor>
}

function StatRow(idx, statItems) {
  return <div key={idx} className="d-flex justify-content-center mb-5">
    {statItems}
  </div>
}

function buildStatRows(statItems) {
  let statItemMapping = Object.entries(statItems)
  let colors = Object.values(Colors)
  let statRows = []
  let currentRow = [
    <StatItem key={0} idx={0} caption={statItemMapping[0][0]} number={statItemMapping[0][1]} color={colors[0]} />
  ]
  for (let i = 1; i < statItemMapping.length; i++) {
    if (i % 3 == 0) {  // rows have <= 3 items
      statRows.push(currentRow)
      currentRow = []
    }
    let currentItem = <StatItem
      key={i}
      idx={i}
      caption={statItemMapping[i][0]}
      number={statItemMapping[i][1]}
      color={colors[i % colors.length]}
    />
    currentRow.push(currentItem)
  }
  statRows.push(currentRow)
  return statRows.map((row, i) => StatRow(i, row))
}

export default function StatContainer({ statItems }) {
  return <div>
    {buildStatRows(statItems)}
  </div>
}