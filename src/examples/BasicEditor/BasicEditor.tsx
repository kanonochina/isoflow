import React from 'react';
import Isoflow from 'src/Isoflow';
import { initialScene } from '../initialScene';

export const BasicEditor = () => {
  return <Isoflow initialScene={initialScene} />;
};
