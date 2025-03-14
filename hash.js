import { Node, LinkedList } from "./linkedList.js"

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
    let list = bucket[0];
    return list.contains(key)
  }

  remove(key) {
    let bucket = this.buckets[this.hash(key)];
    let index = 0;
    for (const obj of bucket) {
      if (obj[key] !== undefined) {
        bucket.splice(index, 1)
        return true
      }
      index++;
    }
    return false
  }

  length() {

  }
}

const test = new HashMap(8, 1);
const test_list = test.buckets[0][0];
test.set('testr', 'value0');
test.set('blabla', 'value1');
test.set('tea', 'value2');
console.log(test.has('testr'))