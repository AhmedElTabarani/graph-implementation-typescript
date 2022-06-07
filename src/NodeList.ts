export default class NodeList {
  public value: number;
  public next?: NodeList;
  public prev?: NodeList;
  constructor(value: number, next?: NodeList, prev?: NodeList) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}