import React from "react"
import PropTypes from "prop-types";


MapIframe.propTypes = {
  align: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  name: PropTypes.string
}

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