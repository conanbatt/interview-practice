/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.

  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { useCallback, useContext, useEffect } from "react";

const Button = ({ buttonText }) => {
  return <button>{buttonText}</button>;
};

export function FunctionsAsComponents({ buttonText = "Start Now" }) {
  return (
    <div>
      <Button buttonText={buttonText} />
    </div>
  );
}

export function objectShallowCopying() {
  const object = { a: { c: 1 }, b: 2 };
  const copy = structuredClone(object);
  copy.a.c = 2;
  return { ...object };
}

export function arrayShallowCopying() {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
  const copy = structuredClone(array);
  return copy;
}

// fetchURL changes forces a new fetch. And the main problem with this one
// is mostly likely to be caused by parent behavior/changes.
// Maybe using a ref to compare values instead
export function UseEffectThrashing({ fetchURL, label }) {
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      await fetch(fetchURL, { signal: controller.signal });
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [fetchURL]);

  return (
    <div>
      <button>{label}</button>
    </div>
  );
}

export function UseEffectDerivedCalculation() {
  const [clickedTimes, setClickedTimes] = useState(0);

  const handleClick = () => setClickedTimes(clickedTimes + 1);

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{clickedTimes}</span>
      <span>{clickedTimes % 5}</span>
    </div>
  );
}

export function UseStateDerivedCalculation() {
  const [clickedTimes, setClickedTimes] = useState(0);

  const handleClick = () => {
    setClickedTimes(clickedTimes + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{clickedTimes}</span>
      <span>{clickedTimes % 5}</span>
    </div>
  );
}

export function DirtyUnmount() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const int = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, []);

  return <div>Clock in seconds: {time}</div>;
}

export function AvoidingUseState() {
  const [mounted, setMounted] = useState("Unmounted");

  useEffect(() => {
    setMounted("Mounted");
    return () => {
      setMounted("Unmounted");
    };
  }, []);

  return <div>{mounted}</div>;
}

async function API() {
  return true;
}

export function UnrenderableState() {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await API();
      setLoading(false);
      setResult(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <span>Loading...</span>}
      {result && <>Result: {result}</>}
    </div>
  );
}

// I think this is what you meant by elegant declaration (or something similar)
const calendarDays = Array(30)
  .fill(0)
  .map((_, index) => i + 1);

// I'm assuming the issue is the cause of re-declarations of the calendar days array.
export function CrudeDeclarations() {
  return (
    <ol>
      {calendarDays.map((val) => (
        <span key={val}>{val}</span>
      ))}
    </ol>
  );
}

const MIN_AGE = 18;
export function MagicNumbers(age) {
  return (
    <ol>{age >= MIN_AGE ? <li>Spicy</li> : <li>You are not old enough</li>}</ol>
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
      <button type="submit">Submit</button>
    </form>
  );
}

export function CrudeStateManagement() {
  const [formState, setFormState] = useState({});

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {};

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formState.name}
        name="name"
        type="text"
        onChange={handleChange}
      />
      <input
        value={formState.age}
        name="age"
        type="number"
        onChange={handleChange}
      />
      <input
        value={formState.location}
        name="location"
        type="text"
        onChange={handleChange}
      />
      <input
        value={formState.email}
        name="email"
        type="email"
        onChange={handleChange}
      />
      <input
        value={formState.password}
        name="password"
        type="password"
        onChange={handleChange}
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

  return (
    <div>
      <button onClick={() => setErrors([...errors, "Error A"])}>
        Throw Error A
      </button>
      <button onClick={() => setErrors([...errors, "Error B"])}>
        Throw Error B
      </button>
      <button onClick={() => setErrors([])}>Clear Errors</button>
      <div>
        <ul>
          {errors.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function DangerousIdentifier() {
  const [people, setPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setPeople((ppl) => [...ppl, { name: formData.get("name") }]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" />
        <button>Add Person</button>
      </form>
      <ul>
        {people.map((person, id) => (
          <span key={`${id}-${person.name}`}>{person.name}</span>
        ))}
      </ul>
    </div>
  );
}

async function fetchLeader() {
  return { name: "Messi" };
}
async function fetchDetails(leader) {
  return { ...leader, country: "Argentina" };
}

// Hint: this only requires a single line change!
export function UnnecessaryEffectTriggering() {
  const [leader, setLeader] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const leader = await fetchLeader();
      setLeader(leader);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function enhanceRecord() {
      const enriched = await fetchDetails(leader);
      // Not sure if this check if what is required or also another comparison on the first useEffect
      if (JSON.stringify(enriched) !== JSON.stringify(leader)) {
        setLeader(enriched);
      }
    }
    enhanceRecord();
  }, [leader]); // My second attempt was to JSON.stringify the dependency

  return (
    <div>
      <div>Leader:{leader.name}</div>
      {leader.country && <div>{`From: ${leader.country}`}</div>}
    </div>
  );
}

async function trackClick(ids) {
  return ids;
}

// Hint: same error pattern as above
export function IncorrectDependencies(records) {
  const handleClick = useCallback(() => {
    trackClick(records);
  }, [JSON.stringify(records)]); // I wonder if this is what's needed here and above.

  return (
    <div>
      {records.map((record) => (
        <div id={record.id}>{record.name}</div>
      ))}
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

const validateEmail = (email) => email.includes("@");

export function UnnecessaryFunctionRedefinitions(emails) {
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

async function fetchRecords() {
  return [{ id: 1, type: "record" }];
}
async function fetchAlternateRecords() {
  return [{ id: 1, type: "alt-record" }];
}

export function SerialLoading() {
  const [records, setRecords] = useState([]);
  const [altRecords, setAltRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const [recs, altRecs] = await Promise.all([
        fetchRecords(),
        fetchAlternateRecords(),
      ]);
      setRecords(recs);
      setAltRecords(altRecs);
    }
    loadRecords();
  }, []);

  return (
    <div>
      {records.map((rec) => (
        <div key={rec.id}></div> // Also this doesn't renders nothing, but I guess its the parallel fetching behavior whats required here.
      ))}
      {altRecords.map((rec) => (
        <div key={rec.id}></div>
      ))}
    </div>
  );
}

async function fetchRecords() {
  return [{ id: 1, type: "record" }];
}
async function fetchAlternateRecords() {
  return [{ id: 1, type: "alt-record" }];
}

// Hint: part of the rendering structure is re-rendered frequently unnecessarily
export function UnoptimizableRenderingStructure(altRecords) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const interval = setInterval(async () => {
        const recs = await fetchRecords();
        // Same as above
        if (JSON.stringify(recs) !== JSON.stringify(records)) {
          setRecords(recs);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
    loadRecords();
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

// hooks shouldn't return JSX, this can lead to confussion
// hooks are used to abstract logic.
// this needs to be a component
function useRenderHook(number) {
  return <div>{number}</div>;
}

const NumberCount = ({ number }) => {
  return <div>{number}</div>;
};

export function RenderHookComponent() {
  const [counter, setCounter] = useState();

  return (
    <div>
      <button onClick={() => setCounter((n) => n + 1)}>Click up</button>
      <NumberCount number={count} />
    </div>
  );
}

// Prop Drilling

// There are many alternative ways to solve this,
// but for this case using ContextAPI is enough
const CounterContext = createContext();

function Child3() {
  const counter = useContext(CounterContext);
  return <div>{counter}</div>;
}
function Child2() {
  return <Child3 />;
}
function Child() {
  return <Child2 />;
}
// There are many alternative ways to solve this,
// but for this case using ContextAPI is enough
function ExcessivePropDrilling() {
  return (
    <CounterContext.Provider value={5}>
      <Child />
    </CounterContext.Provider>
  );
}
