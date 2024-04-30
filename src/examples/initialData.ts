/* eslint-disable import/no-extraneous-dependencies */
import { Colors, Icons, InitialData } from 'src/Isoflow';
import { flattenCollections } from '@isoflow/isopacks/dist/utils';
import isoflowIsopack from '@isoflow/isopacks/dist/isoflow';
import awsIsopack from '@isoflow/isopacks/dist/aws';
import gcpIsopack from '@isoflow/isopacks/dist/gcp';
import azureIsopack from '@isoflow/isopacks/dist/azure';
import kubernetesIsopack from '@isoflow/isopacks/dist/kubernetes';

const isopacks = flattenCollections([
  isoflowIsopack,
  awsIsopack,
  azureIsopack,
  gcpIsopack,
  kubernetesIsopack
]);

export const colors: Colors = [
  {
    id: 'color1',
    value: '#a5b8f3'
  },
  {
    id: 'color2',
    value: '#bbadfb'
  },
  {
    id: 'color3',
    value: '#f4eb8e'
  },
  {
    id: 'color4',
    value: '#f0aca9'
  },
  {
    id: 'color5',
    value: '#fad6ac'
  },
  {
    id: 'color6',
    value: '#a8dc9d'
  },
  {
    id: 'color7',
    value: '#b3e5e3'
  }
];

export const icons: Icons = isopacks;

export const initialData: InitialData = {
  title: 'Untitled',
  colors: [
    { id: 'color1', value: '#a5b8f3' },
    { id: 'color2', value: '#bbadfb' },
    { id: 'color3', value: '#f4eb8e' },
    { id: 'color4', value: '#f0aca9' },
    { id: 'color5', value: '#fad6ac' },
    { id: 'color6', value: '#a8dc9d' },
    { id: 'color7', value: '#b3e5e3' }
  ],
  icons: [
    {
      id: 'block',
      name: 'block',
      url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0aD0iNTUxLjU5OTk4cHgiIGhlaWdodD0iMzQzLjc5OTk5cHgiIHZpZXdCb3g9IjAgMCA1NTEuNTk5OTggMzQzLjc5OTk5IgoJIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU1MS41OTk5OCAzNDMuNzk5OTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7b3BhY2l0eTowLjQ7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9Cgkuc3Qxe2ZpbGw6I0NERDlFRTt9Cgkuc3Qye2ZpbGw6I0I1QzVEQzt9Cgkuc3Qze2ZpbGw6I0ZGRkZGRjt9Cgkuc3Q0e2ZpbGw6IzY4ODVBOTt9Cgkuc3Q1e2ZpbGw6IzIzMUYyMDt9Cjwvc3R5bGU+CjxnPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzMDkuMjk5OTksMzIyLjg5OTk5IDI3NC42MDAwMSwzMTYuMTAwMDEgMjc0LDE2LjIgNTUxLjU5OTk4LDE4MCAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjI3NC42MDAwMSwyMjguOCA5Mi4yLDExOS4yIDI3NCw5LjcgNDU3LDExOS4yIAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iOTAuMiwxOTUgMjc0LjYwMDAxLDMwNS43OTk5OSAyNzQuNjAwMDEsMzA1Ljc5OTk5IDI3NC42MDAwMSwyMzEuMyA5MC4yLDEyMC40IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDMiIHBvaW50cz0iMjg4LjI5OTk5LDIyMC42MDAwMSAxMzUuNywxMjcuNyAzMDMsMjcgMjc0LDkuNyA5Mi4yLDExOS4yIDI3NC42MDAwMSwyMjguOCAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3Q0IiBwb2ludHM9IjQ1OSwxOTUgMjc0LjYwMDAxLDMwNS43OTk5OSAyNzQuNjAwMDEsMzA1Ljc5OTk5IDI3NC42MDAwMSwyMzEuMyA0NTksMTIwLjQgCSIvPgoJPHBhdGggY2xhc3M9InN0NSIgZD0iTTQ2Ny4yMDAwMSwxMTUuNkw0NjcuMjAwMDEsMTE1LjZMMjc0LDBMODMuMDAwMDIsMTE1LjFsLTEsMC42djgzLjdsMTkyLjU5OTk4LDExNS44MDAwMkw0NjYuMjAwMDEsMjAwCgkJbDEtMC42MDAwMVYxMTUuNnogTTI3NCw5LjdsMTgzLDEwOS41TDI3NC42MDAwMSwyMjguOEw5Mi4yMDAwMSwxMTkuMkwyNzQsOS43eiBNNDU3LDEyNC4xdjY5LjY5OTk5TDI3Ni43MDAwMSwzMDIuMjAwMDFWMjMyLjUKCQlMNDU3LDEyNC4xeiBNMjcyLjYwMDAxLDIzMi4zOTk5OXY2OS42OTk5OEw5Mi4zMDAwMSwxOTMuOHYtNjkuN0wyNzIuNjAwMDEsMjMyLjM5OTk5eiIvPgo8L2c+Cjwvc3ZnPgo=',
      isIsometric: true,
      collection: 'isoflow'
    }
  ],
  items: [
    { id: '7f8f4d35-b3b7-4b96-8e38-067ab49a864a', name: '', icon: 'block' },
    { id: '430edac5-6d68-4e11-a8f1-8845d0fe4410', name: '', icon: 'block' },
    { id: '75416651-9326-4ef3-b8e8-20c8b42c5d6d', name: '', icon: 'block' },
    { id: '6958e3c4-0dea-4d81-8d83-5f03f8f9dd37', name: '', icon: 'block' },
    { id: '332cf7db-6a30-4b5e-a2d4-7a17a494d48d', name: '', icon: 'block' },
    { id: '8d975bd4-cd98-4b33-993b-8d933628e7a0', name: '', icon: 'block' },
    { id: '0203d8fb-41cf-4775-89cf-686b33a441bc', name: '', icon: 'block' }
  ],
  views: [
    {
      name: 'Untitled view',
      items: [
        {
          labelHeight: 80,
          id: '0203d8fb-41cf-4775-89cf-686b33a441bc',
          tile: { x: 2, y: -4 }
        },
        {
          labelHeight: 80,
          id: '8d975bd4-cd98-4b33-993b-8d933628e7a0',
          tile: { x: 2, y: 2 }
        },
        {
          labelHeight: 80,
          id: '75416651-9326-4ef3-b8e8-20c8b42c5d6d',
          tile: { x: -1, y: -1 }
        },
        {
          labelHeight: 80,
          id: '7f8f4d35-b3b7-4b96-8e38-067ab49a864a',
          tile: { x: -3, y: 1 }
        }
      ],
      connectors: [
        {
          id: '716cf639-2e4f-4746-addc-4fc30ef8debf',
          color: 'color1',
          anchors: [
            {
              id: '52cf06bb-7a72-48ec-9932-8b59b455fa25',
              ref: { item: '75416651-9326-4ef3-b8e8-20c8b42c5d6d' }
            },
            {
              id: '1597df68-0f4d-43ff-a676-586d00d2fcf5',
              ref: { item: '0203d8fb-41cf-4775-89cf-686b33a441bc' }
            }
          ]
        },
        {
          id: '4b7d640a-d3c7-41b2-b2d0-8b39027c1629',
          color: 'color1',
          anchors: [
            {
              id: '27b5e425-b718-4d49-877f-c6904c12cd03',
              ref: { item: '75416651-9326-4ef3-b8e8-20c8b42c5d6d' }
            },
            {
              id: '22589270-5f65-4152-b988-e57b93a3567e',
              ref: { item: '8d975bd4-cd98-4b33-993b-8d933628e7a0' }
            }
          ]
        },
        {
          id: 'c7ab8204-c6b5-4f6b-a31a-f4b885fe4888',
          color: 'color1',
          anchors: [
            {
              id: 'c5a7a71d-d977-4d98-83d1-3db4efbdd6af',
              ref: { item: '7f8f4d35-b3b7-4b96-8e38-067ab49a864a' }
            },
            {
              id: '809854bb-17e8-48f0-b525-8eafe2cd427b',
              ref: { item: '75416651-9326-4ef3-b8e8-20c8b42c5d6d' }
            }
          ]
        }
      ],
      rectangles: [],
      textBoxes: [],
      id: '376ea58d-e033-4750-93e4-76788aaf62d8',
      lastUpdated: '2024-04-29T16:38:01.527Z'
    }
  ]
};
