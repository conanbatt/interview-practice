import { useEffect, useRef, useState } from "react";

function useBoolean(init) {
  const [bool, set] = useState(init);
  return [bool, () => set((p) => !p)];
}

function useInterval(callback, delay) {
  useEffect(() => {
    if (delay === null) return;
    const interval = setInterval(callback, delay);
    return () => clearInterval(interval);
  }, [callback, delay]);
}

function IntervalDemo() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? delay : null
  );

  return (
    <div>
      <div>
        delay:{" "}
        <input
          value={delay}
          onChange={(event) => setDelay(Number(event.target.value))}
        />
      </div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={toggleIsRunning}>
          {isRunning ? "stop" : "start"}
        </button>
      </div>
    </div>
  );
}

function useDebounce(callback, ms, dependencies) {
  const [state, setState] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setState(true);
      callback();
      setState(false);
    }, ms);
    return () => clearTimeout(timeout.current);
  }, dependencies);

  const cancel = () => {
    clearTimeout(timeout.current);
  };

  return [() => state, cancel];
}

function DebounceDemo() {
  const [state, setState] = useState("Typing stopped");
  const [val, setVal] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const [, cancel] = useDebounce(
    () => {
      setState("Typing stopped");
      setDebouncedValue(val);
    },
    2000,
    [val]
  );

  return (
    <div>
      <input
        type="text"
        value={val}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState("Waiting for typing to stop...");
          setVal(currentTarget.value);
        }}
      />
      <div>{state}</div>
      <div>
        Debounced value: {debouncedValue}
        <button onClick={cancel}>Cancel debounce</button>
      </div>
    </div>
  );
}

export default function Hooks() {
  return (
    <div>
      <h1>Interval Demo</h1>
      <IntervalDemo />
      <hr />
      <h1>Debounce Demo</h1>
      <DebounceDemo />
    </div>
  );
}
