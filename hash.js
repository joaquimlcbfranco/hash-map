import { linkedList } from "./linkedList.js"

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
    for (const obj of bucket) {
      if (obj[key] !== undefined) {
        obj[key] = value;
        return;
      }
    }
    bucket.push({ [key]: value })
  }

  get(key) {
    let bucket = this.buckets[this.hash(key)];
    for (const obj of bucket) {
      if (obj[key] !== undefined) {
        return obj[key];
      }
    }
    return null;
  }

  has(key) {
    let bucket = this.buckets[this.hash(key)];
    for (const obj of bucket) {
      if (obj[key] !== undefined) {
        return true
      }
    }
    return false
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
console.log(test.hash('testr'))
console.log(test.hash('blabla'))
test.set('testr', 'value1')
test.set('blabla', 'value1')
console.log(test.buckets)
