import {
  SceneInput,
  NodeInput,
  ConnectorInput,
  GroupInput,
  SceneItemTypeEnum,
  Scene,
  Node,
  Connector,
  Group
} from 'src/types';
import { NODE_DEFAULTS, DEFAULT_COLOR } from 'src/config';

export const nodeInputToNode = (nodeInput: NodeInput): Node => {
  return {
    type: SceneItemTypeEnum.NODE,
    id: nodeInput.id,
    label: nodeInput.label ?? NODE_DEFAULTS.label,
    labelComponent: nodeInput.labelComponent,
    labelHeight: nodeInput.labelHeight ?? NODE_DEFAULTS.labelHeight,
    color: nodeInput.color ?? NODE_DEFAULTS.color,
    iconId: nodeInput.iconId,
    position: nodeInput.position,
    isSelected: false
  };
};

export const groupInputToGroup = (groupInput: GroupInput): Group => {
  return {
    type: SceneItemTypeEnum.GROUP,
    id: groupInput.id,
    nodeIds: groupInput.nodeIds,
    color: groupInput.color ?? DEFAULT_COLOR
  };
};

export const connectorInputToConnector = (
  connectorInput: ConnectorInput
): Connector => {
  return {
    type: SceneItemTypeEnum.CONNECTOR,
    id: connectorInput.id,
    label: connectorInput.label ?? '',
    color: connectorInput.color ?? DEFAULT_COLOR,
    from: connectorInput.from,
    to: connectorInput.to
  };
};

export const sceneInputtoScene = (sceneInput: SceneInput): Scene => {
  const nodes = sceneInput.nodes.map((nodeInput) => {
    return nodeInputToNode(nodeInput);
  });

  const groups = sceneInput.groups.map((groupInput) => {
    return groupInputToGroup(groupInput);
  });

  const connectors = sceneInput.connectors.map((connectorInput) => {
    return connectorInputToConnector(connectorInput);
  });

  return {
    ...sceneInput,
    nodes,
    groups,
    connectors,
    icons: sceneInput.icons
  } as Scene;
};

export const nodeToNodeInput = (node: Node): NodeInput => {
  return {
    id: node.id,
    position: node.position,
    label: node.label,
    labelHeight: node.labelHeight,
    color: node.color,
    iconId: node.iconId
  };
};

export const connectorToConnectorInput = (
  connector: Connector
): ConnectorInput => {
  return {
    id: connector.id,
    label: connector.label,
    from: connector.from,
    to: connector.to,
    color: connector.color
  };
};

export const groupToGroupInput = (group: Group): GroupInput => {
  return {
    id: group.id,
    nodeIds: group.nodeIds,
    color: group.color
  };
};

export const sceneToSceneInput = (scene: Scene): SceneInput => {
  const nodes: NodeInput[] = scene.nodes.map(nodeInputToNode);
  const connectors: ConnectorInput[] = scene.connectors.map(
    connectorToConnectorInput
  );
  const groups: GroupInput[] = scene.groups.map(groupToGroupInput);

  return {
    nodes,
    connectors,
    groups,
    icons: scene.icons
  } as SceneInput;
};
