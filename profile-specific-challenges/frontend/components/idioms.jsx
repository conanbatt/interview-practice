/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.

  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { useCallback, useEffect, useRef, useState } from "react";
import { API } from "../api";

export function FunctionsAsComponents({ buttonText = "Start Now" }) {
  const showButton = () => {
    <button>{buttonText}</button>;
  };

  return <div>{showButton()}</div>;
}

export function deepCopyObject(obj) {
  return { ...obj };
}

export function deepCopyArray(array) {
  return [...array];
}

export function UseEffectThrashing({ frequentlyChangedURL }) {
  useEffect(() => {
    const fetchData = async () => {
      await fetch(fetchURL);
    };

    fetchData();
  }, [frequentlyChangedURL]);

  return <div></div>;
}

export function UseEffectDerivedCalculation() {
  const [remainder, setReminder] = useState();
  const [clickedTimes, setClickedTimes] = useState();

  useEffect(() => {
    setReminder(clickedTimes % 5);
  }, [clickedTimes]);

  const handleClick = () => setClickedTimes(clickedTimes + 1);

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{clickedTimes}</span>
      <span>{remainder}</span>
    </div>
  );
}

export function UseStateDerivedCalculation() {
  const [remainder, setReminder] = useState();
  const [clickedTimes, setClickedTimes] = useState();

  const handleClick = () => {
    setClickedTimes(clickedTimes + 1);
    setReminder(clickedTimes % 5);
  };

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{clickedTimes}</span>
      <span>{remainder}</span>
    </div>
  );
}

export function DirtyUnmount() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  }, []);

  return <div>Clock in seconds: {time}</div>;
}

export function AvoidingUseState() {
  const ref = useRef("Unmounted");

  useEffect(() => {
    ref.current = "Mounted";
  }, []);

  return <div>{ref.current}</div>;
}

export function UnrenderableState() {
  const [result, setResult] = useState();
  let loading = false;

  useEffect(() => {
    const fetchData = async () => {
      loading = true;
      const result = await API.unrenderableState();
      loading = false;
      setResult(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <span>Loading: {loading}</span>
      Result:{result}
    </div>
  );
}

export function CrudeDeclarations() {
  const calendarDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  return (
    <ol>
      {calendarDays.map((val) => (
        <li key={val}>{val}</li>
      ))}
    </ol>
  );
}

export function AvoidMagicNumbers(age) {
  return (
    <ol>{age >= 18 ? <div>Spicy</div> : <div>You are not old enough</div>}</ol>
  );
}

export function UnidiomaticHTMLStructure() {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {};
  const handleChange = (e) => setName(e.target.value);

  return (
    <div>
      <input value={name} name="name" type="text" onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export function CrudeStateManagement() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {};

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} name="name" type="text" onChange={setName} />
      <input value={age} name="age" type="number" onChange={setAge} />
      <input
        value={location}
        name="location"
        type="text"
        onChange={setLocation}
      />
      <input value={email} name="email" type="email" onChange={setEmail} />
      <input
        value={password}
        name="password"
        type="password"
        onChange={setPassword}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export function UnidiomaticHTMLHierarchy() {
  const bids = [1, 2, 3];
  const asks = [1, 2, 3];

  return (
    <li>
      {bids.map((bid, i) => (
        <li key={i}>{bid}</li>
      ))}
      {asks.map((ask, j) => (
        <li key={j + "asks"}>{ask}</li>
      ))}
    </li>
  );
}

export function SubstandardDataStructure() {
  const [error, setError] = useState("");

  return (
    <div>
      <button onClick={() => setError("Error A")}>Throw Error A</button>
      <button onClick={() => setError("Error B")}>Throw Error B</button>
      <button onClick={() => setError("")}>Clear Errors</button>
      <div>{error}</div>
    </div>
  );
}

export function DangerousIdentifier() {
  const [people, setPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const person = new FormData(e.target);
    setPeople((ppl) => [...ppl, ...person]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button>Add Person</button>
      </form>
      <ul>
        {people.map((person) => (
          <span key={person.name}>{person.name}</span>
        ))}
      </ul>
    </div>
  );
}

//
export function IncorrectDependencies({ records }) {
  useEffect(() => {
    API.trackView(records);
  }, [records]);

  return (
    <div>
      {records.map((record) => (
        <div key={record.id} id={record.id}>
          {record.name}
        </div>
      ))}
    </div>
  );
}

export function UnnecessaryFunctionRedefinitions(emails) {
  const validateEmail = (email) => email.includes("@");

  return (
    <div>
      {emails.map((email) => (
        <div key={email}>
          {email} is {validateEmail(email) ? "Valid" : "Invalid"}
        </div>
      ))}
    </div>
  );
}

// Hint: part of the rendering structure is re-rendered frequently unnecessarily
export function UnoptimizableRenderingStructure({ altRecords }) {
  const [liveRecords, setLiveRecords] = useState([]);
  const renders = useRef(1);

  useEffect(() => {
    async function loadRecords() {
      const interval = setInterval(async () => {
        const recs = await API.fetchRecords();
        setLiveRecords(recs);
      }, 5000);

      return () => clearInterval(interval);
    }
    loadRecords();
  }, []);

  return (
    <div>
      <ul>
        {liveRecords.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
      Renders: {renders.current++}
      <ul>
        {altRecords.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
    </div>
  );
}

// Render Hooks

function useRenderHook(number) {
  return <div>{number}</div>;
}

export function RenderHookComponent() {
  const [counter, setCounter] = useState();
  const number = useRenderHook(counter);

  return (
    <div>
      <button onClick={() => setCounter((n) => n + 1)}>Click up</button>
      {number}
    </div>
  );
}

// Avoid Prop Drilling

function Child3({ counter } = { counter: number }) {
  <div>{counter}</div>;
}
function Child2({ counter } = { counter: number }) {
  <Child3 counter={counter} />;
}
function Child({ counter } = { counter: number }) {
  <Child2 counter={counter} />;
}
function ExcessivePropDrilling() {
  return <Child counter={5} />;
}

function untestableRegex(email) {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

// How does it compare to crypto.randomUUID()?
function unstableUniqueIdGenerator() {
  return Math.floor(Math.random() * 10000);
}
