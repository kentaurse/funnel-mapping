import { MarkerType } from "reactflow";

export const nodes = [
  {
    id: "1",
    type: "node",
    data: { heading: "email", image: "/messages/4.png" },
    position: { x: 50, y: 200 }
  },
  {
    id: "2",
    type: "node",
    data: { heading: "object", image: "/objects/1.png" },
    position: { x: 300, y: 100 }
  }
];

export const edges = [
  // {
  //   id: "e1-2",
  //   source: "1",
  //   target: "2",
  //   targetHandle: 'c',
  //   animated: false,
  //   markerEnd: {
  //     type: MarkerType.Arrow
  //   }
  // },
  // {
  //   id: "e1-2b",
  //   source: "1",
  //   target: "2",
  //   targetHandle: 'a',
  //   animated: false,
  //   markerEnd: {
  //     type: MarkerType.Arrow
  //   }
  // }
];
