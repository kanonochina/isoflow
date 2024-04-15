import React, { useMemo, useState, useEffect } from 'react';
import { useTheme, Box } from '@mui/material';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import {
  getAnchorTile,
  getColorVariant,
  getConnectorDirectionIcon
} from 'src/utils';
import { Circle } from 'src/components/Circle/Circle';
import { Svg } from 'src/components/Svg/Svg';
import { useIsoProjection } from 'src/hooks/useIsoProjection';
import { useConnector } from 'src/hooks/useConnector';
import { useScene } from 'src/hooks/useScene';
import { useColor } from 'src/hooks/useColor';

interface Props {
  connector: ReturnType<typeof useScene>['connectors'][0];
  isSelected?: boolean;
}

export const Connector = ({ connector: _connector, isSelected }: Props) => {
  const [showSVG, setShowSVG] = useState(false);
  const theme = useTheme();
  const color = useColor(_connector.color);
  const { currentView } = useScene();
  const connector = useConnector(_connector.id);
  const { css, pxSize } = useIsoProjection({
    ...connector.path.rectangle
  });
  const [svgs, setSvgs] = useState<Array<JSX.Element>>([]);

  const sendPing = () => {
    setSvgs((prevSvgs) => {
      return [
        ...prevSvgs,
        <Svg
          key={prevSvgs.length}
          style={{
            transform: 'scale(-1, 1)',
            top: -15,
            right: -15,
            position: 'absolute'
          }}
          viewboxSize={pxSize}
        >
          <circle
            cx="15"
            cy="15"
            r="15"
            stroke="black"
            strokeWidth="1"
            fill="red"
          >
            <animateMotion
              path={`${convertPathString(pathString)}`}
              repeatCount="1"
              dur="1s"
            />
          </circle>
        </Svg>
      ];
    });
  };

  // useEffect(() => {
  //   if (svgs.length > 0) {
  //     const timer = setTimeout(() => {
  //       setSvgs((prevSvgs) => {
  //         return prevSvgs.slice(1);
  //       });
  //       clearTimeout(timer);
  //     }, 500);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [svgs]);

  useEffect(() => {
    const timeoutIds = svgs.map((_, index) => {
      return setTimeout(() => {
        setSvgs((prevSvgs) => {
          return prevSvgs.filter((_, i) => {
            return i !== index;
          });
        });
      }, 1000);
    });
    return () => {
      timeoutIds.forEach((timeoutId) => {
        return clearTimeout(timeoutId);
      });
    };
  }, [svgs]);

  const drawOffset = useMemo(() => {
    return {
      x: UNPROJECTED_TILE_SIZE / 2,
      y: UNPROJECTED_TILE_SIZE / 2
    };
  }, []);

  const pathString = useMemo(() => {
    return connector.path.tiles.reduce((acc, tile) => {
      return `${acc} ${tile.x * UNPROJECTED_TILE_SIZE + drawOffset.x},${
        tile.y * UNPROJECTED_TILE_SIZE + drawOffset.y
      }`;
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
  const anchorPositions = useMemo(() => {
    if (!isSelected) return [];

    return connector.anchors.map((anchor) => {
      const position = getAnchorTile(anchor, currentView);

      return {
        id: anchor.id,
        x:
          (connector.path.rectangle.from.x - position.x) *
            UNPROJECTED_TILE_SIZE +
          drawOffset.x,
        y:
          (connector.path.rectangle.from.y - position.y) *
            UNPROJECTED_TILE_SIZE +
          drawOffset.y
      };
    });
  }, [
    currentView,
    connector.path.rectangle,
    connector.anchors,
    drawOffset,
    isSelected
  ]);

  const directionIcon = useMemo(() => {
    return getConnectorDirectionIcon(connector.path.tiles);
  }, [connector.path.tiles]);

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

  const animatedProps =
    connector.style === 'ANIMATED'
      ? {
          style: {
            animation: 'dash 20s linear infinite',
            color: 'red'
          },
          strokeDasharray: strokeDashArray,
          strokeDashoffset: strokeDashArray
        }
      : {};

  return (
    <Box style={css}>
      {/* {showSVG && (
        <Svg
          style={{
            transform: 'scale(-1, 1)',
            top: -15,
            right: -15,
            position: 'absolute'
          }}
          viewboxSize={pxSize}
        >
          <circle
            cx="15"
            cy="15"
            r="15"
            stroke="black"
            strokeWidth="1"
            fill="red"
          >
            <animateMotion
              path={`${convertPathString(pathString)}`}
              repeatCount="indefinite"
              dur="1s"
            />
          </circle>
        </Svg>
      )} */}
      {svgs}
      {/* <Svg
        style={{
          transform: 'scale(-1, 1)',
          top: -15,
          right: -15,
          position: 'absolute'
        }}
        viewboxSize={pxSize}
      >
        <circle
          cx="15"
          cy="15"
          r="15"
          stroke="black"
          strokeWidth="1"
          fill="red"
        >
          <animateMotion
            path={`${convertPathString(pathString)}`}
            repeatCount="indefinite"
            dur="1s"
          />
        </circle>
      </Svg> */}

      <Svg
        style={{
          // TODO: The original x coordinates of each tile seems to be calculated wrongly.
          // They are mirrored along the x-axis.  The hack below fixes this, but we should
          // try to fix this issue at the root of the problem (might have further implications).
          transform: 'scale(-1, 1)'
        }}
        viewboxSize={pxSize}
      >
        <polyline
          points={pathString}
          stroke={
            connector.style === 'ANIMATED'
              ? 'transparent'
              : theme.palette.common.white
          }
          strokeWidth={connectorWidthPx * 1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.7}
          strokeDasharray={strokeDashArray}
          fill="none"
        />
        <polyline
          id={`${connector.id}`}
          points={pathString}
          stroke={getColorVariant(color.value, 'dark', { grade: 1 })}
          strokeWidth={connectorWidthPx}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={strokeDashArray}
          fill="none"
          {...animatedProps}
        />
        {/* {anchorPositions.map(() => {
          return (
            <>
              <polyline
                points={pathString}
                // stroke={theme.palette.common.white}
                stroke={theme.palette.common.white}
                strokeWidth={connectorWidthPx * 1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={0.7}
                strokeDasharray={strokeDashArray}
                fill="none"
              />
              <polyline
                id={`${connector.id}`}
                points={pathString}
                stroke={getColorVariant(color.value, 'dark', { grade: 1 })}
                strokeWidth={connectorWidthPx}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={strokeDashArray}
                fill="none"
                {...animatedProps}
              />
            </>
          );
        })} */}

        {anchorPositions.map((anchor) => {
          return (
            <g key={anchor.id}>
              <Circle
                tile={anchor}
                radius={18}
                fill={theme.palette.common.white}
                fillOpacity={0.7}
              />
              <Circle
                tile={anchor}
                radius={12}
                stroke={theme.palette.common.black}
                fill={theme.palette.common.white}
                strokeWidth={6}
              />
            </g>
          );
        })}

        {directionIcon && (
          <g
            transform={`translate(${directionIcon.x}, ${directionIcon.y})`}
            onClick={sendPing}
          >
            <g transform={`rotate(${directionIcon.rotation})`}>
              <polygon
                fill="black"
                stroke={theme.palette.common.white}
                strokeWidth={4}
                points="17.58,17.01 0,-17.01 -17.58,17.01"
              />
            </g>
          </g>
        )}
      </Svg>
    </Box>
  );
};
