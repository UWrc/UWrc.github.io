import React from 'react';

interface MacOSCircleProps {
  color: string;
  margin: boolean;
}

export default function MacOSCircle({ color, margin }: MacOSCircleProps): React.ReactElement {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: '50%',
        width: '12px',
        height: '12px',
        marginLeft: margin ? '8px' : '0',
      }}
    />
  );
} 