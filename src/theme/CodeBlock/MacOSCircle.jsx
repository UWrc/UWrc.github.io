import React from "react";

export default function MacOSCircle(props) {
  return (
    <div style={{
      width: '12px',
      height: '12px',
      marginBottom: '16px',
      borderRadius: '50%',
      backgroundColor: props.color,
      marginLeft: props.margin ? '8px' : '0'
    }} />
  )
}