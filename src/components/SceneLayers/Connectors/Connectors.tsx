import React, { useMemo } from 'react';
import type { useScene } from 'src/hooks/useScene';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Connector } from './Connector';
import { RequestPing } from './RequestPing';
import { ResponsePing } from './ResponsePing';

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
      {[...connectors].reverse().map((connector, i) => {
        return (
          <Connector
            clickEvent={clickEvent}
            sequence={i}
            key={connector.id}
            connector={connector}
            connectors={...connectors}
            isSelected={selectedConnectorId === connector.id}
          />
        );
      })}
      {[...connectors].reverse().map((connector, i) => {
        return (
          <RequestPing
            clickEvent={clickEvent}
            sequence={i}
            key={connector.id}
            connector={connector}
            connectors={...connectors}
            color="#cfe8d5"
          />
        );
      })}
      {[...connectors].map((connector, i) => {
        return (
          <ResponsePing
            clickEvent={clickEvent}
            sequence={i}
            key={connector.id}
            connector={connector}
            connectors={...connectors}
            color="#ea907a"
          />
        );
      })}
    </>
  );
};
