import Graph from './Graph';

let Edges = [
  { src: 0, dest: 1 },
  { src: 0, dest: 2 },
  { src: 1, dest: 2 },
  { src: 3, dest: 4 },
];

let graph: Graph = new Graph(5, Edges);
graph.printGraphAsAdjacencyList();

const matrix = graph.convertToAdjacencyMatrix()
console.log(matrix)