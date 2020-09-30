import React from "react";

import SplashImage from "./SplashImage";
import SplashLogos from "./SplashLogos";
import SplashButtons from "./SplashButtons";
import TypingTagline from "./TypingTagline";


export default function Splash() {
  return (
    <div className="splash" style={{
      textAlign: "center",
    }}>
      <SplashImage />
      <TypingTagline />
      <SplashLogos />
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
    </div>
  )
}