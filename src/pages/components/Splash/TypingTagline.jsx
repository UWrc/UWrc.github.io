import React, { useState } from "react";
import Typist from "react-typist";
import styles from "./styles.module.css"
import "react-typist/dist/Typist.css"

const TAGLINE_ITEMS = ["medicine", "physics", "biology", "chemistry", "computer science"]
const TAGLINE_START = "Powering discoveries in"

export default function TypingTagline() {
  const [count, setCount] = useState(0);

  let taglinesToType = TAGLINE_ITEMS.map(item => {
      return (
        [
          <span>{item}</span>,
          <Typist.Backspace count={item.length} delay={800} />
        ]
      )
    })

  return (
    <div className={styles.tagline}>
      <span>{TAGLINE_START}</span>
      <Typist key={count} onTypingDone={() => setCount(count + 1)}>
        <Typist.Delay ms={1000} />
        {taglinesToType}
      </Typist>
    </div>
  )
}