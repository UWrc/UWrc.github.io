import React from "react";
import PropTypes from "prop-types";

import { mapImgItemsToHTMLImgs } from "../../utils";


HomeSection.propTypes = {
  header: PropTypes.element.isRequired,
  imgs: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string
  })).isRequired,
  content: PropTypes.arrayOf(PropTypes.element)
}

export default function HomeSection(props) {
  return (
    <div className="logo-container pt-3">
      {props.header}
      <div className="logos">{mapImgItemsToHTMLImgs(props.imgs)}</div>
      {props.content ? props.content : []}
    </div>
  )
}