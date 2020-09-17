import React from "react"


export default function MapIframe(props) {
  return (
    <div className={"map " + props.align}>
      <div>
        <p className="title">{props.title}</p>
        <iframe src={props.src} />
        <p>{props.name}</p>
      </div>
    </div>
  )
}