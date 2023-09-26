import {
  Size,
  Coords,
  SceneInput,
  Connector,
  ConnectorStyleEnum
} from 'src/types';
import { customVars } from './styles/theme';

// TODO: This file could do with better organisation and convention for easier reading.
export const UNPROJECTED_TILE_SIZE = 100;
export const TILE_PROJECTION_MULTIPLIERS: Size = {
  width: 1.415,
  height: 0.819
};
export const DEFAULT_COLOR = customVars.diagramPalette.blue;
export const DEFAULT_FONT_FAMILY = 'Roboto, Arial, sans-serif';
export const NODE_DEFAULTS = {
  label: '',
  labelHeight: 140,
  color: DEFAULT_COLOR
};

interface ConnectorDefaults {
  width: number;
  searchOffset: Coords;
  style: Connector['style'];
}

export const CONNECTOR_DEFAULTS: ConnectorDefaults = {
  width: 10,
  // The boundaries of the search area for the pathfinder algorithm
  // is the grid that encompasses the two nodes + the offset below.
  searchOffset: { x: 1, y: 1 },
  style: ConnectorStyleEnum.SOLID
};

export const TEXTBOX_DEFAULTS = {
  fontSize: 0.6,
  paddingX: 0.2,
  text: 'Text',
  fontWeight: 'bold'
};

export const ZOOM_INCREMENT = 0.2;
export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 1;
export const TRANSFORM_ANCHOR_SIZE = 30;
export const TRANSFORM_CONTROLS_COLOR = '#0392ff';
export const INITIAL_SCENE: SceneInput = {
  icons: [],
  nodes: [],
  connectors: [],
  textBoxes: [],
  rectangles: []
};
