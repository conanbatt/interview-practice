import { useState, useEffect, useCallback, useRef } from "react";

function useInterval(fn, delay) {
  const callback = useRef();

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  useEffect(() => {
    function tick() {
      callback.current();
    }

    if (delay !== null) {
      const interval = setInterval(tick, delay);
      return () => {
        clearInterval(interval);
      };
    }
  }, [delay]);
}

export default function Hooks() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  function toggleIsRunning() {
    setIsRunning((old) => !old);
  }

  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? delay : null
  );

  return (
    <>
      <h1>Hooks</h1>
      <ol>
        <li>
          Build a useInterval hook. See Documentation
          [here](https://github.com/streamich/react-use/blob/master/docs/useInterval.md)
        </li>
        <li>
          Build a useDebounce hook. See Documentation
          [here](https://github.com/streamich/react-use/blob/master/docs/useDebounce.md)
        </li>
      </ol>

      <div>
        <h3>Solution:</h3>
        <div>
          delay:{" "}
          <input
            value={delay}
            onChange={(event) => setDelay(Number(event.target.value))}
          />
        </div>
        <h6>count: {count}</h6>
        <div>
          <button onClick={toggleIsRunning}>
            {isRunning ? "stop" : "start"}
          </button>
        </div>
      </div>

      <Debounce />
    </>
  );
}

function useDebounce(fn, delay, deps) {
  const callback = useRef();
  const timeout = useRef();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    callback.current = fn;
  }, []);

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setStatus(true);
      callback.current();
    }, delay);
  }, [delay, [...deps]]);

  function cancel() {
    setStatus(null);
    clearTimeout(timeout);
  }

  return [status, cancel];
}

function Debounce() {
  const [state, setState] = useState("Typing stopped");
  const [val, setVal] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const [, cancel] = useDebounce(
    () => {
      console.log("RAN");
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
