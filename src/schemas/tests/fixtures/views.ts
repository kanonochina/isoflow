import { Model } from '../../types';

export const views: Model['views'] = [
  {
    id: 'view1',
    name: 'View1',
    description: 'View1Description',
    items: [
      {
        id: 'viewItem1',
        modelItem: 'modelItem1',
        tile: {
          x: 0,
          y: 0
        }
      },
      {
        id: 'viewItem2',
        modelItem: 'modelItem2',
        tile: {
          x: 0,
          y: 4
        }
      },
      {
        id: 'viewItem3',
        modelItem: 'modelItem3',
        tile: {
          x: 0,
          y: -4
        }
      }
    ],
    rectangles: [
      {
        id: 'rectangle1',
        color: 'color1',
        from: { x: 0, y: 0 },
        to: { x: 2, y: 2 }
      },
      {
        id: 'rectangle2',
        from: { x: 0, y: 0 },
        to: { x: 2, y: 2 }
      }
    ],
    connectors: [
      {
        id: 'connector1',
        color: 'color1',
        anchors: [
          { id: 'anch1-1', ref: { item: 'viewItem1' } },
          { id: 'anch1-2', ref: { item: 'viewItem2' } }
        ]
      },
      {
        id: 'connector2',
        anchors: [
          { id: 'anch2-1', ref: { item: 'viewItem2' } },
          { id: 'anch2-2', ref: { item: 'viewItem3' } }
        ]
      }
    ]
  }
];
