import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTileSize } from 'src/hooks/useTileSize';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { IconInput } from 'src/types';

interface Props {
  icon: IconInput;
  onImageLoaded?: () => void;
}

export const NodeImageIcon = ({ icon, onImageLoaded }: Props) => {
  const ref = useRef();
  const { projectedTileSize } = useTileSize();
  const { size, observe, disconnect } = useResizeObserver();

  useEffect(() => {
    if (!ref.current) return;

    observe(ref.current);

    return disconnect;
  }, [observe, disconnect]);

  return (
    <Box
      ref={ref}
      component="img"
      onLoad={onImageLoaded}
      src={icon.url}
      sx={{
        position: 'absolute',
        width: projectedTileSize.width * 0.8,
        pointerEvents: 'none',
        top: -size.height,
        left: -size.width / 2
      }}
    />
  );
};
