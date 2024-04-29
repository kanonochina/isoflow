import React, { useMemo } from 'react';
import type { useScene } from 'src/hooks/useScene';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Connector } from './Connector';

interface Props {
  connectors: ReturnType<typeof useScene>['connectors'];
  clickEvent: any;
  // onClick: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Connectors = ({ connectors, clickEvent }: Props) => {
  const itemControls = useUiStateStore((state) => {
    return state.itemControls;
  });

  const mode = useUiStateStore((state) => {
    return state.mode;
  });

  const selectedConnectorId = useMemo(() => {
    if (mode.type === 'CONNECTOR') {
      return mode.id;
    }
    if (itemControls?.type === 'CONNECTOR') {
      return itemControls.id;
    }

    return null;
  }, [mode, itemControls]);

  return (
    <>
      {[...connectors].reverse().map((connector) => {
        return (
          <Connector
            clickEvent={clickEvent}
            key={connector.id}
            connector={connector}
            isSelected={selectedConnectorId === connector.id}
          />
        );
      })}
    </>
  );
};
