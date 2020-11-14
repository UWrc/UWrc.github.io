import React from "react";
import styles from "./styles.module.css"

import SplashImage from "./SplashImage";
import ScrollDown from "./ScrollDown";
import SplashButtons from "./SplashButtons";
import TypingTagline from "./TypingTagline";


export default function Splash() {
  return (
    <div className={styles.splash}>
      <SplashImage />
      <TypingTagline />
      <SplashButtons buttons={[
        {
          label: "Button 1",
          path: "path/to/page"
        },
        {
          label: "Button 2",
          path: "path/to/page"
        }
      ]} />
      <ScrollDown />
    </div>
  )
}
