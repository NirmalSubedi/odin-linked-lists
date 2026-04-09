export class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  list = new Node();

  #isEmptyList() {
    return this.list.value === null;
  }

  append(value) {
    const addToEnd = (list) => {
      if (this.#isEmptyList()) {
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
    return this;
  }

  prepend(value) {
    if (this.#isEmptyList()) {
      this.list.value = value;
      return this;
    }

    const node = new Node(value, this.list);
    this.list = node;

    return this;
  }

  size() {
    const count = (list, size = 0) => {
      if (this.#isEmptyList() || !list) return size;
      return count(list.nextNode, size + 1);
    };
    return count(this.list);
  }

  head() {
    return this.list.value ? this.list.value : undefined;
  }

  at(searchIndex) {
    if (!Number.isInteger(searchIndex))
      throw new TypeError("Index is not an integer.");
    if (searchIndex < 0) throw new Error("Index must be positive.");

    const getValue = (list, currentIndex = 0) => {
      if (this.#isEmptyList() || !list) return;
      if (currentIndex === searchIndex) return list.value;
      return getValue(list.nextNode, currentIndex + 1);
    };

    return getValue(this.list);
  }

  pop() {
    if (this.#isEmptyList()) return;

    const removedNode = this.list;
    const hasNextNode = this.list.nextNode !== null;

    this.list = hasNextNode ? this.list.nextNode : new Node();

    return removedNode.value;
  }

  contains(searchValue) {
    const checkList = (list) => {
      if (this.#isEmptyList() || !list) return false;
      if (list.value === searchValue) return true;
      return checkList(list.nextNode);
    };

    return checkList(this.list);
  }

  findIndex(searchValue) {
    if (searchValue === undefined)
      throw new Error("Search value not specified.");

    const getIndex = (list, currentIndex = 0) => {
      if (this.#isEmptyList() || !list) return -1;
      if (list.value === searchValue) return currentIndex;
      return getIndex(list.nextNode, currentIndex + 1);
    };

    return getIndex(this.list);
  }

  toString() {
    const getSequence = (list, sequence = "") => {
      if (this.#isEmptyList()) return sequence;
      if (!list) return null;
      return `( ${list.value} ) -> ${getSequence(list.nextNode)}`;
    };

    return getSequence(this.list);
  }

  insertAt(targetIndex, ...values) {
    if (!Number.isInteger(targetIndex))
      throw new TypeError("Target index should be an integer.");
    if (targetIndex < 0 || targetIndex > this.size())
      throw new RangeError("Target index is out of bound.");

    let currentIndex = 0;
    const goToIndex = (currentNode, previousNode = null) => {
      if (this.#isEmptyList()) {
        values.forEach((value) => {
          this.append(value);
        });
        return;
      }
      if (!currentNode) return;
      if (currentIndex === targetIndex) {
        let latestNode;
        values.forEach((value) => {
          latestNode = new Node(value);
          previousNode.nextNode = latestNode;
          previousNode = latestNode;
        });
        latestNode.nextNode = currentNode;
        return;
      }

      currentIndex += 1;
      goToIndex(currentNode.nextNode, currentNode);
    };

    goToIndex(this.list);
  }
}
