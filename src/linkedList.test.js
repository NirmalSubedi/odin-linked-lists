import { Node, LinkedList } from "./linkedList.js";

describe("Node", () => {
  it("Node constructor exists", () => {
    expect(Node).toBeDefined();
    expect(typeof Node).toBe("function");
  });
  it("Node constructor value and nextNode properties default to null", () => {
    expect(new Node()).toEqual({ value: null, nextNode: null });
  });
});

describe("LinkedList", () => {
  it("LinkedList constructor exists", () => {
    expect(LinkedList).toBeDefined();
    expect(typeof LinkedList).toBe("function");
  });

  it("Default list is empty node", () => {
    const emptyNode = { value: null, nextNode: null };
    expect(new LinkedList().list).toEqual(emptyNode);
  });
});

describe("append method", () => {
  it("append method exists", () => {
    expect(Object.hasOwn(LinkedList.prototype, "append")).toBe(true);
    expect(typeof LinkedList.prototype.append).toBe("function");
  });

  let list;
  beforeEach(() => {
    list = new LinkedList();
  });

  it("Appends one node", () => {
    list.append("apple");

    expect(list.list).toEqual({ value: "apple", nextNode: null });
  });

  it("Appends two node", () => {
    list.append("apple");
    list.append("banana");

    expect(list.list).toEqual({
      value: "apple",
      nextNode: { value: "banana", nextNode: null },
    });
  });

  it("Appends three node", () => {
    list.append("apple");
    list.append("banana");
    list.append("cherry");

    expect(list.list).toEqual({
      value: "apple",
      nextNode: {
        value: "banana",
        nextNode: {
          value: "cherry",
          nextNode: null,
        },
      },
    });
  });

  it("Appends duplicate node", () => {
    list.append("durian");
    list.append("durian");

    expect(list.list).toEqual({
      value: "durian",
      nextNode: { value: "durian", nextNode: null },
    });
  });
});

describe("prepend method", () => {
  it("prepend method exists", () => {
    expect(Object.hasOwn(LinkedList.prototype, "prepend")).toBe(true);
    expect(typeof LinkedList.prototype.prepend).toBe("function");
  });

  let list;
  beforeEach(() => {
    list = new LinkedList();
  });

  it("Prepends one node", () => {
    list.prepend("apple");

    expect(list.list).toEqual({ value: "apple", nextNode: null });
  });

  it("Prepends two node", () => {
    list.prepend("apple");
    list.prepend("banana");

    expect(list.list).toEqual({
      value: "banana",
      nextNode: { value: "apple", nextNode: null },
    });
  });

  it("Prepends three node", () => {
    list.prepend("apple");
    list.prepend("banana");
    list.prepend("cherry");

    expect(list.list).toEqual({
      value: "cherry",
      nextNode: {
        value: "banana",
        nextNode: { value: "apple", nextNode: null },
      },
    });
  });

  it("Prepends duplicate nodes", () => {
    list.prepend("durian");
    list.prepend("durian");

    expect(list.list).toEqual({
      value: "durian",
      nextNode: {
        value: "durian",
        nextNode: null,
      },
    });
  });
});

describe("size method", () => {
  it("size method exists", () => {
    expect(Object.hasOwn(LinkedList.prototype, "size")).toBe(true);
    expect(typeof LinkedList.prototype.size).toBe("function");
  });

  let list;
  beforeAll(() => {
    list = new LinkedList();
  });

  it("Returns 0 if empty", () => {
    expect(list.size()).toBe(0);
  });

  it("Returns 1 for single node", () => {
    list.prepend("apple");

    expect(list.size()).toBe(1);
  });

  it("Returns 2 for double node", () => {
    list.prepend("banana");

    expect(list.size()).toBe(2);
  });

  it("Returns 3 for triple node", () => {
    list.prepend("cherry");

    expect(list.size()).toEqual(3);
  });
});

describe("head method", () => {
  it("head method exists", () => {
    expect(Object.hasOwn(LinkedList.prototype, "head")).toBe(true);
    expect(typeof LinkedList.prototype.head).toBe("function");
  });

  let list;
  beforeAll(() => {
    list = new LinkedList();
  });

  it("Returns undefined if empty list", () => {
    expect(list.head()).toBeUndefined();
  });

  it("Returns the value of the single node", () => {
    list.append("apple");

    expect(list.head()).toBe("apple");
  });

  it("Returns the value of the prepended node", () => {
    list.prepend("banana");

    expect(list.head()).toBe("banana");
  });

  it("Returns the same value if no new node is prepended", () => {
    list.append("cherry");

    expect(list.head()).toBe("banana");
  });
});

describe("at method", () => {
  it("at method exists", () => {
    expect(Object.hasOwn(LinkedList.prototype, "at")).toBe(true);
    expect(typeof LinkedList.prototype.at).toBe("function");
  });

  let list;
  beforeAll(() => {
    list = new LinkedList();
  });

  it("Throws TypeError if index is a non-integer", () => {
    expect(() => list.at()).toThrow(TypeError);
    expect(() => list.at("")).toThrow(TypeError);
    expect(() => list.at(1n)).toThrow(TypeError);
    expect(() => list.at({})).toThrow(TypeError);
    expect(() => list.at([])).toThrow(TypeError);
    expect(() => list.at(NaN)).toThrow(TypeError);
    expect(() => list.at(true)).toThrow(TypeError);
    expect(() => list.at(null)).toThrow(TypeError);
    expect(() => list.at(undefined)).toThrow(TypeError);
    expect(() => list.at(() => {})).toThrow(TypeError);
    expect(() => list.at(Infinity)).toThrow(TypeError);
    expect(() => list.at(-Infinity)).toThrow(TypeError);
  });

  it("Throws Error for negative index", () => {
    expect(() => list.at(-1)).toThrow(Error);
  });

  it("Returns undefined if empty list", () => {
    expect(list.at(0)).toBeUndefined();
  });

  it("Returns value of the node at index 0", () => {
    list.append("apple");

    expect(list.at(0)).toBe("apple");
  });

  it("Returns value of the node at index 1", () => {
    list.append("banana");

    expect(list.at(1)).toBe("banana");
  });

  it("Returns value of the node at index 2", () => {
    list.append("cherry");

    expect(list.at(2)).toBe("cherry");
  });
});

describe("pop method", () => {
  it("pop method exists", () => {
    expect(Object.hasOwn(LinkedList.prototype, "pop")).toBe(true);
    expect(typeof LinkedList.prototype.pop).toBe("function");
  });

  let list;
  beforeAll(() => {
    list = new LinkedList();
  });

  it("Returns undefined if empty list", () => {
    expect(list.pop()).toBeUndefined();
  });

  it("Removes a node", () => {
    list.append("apple");

    expect(list.size()).toBe(1);
    list.pop();
    expect(list.size()).toBe(0);
  });

  it("Returns the removed node value", () => {
    list.append("banana");

    expect(list.pop()).toBe("banana");
  });

  it("Removes only one node", () => {
    list.prepend("cherry");
    list.prepend("durian");

    list.pop();
    expect(list.size()).toBe(1);
  });
});

describe("contains method", () => {
  it("contains method exists", () => {
    expect(Object.hasOwn(LinkedList.prototype, "contains")).toBe(true);
    expect(typeof LinkedList.prototype.contains).toBe("function");
  });

  let list;
  beforeAll(() => {
    list = new LinkedList();
  });

  it("Returns false for empty list", () => {
    expect(list.contains("apple")).toBe(false);
  });

  it("Returns true if value is in list", () => {
    list.prepend("apple");

    expect(list.contains("apple")).toBe(true);
  });

  it("Returns false if value is not in list", () => {
    expect(list.contains("banana")).toBe(false);
  });

  it("Returns true if array is in list", () => {
    const array = ["cherry", "tart"];
    list.prepend(array);

    expect(list.contains(array)).toBe(true);
  });

  it("Returns true if object is in list", () => {
    const object = { name: "durian", taste: "creamy" };
    list.prepend(object);

    expect(list.contains(object)).toBe(true);
  });
});

describe("findIndex method", () => {
  it("findIndex method exists", () => {
    expect(Object.hasOwn(LinkedList.prototype, "findIndex")).toBe(true);
    expect(typeof LinkedList.prototype.findIndex).toBe("function");
  });

  let list;
  beforeAll(() => {
    list = new LinkedList();
  });

  it("Throws Error if search value is undefined", () => {
    expect(() => list.findIndex()).toThrow(Error);
    expect(() => list.findIndex(undefined)).toThrow(Error);
  });

  it("Returns -1 for empty list", () => {
    expect(list.findIndex("apple")).toBe(-1);
  });

  it("Returns -1 if value not in list", () => {
    list.append("apple");

    expect(list.findIndex("banana")).toBe(-1);
  });

  it("Returns correct index if value is in list", () => {
    list.append("banana");
    list.append("cherry");

    expect(list.findIndex("cherry")).toBe(2);
  });

  it("Returns the first index for duplicate values", () => {
    list.append("durian");
    list.append("durian");

    expect(list.findIndex("durian")).toBe(3);
  });
});

describe("toString method", () => {
  it("toString method exists", () => {
    expect(Object.hasOwn(LinkedList.prototype, "toString")).toBe(true);
    expect(typeof LinkedList.prototype.toString).toBe("function");
  });

  let list;
  beforeAll(() => {
    list = new LinkedList();
  });

  it("Returns empty string for empty list", () => {
    expect(list.toString()).toBe("");
  });

  it("Returns string for sequence of 1", () => {
    list.prepend("apple");
    expect(list.toString()).toBe("( apple ) -> null");
  });

  it("Returns string for sequence of 2", () => {
    list.prepend("banana");
    expect(list.toString()).toBe("( banana ) -> ( apple ) -> null");
  });

  it("Returns string for sequence of 3", () => {
    list.prepend("cherry");
    expect(list.toString()).toBe(
      "( cherry ) -> ( banana ) -> ( apple ) -> null"
    );
  });
});

describe.skip("insertAt method", () => {
  it("insertAt method exists", () => {
    expect(Object.hasOwn(LinkedList.prototype, "insertAt")).toBe(true);
    expect(typeof LinkedList.prototype.insertAt).toBe("function");
  });

  let list;
  beforeEach(() => {
    list = new LinkedList();
  });

  it("Returns TypeError for non-integer index", () => {
    expect(() => list.insertAt()).toThrow(TypeError);
    expect(() => list.insertAt("")).toThrow(TypeError);
    expect(() => list.insertAt(1n)).toThrow(TypeError);
    expect(() => list.insertAt(true)).toThrow(TypeError);
    expect(() => list.insertAt(null)).toThrow(TypeError);
    expect(() => list.insertAt({})).toThrow(TypeError);
    expect(() => list.insertAt([])).toThrow(TypeError);
    expect(() => list.insertAt(() => {})).toThrow(TypeError);
    expect(() => list.insertAt(NaN)).toThrow(TypeError);
    expect(() => list.insertAt(Infinity)).toThrow(TypeError);
    expect(() => list.insertAt(-Infinity)).toThrow(TypeError);
  });

  it("Returns RangeError for index below zero", () => {
    expect(() => list.insertAt(-1)).toThrow(RangeError);
  });

  it("Returns RangeError for index above list size", () => {
    expect(() => list.insertAt(1)).toThrow(RangeError);
  });

  it("Inserts a node in empty list", () => {
    list.insertAt(0, "apple");
    expect(list.toString()).toBe("( apple ) -> null");
  });

  it("Inserts multiple nodes in empty list", () => {
    list.insertAt(0, "apple", "banana");
    expect(list.toString()).toBe("( apple ) -> ( banana ) -> null");
  });

  it("Inserts a node at the beginning of list", () => {
    list.append("banana");
    list.insertAt(0, "apple");

    expect(list.toString()).toBe("( apple ) -> ( banana ) -> null");
  });

  it("Inserts multiple at the beginning of list", () => {
    list.append("cherry");
    list.insertAt(0, "apple", "banana");

    expect(list.toString()).toBe(
      "( apple ) -> ( banana ) -> ( cherry ) -> null"
    );
  });

  it("Inserts a node between 2 nodes", () => {
    list.append("apple");
    list.append("cherry");
    list.insertAt(1, "banana");

    expect(list.toString()).toBe(
      "( apple ) -> ( banana ) -> ( cherry ) -> null"
    );
  });

  it("Inserts multiple nodes between 2 nodes", () => {
    list.append("apple");
    list.append("durian");
    list.insertAt(1, "banana", "cherry");

    expect(list.toString()).toBe(
      "( apple ) -> ( banana ) -> ( cherry ) -> ( durian ) -> null"
    );
  });

  it("inserts a node at the end of list", () => {
    list.append("apple");
    list.insertAt(1, "banana");

    expect(list.toString()).toBe("( apple ) -> ( banana ) -> null");
  });

  it("Inserts multiple nodes at the end of list", () => {
    list.append("apple");
    list.append("banana");
    list.insertAt(2, "cherry", "durian");

    expect(list.toString()).toBe(
      "( apple ) -> ( banana ) -> ( cherry ) -> ( durian ) -> null"
    );
  });
});
