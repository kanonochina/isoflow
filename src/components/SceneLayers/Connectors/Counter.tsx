/* eslint-disable react/button-has-type */

import React, { FC, useEffect, useState } from 'react';

interface Props {
  title: string;
  initialCount: number;
}
export const Counter: FC<Props> = ({ title, initialCount }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        return prevCount > 0 ? prevCount - 1 : 0;
      });
    }, 500);

    // Clear interval on component unmount
    return () => {
      return clearInterval(interval);
    };
  }, [initialCount]);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100px',
        height: '100px',
        zIndex: 9,
        top: '0',
        left: '0',
        backgroundColor: 'red'
      }}
    >
      <h1>{title}</h1>
      <h2>{count}</h2>
      {/* <button
        onClick={() => {
          return add();
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          return add(-1);
        }}
      >
        -
      </button> */}
    </div>
  );
};
