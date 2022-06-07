import Graph from '../Graph';

describe('Graph Class', () => {
  describe('Graph constructor', () => {
    it('graph is not an undifined', () => {
      const graph: Graph = new Graph();
      expect(graph).not.toBeFalsy();
    });
    it('list of nodes is not an undifined', () => {
      const numberOfNodes: number = 1;
      const graph: Graph = new Graph(numberOfNodes);
      expect(graph.getChildren(0)).not.toBeFalsy();
    });
    it('adding edges with constructor', () => {
      const numberOfNodes: number = 1;
      const edges = [
        { src: 0, dest: 0 },
        { src: 0, dest: 1 },
        { src: 0, dest: 2 },
      ];
      const graph: Graph = new Graph(numberOfNodes, edges);
      expect(graph.getChildren(0)).toEqual([0, 1, 2]);
    });
    it('adding empty edges with constructor', () => {
      const numberOfNodes: number = 1;
      const edges: Array<{ src: number; dest: number }> = [];
      const graph: Graph = new Graph(numberOfNodes, edges);
      expect(graph.getChildren(0)).toEqual([]);
    });
    describe('Graph functions', () => {
      describe('length function', () => {
        it('length is 3', () => {
          const numberOfNodes: number = 3;
          const graph: Graph = new Graph(numberOfNodes);
          const length: number = graph.length();
          expect(length).toBe(3);
        });
        it('length is 0', () => {
          const numberOfNodes: number = 0;
          const graph: Graph = new Graph(numberOfNodes);
          const length: number = graph.length();
          expect(length).toBe(0);
        });
        it('no length at all', () => {
          const graph: Graph = new Graph();
          const length: number = graph.length();
          expect(length).toBe(0);
        });
      });
      describe('getChildren function', () => {
        it('getting some children', () => {
          const numberOfNodes: number = 3;
          const graph: Graph = new Graph(numberOfNodes);
          graph.addEdge(1, 0).addEdge(1, 3).addEdge(1, 2);
          const children = graph.getChildren(1);
          expect(children).toEqual([0, 3, 2]);
        });
        it('getting an empty list on last node (n - 1)', () => {
          const numberOfNodes: number = 3;
          const graph: Graph = new Graph(numberOfNodes);
          expect(graph.getChildren(numberOfNodes - 1)).toEqual([]);
        });
        it('getting an empty list if there are no children', () => {
          const numberOfNodes: number = 3;
          const graph: Graph = new Graph(numberOfNodes);
          const children = graph.getChildren(1);
          expect(children).toEqual([]);
        });
        it('getting an Error when access children of outranged node', () => {
          const numberOfNodes: number = 3;
          const graph: Graph = new Graph(numberOfNodes);
          expect(() => {
            graph.getChildren(10);
          }).toThrowError('Node is outranged');
        });
      });
      describe('getLengthOfChildren function', () => {
        it('getting size of children', () => {
          const numberOfNodes: number = 3;
          const graph: Graph = new Graph(numberOfNodes);
          graph.addEdge(1, 0).addEdge(1, 3).addEdge(1, 2);
          const length = graph.getLengthOfChildren(1);
          expect(length).toBe(3);
        });
        it('getting 0 if there are no children', () => {
          const numberOfNodes: number = 3;
          const graph: Graph = new Graph(numberOfNodes);
          const length = graph.getLengthOfChildren(1);
          expect(length).toBe(0);
        });
        it('getting an Error when access children of outranged node', () => {
          const numberOfNodes: number = 3;
          const graph: Graph = new Graph(numberOfNodes);
          expect(() => {
            graph.getLengthOfChildren(10);
          }).toThrowError('Node is outranged');
        });
      });
      describe('addEdge function', () => {
        it('adding an edge', () => {
          const numberOfNodes: number = 3;
          const graph: Graph = new Graph(numberOfNodes);
          graph.addEdge(1, 0);
          const children = graph.getChildren(1);
          expect(children).toEqual([0]);
        });

        describe('checking sideeffect to other nodes', () => {
          it('checking if other node is empty when add a edge ', () => {
            const numberOfNodes: number = 3;
            const graph: Graph = new Graph(numberOfNodes);
            graph.addEdge(1, 0);
            const children = graph.getChildren(2);
            expect(children).toEqual([]);
          });
        });
        it('adding an edge to outranged node', () => {
          const graph: Graph = new Graph();
          expect(() => {
            graph.addEdge(1, 0);
          }).toThrowError('Node is outranged');
        });
      });
      describe('convertToAdjacencyMatrix function', () => {
        it('converting to matrix when there is edges', () => {
          const numberOfNodes: number = 3;
          const edges = [
            { src: 0, dest: 1 },
            { src: 0, dest: 2 },
            { src: 1, dest: 0 },
            { src: 2, dest: 1 },
          ];
          const graph: Graph = new Graph(numberOfNodes, edges);
          const matrix = graph.convertToAdjacencyMatrix();
          expect(matrix).toEqual([
            [false, true, true],
            [true, false, false],
            [false, true, false],
          ]);
        });
        it('converting to matrix when there is no edges', () => {
          const numberOfNodes: number = 3;
          const edges: Array<{ src: number; dest: number }> = [];
          const graph: Graph = new Graph(numberOfNodes, edges);
          const matrix = graph.convertToAdjacencyMatrix();
          expect(matrix).toEqual([
            [false, false, false],
            [false, false, false],
            [false, false, false],
          ]);
        });
      });
    });
    describe('getParents function', () => {
      it('parent of roots is -1', () => {
        const numberOfNodes: number = 3;
        const graph: Graph = new Graph(numberOfNodes);
        const parents = graph.getParents();
        expect(parents).toEqual([-1, -1, -1]);
      });
      it('getting parents of bidirected 2 nodes', () => {
        const numberOfNodes: number = 2;
        const edges = [
          { src: 0, dest: 1 },
          { src: 1, dest: 0 },
        ];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const parents = graph.getParents();
        expect(parents).toEqual([-1, 0]);
      });
      it('getting parents of node with self loob', () => {
        const numberOfNodes: number = 1;
        const edges = [{ src: 0, dest: 0 }];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const parents = graph.getParents();
        expect(parents).toEqual([-1]);
      });
      it('getting parents of multi nodes', () => {
        const numberOfNodes: number = 7;
        const edges = [
          { src: 0, dest: 1 },
          { src: 0, dest: 2 },
          { src: 3, dest: 4 },
          { src: 2, dest: 1 },
          { src: 1, dest: 6 },
        ];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const parents = graph.getParents();
        expect(parents).toEqual([-1, 0, 0, -1, 3, -1, 1]);
        /*
         0       5
        / \
       1---2
       |        3
       6        |
                4
        */
      });
    });
    describe('getLevels function', () => {
      it('level of roots is 0', () => {
        const numberOfNodes: number = 3;
        const graph: Graph = new Graph(numberOfNodes);
        const levels = graph.getLevels();
        expect(levels).toEqual([0, 0, 0]);
      });
      it('getting levels of bidirected 2 nodes', () => {
        const numberOfNodes: number = 2;
        const edges = [
          { src: 0, dest: 1 },
          { src: 1, dest: 0 },
        ];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const levels = graph.getLevels();
        expect(levels).toEqual([0, 1]);
      });
      it('getting levels of node with self loob', () => {
        const numberOfNodes: number = 1;
        const edges = [{ src: 0, dest: 0 }];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const levels = graph.getLevels();
        expect(levels).toEqual([0]);
      });
      it('getting levels of nodes', () => {
        const numberOfNodes: number = 7;
        const edges = [
          { src: 0, dest: 1 },
          { src: 0, dest: 2 },
          { src: 3, dest: 4 },
          { src: 2, dest: 1 },
          { src: 1, dest: 6 },
        ];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const levels = graph.getLevels();
        expect(levels).toEqual([0, 1, 1, 0, 1, 0, 2]);
        /*
         0       5
        / \
       1---2
       |        3
       6        |
                4
       */
      });
    });
    describe('getColors function', () => {
      it('color of roots is 0', () => {
        const numberOfNodes: number = 3;
        const graph: Graph = new Graph(numberOfNodes);
        const colors = graph.getColors();
        expect(colors).toEqual([-1, -1, -1]);
      });
      it('getting colors of bidirected 2 nodes', () => {
        const numberOfNodes: number = 2;
        const edges = [
          { src: 0, dest: 1 },
          { src: 1, dest: 0 },
        ];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const colors = graph.getColors();
        expect(colors).toEqual([0, 0]);
      });
      it('getting colors of node with self loob', () => {
        const numberOfNodes: number = 1;
        const edges = [{ src: 0, dest: 0 }];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const colors = graph.getColors();
        expect(colors).toEqual([-1]);
      });
      it('getting colors of nodes', () => {
        const numberOfNodes: number = 7;
        const edges = [
          { src: 0, dest: 1 },
          { src: 0, dest: 2 },
          { src: 3, dest: 4 },
          { src: 2, dest: 1 },
          { src: 1, dest: 6 },
        ];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const colors = graph.getColors();
        expect(colors).toEqual([0, 0, 0, 1, 1, -1, 0]);
        /*
         0       5
        / \
       1---2
       |        3
       6        |
                4
        */
      });
    });
    describe('getNumberOfComponents function', () => {
      it('there is no components', () => {
        const numberOfNodes: number = 0;
        const graph: Graph = new Graph(numberOfNodes);
        const numberOfComponents = graph.getNumberOfComponents();
        expect(numberOfComponents).toBe(0);
      });
      it('there is one components', () => {
        const numberOfNodes: number = 1;
        const graph: Graph = new Graph(numberOfNodes);
        const numberOfComponents = graph.getNumberOfComponents();
        expect(numberOfComponents).toBe(1);
      });
      it('there is separate components with 1 node', () => {
        const numberOfNodes: number = 3;
        const graph: Graph = new Graph(numberOfNodes);
        const numberOfComponents = graph.getNumberOfComponents();
        expect(numberOfComponents).toBe(3);
      });
      it('there is separate components with muti node', () => {
        const numberOfNodes: number = 7;
        const edges = [
          { src: 0, dest: 1 },
          { src: 0, dest: 2 },
          { src: 3, dest: 4 },
          { src: 2, dest: 1 },
          { src: 1, dest: 6 },
        ];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const numberOfComponents = graph.getNumberOfComponents();
        expect(numberOfComponents).toBe(3);
        /*
         0       5
        / \
       1---2
       |        3
       6        |
                4
        */
      });
    });
    // NOT Finished
    /*
    describe.skip('getTopological function', () => {
      it('there is no node', () => {
        const numberOfNodes: number = 0;
        const graph: Graph = new Graph(numberOfNodes);
        const topological = graph.getTopological();
        expect(topological).toEqual([]);
      });
      it('there is one node', () => {
        const numberOfNodes: number = 1;
        const graph: Graph = new Graph(numberOfNodes);
        const topological = graph.getTopological();
        expect(topological).toEqual([0]);
      });
      it.skip('there is separate components with 1 node', () => {
        const numberOfNodes: number = 3;
        const graph: Graph = new Graph(numberOfNodes);
        const topological = graph.getTopological();
        expect(topological).toEqual([2, 1, 0]);
      });
      it.skip('should has no cycle ', () => {
        const numberOfNodes: number = 7;
        const edges = [
          { src: 0, dest: 1 },
          { src: 0, dest: 2 },
          { src: 3, dest: 4 },
          { src: 2, dest: 1 },
          { src: 1, dest: 6 },
        ];
        const graph: Graph = new Graph(numberOfNodes, edges);
        const topological = graph.getTopological();
      });
    });
    */
  });
});
