import { LinkedList } from "./linkedList.js"

class HashMap {
  constructor(capacity = 16, load = 0.75) {
    this.buckets = []
    for (let i = 0; i < capacity; i++) {
      this.buckets.push([])
    }
    this.capacity = capacity
    this.load = load
  }

  hash(key, capacity = this.capacity) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % capacity;
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
    if (this.length() > this.capacity * this.load) {
      console.log('ENTERED');
      console.log(this.length());
      this.grow();
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

  grow() {
    const newCapacity = this.capacity * 2;
    const newArr = [];
    for (let i = 0; i < (newCapacity); i++) {
      newArr.push([]);
    }
    let currKeys = this.keys();

    for (let key of currKeys) {
      let bucket = newArr[this.hash(key, newCapacity)];
      if (bucket.length === 0) {
        const list = new LinkedList();
        list.append(key, this.get(key));
        bucket.push(list);
      }
      else {
        const list = bucket[0];
        list.append(key, this.get(key));
      }
    }
    this.buckets = newArr;
    this.capacity = newCapacity;
  }
}

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test.buckets);
setTimeout(() => {
  test.set('moon', 'silver')
  console.log(test.buckets);
}, 0)
