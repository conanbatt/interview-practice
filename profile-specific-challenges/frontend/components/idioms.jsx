/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.

  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { useEffect } from "react";

export function FunctionsAsComponents({ buttonText = "Start Now" }) {
  return <button>{buttonText}</button>;
}

// shallow copy
export function objectCopying() {
  const object = { a: { c: 1 }, b: 2 };
  // What is this supposed to do? Not returning the changed object
  const copy = { ...object };
  copy.a.c = 2;
  return {
    ...object,
    a: {
      ...object.a,
      c: 2,
    },
  };
}

export function arrayCopying() {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
  return [...array];
}

function useFetch(url) {
  const [response, setResponse] = useState({});
  useEffect(() => {
    setResponse({ isLoading: true });
    const fetchData = async () => {
      try {
        const data = await fetch(url).then((blob) => blob.json());
        setResponse({ isLoading: false, data });
      } catch (error) {
        setResponse({ error, isLoading: false });
      }
    };

    fetchData();
  }, [url]);

  return response;
}

// user abort
export function UseEffect({ fetchURL, label }) {
  const { isLoading, data, error } = useFetch(fetchURL);

  // do something with this.
  return (
    <div>
      <button>{label}</button>
    </div>
  );
}

export function UseEffectDerivedCalculation() {
  const [clickedTimes, setClickedTimes] = useState();

  const handleClick = () => setClickedTimes(clickedTimes + 1);

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      {/* <span>
         {sum} variable does not exist, remove
       </span>*/}
      <span>{clickedTimes % 5}</span>
    </div>
  );
}

export function UseEffectLifeCycle() {
  const [loaded, setLoaded] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <span>{loaded ? "Loading..." : "Loaded"}</span>
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

// wont return to "Unmounted" state unless done manually in the use effect
export function AvoidingUseState() {
  const ref = useRef("Unmounted");

  useEffect(() => {
    ref.current = "Mounted";
  }, []);

  return <div>{ref.current}</div>;
}

async function API() {
  return true;
}

// Similar to the useFetch hook, the loading var needs to be in react state to trigger re-render
export function UntraceableState() {
  const [result, setResult] = useState();
  let loading = false;

  useEffect(() => {
    const fetchData = async () => {
      loading = true;
      const result = await API();
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

// const calendarDays = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
//   23, 24, 25, 26, 27, 28, 29, 30,
// ];
// const calendarDays = new Array(30).map((_, i) =>  i + 1)
const d = new Date();
const calendarDays = new Date(
  d.getUTCFullYear(),
  d.getUTCMonth() + 1,
  0,
).getUTCDate(); // get current month days
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
    <ol>
      {age < MIN_AGE ? <div>Spicy</div> : <div>You are not old enough</div>}
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
      <button type="submit">Submit</button>
    </form>
  );
}

export function CrudeStateManagement() {
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    location: "",
    email: "",
    password: "",
  });

  function handleFormValueChange(e) {
    setFormState({
      ...formState,
      [this.name]: this.value,
    });
  }

  const handleSubmit = (e) => {};
  const { name, age, location, email, password } = formState;

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        name="name"
        type="text"
        onChange={handleFormValueChange}
      />
      <input
        value={age}
        name="age"
        type="number"
        onChange={handleFormValueChange}
      />
      <input
        value={location}
        name="location"
        type="text"
        onChange={handleFormValueChange}
      />
      <input
        value={email}
        name="email"
        type="email"
        onChange={handleFormValueChange}
      />
      <input
        value={password}
        name="password"
        type="password"
        onChange={handleFormValueChange}
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
        <span key={i}>{bid}</span>
      ))}
      {asks.map((ask, j) => (
        <span key={j + "asks"}>{ask}</span>
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
    const data = new FormData(e.currentTarget);
    const person = data.get("person");
    setPeople((ppl) => [...ppl, ...person]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="person" />
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
    const getLeader = async () => {
      const leader = await fetchLeader().then((l) => fetchDetails(l));
      setLeader(leader);
    };
  }, []);

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
  const handleClick = () => {
    trackClick(records);
  };

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
  return (
    <div>
      {emails.map((email) => (
        <div key={email}>
          {email} is {email.includes("@") ? "Valid" : "Invalid"}
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

  useEffect(() => {
    async function loadRecords() {
      const [recs, altRecs] = await Promise.all([
        fetchRecords(),
        fetchAlternateRecords(),
      ]);
      setRecords([...recs, ...altRecs]);
    }
    loadRecords();
  }, []);

  return (
    <div>
      {records.map((rec) => (
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
      const recs = await fetchRecords();
      setRecords(recs);
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
