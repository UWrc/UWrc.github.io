import React from "react"


export default function MapIframe({ title, name, source, cssAlignment }) {
  return (
    <div className={"map " + cssAlignment}>
      <div>
        <p className="title">{title}</p>
        <iframe src={source} />
        <p>{name}</p>
      </div>
    </div>
  )
}