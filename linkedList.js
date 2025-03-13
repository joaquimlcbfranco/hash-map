const createNode = (key = null, value = null, next = null) => {
  return {
    key,
    value,
    next,
  }
}

const linkedList = () => {
  const headNode = createNode('head');
  const tailNode = createNode('tail');
  headNode.next = tailNode;

  const append = (key) => {
    const newNode = createNode(key);
    newNode.next = tailNode;
    let current = headNode;

    while (current.next != tailNode) {
      current = current.next;
    }

    current.next = newNode;
  }

  const prepend = (key) => {
    const newNode = createNode(key);
    const currentFirst = headNode.next;
    newNode.next = currentFirst;
    headNode.next = newNode;
  }

  const size = () => {
    let count = 1;
    let current = headNode;
    while (current != tailNode) {
      count++;
      current = current.next;
    }
    return count;
  }

  const head = () => {
    return headNode.next;
  }

  const tail = () => {
    let current = headNode;
    while (current.next != tailNode) {
      current = current.next;
    }
    return current;
  }

  const at = (index) => {
    try {
      let current = headNode.next;
      for (let count = 1; count < index; count++) {
        current = current.next;
      }

      return current;
    }
    catch (error) {
      throw new Error('Please provide a valid index');
    }
  }

  const pop = () => {
    let current = headNode;
    while (current.next.next != tailNode) {
      current = current.next;
    }
    current.next.next = null;
    current.next = tailNode;
  }

  const contains = (key) => {
    let current = headNode;
    while (current != tailNode) {
      if (current.key === key) {
        return true
      }
      current = current.next;
    }
    return false
  }

  const find = (key) => {
    let current = headNode;
    let count = 0;
    while (current != tailNode) {
      if (current.key === key) {
        return count
      }
      count++;
      current = current.next;
    }
    return null
  }

  const toString = () => {
    let current = headNode.next;
    let string = ''
    while (current != tailNode) {
      string += `( ${current.key} ) -> `;
      current = current.next;
    }
    string += 'null';
    console.log(string);
  }

  const insertAt = (key, index) => {
    const newNode = createNode(key);
    let current = headNode;
    let count = 0;
    while (count != index - 1) {
      count++;
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
  }

  const removeAt = (index) => {
    let current = headNode;
    let count = 0;
    while (count != index - 1) {
      count++;
      current = current.next;
    }
    let removed = current.next;
    current.next = current.next.next;
    removed.next = null;
  }

  return {
    headNode,
    tailNode,
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  }
}

export { linkedList }