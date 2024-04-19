import React from 'react';
import { Size } from 'src/types';
import { Svg } from 'src/components/Svg/Svg';

interface Props {
  key: number;
  fill: string;
  path: string;
  duration: string;
  pxSize?: Size;
}

export const Ping = ({ key, fill, path, pxSize, duration }: Props) => {
  return (
    <Svg
      key={key}
      style={{
        transform: 'scale(-1, 1)',
        top: -15,
        right: -15,
        position: 'absolute'
      }}
      viewboxSize={pxSize}
    >
      <circle cx="15" cy="15" r="15" stroke="black" strokeWidth="1" fill={fill}>
        <animateMotion
          path={path}
          repeatCount="1"
          dur={duration}
          // reverse starting point
          keyPoints="1;0"
          keyTimes="0;1"
        />
      </circle>
    </Svg>
  );
};
