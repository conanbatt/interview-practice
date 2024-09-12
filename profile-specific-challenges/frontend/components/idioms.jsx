/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.

  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { useEffect, useState, useRef } from "react";
import { API } from "../api";

export function FunctionsAsComponents({ buttonText = "Start Now" }) {
  return (
    <div>
      <button>{buttonText}</button>
    </div>
  );
}

export function objectShallowCopying() {
  const object = { a: { c: 1 }, b: 2 };
  const copy = { ...object };
  copy.a.c = 2;
  return { ...object };
}

export function arrayShallowCopying() {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
  const copy = [...array];
  return copy;
}

export function UseEffectThrashing({ fetchURL, label }) {
  const [{ data, error, loading }, setQuery] = useState({
    data: undefined,
    error: undefined,
    loading: false,
  });

  // assuming we want to fetch on mount, the button is misleading
  // but let's do something with the data.
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setQuery((old) => ({ ...old, loading: true }));
      await fetch(fetchURL, { signal: controller.signal })
        .then(async (blob) => {
          if (blob.ok) {
            const data = await blob.json();
            setQuery((old) => ({ ...old, loading: false, data }));
          } else {
            throw new Error(await blob.text());
          }
        })
        .catch((error) => {
          setQuery((old) => ({
            ...old,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "There was an error fetching the data.",
          }));
        });
    };

    if (fetchURL && typeof fetchURL === "string") {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [fetchURL]);

  return (
    <div>
      <button>{label}</button>

      {loading ? <p>Data is being fetched...</p> : null}
      {error ? <p>{error}</p> : null}
      {data ? (
        <div>
          <p>Data:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>{" "}
        </div>
      ) : null}
    </div>
  );
}

export function UseEffectDerivedCalculation() {
  const [clickedTimes, setClickedTimes] = useState(0);

  const handleClick = () => setClickedTimes(clickedTimes + 1);
  const remainder = clickedTimes % 5;

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>Sum: {clickedTimes}</span>
      <span>Remainder: {remainder}</span>
    </div>
  );
}

export function UseStateDerivedCalculation() {
  const [clickedTimes, setClickedTimes] = useState(0);
  const remainder = clickedTimes % 5;

  const handleClick = () => {
    setClickedTimes(clickedTimes + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>Sum: {clickedTimes}</span>
      <span>Remainder: {remainder}</span>
    </div>
  );
}

export function DirtyUnmount() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>Clock in seconds: {time}</div>;
}

export function AvoidingUseState() {
  const [state, setState] = useState("Unmounted");

  useEffect(() => {
    setState("Mounted");
  }, []);

  return <div>{state}</div>;
}

export function UnrenderableState() {
  const [result, setResult] = useState({ loading: false, data: undefined });

  useEffect(() => {
    const fetchData = async () => {
      setResult((old) => ({ ...old, loading: true }));
      try {
        const data = await API.unrenderableState();
        setResult({ loading: false, data });
      } catch (err) {
        setResult({ loading: false, data: err });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <span>Loading: {result.loading ? "Pending" : "Done"}</span>
      <span>Result: {result.data}</span>
    </div>
  );
}

// const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
// even better
const today = new Date();
const y = today.getUTCFullYear();
const m = today.getUTCMonth() + 1;
const calendarDays = Array.from(
  { length: new Date(y, m, 0).getDate() },
  (_, i) => i + 1
);
export function CrudeDeclarations() {
  return (
    <ol>
      {calendarDays.map((val) => (
        <li key={val}>{val}</li>
      ))}
    </ol>
  );
}

const MIN_AGE = 18;
export function MagicNumbers({ age }) {
  return (
    <ol>
      {age > MIN_AGE ? <div>Spicy</div> : <div>You are not old enough</div>}
    </ol>
  );
}

export function UnidiomaticHTMLStructure() {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        name="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export function CrudeStateManagement() {
  const [form, setForm] = useState({
    name: "",
    age: undefined,
    location: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {};

  const { name, age, location, email, password } = form;

  function handleFormChange(e) {
    setForm((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        value={name}
        name="name"
        id="name"
        type="text"
        onChange={handleFormChange}
      />
      <label htmlFor="age">Age:</label>
      <input
        value={age}
        name="age"
        id="age"
        type="number"
        onChange={handleFormChange}
      />
      <label htmlFor="location">Location:</label>
      <input
        value={location}
        name="location"
        id="location"
        type="text"
        onChange={handleFormChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        value={email}
        name="email"
        id="email"
        type="email"
        onChange={handleFormChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        value={password}
        name="password"
        id="password"
        type="password"
        onChange={handleFormChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export function UnidiomaticHTMLHierarchy() {
  const bids = [1, 2, 3];
  const asks = [1, 2, 3];

  return (
    <ul>
      {bids.map((bid, i) => (
        <li key={i}>{bid}</li>
      ))}
      {asks.map((ask, j) => (
        <li key={j + "asks"}>{ask}</li>
      ))}
    </ul>
  );
}

export function SubstandardDataStructure() {
  const [errors, setErrors] = useState([]);

  function setError(error) {
    setErrors((old) => [...old, error]);
  }

  return (
    <div>
      <button onClick={() => setError("Error A")}>Throw Error A</button>
      <button onClick={() => setError("Error B")}>Throw Error B</button>
      <button onClick={() => setErrors([])}>Clear Errors</button>
      {errors.length > 0 ? (
        <ul>
          {errors.map((error, idx) => (
            <li key={error + idx}>{error}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function DangerousIdentifier() {
  const [people, setPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const person = data.get("name");
    setPeople((ppl) => [...ppl, { id: people.length, name: person }]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <button>Add Person</button>
      </form>
      <ul>
        {people.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export function UnnecessaryEffectTriggering() {
  const [leader, setLeader] = useState({});

  useEffect(() => {
    async function getData() {
      const leader = await API.fetchLeader().then((l) => API.fetchDetails(l));
      setLeader(leader);
    }

    getData();
  }, []);

  return (
    <div>
      <div>Leader: {leader.name}</div>
      {leader.country && <div>From: {leader.country}</div>}
    </div>
  );
}

export function IncorrectDependencies({ records }) {
  return (
    <div>
      {records.map((record) => (
        <div key={record.id}>{record.name}</div>
      ))}
      <button onClick={() => API.trackRecordsClick(records)}>Click me!</button>
    </div>
  );
}

const validateEmail = (email) => email.includes("@");
export function UnnecessaryFunctionRedefinitions({ emails }) {
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

export function SerialLoading() {
  const [records, setRecords] = useState([]);
  const [altRecords, setAltRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const [recs, altRecs] = await Promise.all([
        API.fetchRecords(),
        API.fetchAlternateRecords(),
      ]);

      setRecords(recs);
      setAltRecords(altRecs);
    }
    loadRecords();
  }, []);

  return (
    <ul>
      {records.map((rec) => (
        <li key={rec.id}>{rec.name}</li>
      ))}
      {altRecords.map((rec) => (
        <li key={rec.id}>{rec.name}</li>
      ))}
    </ul>
  );
}

// Hint: part of the rendering structure is re-rendered frequently unnecessarily
export function UnoptimizableRenderingStructure({ altRecords }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      console.log("GETCHING RECORDS");
      const recs = await API.fetchRecords();
      setRecords(recs);
    }
    const interval = setInterval(loadRecords, 5000);

    loadRecords();
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ul>
        {records.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
      <ul>
        {altRecords.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
    </div>
  );
}

// RenderHooks
export function RenderHookComponent() {
  const [counter, setCounter] = useState();

  return (
    <div>
      <button onClick={() => setCounter((n) => n + 1)}>Click up</button>
      <div>{counter}</div>
    </div>
  );
}

// Prop Drilling
export function ExcessivePropDrilling() {
  const counter = useState(0);
  const [count, setCount] = counter;

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((o) => o + 1)}>Increment</button>

      <Multiplications>
        <p>Multiply count: {count}</p>
        <Operation>
          <button onClick={() => setCount((old) => old * 5)}>
            Multiply by 5
          </button>
        </Operation>
      </Multiplications>
      <Divisions>
        <p>Divide count: {count}</p>
        <Operation>
          <button onClick={() => setCount((old) => old / 5)}>
            Divide by 5
          </button>
        </Operation>
      </Divisions>
    </div>
  );
}

function Operation({ children }) {
  return (
    <>
      <p>Some custom styles and logic for this component</p>
      {children}
    </>
  );
}

function Multiplications({ children }) {
  return <div>{children}</div>;
}

function Divisions({ children }) {
  return <div>{children}</div>;
}
