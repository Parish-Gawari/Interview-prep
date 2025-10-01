Absolutely! Let's go **question by question**, in **detailed interview-ready explanations** for React and related topics. I'll make it precise but comprehensive so you can use it in interviews.

---

### **1. What is React?**

React is a **JavaScript library** for building **user interfaces (UIs)**, especially single-page applications (SPAs). It was developed by **Facebook** and allows developers to build **component-based UI** that is **reusable**, **maintainable**, and **efficient**.

**Key points:**

* **Component-based**: UI is broken into small, reusable pieces called components.
* **Declarative**: You describe what the UI should look like in a given state.
* **Virtual DOM**: React uses a virtual DOM to optimize rendering and performance.
* **Unidirectional data flow**: Data flows from parent to child components via props.

**Use case:** React is used for building web applications like Facebook, Instagram, and dynamic dashboards.

---

### **2. What is `useMemo`?**

`useMemo` is a **React Hook** that **memoizes the result of a computation**, so it doesn’t have to be recalculated on every render unless dependencies change.

**Syntax:**

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**Explanation:**

* `useMemo` takes a function and a dependency array.
* The function runs only if any dependency changes.
* Prevents **expensive calculations** from running on every render.

**Example:**

```javascript
const expensiveCalculation = useMemo(() => {
  return numbers.reduce((a, b) => a + b, 0);
}, [numbers]);
```

---

### **3. What are the features of React?**

React has several **core features**:

1. **JSX** – Lets you write HTML inside JavaScript.
2. **Components** – Modular and reusable UI building blocks.
3. **Virtual DOM** – Improves performance by updating only necessary parts of the real DOM.
4. **One-way Data Binding** – Props flow from parent to child; easier to debug.
5. **Lifecycle Methods / Hooks** – Control behavior during mounting, updating, and unmounting.
6. **Declarative UI** – React automatically updates the UI when data changes.
7. **React Hooks** – Functional components can have state and lifecycle features.

---

### **4. What is JSX?**

JSX (JavaScript XML) is a **syntax extension for JavaScript** used in React to write **HTML-like code** inside JavaScript.

**Example:**

```javascript
const element = <h1>Hello, React!</h1>;
```

**Key points:**

* It’s **not HTML**, it’s compiled to `React.createElement`.
* Improves **readability** and **UI structure**.
* Allows embedding **JavaScript expressions** using `{}`.

---

### **5. What is DOM?**

DOM (Document Object Model) is a **programming interface** for HTML and XML documents. It represents the page as a **tree of nodes**, which allows programs (JavaScript) to **access, modify, and update** content and structure dynamically.

**Example:**

```javascript
document.getElementById('app').innerHTML = 'Hello World';
```

---

### **6. What is Virtual DOM?**

The **Virtual DOM** is a lightweight, in-memory copy of the real DOM. React uses it to **optimize rendering**.

**How it works:**

1. React creates a Virtual DOM tree of components.
2. When state changes, React compares the new Virtual DOM with the previous one (**diffing**).
3. React updates **only the parts of the real DOM** that changed (**reconciliation**).

**Benefit:** Faster performance, minimal re-renders, efficient UI updates.

---

### **7. What is the component lifecycle of a React class component?**

Class components have **lifecycle methods** divided into **three phases**:

1. **Mounting** (component is created and inserted into the DOM)

   * `constructor()`
   * `static getDerivedStateFromProps()`
   * `render()`
   * `componentDidMount()`

2. **Updating** (state or props changes)

   * `static getDerivedStateFromProps()`
   * `shouldComponentUpdate()`
   * `render()`
   * `getSnapshotBeforeUpdate()`
   * `componentDidUpdate()`

3. **Unmounting** (component is removed from DOM)

   * `componentWillUnmount()`

**Example usage:** Fetching data in `componentDidMount` or cleaning up timers in `componentWillUnmount`.

---

### **8. What are fragments in React?**

**Fragments** let you group multiple elements **without adding extra nodes to the DOM**.

**Syntax:**

```javascript
<>
  <h1>Hello</h1>
  <p>World</p>
</>
```

**Why use fragments:**

* Avoid unnecessary `<div>` wrappers.
* Keeps the DOM clean and improves performance.

---

### **9. What are props in React?**

**Props (Properties)** are **read-only inputs** passed from **parent to child components** to customize their behavior.

**Example:**

```javascript
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

<Greeting name="Parish" />
```

**Key points:**

* Immutable (cannot be changed inside child component)
* Used for **dynamic rendering** and **component communication**.

---

### **10. What are synthetic events in React?**

**Synthetic events** are **React's cross-browser wrapper** around the browser’s native events.

**Features:**

* Normalize event objects across browsers.
* Work the same way in all browsers.
* Have the same interface as **native events** (`onClick`, `onChange`).

**Example:**

```javascript
function handleClick(event) {
  console.log(event.type); // click
}
<button onClick={handleClick}>Click me</button>
```

---

### **11. Difference between `package.json` and `package-lock.json`**

| Feature    | package.json                                    | package-lock.json                                 |
| ---------- | ----------------------------------------------- | ------------------------------------------------- |
| Purpose    | Defines project metadata, dependencies, scripts | Locks exact versions of installed packages        |
| Version    | Allows version ranges (`^1.0.0`)                | Records the exact version installed (`1.0.1`)     |
| Created by | Developer                                       | Automatically by npm when installing dependencies |
| Importance | Needed to run the project                       | Ensures **deterministic builds**                  |

---

### **12. Client-side vs Server-side rendering**

| Feature      | Client-side Rendering (CSR)         | Server-side Rendering (SSR)              |
| ------------ | ----------------------------------- | ---------------------------------------- |
| Rendering    | Browser renders HTML via JavaScript | Server sends fully rendered HTML         |
| Initial load | Slower, JS loads first              | Faster, HTML ready to display            |
| SEO          | Harder to crawl                     | SEO-friendly                             |
| Performance  | Heavier on client                   | Lighter on client, server does more work |
| Examples     | React SPA                           | Next.js SSR pages                        |

---

### **13. What is state in React?**

**State** is a **JavaScript object** that stores **dynamic data** of a component. State changes trigger **re-rendering**.

**Class Component Example:**

```javascript
class Counter extends React.Component {
  state = { count: 0 };
  
  increment = () => this.setState({ count: this.state.count + 1 });
  
  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}
```

**Functional Component Example with Hook:**

```javascript
const [count, setCount] = useState(0);
```

---

### **14. What are props?**

Props are **inputs passed to components** from parent components to customize their behavior.

* Read-only.
* Can be strings, numbers, functions, objects, etc.
* Used for communication between components.

---

### **15. Difference between State and Props**

| Feature           | State                                   | Props                                  |
| ----------------- | --------------------------------------- | -------------------------------------- |
| Mutability        | Mutable (can change inside component)   | Immutable (cannot change inside child) |
| Source            | Managed inside component                | Passed from parent component           |
| Purpose           | Store dynamic data                      | Pass data from parent to child         |
| Trigger re-render | Yes, when state changes                 | Yes, when props change                 |
| Example           | `const [count, setCount] = useState(0)` | `<Child name="Parish" />`              |

---

Absolutely! Let’s go **question by question**, detailed and interview-ready for these React topics.

---

### **16. What is props drilling?**

**Props drilling** occurs when you pass props **through multiple intermediate components** just to reach a deeply nested child.

**Example:**

```javascript
function App() {
  const user = { name: "Parish" };
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <h1>{user.name}</h1>;
}
```

Here, `user` is drilled through `Parent` to `Child`.

---

### **17. Disadvantages of props drilling and how to avoid it**

**Disadvantages:**

* Makes the code **hard to maintain**.
* Intermediate components receive props **they don’t need**.
* Reduces component **reusability**.

**Ways to avoid:**

1. **Context API** – Share data globally without drilling.
2. **State management libraries** – Redux, Zustand, MobX.
3. **Component composition** – Pass components instead of props if possible.

**Example with Context:**

```javascript
const UserContext = React.createContext();

function App() {
  const user = { name: "Parish" };
  return (
    <UserContext.Provider value={user}>
      <Child />
    </UserContext.Provider>
  );
}

function Child() {
  const user = React.useContext(UserContext);
  return <h1>{user.name}</h1>;
}
```

---

### **18. What are Pure Components in React?**

**PureComponent** is a **class component** that **implements `shouldComponentUpdate` by default** to prevent unnecessary re-renders.

* Only re-renders if **props or state** have changed **shallowly**.
* Improves performance in large apps.

**Example:**

```javascript
class MyComponent extends React.PureComponent {
  render() {
    return <h1>{this.props.name}</h1>;
  }
}
```

---

### **19. What are Refs in React?**

**Refs** provide a way to **access DOM elements or React elements directly**.

**Example:**

```javascript
function InputFocus() {
  const inputRef = React.useRef();
  
  const focusInput = () => inputRef.current.focus();
  
  return <input ref={inputRef} />;
}
```

**Use cases:**

* Focus input fields.
* Trigger animations.
* Integrate with third-party libraries.

---

### **20. What is meant by forwardRef?**

`forwardRef` allows **passing a ref from a parent to a child functional component**.

**Example:**

```javascript
const Input = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

const App = () => {
  const inputRef = React.useRef();
  return <Input ref={inputRef} />;
};
```

* Helps **expose child DOM** to parent components.

---

### **21. What are Error Boundaries?**

Error Boundaries are **React components** that **catch JavaScript errors in their child component tree** and display a fallback UI instead of crashing the app.

**Key points:**

* Only **class components** can be error boundaries.
* Methods:

  * `static getDerivedStateFromError(error)`
  * `componentDidCatch(error, info)`

**Example:**

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong</h1>;
    return this.props.children;
  }
}
```

---

### **22. What are Higher-Order Components (HOCs)?**

**HOCs** are **functions that take a component and return a new component** with enhanced behavior.

**Example:**

```javascript
function withLogger(Component) {
  return function Wrapped(props) {
    console.log('Rendering', Component.name);
    return <Component {...props} />;
  };
}

const EnhancedComponent = withLogger(MyComponent);
```

**Use cases:** Reusability, conditional rendering, logging, authentication, etc.

---

### **23. Controlled vs Uncontrolled Components**

| Feature         | Controlled Component                     | Uncontrolled Component     |
| --------------- | ---------------------------------------- | -------------------------- |
| Data handling   | React state                              | DOM handles the data       |
| Value source    | State (`useState`)                       | Ref (`useRef`)             |
| Form validation | Easy                                     | Harder                     |
| Example         | `<input value={state} onChange={...} />` | `<input ref={inputRef} />` |

---

### **24. What is useCallback?**

`useCallback` **memoizes a function** so that it’s **not recreated on every render** unless dependencies change.

**Example:**

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

**Use case:** Avoid passing new function references to child components unnecessarily.

---

### **25. Difference between useMemo and useCallback**

| Feature | useMemo                                            | useCallback                                  |
| ------- | -------------------------------------------------- | -------------------------------------------- |
| Purpose | Memoizes **value**                                 | Memoizes **function**                        |
| Return  | Computed result                                    | Memoized function                            |
| Usage   | `const val = useMemo(() => expensiveFn(), [deps])` | `const fn = useCallback(() => fn(), [deps])` |

---

### **26. What are keys in React?**

**Keys** are **unique identifiers** used when rendering lists of elements to **help React identify which items changed, added, or removed**.

**Example:**

```javascript
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

**Importance:** Improves **reconciliation performance**.

---

### **27. What is Lazy Loading in React?**

**Lazy loading** allows **loading components only when they are needed**, reducing the initial bundle size.

**Example:**

```javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

* Useful for **code splitting** and performance optimization.

---

### **28. What is Suspense in React?**

**Suspense** is a **wrapper component** that shows a fallback UI while **lazy-loaded components or data are being loaded**.

**Example:**

```javascript
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

* Works with **React.lazy** and **Concurrent features**.

---

### **29. What are custom hooks?**

**Custom hooks** are **JavaScript functions** that start with `use` and **reuse logic across components**.

**Example:**

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}

const App = () => {
  const { count, increment } = useCounter();
};
```

* Encapsulates reusable logic like fetching data, toggling state, etc.

---

### **30. What is useReducer hook?**

`useReducer` is an alternative to `useState` for **complex state logic**. It uses a **reducer function** similar to Redux.

**Syntax:**

```javascript
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch(action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}
```

Perfect! Let’s go **question by question**, detailed with examples and interview-ready explanations.

---

### **31. What are Portals in React?**

**Portals** allow you to **render a child component into a DOM node outside the parent component hierarchy**.
**Syntax:**

```javascript
ReactDOM.createPortal(child, container)
```

**Example:**

```javascript
const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
};
```

**Use case:** Modals, tooltips, dropdowns where the component must appear **outside main DOM tree**.

---

### **32. What is Context in React?**

**Context API** allows **sharing state across the component tree** without passing props manually at every level.

**Syntax:**

```javascript
const MyContext = React.createContext(defaultValue);
```

**Key points:**

* Provides **global state** without Redux.
* Useful for themes, auth info, language, etc.

---

### **33. Practical example: Context API usage**

```javascript
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Navbar />
    </ThemeContext.Provider>
  );
}

function Navbar() {
  const theme = React.useContext(ThemeContext);
  return <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>Navbar</div>;
}
```

---

### **34. Purpose of callback function as argument of `setState()`**

In **class components**, `setState` is **asynchronous**, so you may want to perform actions **after state updates**.

```javascript
this.setState({ count: this.state.count + 1 }, () => {
  console.log("State updated", this.state.count);
});
```

* Callback ensures **code runs after state has updated**.

---

### **35. Practical: Custom hook for increment/decrement counter**

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = React.useState(initialValue);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  return { count, increment, decrement };
}

// Usage
const Counter = () => {
  const { count, increment, decrement } = useCounter(0);
  return (
    <>
      <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button>
    </>
  );
};
```

---

### **36. Lifecycle hooks in class component replaced by `useEffect`**

| Class Component Lifecycle | Functional Component Equivalent           |
| ------------------------- | ----------------------------------------- |
| `componentDidMount`       | `useEffect(() => {}, [])`                 |
| `componentDidUpdate`      | `useEffect(() => {}, [deps])`             |
| `componentWillUnmount`    | `useEffect(() => { return cleanup }, [])` |

---

### **37. What is Strict Mode in React?**

**StrictMode** is a **wrapper component** to highlight **potential problems in an application** (development only).
**Example:**

```javascript
<React.StrictMode>
  <App />
</React.StrictMode>
```

**Checks:**

* Unsafe lifecycle methods.
* Deprecated API usage.
* Detecting side effects in double render (dev only).

---

### **38. Ways to pass data from child to parent**

1. **Callback functions:** Parent passes a function to child.
2. **useRef:** Access child component or DOM methods directly.
3. **Context / Global state:** Child updates global state, parent consumes it.

---

### **39. Child to parent using callback**

```javascript
function Parent() {
  const handleData = (data) => console.log(data);
  return <Child sendData={handleData} />;
}

function Child({ sendData }) {
  return <button onClick={() => sendData("Hello Parent")}>Send</button>;
}
```

---

### **40. Child to parent using `useRef`**

```javascript
function Child(_, ref) {
  React.useImperativeHandle(ref, () => ({
    showAlert: () => alert("Hello from Child")
  }));
  return <div>Child Component</div>;
}
Child = React.forwardRef(Child);

function Parent() {
  const childRef = React.useRef();
  return <button onClick={() => childRef.current.showAlert()}>Call Child</button>;
}
```

---

### **41. How to optimize a React application**

* **Memoization:** `React.memo`, `useMemo`, `useCallback`
* **Code splitting / Lazy loading**
* **Virtualization for long lists** (react-window/react-virtualized)
* **Avoid unnecessary re-renders**
* **Use production build**
* **Optimize images/assets**
* **Debouncing/throttling events**
* **Avoid anonymous functions in JSX**

---

### **42. Consuming RESTful JSON API**

```javascript
function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  return <ul>{data.map(item => <li key={item.id}>{item.title}</li>)}</ul>;
}
```

---

### **43. Different design patterns in React**

* **Container / Presentational components**
* **Higher-Order Components (HOC)**
* **Render Props**
* **Hooks / Custom Hooks**
* **Compound Components**
* **Context API / State management patterns**
* **Lazy Loading / Code splitting pattern**

---

### **44. Context API vs Redux**

| Feature            | Context API               | Redux                      |
| ------------------ | ------------------------- | -------------------------- |
| Complexity         | Simple                    | More complex               |
| Boilerplate        | Minimal                   | High                       |
| Use case           | Light state (theme, auth) | Large app, complex state   |
| Middleware support | No                        | Yes (logging, async, etc.) |
| DevTools           | Limited                   | Powerful Redux DevTools    |

---

### **45. Prop types in React**

**PropTypes** are used for **runtime validation** of props.

**Example:**

```javascript
import PropTypes from 'prop-types';

function User({ name, age }) {
  return <div>{name} - {age}</div>;
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};

User.defaultProps = {
  age: 18
};
```

* Helps **catch errors** during development.

---

Perfect! Let’s go through these **questions 46–53** in detail with examples and interview-ready explanations.

---

### **46. What are React Mixins?**

**Mixins** were a way to **share reusable code between components** in early React (mainly class components).

**Key points:**

* Allowed sharing **methods and state logic**.
* Introduced issues like **name conflicts** and **unpredictable behavior**.
* **Deprecated in favor of Hooks** and **HOCs**.

**Example (old React syntax):**

```javascript
var SetIntervalMixin = {
  componentWillMount() {
    this.intervals = [];
  },
  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments));
  }
};
```

**Modern alternative:** Use **custom hooks** for reusable logic.

---

### **47. Different hooks commonly used**

**Built-in Hooks:**

1. `useState` – State in functional components
2. `useEffect` – Side effects, lifecycle replacement
3. `useContext` – Consume context
4. `useReducer` – Complex state management
5. `useRef` – Reference DOM or values
6. `useMemo` – Memoize computed values
7. `useCallback` – Memoize functions
8. `useLayoutEffect` – Synchronous effect after DOM updates
9. `useImperativeHandle` – Expose functions to parent via ref

**Custom Hooks:** e.g., `useCounter`, `useFetch`, `useToggle`

---

### **48. What are Render Props in React?**

**Render props** is a **technique to share code between components** by passing a **function as a prop** that returns JSX.

**Example:**

```javascript
function Mouse({ render }) {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const handleMouse = e => { setX(e.clientX); setY(e.clientY); };

  return <div onMouseMove={handleMouse}>{render({ x, y })}</div>;
}

// Usage
<Mouse render={({ x, y }) => <h1>{x}, {y}</h1>} />
```

* Alternative to **HOCs**, helps **share behavior** without affecting the component hierarchy.

---

### **49. Different types of exports and imports**

**Exports:**

1. **Named Export**

```javascript
export const foo = 1;
export function bar() {}
```

2. **Default Export**

```javascript
export default function baz() {}
```

**Imports:**

```javascript
// Named
import { foo, bar } from './module';
// Default
import baz from './module';
// Both together
import baz, { foo } from './module';
```

---

### **50. Differences between `createElement` vs `cloneElement`**

| Feature   | `React.createElement`       | `React.cloneElement`                         |
| --------- | --------------------------- | -------------------------------------------- |
| Purpose   | Creates a new React element | Clones and modifies an existing element      |
| Arguments | type, props, children       | element, props, children                     |
| Use case  | Normal JSX rendering        | Adding props to child components dynamically |

**Example `cloneElement`:**

```javascript
const child = <Child />;
const newChild = React.cloneElement(child, { extraProp: 123 });
```

---

### **51. When to use `useState` vs `useReducer`**

| Feature     | `useState`              | `useReducer`                        |
| ----------- | ----------------------- | ----------------------------------- |
| Complexity  | Simple state            | Complex state logic                 |
| State shape | Single or simple values | Multiple sub-values, nested objects |
| Actions     | Direct setter           | Dispatch actions with type/payload  |
| Example     | Toggle, counter         | Complex form, multi-step wizard     |

---

### **52. What are protected routes in React?**

**Protected routes** restrict access to certain routes/pages based on **authentication or roles**.

**Example using React Router:**

```javascript
function ProtectedRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" />;
}

// Usage
<ProtectedRoute isAuth={userLoggedIn}>
  <Dashboard />
</ProtectedRoute>
```

---

### **53. Does React Router support a context menu?**

React Router **does not have built-in context menu support**.

* Context menus can be implemented using **custom right-click handlers** and `onContextMenu` events.
* React Router can **handle navigation inside the menu**.

**Example:**

```javascript
function MenuItem({ to }) {
  const navigate = useNavigate();
  const handleRightClick = e => {
    e.preventDefault();
    navigate(to);
  };
  return <div onContextMenu={handleRightClick}>Go to {to}</div>;
}
```





