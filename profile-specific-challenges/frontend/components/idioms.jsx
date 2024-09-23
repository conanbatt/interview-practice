/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.

  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { useCallback, useEffect } from "react";

// This was missing a return but that showButton could be abstracted out.
export function FunctionsAsComponents({ buttonText = "Start Now" }) {
  const showButton = () => {
    return <button>{buttonText}</button>;
  };

  return <div>{showButton()}</div>;
}

export function objectShallowCopying() {
  const object = { a: { c: 1 }, b: 2 };
  const copy = JSON.parse(JSON.stringify(object));
  copy.a.c = 2;
  return { ...object };
}

export function arrayShallowCopying() {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
  const copy = JSON.parse(JSON.stringify(array));
  return copy;
}

// fetchURL changes forces a new fetch. And the main problem with this one
// is mostly likely to be caused by parent behavior/changes.
// Maybe using a ref to compare values instead
export function UseEffectThrashing({ fetchURL, label }) {
  const prevValue = useRef(fetchURL);
  useEffect(() => {
    // If previous value is same as fetchURL, then do nothing.
    if (prevValue.current === fetchURL) return;

    const fetchData = async () => {
      await fetch(fetchURL);
      prevValue.current = fetchURL;
    };

    fetchData();
  }, [fetchURL]);

  return (
    <div>
      <button>{label}</button>
    </div>
  );
}

export function UseEffectDerivedCalculation() {
  const [remainder, setReminder] = useState();
  const [clickedTimes, setClickedTimes] = useState(0);

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
  const [remainder, setReminder] = useState(0);
  const [clickedTimes, setClickedTimes] = useState(0);

  const handleClick = () => {
    // State updates don't occur inmmediately
    setClickedTimes(clickedTimes + 1);
    setReminder((clickedTimes + 1) % 5);
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

const calendarDays = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

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

// hmmm
export function MagicNumbers(age) {
  return (
    <ol>{age >= 18 ? <li>Spicy</li> : <li>You are not old enough</li>}</ol>
  );
}

export function UnidiomaticHTMLStructure() {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {};

  return (
    <div>
      <input
        value={name}
        name="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
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
      <input
        value={name}
        name="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={age}
        name="age"
        type="number"
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        value={location}
        name="location"
        type="text"
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        value={email}
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export function UnidiomaticHTMLHierarchy() {
  const bids = [1, 2, 3];
  const asks = [1, 2, 3];

  return (
    <div>
      {bids.map((bid, i) => (
        <span key={i}>{bid}</span>
      ))}
      {asks.map((ask, j) => (
        <span key={j + "asks"}>{ask}</span>
      ))}
    </div>
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

export function UnnecessaryFunctionRedefinitions(emails) {
  const validateEmail = useCallback((email) => email.includes("@"), []); // adding a callback avoid redefinitions

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
const CounterContext = createContext(5);

function Child3() {
  <div>{counter}</div>;
}
function Child2() {
  <Child3 />;
}
function Child() {
  <Child2 />;
}
// There are many alternative ways to solve this,
// but for this case using ContextAPI is enough
function ExcessivePropDrilling() {
  return (
    <CounterContext.Provider>
      <Child />
    </CounterContext.Provider>
  );
}
