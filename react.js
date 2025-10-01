Great batch 🚀 These are **React-heavy interview questions** that test deeper understanding beyond basics. I’ll break each one into **clear explanations + examples** so you can use them in interviews.

---

### **1. Why do keys matter in React and how do they improve performance?**

* Keys help React **identify which elements have changed, been added, or removed**.
* Without keys, React re-renders entire lists instead of just the changed item.
* With keys, React **reuses existing DOM nodes** → improves performance.

✅ Example:

```jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

📌 Best practice: use **unique stable IDs**, not array indices (can break reordering).

---

### **2. Explain how useState works internally**

* `useState` keeps state **persistent between re-renders** using a **linked list of hooks**.
* Each component has a **hook fiber object** that stores state values.
* When you call `setState`, React:

  1. Creates a new state value.
  2. Schedules a re-render.
  3. Reads the latest state from the hooks list during the render.

---

### **3. Implement a basic version of useState**

```js
function createUseState() {
  let state;
  function useState(initialValue) {
    state = state !== undefined ? state : initialValue;
    function setState(newValue) {
      state = newValue;
    }
    return [state, setState];
  }
  return useState;
}

const useState = createUseState();
let [count, setCount] = useState(0);
setCount(5);
console.log(count); // 0 (needs re-render mechanism)
```

⚠️ Simplified → real React uses **fiber + re-renders**.

---

### **4. What are React Portals? How are modals mounted using them?**

* **Portal:** Renders children **into a DOM node outside the parent hierarchy**.
* Use case: Modals, tooltips, dropdowns.

✅ Example:

```jsx
ReactDOM.createPortal(
  <ModalContent />,
  document.getElementById("modal-root")
);
```

---

### **5. What are Error Boundaries in React?**

* Special components that **catch runtime errors** in child components.
* Prevent app crash → show fallback UI.

✅ Example:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() { return this.state.hasError ? <h1>Something went wrong</h1> : this.props.children; }
}
```

---

### **6. How does memoization work in React?**

* **Memoization prevents unnecessary re-renders.**
* Tools:

  * `React.memo(Component)` → memoize component.
  * `useMemo(fn, deps)` → memoize computed values.
  * `useCallback(fn, deps)` → memoize functions.

✅ Example:

```jsx
const MemoizedChild = React.memo(Child);
```

---

### **7. SSR vs CSR with examples and use-cases**

* **CSR (Client-Side Rendering):**

  * Initial load = blank HTML, JS hydrates UI.
  * Example: Create React App.
  * Best for **SPAs, dashboards**.

* **SSR (Server-Side Rendering):**

  * HTML generated on server → faster first paint, better SEO.
  * Example: Next.js.
  * Best for **blogs, e-commerce, SEO-heavy apps**.

---

### **8. What is Module Federation?**

* Webpack 5 feature → allows **sharing code between separate apps at runtime**.
* Enables **Micro-Frontends**: multiple teams build independent apps but share components.

✅ Example: A `Navbar` component is shared between apps without redeploying both.

---

### **9. What is Micro-Frontend Architecture?**

* Breaks frontend into **independent apps** (like microservices).
* Each micro-frontend = small React app (e.g., Checkout, Profile, Cart).
* Tools: Module Federation, Single-SPA, Bit.

Pros: Scalability, team autonomy.
Cons: Complexity in routing, shared state, styling.

---

### **10. Server-Side Rendering techniques to improve SEO**

* **Static Site Generation (SSG):** Pre-build at build time (Next.js `getStaticProps`).
* **SSR on-demand:** Generate HTML per request (Next.js `getServerSideProps`).
* **ISR (Incremental Static Regeneration):** Hybrid between SSG + SSR.
* **Prerendering + Hydration:** Use crawlers-friendly HTML with later JS hydration.

---

### **11. What are memory leaks in React and how to detect them?**

* Common causes:

  * Not cleaning up subscriptions (`setInterval`, event listeners).
  * Keeping large objects in state unnecessarily.
  * Retaining DOM refs.

✅ Fix with `useEffect cleanup`:

```jsx
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

📌 Detect: Chrome DevTools → **Performance & Memory tab**.

---

### **12. How to measure performance in a React application?**

* **React DevTools Profiler** → see slow renders.
* **Chrome Lighthouse** → measure FCP, TTI.
* **useMemo, useCallback** for optimization.
* Lazy loading & code-splitting.

---

### **13. How would you build a tool like Create React App?**

* Steps:

  1. Initialize `npm init`.
  2. Configure **Webpack + Babel**.
  3. Add **React, ReactDOM**.
  4. Add **dev server** (webpack-dev-server / Vite).
  5. Provide scripts → `npm run start`, `npm run build`.
  6. Add linting (ESLint), testing (Jest).

📌 CRA is basically a **pre-configured Webpack + Babel + ESLint + Jest setup**.

---

### **14. How do you structure reusable UI components in React?**

* **Atomic Design Principle:**

  * Atoms → Buttons, Inputs.
  * Molecules → Form, Card.
  * Organisms → Header, Sidebar.
  * Templates → Page layout.
  * Pages → Final screen.

📌 Example structure:

```
/components
  /atoms
    Button.js
    Input.js
  /molecules
    Form.js
  /organisms
    Navbar.js
```

---

✅ That covers this batch in depth.

Do you want me to also **add coding challenges** for these (like implementing `useState`, `ErrorBoundary`, Micro-Frontend example) so you have hands-on practice too?
