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
  color: string;
  // onClick: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ResponsePing = ({ connector: _connector, clickEvent, sequence, connectors, color }: Props) => {
  const connector = useConnector(_connector.id);
  const { css, pxSize } = useIsoProjection({
    ...connector.path.rectangle
  });
  const [svgs, setSvgs] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    if (clickEvent !== 0) {
      sendPing(sequence, convertPathString(pathString));
      console.log(connectors);
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

  const sendPing = (delay: number, path: any) => {
    setSvgs((prevSvgs) => {
      const newSvg = (
        <Svg
          id={`${connector.id}-${clickEvent}-${delay}-response`}
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
          <circle cx="15" cy="15" r="15" stroke="black" strokeWidth="1" fill={color}>
            <animateMotion
              // key={`${prevSvgs.length}_${delay}`}
              path={convertPathString(pathString)}
              repeatCount="1"
              dur="1s"
              begin={`${(connectors.length + delay) * 950}ms`}
              keyPoints="1;0"
              keyTimes="0;1"
            />
          </circle>
          <script>{`console.log("${connectors.length} ${delay}-${delay}-response", ${distdelay}); 
          setTimeout(() => { document.getElementById("${
            connector.id
          }-${clickEvent}-${delay}-response").style.display="none" }, ${(connectors.length + delay + 1) * 950})`}</script>
        </Svg>
      );

      return [newSvg, ...prevSvgs];
    });
  };

  return <Box style={css}>{svgs}</Box>;
};
