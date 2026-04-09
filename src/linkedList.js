export class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  list = new Node();
  nodes = 0;

  isEmptyList() {
    return this.list.value === null;
  }

  append(value) {
    const addToEnd = (list) => {
      if (this.isEmptyList()) {
        list.value = value;
        return;
      }
      if (!list.nextNode) {
        list.nextNode = new Node(value);
        return;
      }
      addToEnd(list.nextNode);
    };

    addToEnd(this.list);
    this.nodes += 1;
    return this;
  }

  prepend(value) {
    if (this.isEmptyList()) {
      this.list.value = value;
      this.nodes = 1;
      return this;
    }

    const node = new Node(value, this.list);
    this.list = node;
    this.nodes += 1;

    return this;
  }

  size() {
    return this.nodes;
  }

  head() {
    return this.list.value ? this.list.value : undefined;
  }

  at(searchIndex) {
    if (!Number.isInteger(searchIndex))
      throw new TypeError("Index is not an integer.");
    if (searchIndex < 0) throw new Error("Index must be positive.");

    let currentIndex = -1;
    const getValue = (list) => {
      if (this.isEmptyList()) return;
      currentIndex += 1;
      if (currentIndex === searchIndex) return list.value;
      if (list.nextNode) return getValue(list.nextNode);
    };

    return getValue(this.list);
  }

  pop() {
    if (this.isEmptyList()) return;

    const removedNode = this.list;
    const hasNextNode = this.list.nextNode !== null;

    this.list = hasNextNode ? this.list.nextNode : new Node();
    this.nodes -= 1;

    return removedNode.value;
  }

  contains(searchValue) {
    const checkList = (list) => {
      if (list.value === searchValue) return true;
      if (list.nextNode) return checkList(list.nextNode);
      return false;
    };

    return checkList(this.list);
  }

  findIndex(searchValue) {
    if (searchValue === undefined)
      throw new Error("Search value not specified.");

    let currentIndex = -1;
    if (this.isEmptyList()) return currentIndex;

    const getIndex = (list) => {
      currentIndex += 1;

      if (list.value === searchValue) return currentIndex;
      if (list.nextNode) return getIndex(list.nextNode);
      return -1;
    };

    return getIndex(this.list);
  }

  toString() {
    if (this.isEmptyList()) return "";

    const getSequence = (list) => {
      if (!list.nextNode) {
        return `( ${list.value} ) -> null`;
      }
      return `( ${list.value} ) -> ${getSequence(list.nextNode)}`;
    };

    return getSequence(this.list);
  }
}
