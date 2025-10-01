Got it 👍 This looks like your **advanced JavaScript interview prep set (polyfills + tricky implementations + conceptual Qs)**. I’ll break them down step by step with **detailed explanations and clean implementations**.

---

## **1. Implement `Promise.all` polyfill**

👉 `Promise.all` takes an iterable of promises, resolves when all succeed, rejects on the first failure.

```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        (value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) resolve(results);
        },
        (err) => reject(err)
      );
    });

    if (promises.length === 0) resolve([]);
  });
};
```

---

## **2. Implement `Promise.any` polyfill**

👉 `Promise.any` resolves with **first fulfilled promise**, rejects if **all reject**.

```js
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let errors = [];
    let rejectedCount = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        (value) => resolve(value),
        (err) => {
          errors[index] = err;
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All promises rejected"));
          }
        }
      );
    });

    if (promises.length === 0) reject(new AggregateError([], "No promises passed"));
  });
};
```

---

## **3. Implement `Array.prototype.reduce` polyfill**

👉 `reduce` applies a reducer function on array elements to accumulate result.

```js
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    if (this.length === 0) throw new TypeError("Reduce of empty array with no initial value");
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};
```

---

## **4. Implement Lodash’s `flatten` method**

👉 Flattens nested arrays (shallow).

```js
function flatten(arr) {
  return arr.reduce((acc, val) => acc.concat(val), []);
}
```

👉 For **deep flatten**:

```js
function flattenDeep(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
```

---

## **5. Implement auto-retry for promises**

👉 Retry a failing promise `n` times before rejecting.

```js
function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt(n) {
      fn()
        .then(resolve)
        .catch((err) => {
          if (n === 0) reject(err);
          else setTimeout(() => attempt(n - 1), delay);
        });
    }
    attempt(retries);
  });
}
```

---

## **6. Throttle promises by batching**

👉 Process async tasks in batches of size `n`.

```js
async function throttle(tasks, limit) {
  let results = [];
  let i = 0;

  async function worker() {
    while (i < tasks.length) {
      const index = i++;
      results[index] = await tasks[index]();
    }
  }

  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}
```

---

## **7. Debouncing implementation**

👉 Run function only after **delay of inactivity**.

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

---

## **8. Throttling implementation**

👉 Ensure function runs **at most once in given interval**.

```js
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
```

---

## **9. Execute N callback-based async tasks in series**

👉 Example: Run tasks one after another.

```js
function runSeries(tasks, finalCallback) {
  let i = 0;
  function next(err, result) {
    if (err || i === tasks.length) return finalCallback(err, result);
    let task = tasks[i++];
    task(next);
  }
  next();
}

// Usage:
let tasks = [
  (cb) => setTimeout(() => cb(null, "Task1"), 1000),
  (cb) => setTimeout(() => cb(null, "Task2"), 500),
  (cb) => setTimeout(() => cb(null, "Task3"), 200),
];
runSeries(tasks, (err, result) => console.log("Done", result));
```

---

## **10. Output prediction for tricky JS snippets**

👉 Common patterns to expect:

```js
console.log([] + []);        // "" (empty string)
console.log([] + {});        // "[object Object]"
console.log({} + []);        // 0 ({} treated as block)
console.log(typeof NaN);     // "number"
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(+"5");           // 5 (unary plus)
console.log([] == ![]);      // true ([] == false → 0==0)
```

---

## **11. Object vs Map differences in JavaScript**

| Feature       | Object                                                          | Map                               |
| ------------- | --------------------------------------------------------------- | --------------------------------- |
| Keys          | String/Symbol only                                              | Any type (obj, func, primitive)   |
| Order         | Not guaranteed (though modern engines preserve insertion order) | Maintains insertion order         |
| Iteration     | Must use `for...in`, `Object.keys`                              | Directly iterable (`for...of`)    |
| Performance   | Slower for frequent add/remove                                  | Optimized for frequent add/remove |
| Size property | Need `Object.keys(obj).length`                                  | Has `.size` property              |
| Prototypes    | Inherits from `Object.prototype`                                | No prototype interference         |

---

## **12. Difference between PATCH and PUT**

* **PUT** → Replace **entire resource** with new data.
* **PATCH** → Update **only specific fields** of resource.

👉 Example:

```http
PUT /users/1
{
  "name": "Alice",
  "age": 25
}
```

→ Replaces user with exactly these fields.

```http
PATCH /users/1
{
  "age": 26
}
```

→ Only updates `age`, keeps other fields intact.

---

✅ This set (Q1–Q12 here) covers **polyfills, async control, tricky outputs, data structures, and REST semantics**.

Do you want me to also add **expected outputs for 10–15 tricky JS snippets** (like hoisting, async + await, closures, event loop order) as a **separate quick-fire section**? That’s a favorite in interviews.

Perfect 👌 These are *very strong mid–senior level interview questions*. Let’s go one by one in detail so you can answer them with confidence in interviews:

---

### **13. Difference between Debounce and Throttle**

* **Debounce:** Ensures a function runs **only after a pause** of X ms from the last call.
  👉 Example: Search bar autocomplete (wait until the user stops typing).
* **Throttle:** Ensures a function runs **at most once in every X ms** (ignores extra calls).
  👉 Example: Handling scroll events, resize events.

📌 Rule of Thumb:

* **Debounce → delay until calm**
* **Throttle → limit execution frequency**

---

### **14. How does the JavaScript Engine work?**

A JS engine (e.g., V8 in Chrome/Node.js) works in **four steps**:

1. **Parsing:** Converts JS code into an Abstract Syntax Tree (AST).
2. **Compilation:** Modern engines use **Just-In-Time (JIT)** compilation → compiles JS into optimized machine code.
3. **Execution:** Executes the compiled code on the **call stack**.
4. **Garbage Collection:** Cleans up unused memory via algorithms like **mark-and-sweep**.

---

### **15. Event Loop and Microtask Queue**

* **Event Loop:** A mechanism that allows JS (single-threaded) to handle asynchronous code.
* **Queues:**

  * **Macro-task queue:** setTimeout, setInterval, I/O events.
  * **Micro-task queue:** Promises (`.then`, `catch`, `finally`), `queueMicrotask`, MutationObserver.

📌 Order of execution:

1. Execute **synchronous code**.
2. Empty the **microtask queue**.
3. Pick **one macro-task**, then again empty microtask queue.

---

### **16. Virtual DOM and Comparison Mechanism**

* **Virtual DOM:** A lightweight JS object that mirrors the real DOM.
* **Steps:**

  1. React creates a Virtual DOM tree.
  2. On updates, React creates a **new Virtual DOM**.
  3. **Diffing Algorithm:** Compares new and old trees (O(n)).
  4. **Reconciliation:** Applies only minimal changes to the real DOM.

⚡ Benefit: Faster rendering by reducing expensive direct DOM manipulations.

---

### **17. Controlling Tab Order in DOM (tabIndex)**

* **tabIndex attribute** defines the tabbing order of focusable elements:

  * `tabIndex="0"` → focusable in natural DOM order.
  * `tabIndex="-1"` → focusable only via JS (`element.focus()`), not tab.
  * `tabIndex="1 or higher"` → custom tab order (not recommended for accessibility).

📌 Rule: Use `0` or `-1` in most cases, avoid large positive values.

---

### **18. Event Capturing vs Bubbling**

* **Event Bubbling (default):** Event starts at target element and **bubbles up** to ancestors.
* **Event Capturing:** Event starts from the **root → target** before bubbling.

```js
element.addEventListener("click", handler, true); // capturing
element.addEventListener("click", handler, false); // bubbling
```

📌 Best Practice: Use **bubbling** most of the time, use **capturing** when you need interception early.

---

### **19. Overriding toString on String.prototype**

```js
String.prototype.toString = function () {
  return `Custom string: ${this.valueOf()}`;
};
console.log("Hello".toString()); 
// "Custom string: Hello"
```

⚠️ Be cautious → affects all strings globally.

---

### **20. What is OAuth and How Does It Work?**

* **OAuth 2.0:** Open standard for **delegated authorization**.
* Instead of sharing passwords, you grant apps a **token** with limited access.
* Flow:

  1. User logs into Google/GitHub/etc.
  2. Service gives your app an **access token**.
  3. Your app uses token to access APIs on behalf of user.

📌 Example: "Login with Google" → uses OAuth behind the scenes.

---

### **21. How Does SSO (Single Sign-On) Work?**

* **SSO:** One login grants access to multiple apps.
* Works by using a **central authentication server** (like Okta, Auth0, Google Identity).
* Steps:

  1. User logs in once with Identity Provider (IdP).
  2. IdP issues a **session/token (JWT, SAML, or OAuth2)**.
  3. Other applications trust this token → no need to log in again.

---

### **22. REST API Methods**

* **GET** → Retrieve data (read-only).
* **POST** → Create new resource.
* **PUT** → Update/replace entire resource.
* **PATCH** → Partial update.
* **DELETE** → Remove resource.

📌 Example with `/users/1`:

* `GET /users/1` → fetch user 1.
* `PUT /users/1` → replace user 1 with new data.
* `PATCH /users/1` → update only some fields.
* `DELETE /users/1` → delete user.

---

### **23. Principles of Functional Programming**

1. **Immutability** → Don’t mutate data, return new values.
2. **Pure Functions** → No side effects, same input = same output.
3. **First-Class Functions** → Functions can be passed around like values.
4. **Higher-Order Functions** → Functions can take/return other functions.
5. **Declarative Code** → Focus on *what* not *how*.

📌 Example: Instead of writing a `for` loop → use `.map`, `.filter`.

---

### **24. What are Microservices?**

* **Microservices architecture:** Application split into small, independent services communicating via APIs.
* Each service handles a **specific domain** (e.g., Auth, Payments, Notifications).
* Benefits:

  * Scalability (scale one service independently).
  * Fault tolerance (failure in one service doesn’t crash whole app).
  * Faster deployment (independent teams).
* Challenges:

  * Complex communication (needs service discovery, API gateway).
  * Monitoring & debugging harder.
  * Data consistency issues (eventual consistency).

---

✅ That completes this batch.

Do you want me to also give **example interview answers** (shortened, polished, and concise) for these so you can answer quickly in real interviews, instead of long deep explanations?

