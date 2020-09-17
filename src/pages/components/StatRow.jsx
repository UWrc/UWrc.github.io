import React from "react";

export default function StatRow(props) {
  return <div key={props.idx} className="d-flex justify-content-center mb-5">
    {props.statItems}
  </div>
}