import React from "react";

export default function StatRow(idx, statItems) {
  return <div key={idx} className="d-flex justify-content-center mb-5">
    {statItems}
  </div>
}