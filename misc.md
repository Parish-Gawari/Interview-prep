Absolutely! Let’s go **step by step** and cover **all of them in detail** with explanations and examples. I’ll organize this neatly so you can study for interviews efficiently.

---

## **1. `compose()` and `pipe()` Polyfill**

**Concept:**

* `compose`: Runs functions **right-to-left**.
* `pipe`: Runs functions **left-to-right**.

```javascript
// Compose: Right to Left
const compose = (...fns) => (initialValue) => 
  fns.reduceRight((acc, fn) => fn(acc), initialValue);

// Pipe: Left to Right
const pipe = (...fns) => (initialValue) =>
  fns.reduce((acc, fn) => fn(acc), initialValue);

// Example
const add = (x) => x + 1;
const multiply = (x) => x * 2;

console.log(compose(multiply, add)(5)); // multiply(add(5)) => 12
console.log(pipe(add, multiply)(5));    // multiply(add(5)) => 12
```

---

## **2. Promise Polyfills**

### **Promise.all**

```javascript
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let count = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(value => {
          results[index] = value;
          count++;
          if(count === promises.length) resolve(results);
        })
        .catch(err => reject(err));
    });
  });
};
```

### **Promise.race**

```javascript
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p)
        .then(resolve)
        .catch(reject);
    });
  });
};
```

### **Promise.allSettled**

```javascript
Promise.myAllSettled = function(promises) {
  return new Promise(resolve => {
    let results = [];
    let count = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(value => results[index] = { status: "fulfilled", value })
        .catch(reason => results[index] = { status: "rejected", reason })
        .finally(() => {
          count++;
          if(count === promises.length) resolve(results);
        });
    });
  });
};
```

---

## **3. Array Method Polyfills**

### **map**

```javascript
Array.prototype.myMap = function(callback, thisArg) {
  const result = [];
  for(let i = 0; i < this.length; i++) {
    if(i in this) result.push(callback.call(thisArg, this[i], i, this));
  }
  return result;
};
```

### **filter**

```javascript
Array.prototype.myFilter = function(callback, thisArg) {
  const result = [];
  for(let i = 0; i < this.length; i++) {
    if(i in this && callback.call(thisArg, this[i], i, this)) result.push(this[i]);
  }
  return result;
};
```

### **reduce**

```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if(accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }

  for(let i = startIndex; i < this.length; i++) {
    if(i in this) accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};
```

### **forEach**

```javascript
Array.prototype.myForEach = function(callback, thisArg) {
  for(let i = 0; i < this.length; i++) {
    if(i in this) callback.call(thisArg, this[i], i, this);
  }
};
```

---

## **4. Function Bind, Call, Apply**

### **call**

```javascript
Function.prototype.myCall = function(thisArg, ...args) {
  thisArg = thisArg || globalThis;
  const fnSymbol = Symbol();
  thisArg[fnSymbol] = this;
  const result = thisArg[fnSymbol](...args);
  delete thisArg[fnSymbol];
  return result;
};
```

### **apply**

```javascript
Function.prototype.myApply = function(thisArg, args) {
  return this.myCall(thisArg, ...(args || []));
};
```

### **bind**

```javascript
Function.prototype.myBind = function(thisArg, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(thisArg, [...args, ...newArgs]);
  };
};
```

---

## **5. Async.parallel and Async.series**

```javascript
const async = {
  parallel: (tasks, cb) => {
    let results = [];
    let completed = 0;
    tasks.forEach((task, index) => {
      task((err, res) => {
        if(err) return cb(err);
        results[index] = res;
        completed++;
        if(completed === tasks.length) cb(null, results);
      });
    });
  },
  series: (tasks, cb) => {
    const results = [];
    const runTask = (index) => {
      if(index === tasks.length) return cb(null, results);
      tasks[index]((err, res) => {
        if(err) return cb(err);
        results.push(res);
        runTask(index + 1);
      });
    };
    runTask(0);
  }
};
```

---

## **6. Build a Promise from Scratch**

```javascript
class MyPromise {
  constructor(executor) {
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilled = [];
    this.onRejected = [];

    const resolve = (value) => {
      if(this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        this.onFulfilled.forEach(fn => fn(value));
      }
    };

    const reject = (reason) => {
      if(this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        this.onRejected.forEach(fn => fn(reason));
      }
    };

    try { executor(resolve, reject); }
    catch(err) { reject(err); }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; };

    return new MyPromise((resolve, reject) => {
      if(this.status === "fulfilled") resolve(onFulfilled(this.value));
      else if(this.status === "rejected") reject(onRejected(this.reason));
      else {
        this.onFulfilled.push(() => resolve(onFulfilled(this.value)));
        this.onRejected.push(() => reject(onRejected(this.reason)));
      }
    });
  }
}
```

---

## **7. Retry API**

```javascript
function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      fn()
        .then(resolve)
        .catch(err => {
          if(n === 0) reject(err);
          else setTimeout(() => attempt(n - 1), delay);
        });
    };
    attempt(retries);
  });
}

// Usage
retry(() => fetch('https://api.example.com'), 3, 1000)
  .then(res => console.log('Success', res))
  .catch(err => console.log('Failed', err));
```

---

## **8. Memoization**

```javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if(cache[key]) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}

// Usage
const fib = memoize(n => n <= 1 ? n : fib(n-1) + fib(n-2));
console.log(fib(50)); // Fast
```

---

## **9. Currying**

```javascript
function curry(fn) {
  return function curried(...args) {
    if(args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
}

// Usage
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
```

---

## **10. String.prototype.repeat**

```javascript
String.prototype.myRepeat = function(count) {
  if(count < 0) throw new RangeError("repeat count must be non-negative");
  let str = '';
  for(let i = 0; i < count; i++) str += this;
  return str;
};

// Usage
console.log('abc'.myRepeat(3)); // "abcabcabc"
```

---

## **11. Design Patterns in JS**

### **Singleton**

```javascript
const Singleton = (() => {
  let instance;
  return function() {
    if(!instance) instance = this;
    return instance;
  };
})();
```

### **Factory**

```javascript
function CarFactory(type) {
  if(type === 'sedan') return { type, wheels: 4 };
  if(type === 'bike') return { type, wheels: 2 };
}
```

### **Builder**

```javascript
class HouseBuilder {
  constructor() { this.house = {}; }
  setWalls(walls) { this.house.walls = walls; return this; }
  setRoof(roof) { this.house.roof = roof; return this; }
  build() { return this.house; }
}
```

---

## **12. Publisher-Subscriber Pattern**

```javascript
class PubSub {
  constructor() { this.events = {}; }
  subscribe(event, callback) {
    if(!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
  publish(event, data) {
    if(!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
}

// Usage
const ps = new PubSub();
ps.subscribe('event1', data => console.log('Event1 received:', data));
ps.publish('event1', { msg: 'Hello' });
```

---

## **13. Prototype and Prototype Inheritance**

```javascript
function Person(name) { this.name = name; }
Person.prototype.greet = function() { return `Hello, ${this.name}`; };

const john = new Person('John');
console.log(john.greet()); // Hello, John
```

* Objects inherit from `prototype` chain.
* `__proto__` → object instance’s prototype reference.

---

## **14. How Rendering Works in the Browser**

1. **HTML Parsing** → DOM Tree
2. **CSS Parsing** → CSSOM Tree
3. **Render Tree** → DOM + CSSOM
4. **Layout** → Calculate positions/sizes
5. **Paint** → Pixels on screen
6. **Composite** → Combine layers and display

---

## **15. Event Delegation and Event Propagation**

### **Event Propagation**

* **Capturing Phase** → document → target
* **Target Phase** → actual target
* **Bubbling Phase** → target → document

### **Event Delegation**

```javascript
document.getElementById('parent').addEventListener('click', e => {
  if(e.target && e.target.tagName === 'BUTTON') {
    console.log('Button clicked:', e.target.textContent);
  }
});
```

* Attach one listener to parent instead of multiple children.

---

Absolutely! Let’s continue with **16–30** in detail for your interview prep, with examples wherever necessary.

---

## **16. Progressive Web Applications (PWAs)**

**Concept:**

* PWAs are **web apps** that feel like native apps.
* Key features:

  1. **Offline support** via Service Workers.
  2. **Installable** on home screen.
  3. **Fast and reliable**, even on slow networks.
  4. **Push notifications** support.

**Example:**

```javascript
// Registering a Service Worker
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Service Worker registered', reg))
    .catch(err => console.error('SW registration failed', err));
}
```

**sw.js** (Service Worker)

```javascript
self.addEventListener('install', e => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
```

---

## **17. Clone an Object**

### **Shallow Clone**

```javascript
const obj = { a: 1, b: 2 };
const clone = { ...obj }; // or Object.assign({}, obj)
```

### **Deep Clone**

```javascript
const obj = { a: 1, b: { c: 2 } };
const deepClone = JSON.parse(JSON.stringify(obj));

// Or using structuredClone (modern)
const deepClone2 = structuredClone(obj);
```

---

## **18. Debouncing and Throttling**

**Debounce:** Delays execution until after a pause.

```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage
window.addEventListener('resize', debounce(() => console.log('Resized'), 300));
```

**Throttle:** Executes at most once in a given time interval.

```javascript
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if(now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
```

---

## **19. Implement clearAllTimeout()**

```javascript
function clearAllTimeout() {
  let id = setTimeout(() => {}, 0);
  while(id--) clearTimeout(id);
}
```

* This clears all timeouts in the current JS context.

---

## **20. How does "this" work?**

| Scenario              | `this` value                                     |
| --------------------- | ------------------------------------------------ |
| Global context        | `window` (browser) / `global` (Node)             |
| Function (non-strict) | Global object                                    |
| Function (strict)     | `undefined`                                      |
| Object method         | The object itself                                |
| Constructor (new)     | Newly created object                             |
| `bind`/`call`/`apply` | Explicitly set object                            |
| Arrow function        | Lexical `this` (inherits from surrounding scope) |

---

## **21. Synchronous vs Asynchronous Code**

**Synchronous:** Executes line by line.

```javascript
console.log(1);
console.log(2); // executes after 1
```

**Asynchronous:** Executes independently, may complete later.

```javascript
console.log(1);
setTimeout(() => console.log(2), 1000);
console.log(3); // executes before 2
```

---

## **22. Truthy and Falsy Values**

**Falsy values:** `false, 0, -0, "", null, undefined, NaN`
**Truthy values:** Everything else

```javascript
if("hello") console.log("truthy"); // executes
if(0) console.log("falsy"); // doesn't execute
```

---

## **23. Template Literals in ES6**

* Use **backticks** `` ` ``
* Allows **string interpolation** and **multi-line strings**

```javascript
const name = "John";
const greeting = `Hello ${name}, welcome!`;
console.log(greeting);

const multiLine = `This is
a multi-line
string.`;
```

---

## **24. Error Handling in JS**

```javascript
try {
  // risky code
  throw new Error("Something went wrong");
} catch(err) {
  console.log("Error:", err.message);
} finally {
  console.log("Always executes");
}

// Promise rejection handling
fetch('/api')
  .then(res => res.json())
  .catch(err => console.error(err));
```

---

## **25. Flatten a Nested Array**

```javascript
// Using recursion
function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}

console.log(flatten([1, [2, [3, 4]], 5])); // [1,2,3,4,5]

// Using modern flat
console.log([1, [2, [3, 4]]].flat(2));
```

---

## **26. Implement an LRU Cache**

```javascript
class LRUCache {
  constructor(limit = 5) {
    this.cache = new Map();
    this.limit = limit;
  }

  get(key) {
    if(!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // move to end (most recently used)
    return value;
  }

  put(key, value) {
    if(this.cache.has(key)) this.cache.delete(key);
    else if(this.cache.size >= this.limit) this.cache.delete(this.cache.keys().next().value);
    this.cache.set(key, value);
  }
}

// Usage
const lru = new LRUCache(2);
lru.put(1,1); lru.put(2,2);
console.log(lru.get(1)); // 1
lru.put(3,3);
console.log(lru.get(2)); // -1 (evicted)
```

---

## **27. Closures in JavaScript**

* Function remembers the **lexical scope** even after outer function executes.

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

---

## **28. Event Loop in JavaScript**

* JS is **single-threaded**, uses **event loop** for async tasks.
* **Call Stack**: Executes functions
* **Task Queue (Macro/Micro)**: Holds callbacks from async operations

**Flow:**

1. Execute stack
2. Check microtasks (Promises)
3. Check macrotasks (setTimeout, setInterval)

```javascript
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));

console.log('End');
// Output: Start, End, Promise, Timeout
```

---

## **29. Difference between var, let, const**

| Keyword | Scope    | Hoisting | Reassignable | Redeclarable |
| ------- | -------- | -------- | ------------ | ------------ |
| var     | Function | Yes      | Yes          | Yes          |
| let     | Block    | Yes*     | Yes          | No           |
| const   | Block    | Yes*     | No           | No           |

* `*` = hoisted but **not initialized** → temporal dead zone

---

## **30. Hoisting in JavaScript**

* **Variable and function declarations** are moved to the top of scope.
* **Functions:** Fully hoisted.
* **var:** Hoisted but initialized as `undefined`.
* **let/const:** Hoisted but in **temporal dead zone** until initialized.

```javascript
console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError
let b = 10;

hoistedFunc(); // works
function hoistedFunc() { console.log("Hoisted"); }
```

---

Absolutely! Let’s continue with **31–45**, fully explained with examples for interview prep.

---

## **31. Purpose of `setTimeout` and `setInterval`**

* **`setTimeout(fn, delay)`** → Executes `fn` once after `delay` milliseconds.
* **`setInterval(fn, delay)`** → Executes `fn` repeatedly every `delay` milliseconds.

```javascript
setTimeout(() => console.log("Executed after 2s"), 2000);

const intervalId = setInterval(() => console.log("Every 1s"), 1000);
setTimeout(() => clearInterval(intervalId), 5000); // Stop after 5s
```

* **Use case:** Delaying execution (`setTimeout`) or periodic tasks (`setInterval`).

---

## **32. Fetch API**

* Modern way to make **HTTP requests**. Returns a **Promise**.

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if(!response.ok) throw new Error("Network error");
    return response.json(); // parse JSON
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Using async/await
async function getData() {
  try {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    console.log(data);
  } catch(err) {
    console.error(err);
  }
}
getData();
```

---

## **33. Service Worker in PWAs**

* **Service Worker:** Background script that intercepts network requests.
* Enables **offline access, caching, push notifications**.
* Runs independently of the page.

```javascript
// sw.js
self.addEventListener('install', e => console.log('Installed'));
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
```

---

## **34. Deep Cloning of an Object**

* **Deep clone** duplicates nested objects.

```javascript
const obj = { a: 1, b: { c: 2 } };

// JSON approach
const deepClone1 = JSON.parse(JSON.stringify(obj));

// structuredClone (modern)
const deepClone2 = structuredClone(obj);

// Recursive function
function deepClone(obj) {
  if(obj === null || typeof obj !== 'object') return obj;
  if(Array.isArray(obj)) return obj.map(deepClone);
  const copy = {};
  for(let key in obj) copy[key] = deepClone(obj[key]);
  return copy;
}
```

---

## **35. Modules in JavaScript**

* **Modules** are reusable pieces of code with `export` and `import`.
* Helps in **code organization** and **scope isolation**.

```javascript
// math.js
export const add = (a,b) => a+b;
export const multiply = (a,b) => a*b;

// main.js
import { add, multiply } from './math.js';
console.log(add(2,3));
```

* Can also use **default exports**:

```javascript
export default function() { console.log("Default export"); }
```

---

## **36. `this` Binding Examples**

| Scenario         | `this` Value Example                |
| ---------------- | ----------------------------------- |
| Global scope     | `console.log(this)` → window/global |
| Object method    | `obj.method()` → obj                |
| Constructor      | `new Person()` → new instance       |
| Explicit binding | `fn.call(obj)` → obj                |
| Arrow function   | `() => this` → lexical this         |

```javascript
const obj = { name: "John", greet() { console.log(this.name); } };
obj.greet(); // John

function Person(name) { this.name = name; }
const p = new Person("Alice");
console.log(p.name); // Alice

const arrow = () => console.log(this);
arrow(); // inherits from outer scope
```

---

## **37. Closure Example**

* Function **remembers lexical scope**.

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

* **Use case:** Data encapsulation, private variables.

---

## **38. Prevent Default Behavior**

```javascript
document.querySelector('a').addEventListener('click', e => {
  e.preventDefault();
  console.log("Default action prevented");
});
```

* Stops browser’s default action (e.g., link navigation, form submission).

---

## **39. Arrow Functions vs Regular Functions**

* **Arrow functions:**

  1. No own `this` → lexical `this`
  2. Cannot be used as constructors
  3. Short syntax
* **Regular functions:**

  1. Have own `this`
  2. Can be constructors

```javascript
const add = (a,b) => a+b;
function multiply(a,b) { return a*b; }
```

---

## **40. Promises Chaining**

* Chain `.then()` for sequential async operations.

```javascript
fetch('/api/data')
  .then(res => res.json())
  .then(data => fetch(`/api/details/${data.id}`))
  .then(res => res.json())
  .then(details => console.log(details))
  .catch(err => console.error(err));
```

---

## **41. Purpose of `Object.create()`**

* Creates a **new object** with a specified **prototype**.

```javascript
const proto = { greet() { console.log("Hello"); } };
const obj = Object.create(proto);
obj.greet(); // Hello
```

* Useful for **prototypal inheritance**.

---

## **42. Check if Object is an Array**

```javascript
Array.isArray(arr); // true
// OR
arr instanceof Array; // true
```

---

## **43. IIFE (Immediately Invoked Function Expression)**

* Function **executes immediately after definition**.

```javascript
(function() {
  console.log("IIFE executed");
})();

// Arrow function IIFE
(() => console.log("Arrow IIFE"))();
```

* **Use case:** Avoid polluting global scope.

---

## **44. Create Custom Event**

```javascript
const event = new CustomEvent('myEvent', { detail: { msg: 'Hello' } });
document.addEventListener('myEvent', e => console.log(e.detail.msg));
document.dispatchEvent(event); // Hello
```

---

## **45. JSON and Parsing**

* **JSON:** JavaScript Object Notation → text-based data interchange format.

```javascript
const obj = { name: "John", age: 30 };
const jsonStr = JSON.stringify(obj); // convert object to JSON string
console.log(jsonStr);

const parsed = JSON.parse(jsonStr); // convert JSON string to object
console.log(parsed.name); // John
```

---

Absolutely! Let’s cover **46–60** in detail with examples and code. Some of these are extensions of topics we already discussed (like polyfills), but I’ll provide fresh implementations suitable for interviews.

---

## **46. Simple Event Emitter**

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if(!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if(this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if(!this.events[event]) return;
    this.events[event] = this.events[event].filter(fn => fn !== listener);
  }
}

// Usage
const emitter = new EventEmitter();
function greet(name) { console.log("Hello", name); }
emitter.on("greet", greet);
emitter.emit("greet", "John"); // Hello John
emitter.off("greet", greet);
```

---

## **47. Weak References in JavaScript**

* `WeakMap` and `WeakSet` hold **weak references** to objects.
* **Garbage collection** can remove the object if there are no strong references.
* Keys must be **objects** (cannot be primitives).

```javascript
const wm = new WeakMap();
let obj = { name: "John" };
wm.set(obj, "data");
console.log(wm.get(obj)); // data
obj = null; // object can now be garbage collected
```

* **Use case:** Memory-sensitive caches.

---

## **48. Performance Optimization in Large Apps**

1. **Debounce/Throttle events** (scroll, resize, input).
2. **Lazy load modules** (code splitting).
3. **Virtualize long lists** (React Virtual DOM).
4. **Memoization** (cache expensive computations).
5. **Avoid unnecessary DOM manipulation**.
6. **Use Web Workers** for CPU-heavy tasks.
7. **Efficient data structures** (Map, Set instead of Object/Array when needed).
8. **Reduce reflows and repaints** in the browser.

---

## **49. localStorage and sessionStorage**

* Both **store key-value pairs** in the browser.
* **localStorage:** persists after browser closes.
* **sessionStorage:** cleared when tab closes.

```javascript
// localStorage
localStorage.setItem("name", "John");
console.log(localStorage.getItem("name"));
localStorage.removeItem("name");

// sessionStorage
sessionStorage.setItem("sessionId", "12345");
console.log(sessionStorage.getItem("sessionId"));
```

---

## **50. Common Security Issues**

1. **XSS (Cross-Site Scripting):** Injecting scripts.

   * Prevent by sanitizing input.
2. **CSRF (Cross-Site Request Forgery):** Unauthorized requests.

   * Use tokens (CSRF token).
3. **Insecure localStorage usage:** Do not store sensitive info.
4. **Eval and dynamic code execution:** Avoid `eval()` or `new Function()`.
5. **Third-party script vulnerabilities:** Verify dependencies.

---

## **51. Compose Multiple Functions**

```javascript
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

// Example
const add = x => x + 1;
const multiply = x => x * 2;
console.log(compose(multiply, add)(5)); // multiply(add(5)) => 12
```

---

## **52. Pipe Multiple Functions**

```javascript
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

// Example
console.log(pipe(add, multiply)(5)); // multiply(add(5)) => 12
```

---

## **53. Promise.all Polyfill**

```javascript
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let count = 0;

    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(val => {
          results[i] = val;
          count++;
          if(count === promises.length) resolve(results);
        })
        .catch(err => reject(err));
    });
  });
};
```

---

## **54. Promise.race Polyfill**

```javascript
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(resolve).catch(reject);
    });
  });
};
```

---

## **55. Promise.allSettled Polyfill**

```javascript
Promise.myAllSettled = function(promises) {
  return new Promise(resolve => {
    let results = [];
    let count = 0;

    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(val => results[i] = { status: "fulfilled", value: val })
        .catch(err => results[i] = { status: "rejected", reason: err })
        .finally(() => {
          count++;
          if(count === promises.length) resolve(results);
        });
    });
  });
};
```

---

## **56. Array.prototype.map Polyfill**

```javascript
Array.prototype.myMap = function(callback, thisArg) {
  const result = [];
  for(let i = 0; i < this.length; i++) {
    if(i in this) result.push(callback.call(thisArg, this[i], i, this));
  }
  return result;
};
```

---

## **57. Array.prototype.filter Polyfill**

```javascript
Array.prototype.myFilter = function(callback, thisArg) {
  const result = [];
  for(let i = 0; i < this.length; i++) {
    if(i in this && callback.call(thisArg, this[i], i, this)) result.push(this[i]);
  }
  return result;
};
```

---

## **58. Array.prototype.reduce Polyfill**

```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;

  if(acc === undefined) {
    acc = this[0];
    startIndex = 1;
  }

  for(let i = startIndex; i < this.length; i++) {
    if(i in this) acc = callback(acc, this[i], i, this);
  }
  return acc;
};
```

---

## **59. Array.prototype.forEach Polyfill**

```javascript
Array.prototype.myForEach = function(callback, thisArg) {
  for(let i = 0; i < this.length; i++) {
    if(i in this) callback.call(thisArg, this[i], i, this);
  }
};
```

---

## **60. Function.prototype.bind Polyfill**

```javascript
Function.prototype.myBind = function(thisArg, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(thisArg, [...args, ...newArgs]);
  };
};
```

---

Perfect! Let’s continue with **61–73**, giving **detailed explanations and code examples** suitable for interview prep. Some of these overlap with previous topics, but I’ll provide fresh, concise implementations for clarity.

---

## **61. `Function.prototype.call` Polyfill**

```javascript
Function.prototype.myCall = function(thisArg, ...args) {
  thisArg = thisArg || globalThis;
  const fnSymbol = Symbol();
  thisArg[fnSymbol] = this;
  const result = thisArg[fnSymbol](...args);
  delete thisArg[fnSymbol];
  return result;
};

// Example
function greet(greeting) { return `${greeting}, ${this.name}`; }
const person = { name: "John" };
console.log(greet.myCall(person, "Hello")); // Hello, John
```

---

## **62. `Function.prototype.apply` Polyfill**

```javascript
Function.prototype.myApply = function(thisArg, args) {
  return this.myCall(thisArg, ...(args || []));
};

// Example
console.log(greet.myApply(person, ["Hi"])); // Hi, John
```

---

## **63. Async.parallel Function**

* Executes multiple async tasks **simultaneously** and collects results.

```javascript
function asyncParallel(tasks, callback) {
  let results = [];
  let completed = 0;
  tasks.forEach((task, index) => {
    task((err, result) => {
      if(err) return callback(err);
      results[index] = result;
      completed++;
      if(completed === tasks.length) callback(null, results);
    });
  });
}

// Example
asyncParallel([
  cb => setTimeout(() => cb(null, 1), 300),
  cb => setTimeout(() => cb(null, 2), 200)
], (err, res) => console.log(res)); // [1,2]
```

---

## **64. Async.series Function**

* Executes async tasks **one after another**.

```javascript
function asyncSeries(tasks, callback) {
  let results = [];
  const runTask = (index) => {
    if(index === tasks.length) return callback(null, results);
    tasks[index]((err, res) => {
      if(err) return callback(err);
      results.push(res);
      runTask(index + 1);
    });
  };
  runTask(0);
}

// Example
asyncSeries([
  cb => setTimeout(() => cb(null, 1), 300),
  cb => setTimeout(() => cb(null, 2), 200)
], (err, res) => console.log(res)); // [1,2]
```

---

## **65. Build a Promise from Scratch**

```javascript
class MyPromise {
  constructor(executor) {
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilled = [];
    this.onRejected = [];

    const resolve = (value) => {
      if(this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        this.onFulfilled.forEach(fn => fn(value));
      }
    };

    const reject = (reason) => {
      if(this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        this.onRejected.forEach(fn => fn(reason));
      }
    };

    try { executor(resolve, reject); }
    catch(err) { reject(err); }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
    onRejected = typeof onRejected === "function" ? onRejected : err => { throw err; };
    return new MyPromise((resolve, reject) => {
      if(this.status === "fulfilled") resolve(onFulfilled(this.value));
      else if(this.status === "rejected") reject(onRejected(this.reason));
      else {
        this.onFulfilled.push(() => resolve(onFulfilled(this.value)));
        this.onRejected.push(() => reject(onRejected(this.reason)));
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
```

---

## **66. Retry Mechanism for API Calls**

```javascript
function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      fn()
        .then(resolve)
        .catch(err => {
          if(n === 0) reject(err);
          else setTimeout(() => attempt(n - 1), delay);
        });
    };
    attempt(retries);
  });
}

// Usage
retry(() => fetch('/api/data'), 3, 1000)
  .then(res => console.log('Success', res))
  .catch(err => console.log('Failed', err));
```

---

## **67. Memoization**

```javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if(cache[key]) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}

// Example
const fib = memoize(n => n <= 1 ? n : fib(n-1) + fib(n-2));
console.log(fib(10)); // 55
```

---

## **68. Currying for Functions**

```javascript
function curry(fn) {
  return function curried(...args) {
    if(args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
}

// Example
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
```

---

## **69. `String.prototype.repeat` Polyfill**

```javascript
String.prototype.myRepeat = function(count) {
  if(count < 0) throw new RangeError("repeat count must be non-negative");
  let str = '';
  for(let i = 0; i < count; i++) str += this;
  return str;
};

// Example
console.log('abc'.myRepeat(3)); // abcabcabc
```

---

## **70. Singleton Pattern**

```javascript
const Singleton = (() => {
  let instance;
  return class {
    constructor(name) {
      if(instance) return instance;
      this.name = name;
      instance = this;
    }
  };
})();

const s1 = new Singleton("First");
const s2 = new Singleton("Second");
console.log(s1 === s2); // true
```

---

## **71. Factory Pattern**

```javascript
function CarFactory(type) {
  if(type === 'sedan') return { type, wheels: 4 };
  if(type === 'bike') return { type, wheels: 2 };
  return { type: 'unknown', wheels: 0 };
}

console.log(CarFactory('sedan')); // { type: 'sedan', wheels: 4 }
```

---

## **72. Builder Pattern**

```javascript
class HouseBuilder {
  constructor() { this.house = {}; }
  setWalls(walls) { this.house.walls = walls; return this; }
  setRoof(roof) { this.house.roof = roof; return this; }
  setDoors(doors) { this.house.doors = doors; return this; }
  build() { return this.house; }
}

// Example
const house = new HouseBuilder().setWalls(4).setRoof('Tile').setDoors(2).build();
console.log(house); // { walls: 4, roof: 'Tile', doors: 2 }
```

---

## **73. Publisher-Subscriber (Pub-Sub) Pattern**

```javascript
class PubSub {
  constructor() { this.events = {}; }
  subscribe(event, callback) {
    if(!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
  publish(event, data) {
    if(!this.events[event]) return;
    this.events[event].forEach(cb => cb(data));
  }
}

// Example
const ps = new PubSub();
ps.subscribe('notify', msg => console.log('Received:', msg));
ps.publish('notify', 'Hello World'); // Received: Hello World
```

---






