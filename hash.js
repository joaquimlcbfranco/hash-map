class HashMap {
  constructor(capacity, load) {
    this.bucket = []
    for (let i = 0; i < capacity; i++) {
      this.bucket.push([])
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
    let bucket = this.bucket[this.hash(key)];
    for (let obj of bucket) {
      if (obj[key] === value) {
        obj[key] = value;
        return;
      }
    }
    bucket.push({ [key]: value })
  }
}

const test = new HashMap(8, 1);
console.log(test.bucket)
setTimeout(() => {
  console.log(test.hash('example1'));
  test.set('example1', 'value1');
  console.log(test.bucket);
}, 1000)