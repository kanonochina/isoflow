import React, { useCallback } from 'react';
import { Box, useTheme } from '@mui/material';
import { UiElement } from 'components/UiElement/UiElement';
import { toPx } from 'src/utils';
import { SceneLayer } from 'src/components/SceneLayer/SceneLayer';
import { DragAndDrop } from 'src/components/DragAndDrop/DragAndDrop';
import { ItemControlsManager } from 'src/components/ItemControls/ItemControlsManager';
import { ToolMenu } from 'src/components/ToolMenu/ToolMenu';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { MainMenu } from 'src/components/MainMenu/MainMenu';
import { ZoomControls } from 'src/components/ZoomControls/ZoomControls';

export const UiOverlay = () => {
  const theme = useTheme();
  const { appPadding } = theme.customVars;
  const spacing = useCallback(
    (multiplier: number) => {
      return parseInt(theme.spacing(multiplier), 10);
    },
    [theme]
  );
  const disableInteractions = useUiStateStore((state) => {
    return state.disableInteractions;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const mouse = useUiStateStore((state) => {
    return state.mouse;
  });
  const itemControls = useUiStateStore((state) => {
    return state.itemControls;
  });

  if (disableInteractions) return null;

  return (
    <>
      {itemControls && (
        <UiElement
          sx={{
            position: 'absolute',
            top: toPx(appPadding.y * 2 + spacing(2)),
            left: appPadding.x,
            width: '345px',
            maxHeight: `calc(100% - ${toPx(appPadding.y * 6)})`,
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          <ItemControlsManager />
        </UiElement>
      )}

      <Box
        sx={{
          position: 'absolute',
          right: toPx(appPadding.x),
          top: toPx(appPadding.y)
        }}
      >
        <ToolMenu />
      </Box>

      {mode.type === 'PLACE_ELEMENT' && mode.icon && (
        <SceneLayer>
          <DragAndDrop icon={mode.icon} tile={mouse.position.tile} />
        </SceneLayer>
      )}

      <Box
        sx={{
          position: 'absolute',
          left: appPadding.x,
          bottom: appPadding.y
        }}
      >
        <ZoomControls />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: toPx(appPadding.y),
          left: toPx(appPadding.x)
        }}
      >
        <MainMenu />
      </Box>
    </>
  );
};
