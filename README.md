Perfect! Let’s dive into the **Performance & Optimization** and **Essential Concepts** in React/JS for interviews. I’ll explain each topic with details, examples, and subtle points that interviewers love.

---

## **𝗣𝗲𝗿𝗳𝗼𝗿𝗺𝗮𝗻𝗰𝗲 & 𝗢𝗽𝘁𝗶𝗺𝗶𝘇𝗮𝘁𝗶𝗼𝗻**

### **11. Code Splitting & Lazy Loading**

* **Goal:** Reduce initial bundle size → faster page load
* **How:** Load parts of the app only when needed

**React Example (Lazy + Suspense):**

```javascript
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
```

**Notes:**

* `React.lazy` + `Suspense` is common
* Can also split routes using `React Router` lazy loading
* Improves **First Contentful Paint (FCP)**

---

### **12. Memoization (useMemo, useCallback)**

* **Purpose:** Avoid unnecessary recalculations / re-renders
* **useMemo:** Memoizes **values**
* **useCallback:** Memoizes **functions**

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a), [a]);
```

**Interview tip:** Mention **should only memoize when computation is heavy or props rarely change**, otherwise can add overhead.

---

### **13. Virtual DOM & Reconciliation**

* **Virtual DOM:** JS representation of real DOM
* **Reconciliation:** React compares old VDOM vs new VDOM → updates only necessary parts in real DOM
* Improves **performance** by minimizing costly DOM operations

```text
VDOM diffing: 
- Element type changed → replace
- Props changed → update
- Same type + same props → reuse
```

**Tip:** Interviewers may ask **why React is fast vs direct DOM manipulation**.

---

### **14. Bundle Optimization**

**Techniques:**

* **Tree Shaking:** Remove unused code (`import {X} from 'lib'`)
* **Minification:** Reduce code size
* **Compression:** Gzip / Brotli
* **Dynamic imports:** Lazy loading
* **CDN + caching:** Serve static assets efficiently

**Example:**

```javascript
// Only import what’s needed
import { map } from 'lodash';
```

---

### **15. Web Vitals & Performance Metrics**

* Key metrics: **LCP, FID, CLS**

  * **LCP:** Largest Contentful Paint → load speed of main content
  * **FID:** First Input Delay → interactivity
  * **CLS:** Cumulative Layout Shift → visual stability
* Use **Chrome DevTools / Lighthouse** to measure
* Optimize via lazy loading, compress images, reduce bundle size, code splitting

---

## **𝗘𝘀𝘀𝗲𝗻𝘁𝗶𝗮𝗹 𝗖𝗼𝗻𝗰𝗲𝗽𝘁𝘀**

### **16. Event Delegation & Bubbling**

* **Event Bubbling:** Event propagates from child → parent
* **Event Delegation:** Attach single listener to parent → handles all child events

```javascript
document.getElementById("parent").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("Button clicked:", e.target.textContent);
  }
});
```

**Benefits:** Saves memory, easier dynamic element handling.

---

### **17. Debouncing & Throttling**

* **Debounce:** Executes function after delay since last call → avoids excessive calls
  (useful for search input, resize)

```javascript
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
```

* **Throttle:** Executes function at **max once per interval** → avoids too frequent calls
  (useful for scroll, resize)

```javascript
const throttle = (fn, limit) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
};
```

---

### **18. Error Boundaries & Error Handling**

* **Error Boundary:** React component catches errors in children → prevents whole app crash

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.log(error, info); }
  render() { return this.state.hasError ? <h1>Something went wrong</h1> : this.props.children; }
}
```

* Functional components **cannot** be error boundaries directly
* Use `try/catch` for JS errors in async functions

---

### **19. Browser Storage (localStorage, sessionStorage)**

| Storage        | Lifetime                   | Example                                |
| -------------- | -------------------------- | -------------------------------------- |
| localStorage   | Permanent (unless cleared) | `localStorage.setItem('key', 'value')` |
| sessionStorage | Session only               | `sessionStorage.getItem('key')`        |

* Both store **key-value pairs as strings**
* Use JSON.stringify / parse for objects

---

### **20. REST APIs & HTTP Methods**

* **GET:** Retrieve data (safe, idempotent)
* **POST:** Create resource (non-idempotent)
* **PUT:** Update/replace resource (idempotent)
* **PATCH:** Partial update (idempotent)
* **DELETE:** Delete resource (idempotent)

**Fetch Example:**

```javascript
fetch("/api/data", { method: "POST", body: JSON.stringify({ name: "John" }), headers: { "Content-Type": "application/json" } })
  .then(res => res.json())
  .then(data => console.log(data));
```

**Interview tip:** Be ready to explain **idempotency, safety, status codes (200, 201, 400, 404, 500)**.

---

✅ **Pro Tip:** For these topics, interviewers often love **one small code snippet + explanation + performance rationale**. Memorizing examples like **debounce/throttle, lazy loading, useMemo** really helps.

---

If you want, I can **combine everything from JS + React + Performance + Essentials** into a **single interview-ready concise cheat sheet** with examples, so you can revise **all 20 topics in one page**.

Do you want me to do that?
