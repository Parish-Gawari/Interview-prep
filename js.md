Perfect — this is a **solid set of JavaScript interview questions** 👌
I’ll go through each one **in detail with examples, pitfalls, and best practices** so you can confidently explain them in interviews.

---

### **1. What is JavaScript?**

JavaScript is a **high-level, interpreted programming language** used to make web pages interactive.

* **Runs in browsers** (via JS engines like V8 in Chrome, SpiderMonkey in Firefox).
* **Event-driven, single-threaded, non-blocking** (thanks to the event loop).
* Can also run on servers using **Node.js**.
* Supports **Object-Oriented, Functional, and Procedural** programming styles.

👉 **Key use cases**: DOM manipulation, API calls (AJAX, Fetch), real-time apps, game development, backend development, etc.

---

### **2. What are the data types supported by JavaScript?**

JS has **two categories of data types**:

1. **Primitive Types** (immutable, passed by value):

   * `String`
   * `Number` (includes `NaN`, `Infinity`)
   * `BigInt`
   * `Boolean`
   * `Null`
   * `Undefined`
   * `Symbol`

2. **Non-Primitive (Reference) Types** (mutable, passed by reference):

   * `Object` (includes `Array`, `Function`, `Date`, `RegExp`, etc.)

👉 Example:

```js
let str = "hello"; // string
let num = 42; // number
let big = 1234567890123456789012345678901234567890n; // bigint
let flag = true; // boolean
let nothing = null; // null
let notDefined; // undefined
let unique = Symbol("id"); // symbol
let obj = { name: "John" }; // object
```

---

### **3. What is the difference between `let`, `const`, and `var`?**

* **`var`**

  * Function-scoped.
  * Can be redeclared and updated.
  * Gets **hoisted** with `undefined`.

* **`let`**

  * Block-scoped.
  * Can be updated, but not redeclared in the same scope.
  * Hoisted but **not initialized** (temporal dead zone).

* **`const`**

  * Block-scoped.
  * Must be initialized at declaration.
  * Cannot be reassigned (but objects/arrays can still be mutated).

👉 Example:

```js
var x = 10;  // redeclare allowed
let y = 20;  // block scope
const z = 30; // cannot reassign
```

---

### **4. Explain how `==` and `===` differ.**

* **`==` (Loose Equality)** → compares values, does type coercion.
* **`===` (Strict Equality)** → compares values **and types**.

👉 Example:

```js
0 == false  // true (type coercion)
0 === false // false (different types)
"5" == 5    // true
"5" === 5   // false
```

**Best practice:** Always use `===` to avoid unintended coercion.

---

### **5. What is a closure?**

A **closure** is created when a function "remembers" its lexical scope, even after the outer function has finished executing.

👉 Example:

```js
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

Here, `inner` **closes over** `count`, keeping it alive.

**Use cases:** Data hiding, private variables, function factories, callbacks.

---

### **6. What is hoisting?**

Hoisting is JS’s behavior of **moving declarations to the top** of the scope **before execution**.

* **Function declarations** are fully hoisted.
* **var** is hoisted (initialized as `undefined`).
* **let/const** are hoisted but not initialized (temporal dead zone).

👉 Example:

```js
console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError
let b = 10;
```

---

### **7. Explain the concept of `this` in JavaScript.**

`this` refers to the **execution context** of a function, determined by **how** the function is called.

* **Global scope** → `this` is `window` (browser) or `global` (Node).
* **Object method** → `this` refers to the object.
* **Standalone function** → `undefined` in strict mode, global object otherwise.
* **Arrow functions** → `this` is lexically inherited (doesn’t bind its own `this`).

👉 Example:

```js
const obj = {
  name: "Alice",
  sayName() { console.log(this.name); }
};
obj.sayName(); // "Alice"

const fn = obj.sayName;
fn(); // undefined (strict mode)
```

---

### **8. What are JavaScript prototypes?**

Every JS object has a hidden property `[[Prototype]]` that links to another object (its prototype).
Prototypes allow **inheritance** and method sharing.

👉 Example:

```js
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return "Hello " + this.name;
};

const p = new Person("John");
console.log(p.greet()); // "Hello John"
```

---

### **9. What is the difference between `null` and `undefined`?**

* **`null`** → intentional absence of value.
* **`undefined`** → variable declared but not assigned.

👉 Example:

```js
let a; // undefined
let b = null; // explicitly set to no value
```

---

### **10. How does JavaScript handle asynchronous operations?**

JS is **single-threaded**, but async operations are handled using:

* **Callbacks**
* **Promises**
* **async/await**
* Backed by the **Event Loop** (task queue, microtask queue).

Example async:

```js
setTimeout(() => console.log("done"), 1000);
console.log("first");
// Output: "first" → "done"
```

---

### **11. What is a promise?**

A **Promise** is an object representing the eventual result of an async operation.

States:

* **Pending**
* **Fulfilled** (`.then`)
* **Rejected** (`.catch`)

👉 Example:

```js
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Data received"), 1000);
});
fetchData.then(data => console.log(data));
```

---

### **12. What are async/await functions?**

`async/await` is **syntactic sugar** over promises.

* `async` makes a function return a promise.
* `await` pauses execution until the promise resolves.

👉 Example:

```js
async function fetchData() {
  try {
    let result = await fetch("api/data");
    let data = await result.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

---

### **13. Explain event delegation in JavaScript.**

Event delegation is attaching a **single event listener to a parent** to handle events on child elements using **event bubbling**.

👉 Example:

```js
document.getElementById("list").addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
  }
});
```

✅ More efficient than attaching listeners to each child.

---

### **14. What are JavaScript modules?**

Modules allow code to be split across files and reused.

* **ES6 Modules (ESM)** → `import` / `export` syntax.
* **CommonJS (CJS)** → `require` / `module.exports` (Node.js).

👉 Example:

```js
// math.js
export function add(a, b) { return a + b; }

// app.js
import { add } from './math.js';
console.log(add(2, 3));
```

---

### **15. How can you prevent a function from being called multiple times?**

Techniques:

1. **Debouncing** – run after a delay of inactivity.
2. **Throttling** – run at most once per interval.
3. **Once wrapper** – ensure a function executes only once.

👉 Example (once):

```js
function once(fn) {
  let called = false;
  return function(...args) {
    if (!called) {
      called = true;
      return fn(...args);
    }
  };
}
const init = once(() => console.log("Initialized"));
init(); // Runs
init(); // Ignored
```

---

✅ This set covers **fundamentals + practical explanations**.

Do you want me to also prepare **short, crisp 1–2 line answers** for rapid-fire style interview rounds (in addition to these detailed ones)?

Awesome 🚀 — these are the **next-level JavaScript interview questions**. I’ll go through **Q16–Q30** in detail, with explanations, examples, and best practices for interviews.

---

### **16. What is the event loop?**

The **event loop** is the mechanism that allows JavaScript to handle **asynchronous operations** in a non-blocking way despite being single-threaded.

* JS runs synchronously in a **call stack**.
* Asynchronous tasks (e.g., `setTimeout`, Promises, I/O) are offloaded to the browser/Node environment.
* Once finished, callbacks are pushed into **queues** (macrotask/microtask).
* The **event loop** checks if the call stack is empty, then pushes queued tasks back into it.

👉 Example:

```js
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
// Output: Start → End → Promise → Timeout
```

---

### **17. What is the difference between `apply()` and `call()` methods?**

Both allow you to **invoke a function with a specified `this` context**.

* **`call()`**: Pass arguments **individually**.
* **`apply()`**: Pass arguments as an **array**.

👉 Example:

```js
function greet(greeting, name) {
  console.log(greeting + " " + name);
}
greet.call(null, "Hello", "John"); // "Hello John"
greet.apply(null, ["Hi", "Alice"]); // "Hi Alice"
```

---

### **18. What is `bind()` method used for?**

`bind()` creates a **new function** with a fixed `this` value and optional preset arguments.
Unlike `call`/`apply`, it doesn’t immediately invoke the function.

👉 Example:

```js
const person = { name: "Bob" };
function sayName() { console.log(this.name); }

const bound = sayName.bind(person);
bound(); // "Bob"
```

---

### **19. What is a JavaScript event loop?**

(Same as **Q16**, but asked again. In interviews, clarify duplication!)
It’s the **core mechanism** that manages asynchronous execution in JS by coordinating the **call stack, event queue, and microtask queue**.

---

### **20. Explain "event bubbling" and "event capturing".**

Both describe the **propagation phases** of an event through the DOM.

* **Event Bubbling (default)**: Event starts from the target element and bubbles **upwards** to parents.
* **Event Capturing (trickling)**: Event starts from the root and travels **downwards** to the target.

👉 Example:

```js
document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked");
}, false); // bubbling

document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked");
}, true); // capturing
```

---

### **21. What is the difference between deep copy and shallow copy?**

* **Shallow Copy**: Copies only **top-level properties**. Nested objects share the same reference.
* **Deep Copy**: Creates a **completely independent clone**, including nested objects.

👉 Example:

```js
let obj = { a: 1, b: { c: 2 } };

let shallow = { ...obj };
shallow.b.c = 99;
console.log(obj.b.c); // 99 ❌

let deep = JSON.parse(JSON.stringify(obj));
deep.b.c = 42;
console.log(obj.b.c); // 99 ✅ (unaffected)
```

---

### **22. What are generator functions?**

Generators are functions that can **pause and resume execution** using the `function*` syntax and `yield` keyword.

👉 Example:

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
const g = gen();
console.log(g.next().value); // 1
console.log(g.next().value); // 2
```

👉 **Use cases**: Iterators, asynchronous control flow.

---

### **23. What is the `new` keyword used for?**

`new` creates an **instance of a constructor function** or class:

1. Creates a new empty object.
2. Sets its prototype to the constructor’s `prototype`.
3. Executes the constructor with `this` bound to the object.
4. Returns the new object (unless constructor explicitly returns an object).

👉 Example:

```js
function Person(name) { this.name = name; }
const p = new Person("Alice");
console.log(p.name); // "Alice"
```

---

### **24. How do JavaScript’s `setTimeout` and `setInterval` work?**

* **`setTimeout(fn, delay)`**: Executes `fn` once after `delay` ms.
* **`setInterval(fn, delay)`**: Executes `fn` repeatedly every `delay` ms until cleared.

👉 Example:

```js
setTimeout(() => console.log("Once after 1s"), 1000);

let id = setInterval(() => console.log("Every 2s"), 2000);
setTimeout(() => clearInterval(id), 7000); // stop after 7s
```

---

### **25. What is a WeakMap and how is it different from a Map?**

* **Map**: Key-value pairs, keys can be any type, strong references.
* **WeakMap**: Keys must be **objects**, held **weakly** (garbage-collected if no other refs).

👉 Differences:

* WeakMaps are **not iterable**.
* Prevent memory leaks by allowing GC of unused keys.

👉 Example:

```js
let wm = new WeakMap();
let obj = {};
wm.set(obj, "value");
obj = null; // obj garbage collected, entry removed
```

---

### **26. What is a Set in JavaScript?**

A **Set** is a collection of **unique values**.

👉 Example:

```js
let s = new Set([1, 2, 2, 3]);
s.add(4);
console.log([...s]); // [1, 2, 3, 4]
console.log(s.has(2)); // true
```

---

### **27. What is `Object.create()` used for?**

Creates a **new object** with the specified prototype.

👉 Example:

```js
let proto = { greet() { return "Hello"; } };
let obj = Object.create(proto);
console.log(obj.greet()); // "Hello"
```

---

### **28. How does JavaScript’s garbage collection work?**

JS uses **automatic garbage collection** based on **reachability**:

* If an object is reachable from roots (`window`, global vars, active closures), it stays in memory.
* Unreachable objects are removed.

**Algorithm:** Mark-and-Sweep.
👉 Example:

```js
let obj = { name: "Alice" };
obj = null; // now garbage collected
```

---

### **29. What are "decorators" in JavaScript?**

Decorators are **special functions** that can modify classes, methods, or properties.

* Still a **Stage 3 proposal** (not fully in JS, but available in TypeScript).
* Used for **metadata, logging, dependency injection, etc.**

👉 Example (TypeScript):

```ts
function log(target, key, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
}
class Person {
  @log
  say(msg) { console.log(msg); }
}
```

---

### **30. Explain the difference between `prototype` and `__proto__`.**

* **`prototype`**: A property of **functions** (used when creating objects with `new`). Defines shared methods.
* **`__proto__`**: A property of **objects** that points to the object’s prototype.

👉 Example:

```js
function Person() {}
Person.prototype.say = function() { console.log("Hi"); };

const p = new Person();
console.log(p.__proto__ === Person.prototype); // true
```

---

✅ That covers **Q16–Q30 in depth**.

Would you like me to now create a **cheat sheet (1–2 liner answers)** for all **Q1–Q30** so you can revise quickly before interviews, or keep these only in detail?

Perfect 👍 you’re building a **complete JavaScript interview prep list**. Let’s continue with **Q31–Q40**, explained in detail with examples, best practices, and interview-ready notes.

---

### **31. What is the purpose of `Object.assign()`?**

`Object.assign()` is used to **copy enumerable properties** from one or more source objects into a target object.

👉 Example:

```js
let target = { a: 1 };
let source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }
```

⚡ **Uses:**

* Cloning an object (shallow copy).
* Merging multiple objects.

---

### **32. What are "template literals"?**

Template literals are **string literals with backticks (``)** that support:

* **Interpolation** using `${expression}`
* **Multiline strings**
* **Tagged templates**

👉 Example:

```js
let name = "Alice";
let greeting = `Hello, ${name}!`;
console.log(greeting); // "Hello, Alice!"

let multi = `Line 1
Line 2`;
```

---

### **33. What is the spread operator?**

The spread operator (`...`) **expands** arrays or objects into individual elements/properties.

👉 Examples:

```js
let arr = [1, 2, 3];
let newArr = [...arr, 4, 5]; // [1,2,3,4,5]

let obj = { a: 1, b: 2 };
let clone = { ...obj, c: 3 }; // {a:1, b:2, c:3}
```

⚡ **Uses:** Cloning, merging, passing arrays as function args.

---

### **34. What is the rest parameter?**

The rest parameter (`...args`) collects **remaining arguments** into an array inside a function.

👉 Example:

```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

⚡ **Difference from spread:**

* Spread → expands values.
* Rest → collects values.

---

### **35. Explain the `for...of` loop.**

`for...of` iterates over **iterable objects** (arrays, strings, maps, sets, generators).

👉 Example:

```js
let arr = [10, 20, 30];
for (let value of arr) {
  console.log(value);
}
// 10, 20, 30
```

⚡ **Difference:**

* `for...in` → iterates over keys (properties).
* `for...of` → iterates over values.

---

### **36. What are `async` and `await` keywords used for?**

* **`async`**: Declares a function that returns a Promise.
* **`await`**: Pauses inside an async function until a Promise resolves (or rejects).

👉 Example:

```js
async function fetchData() {
  let data = await Promise.resolve("Done!");
  console.log(data); // "Done!"
}
fetchData();
```

⚡ **Advantage:** Makes asynchronous code look synchronous, avoids callback hell.

---

### **37. What is `Symbol` used for in JavaScript?**

`Symbol` is a **primitive, unique, and immutable identifier**, often used as object property keys to avoid name collisions.

👉 Example:

```js
let id = Symbol("id");
let obj = { [id]: 123 };
console.log(obj[id]); // 123
```

⚡ **Use cases:** Private properties, constants, meta-programming (with well-known symbols like `Symbol.iterator`).

---

### **38. How do you create a class in JavaScript?**

Classes are **syntactic sugar** over constructor functions and prototypes.

👉 Example:

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}
let p = new Person("Alice");
p.greet(); // "Hello, Alice"
```

⚡ Supports **inheritance** with `extends`.

---

### **39. What is destructuring in JavaScript?**

Destructuring allows unpacking values from arrays or objects into distinct variables.

👉 Examples:

```js
let [a, b] = [1, 2];
console.log(a, b); // 1 2

let { name, age } = { name: "Alice", age: 25 };
console.log(name, age); // "Alice" 25
```

⚡ **Uses:** Cleaner code, default values, swapping variables.

---

### **40. What is the Proxy object?**

A `Proxy` allows you to create a **wrapper around an object** to intercept and redefine fundamental operations (get, set, delete, etc.).

👉 Example:

```js
let target = { message: "Hello" };
let handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : "Not found"),
};
let proxy = new Proxy(target, handler);

console.log(proxy.message); // "Hello"
console.log(proxy.nonexistent); // "Not found"
```

⚡ **Uses:** Logging, validation, security checks, auto-defaults.

---

✅ That completes **Q31–Q40 in detail**.

Would you like me to now **compile Q1–Q40 into a single structured doc (with both detailed and quick short-answer formats)** so you can revise like a handbook?

