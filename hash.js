import { LinkedList } from "./linkedList.js"

class HashMap {
  constructor(capacity, load) {
    this.buckets = []
    for (let i = 0; i < capacity; i++) {
      this.buckets.push([])
    }
    this.capacity = capacity
    this.load = load
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let bucket = this.buckets[this.hash(key)];
    if (bucket.length === 0) {
      const list = new LinkedList();
      list.append(key, value);
      bucket.push(list);
    }
    else {
      const list = bucket[0];
      const index = list.find(key);
      if (list.contains(key)) {
        let count = 0;
        let current = list.head;
        while (count !== index) {
          count++;
          current = current.next;
        }
        current.value = value;
      }
      else {
        list.append(key, value);
      }
    }
  }

  get(key) {
    let bucket = this.buckets[this.hash(key)];
    if (bucket.length) {
      let list = bucket[0];
      const index = list.find(key);
      let count = 0;
      let current = list.head;
      while (count != index) {
        count++;
        current = current.next;
      }
      return current.value;
    }
    return null;
  }

  has(key) {
    let bucket = this.buckets[this.hash(key)];
    if (bucket.length === 0) {
      return false;
    }
    let list = bucket[0];
    return list.contains(key);

  }

  remove(key) {
    let bucket = this.buckets[this.hash(key)];
    if (bucket.length === 0) {
      return false;
    }
    let list = bucket[0];
    const index = list.find(key);
    if (list.find(key)) {
      list.removeAt(index);
      return true;
    }
    return false;
  }

  length() {
    let size = 0;
    for (let bucket of this.buckets) {
      if (bucket.length === 0) {
        continue;
      }
      else {
        let list = bucket[0];
        size += +list.getSize();
      }
    }
    return size;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = [];
    }
  }

  keys() {
    let keysArr = [];
    for (let bucket of this.buckets) {
      if (bucket.length === 0) {
        continue;
      }
      else {
        let list = bucket[0];
        let current = list.head;
        while (current !== null) {
          keysArr.push(current.key);
          current = current.next;
        }
      }
    }
    return keysArr;
  }

  values() {
    let valuesArr = [];
    for (let bucket of this.buckets) {
      if (bucket.length === 0) {
        continue;
      }
      else {
        let list = bucket[0];
        let current = list.head;
        while (current !== null) {
          valuesArr.push(current.value);
          current = current.next;
        }
      }
    }
    return valuesArr;
  }

  entries() {
    let entriesArr = [];
    for (let bucket of this.buckets) {
      if (bucket.length === 0) {
        continue;
      }
      else {
        let list = bucket[0];
        let current = list.head;
        while (current !== null) {
          entriesArr.push([current.key, current.value]);
          current = current.next;
        }
      }
    }
    return entriesArr;
  }
}

const test = new HashMap(8, 1);
test.set('testr', 'value0');
test.set('blabla', 'value1');
test.set('tea', 'value2');
test.set('bla','value3')
setTimeout(() => {  
  console.log(test.entries());
}, 0)