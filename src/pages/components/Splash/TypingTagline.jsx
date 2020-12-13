import React, { useState } from "react";
import Typist from "react-typist";
import styles from "./styles.module.css"
import "react-typist/dist/Typist.css"

const TAGLINE_ITEMS = [
  "chemical engineering", 
  "computer science",
  "medicine", 
  "physics", 
  "civil engineering",
  "ecology",
  "aeronautical engineering",
  "genomics",
  "environmental engineering",
  "biology", 
  "mechanical engineering",
  "chemistry",
  "proteomics",
]
const TAGLINE_START = "HYAK powers discoveries in"

export default function TypingTagline(props) {
  const [count, setCount] = useState(0);

  let taglinesToType = TAGLINE_ITEMS.map(item => {
      return (
        [
          <span>{item}.</span>,
          <Typist.Backspace count={item.length+1} delay={2000} />
        ]
      )
    })

  return (
    <div className={styles.tagline} style={{
      color: props.isDarkTheme ? 'white' : 'black'
    }}>
      <Typist key={count} onTypingDone={() => setCount(count + 1)}>
      <span>{TAGLINE_START} </span>
        <Typist.Delay ms={2000} />
        {taglinesToType}
      </Typist>
    </div>
  )
}
