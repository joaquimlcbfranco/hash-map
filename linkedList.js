class Node {
  constructor(key = null, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(key, value) {
    const node = new Node(key, value);
    if (this.size === 0) {
      this.head = node;
    }
    else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(key, value) {
    const node = new Node(key, value)
    if (this.size === 0) {
      this.head = node;
    }
    else {
      let current = this.head;
      node.next = current;
      this.head = node;      
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let current = this.head;
    while(current.next) {
      current = current.next
    }
    return current;
  }

  at(index) {
    if (index < 0 || index > (+this.getSize() - 1)) {
      throw new Error('Trying to access index out of bounds'); 
    }
    let count = 0;
    let current = this.head;
    while (count != index) {
      count++;
      current = current.next;
    }
    return current;
  }

  pop() {
    if (this.head === null) {
      throw new Error('Trying to pop an empty list');
    }
    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    current.next = null;
    this.size--;
  }

  contains(key) {
    if (this.head === null) {
      return false;
    }
    let current = this.head;
    while (current.key != key) {
      current = current.next;
      if (current === null) {
        return false;
      }
    }
    return true;
  }

  find(key) {
    if (this.head === null) {
      return null;
    }
    let count = 0;
    let current = this.head;
    while(current.key != key) {
      count++;
      current = current.next;
      if (current === null) {
        return null;
      }
    }
    return count;
  }

  toString() {
    if (this.head === null) {
      console.log(null);
      return null;
    }
    let string = ''
    let current = this.head;
    while (current.next) {
      string += `( ${current.value} ) -> `;
      current = current.next;
    }
    string += 'null';
    console.log(string);
    return string;
  }

  insertAt(key, value, index) {
    if (index < 0 || index > (+this.getSize() - 1)) {
      throw new Error('Trying to access index out of bounds'); 
    }
    if (index === 0) {
      this.prepend(key, value)
    }
    else {
      let count = 0;
      let current = this.head;
      while (count != (index - 1)) {
        count++;
        current = current.next;
      }
      const node = new Node(key, value);
      node.next = current.next;
      current.next = node;
      this.size++;
    }
  }

  removeAt(index) {
    if (index < 0 || index > (+this.getSize() - 1)) {
      throw new Error('Trying to access index out of bounds'); 
    }
    if (this.head === null) {
      throw new Error('Trying to remove from an empty list');
    }
    let count = 0;
    let current = this.head;
    while (count != (index - 1)) {
      if (current.next === null) {
        this.pop();
      }
      else {
        count++;
        current = current.next;
      }
    }
    let copyOfRemoved = current.next;
    current.next = current.next.next
    copyOfRemoved.next = null;
    this.size--;
  }
}

export { Node, LinkedList }