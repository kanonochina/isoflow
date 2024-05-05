/* eslint-disable no-console */
import React, { useMemo, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import { Svg } from 'src/components/Svg/Svg';
import { useIsoProjection } from 'src/hooks/useIsoProjection';
import { useConnector } from 'src/hooks/useConnector';
import { useScene } from 'src/hooks/useScene';

interface Props {
  connector: ReturnType<typeof useScene>['connectors'][0];
  clickEvent: any;
  sequence: number;
  connectors: ReturnType<typeof useScene>['connectors'];
  // onClick: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const PingLines = ({ connector: _connector, clickEvent, sequence, connectors }: Props) => {
  const connector = useConnector(_connector.id);
  const { css, pxSize } = useIsoProjection({
    ...connector.path.rectangle
  });
  const [svgs, setSvgs] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    if (clickEvent !== 0) {
      sendPing(sequence, convertPathString(pathString));
      console.log(sequence * 1000 + (distdelay * 100) / 1000);
      // console.log(10 - getSVGPathLength(pathString));
    }
  }, [clickEvent]);

  const drawOffset = useMemo(() => {
    return {
      x: UNPROJECTED_TILE_SIZE / 2,
      y: UNPROJECTED_TILE_SIZE / 2
    };
  }, []);

  const pathString = useMemo(() => {
    return connector.path.tiles.reduce((acc, tile) => {
      return `${acc} ${tile.x * UNPROJECTED_TILE_SIZE + drawOffset.x},${tile.y * UNPROJECTED_TILE_SIZE + drawOffset.y}`;
    }, '');
  }, [connector.path.tiles, drawOffset]);

  const convertPathString = (pth: string) => {
    const path = pth.split(' ');
    let newPath = '';
    for (let i = 0; i < path.length; i++) {
      if (i % 50 === 0) {
        newPath += `M${path[i]} `;
      } else {
        newPath += `${path[i]} `;
      }
    }
    return newPath.trim();
  };
  const getSVGPathLength = (svgPath: any) => {
    // Remove spaces and split the path string by commands
    const commaCount = svgPath.split(',').length - 1;
    return commaCount;
  };
  const distdelay = (getSVGPathLength(pathString) * 1000) / 2.64;

  const connectorWidthPx = useMemo(() => {
    return (UNPROJECTED_TILE_SIZE / 100) * connector.width;
  }, [connector.width]);

  const strokeDashArray = useMemo(() => {
    switch (connector.style) {
      case 'DASHED':
        return `${connectorWidthPx * 2}, ${connectorWidthPx * 2}`;
      case 'DOTTED':
        return `0, ${connectorWidthPx * 1.8}`;
      case 'ANIMATED':
        return `${connectorWidthPx * 2.4}, ${connectorWidthPx * 2.4}`;
      case 'SOLID':
      default:
        return 'none';
    }
  }, [connector.style, connectorWidthPx]);

  const sendPing = (delay: number, path: any) => {
    setSvgs((prevSvgs) => {
      const newSvg = (
        <Svg
          id={`${connector.id}-${clickEvent}-${delay}`}
          key={`${connector.id}-${clickEvent}-${delay}`}
          style={{
            transform: 'scale(-1, 1)',
            top: -15,
            right: -15,
            position: 'absolute'
            // clipPath: `url("#${connector.id}")`,
            // backgroundColor: 'yellow'
          }}
          viewboxSize={pxSize}
        >
          <circle cx="15" cy="15" r="15" stroke="black" strokeWidth="1" fill="yellow">
            <animateMotion
              // key={`${prevSvgs.length}_${delay}`}
              path={convertPathString(pathString)}
              repeatCount="1"
              dur="1s"
              begin={`${delay * 950}ms`}
            />
          </circle>
          <script>{`console.log("${connector.id}-${clickEvent}-${delay}", ${distdelay}); 
          setTimeout(() => { document.getElementById("${
            connector.id
          }-${clickEvent}-${delay}").style.display="none" }, ${delay === 0 ? 950 : (delay + 1) * 950})`}</script>
        </Svg>
      );

      return [newSvg, ...prevSvgs];
    });
  };

  return <Box style={css}>{svgs}</Box>;
};
