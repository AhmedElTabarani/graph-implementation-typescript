import LinkingList from './LinkingList';

export default class Graph {
  private numberOfNodes: number;
  private graph: Array<LinkingList>;
  constructor(
    numberOfNodes: number = 0,
    edges: Array<{ src: number; dest: number }> = []
  ) {
    this.numberOfNodes = numberOfNodes;
    this.graph = new Array<LinkingList>(numberOfNodes);
    for (let i = 0; i < numberOfNodes; ++i) {
      this.graph[i] = new LinkingList();
    }
    edges.forEach(({ src, dest }) => this.addEdge(src, dest));
  }

  private dfsRecursive(
    node: number,
    visited: Array<boolean>,
    callback: (node: number, child: number) => void
  ): void {
    visited[node] = true;
    const children = this.getChildren(node);
    children.forEach((child) => {
      if (!visited[child]) {
        this.dfsRecursive(child, visited, callback);
        callback(node, child);
      }
    });
  }

  public dfs(callback: (node: number, child: number) => void) {
    const visited: Array<boolean> = new Array(this.numberOfNodes).fill(
      false
    );
    for (let i = 0; i < this.numberOfNodes; ++i) {
      if (!visited[i]) {
        this.dfsRecursive(i, visited, callback);
        callback(i, i); // if node === child then node is a root
      }
    }
  }
  public bfs(callback: (node: number, child: number) => void) {
    const visited: Array<boolean> = new Array(this.numberOfNodes).fill(
      false
    );
    const queue: Array<number> = [];

    for (let i = 0; i < this.numberOfNodes; ++i) {
      if (!visited[i]) {
        queue.push(i);
        visited[i] = true;
        while (queue.length) {
          const node = queue.shift()!;
          const children = this.getChildren(node);
          children.forEach((child) => {
            if (!visited[child]) {
              queue.push(child);
              visited[child] = true;
              callback(node, child);
            }
          });
        }
      }
    }
  }
  public printGraphAsAdjacencyList() {
    for (let i = 0; i < this.numberOfNodes; ++i)
      console.log(`${i}: ${this.graph[i].toArray().join(' -> ')}`);
  }

  // NOT Finished
  // public printGraphAsAdjacencyMatrix() {
  //   for (let i = 0; i < this.numberOfNodes; ++i)
  //     console.log(`${i}: ${this.graph[i].toArray().join(' -> ')}`);
  // }

  public convertToAdjacencyMatrix(): boolean[][] {
    const matrix: boolean[][] = new Array<boolean[]>(this.numberOfNodes);
    for (let node = 0; node < this.numberOfNodes; ++node) {
      matrix[node] = new Array<boolean>(this.numberOfNodes).fill(false);
    }

    for (let node = 0; node < this.numberOfNodes; ++node) {
      this.getChildren(node).forEach((child) => {
        matrix[node][child] = true;
      });
    }

    return matrix;
  }
  public addEdge(from: number, to: number): Graph {
    if (from >= this.numberOfNodes) throw new Error('Node is outranged');
    this.graph[from].add(to);
    return this;
  }

  public length(): number {
    return this.numberOfNodes;
  }

  public getChildren(node: number): Array<number> {
    if (node >= this.numberOfNodes) throw new Error('Node is outranged');
    return this.graph[node].toArray();
  }

  public getLengthOfChildren(node: number): number {
    if (node >= this.numberOfNodes) throw new Error('Node is outranged');
    return this.graph[node].length();
  }

  public getParents(): Array<number> {
    const parents: Array<number> = Array(this.numberOfNodes).fill(-1);
    this.bfs((node, child) => {
      parents[child] = node;
    });
    return parents;
  }
  public getLevels(): Array<number> {
    const levels: Array<number> = Array(this.numberOfNodes).fill(0);
    this.bfs((node, child) => {
      levels[child] = levels[node] + 1;
    });
    return levels;
  }
  public getColors(): Array<number> {
    const colors: Array<number> = Array(this.numberOfNodes).fill(-1); // -1 means that the node is lonely
    let colorNumber = 0;
    this.bfs((node, child) => {
      if (colors[node] == -1) colors[node] = colorNumber++;
      colors[child] = colors[node];
    });

    return colors;
  }

  public getNumberOfComponents(): number {
    const parents = this.getParents();
    return parents.filter((parent) => parent === -1).length;
  }

  public getTopological(): Array<number> {
    const topological: Array<number> = [];
    this.dfs((node, child) => {
      topological.push(child);
    });
    return topological.reverse();
  }

  // NOT Finished
  /*
  public getArrivals(): Array<number> {
    return [];
  }

  public getDepartures(): Array<number> {
    return [];
  }

  public isConnected(): boolean {
    return false;
  }

  public isContainCycle(): boolean {
    return false;
  }

  public isTree(): boolean { 
    return this.getNumberOfComponents() === 0 && this.isContainCycle();
  };
  */
}
