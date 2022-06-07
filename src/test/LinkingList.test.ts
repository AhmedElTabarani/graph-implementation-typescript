import LinkingList from '../LinkingList';

describe('LinkingList Class', () => {
  describe('LinkingList functions', () => {
    describe('toArray function', () => {
      it('toArray empty', () => {
        let list: LinkingList = new LinkingList();
        expect(list.toArray()).toEqual([]);
      });
    });
    describe('add function', () => {
      it('adds one node', () => {
        let list: LinkingList = new LinkingList();
        list.add(1);
        expect(list.toArray()).toEqual([1]);
      });
      it('adds some nodes', () => {
        let list: LinkingList = new LinkingList();
        list.add(1).add(2).add(3);
        expect(list.toArray()).toEqual([1, 2, 3]);
      });
    });
    describe('addFront function', () => {
      it('adds one node', () => {
        let list: LinkingList = new LinkingList();
        list.addFront(1);
        expect(list.toArray()).toEqual([1]);
      });
      it('adds some nodes', () => {
        let list: LinkingList = new LinkingList();
        list.addFront(1).addFront(2).addFront(3);
        expect(list.toArray()).toEqual([3, 2, 1]);
      });
    });
    describe('pop function', () => {
      it('gitting an Error when pop empty list', () => {
        let err: Error = new Error();
        try {
          let list: LinkingList = new LinkingList();
          list.pop();
        } catch (e) {
          err = e as Error;
        }
        expect(err.message).toBe('List is empty');
      });
      it('pop one node', () => {
        let list: LinkingList = new LinkingList();
        list.add(1).pop();
        expect(list.toArray()).toEqual([]);
      });
      it('pop some nodes', () => {
        let list: LinkingList = new LinkingList();
        list.add(1).add(2).add(3).pop();
        expect(list.toArray()).toEqual([1, 2]);
      });
    });
    describe('popFront function', () => {
      it('gitting an Error when pop empty list', () => {
        let err: Error = new Error();
        try {
          let list: LinkingList = new LinkingList();
          list.popFront();
        } catch (e) {
          err = e as Error;
        }
        expect(err.message).toBe('List is empty');
      });
      it('pop one node', () => {
        let list: LinkingList = new LinkingList();
        list.addFront(1).popFront();
        expect(list.toArray()).toEqual([]);
      });
      it('pop some nodes', () => {
        let list: LinkingList = new LinkingList();
        list.addFront(1).addFront(2).addFront(3).popFront();
        expect(list.toArray()).toEqual([2, 1]);
      });
    });
    describe('length function', () => {
      it('length empty list', () => {
        let list: LinkingList = new LinkingList();
        expect(list.length()).toEqual(0);
      });
      it('length one node', () => {
        let list: LinkingList = new LinkingList();
        list.add(1);
        expect(list.length()).toEqual(1);
      });
      it('length some nodes', () => {
        let list: LinkingList = new LinkingList();
        list.add(1).add(2).add(3);
        expect(list.length()).toEqual(3);
      });
    });
    describe('clear function', () => {
      it('clear empty list', () => {
        let list: LinkingList = new LinkingList();
        list.clear();
        expect(list.toArray()).toEqual([]);
      });
      it('clear one node', () => {
        let list: LinkingList = new LinkingList();
        list.add(1).clear();
        expect(list.toArray()).toEqual([]);
      });
      it('clear some nodes', () => {
        let list: LinkingList = new LinkingList();
        list.add(1).add(2).add(3).clear();
        expect(list.toArray()).toEqual([]);
      });
    });
    describe('isEmpty function', () => {
      it('empty list', () => {
        let list: LinkingList = new LinkingList();
        expect(list.isEmpty()).toBeTruthy();
      });
      it('one node', () => {
        let list: LinkingList = new LinkingList();
        list.add(1);
        expect(list.isEmpty()).toBeFalsy();
      });
    });
  });
  describe('some operations', () => {
    describe('operations #1', () => {
      it('add 2 nodes then pop 1 node then add 2 nodes', () => {
        let list: LinkingList = new LinkingList();
        list.add(1).add(2).pop().add(3).add(4);
        expect(list.toArray()).toEqual([1, 3, 4]);
      });
    });
    describe('operations #2', () => {
      it('add 1 node then pop 1 node then add 1 node', () => {
        let list: LinkingList = new LinkingList();
        list.add(1).pop().add(2);
        expect(list.toArray()).toEqual([2]);
      });
    });
    describe('operations #3', () => {
      it('addFront 2 nodes then popFront 1 node then addFront 2 nodes', () => {
        let list: LinkingList = new LinkingList();
        list.addFront(1).addFront(2).popFront().addFront(3).addFront(4);
        expect(list.toArray()).toEqual([4, 3, 1]);
      });
    });
    describe('operations #4', () => {
      it('addFront 1 node then popFront 1 node then addFront 1 node', () => {
        let list: LinkingList = new LinkingList();
        list.addFront(1).popFront().addFront(2);
        expect(list.toArray()).toEqual([2]);
      });
    });
    describe('operations #5', () => {
      it('add 2 nodes then popFront 1 node then add 2 nodes', () => {
        let list: LinkingList = new LinkingList();
        list.add(1).add(2).popFront().add(3).add(4);
        expect(list.toArray()).toEqual([2, 3, 4]);
      });
    });
    describe('operations #6', () => {
      it('addFront 2 node then pop 1 node then addFront 2 node', () => {
        let list: LinkingList = new LinkingList();
        list.addFront(1).addFront(2).pop().addFront(3).addFront(4);
        expect(list.toArray()).toEqual([4, 3, 2]);
      });
    });
    describe('operations #7', () => {
      it('addFront 1 node then pop 1 node', () => {
        let list: LinkingList = new LinkingList();
        list.addFront(1).pop();
        expect(list.toArray()).toEqual([]);
      });
    });
    describe('operations #8', () => {
      it('add 3 node then popFront 2 node', () => {
        let list: LinkingList = new LinkingList();
        list.add(1).add(2).add(3).popFront().popFront();
        expect(list.toArray()).toEqual([3]);
      });
    });
  });
});
