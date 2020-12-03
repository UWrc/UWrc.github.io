import React from "react";
import styles from "./styles.module.css"
import useThemeContext from "@theme/hooks/useThemeContext"

import SplashImage from "./SplashImage";
import ScrollDown from "./ScrollDown";
import SplashButtons from "./SplashButtons";
import TypingTagline from "./TypingTagline";


export default function Splash(props) {
  const {isDarkTheme} = useThemeContext()

  return (
    <div className={styles.splash}>
      <SplashImage isDarkTheme={isDarkTheme} />
      <TypingTagline isDarkTheme={isDarkTheme} />
      <SplashButtons isDarkTheme={isDarkTheme} buttons={[
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
