import React from "react";
import PropTypes from "prop-types";

StatRow.propTypes = {
  idx: PropTypes.number.isRequired,
  statItems: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default function StatRow(props) {
  return <div key={props.idx} className="d-flex justify-content-center mb-5">
    {props.statItems}
  </div>
}