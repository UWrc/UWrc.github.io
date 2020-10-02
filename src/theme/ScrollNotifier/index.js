import React from "react";
import './styles.css'

export default function ScrollNotifier(props) {
  return <div className="scroll-notifier" style={{
    visibility: props.useScrollNotifier ? "visible" : "hidden",
    width: (100 * props.scrollPercent) + "%",
  }} />
}