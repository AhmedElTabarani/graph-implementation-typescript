import NodeList from './NodeList';
export default class LinkingList {
  private head?: NodeList = undefined;
  private tail?: NodeList = undefined;
  private size: number = 0;
  add(val: number): LinkingList {
    // O(1)
    ++this.size;
    let newNode = new NodeList(val, undefined, this.tail);
    if (this.head == undefined) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    return this;
  }
  addFront(val: number): LinkingList {
    // O(1)
    ++this.size;
    let newNode = new NodeList(val, this.head);
    if (this.head == undefined) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head!.prev = newNode;
      this.head = newNode;
    }
    return this;
  }
  pop(): LinkingList {
    // O(1)
    if (this.tail == undefined) throw new Error('List is empty');
    --this.size;
    if (this.tail.prev == undefined)
    {
      delete this.tail;
      delete this.head;
    }
    else {
      this.tail = this.tail.prev;
      delete this.tail!.next;
    }
    return this;
  }
  popFront(): LinkingList {
    // O(1)
    if (this.head == undefined) throw new Error('List is empty');
    --this.size;
    if (this.head.next == undefined)
    {
      delete this.head;
      delete this.tail;
    }
    else {
      this.head = this.head.next;
      delete this.head!.prev;
    }
    return this;
  }
  length(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size == 0;
  }

  toArray(): number[] {
    let arr: number[] = [];
    let curr = this.head;
    while (curr != undefined) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }

  clear(): LinkingList {
    this.head = undefined;
    this.tail = undefined;
    this.size = 0;
    return this;
  }
}
