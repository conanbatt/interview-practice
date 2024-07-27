/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.
  
  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { useEffect } from 'react';

export const ShowButton = ({ buttonText }) => {
  <button>{buttonText}</button>;
};

export function FunctionsAsComponents({ buttonText = 'Start Now' }) {
  return (
    <div>
      <ShowButton buttonText={buttonText} />
    </div>
  );
}

export function objectCopying() {
  const object = { a: { c: 1 }, b: 2 };
  const copy = {
    ...object,
    a: { ...object.a },
  };
  copy['a']['c'] = 2;
  return copy;
}

export function arrayCopying() {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
  const copy = array.map((item) => ({ ...item }));
  return copy;
}

// user abort
export function UseEffect({ fetchURL, label }) {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      await fetch(fetchURL, { signal });
    };

    fetchData();

    // Cleanup function to abort fetch on component unmount or fetchURL change
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
  const [clickedTimes, setClickedTimes] = useState(0); // default state

  const handleClick = () => setClickedTimes(clickedTimes + 1);
  const reminder = clickedTimes % 5;
  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{clickedTimes}</span>
      <span>{reminder}</span>
    </div>
  );
}

export function UseEffectLifeCycle() {
  const [clickedTimes, setClickedTimes] = useState(0);
  // no need of use effect here
  const handleClick = () => setClickedTimes(clickedTimes + 1);

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{clickedTimes}</span>
    </div>
  );
}

export function DirtyUnmount() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(id); //clean it up
  }, []);

  return <div>Clock in seconds: {time}</div>;
}

export function AvoidingUseState() {
  // ref doesn't update the screen, so it if you wanna see Mounted you should use State here.
  const ref = useRef('Unmounted');

  useEffect(() => {
    ref.current = 'Mounted';
  }, []);

  return <div>{ref.current}</div>;
}

async function API() {
  return true;
}

export function UntraceableState() {
  const [result, setResult] = useState(''); // default
  const [loading, setLoading] = useState(false); // useState for loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await API(); // let's not name it the same
      setLoading(false);
      setResult(response);
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
  const calendarDays = [...Array(30).keys()]; // Less prone to error, cleaner
  return (
    <ol>
      {calendarDays.map((val) => (
        <span key={val}>{val}</span>
      ))}
    </ol>
  );
}
const AGE_LIMIT = 18;
export function MagicNumbers(age) {
  // Set a varible instead of hardcoded number;
  const minor = age < AGE_LIMIT;
  return (
    <ol>{minor ? <div>Spicy</div> : <div>You are not old enough</div>}</ol>
  );
}

export function UnidiomaticHTMLStructure() {
  const [name, setName] = useState('');
  const handleSubmit = (e) => {};
  //Fix to a form with a proper onchange
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        name='name'
        type='text'
        onChange={(e) => setName(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export function CrudeStateManagement() {
  const [data, setData] = useState({
    name: '',
    age: '',
    location: '',
    email: '',
    password: '',
  }); // Have data in an object

  const handleSubmit = (e) => {};
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value }); //use a shared function
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={data.name}
        name='name'
        type='text'
        onChange={handleChange}
      />
      <input
        value={data.age}
        name='age'
        type='number'
        onChange={handleChange}
      />
      <input
        value={location}
        name='location'
        type='text'
        onChange={handleChange}
      />
      <input
        value={data.email}
        name='email'
        type='email'
        onChange={handleChange}
      />
      <input
        value={data.password}
        name='password'
        type='password'
        onChange={handleChange}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export function UnidiomaticHTMLHierarchy() {
  const bids = [1, 2, 3];
  const asks = [1, 2, 3];

  return (
    <ul>
      {bids.map((bid, i) => (
        <li key={i}>{bid}</li> //use ul/li
      ))}
      {asks.map((ask, j) => (
        <li key={j + 'asks'}>{ask}</li>
      ))}
    </ul>
  );
}

export function SubstandardDataStructure() {
  const [errors, setErrors] = useState([]);

  const throwError = (id, message) => {
    setErrors((prevErrors) => [...prevErrors, { id, message }]);
  };

  const clearAllErrors = () => {
    setErrors([]);
  };

  return (
    <div>
      <button onClick={() => throwError('errorA', 'Error A occurred')}>
        Throw Error A
      </button>
      <button onClick={() => throwError('errorB', 'Error B occurred')}>
        Throw Error B
      </button>
      <button onClick={() => clearAllErrors()}>Clear Errors</button>
      <div>
        {errors.map((error) => (
          <div key={error.id}>
            {error.id}: {error.message}
          </div>
        ))}
      </div>
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
        <input type='text' />
        <button>Add Person</button>
      </form>
      <ul>
        {people.map((person, index) => (
          <span key={person.name + index}>{person.name}</span> // people could have the same name
        ))}
      </ul>
    </div>
  );
}

async function fetchLeader() {
  return { name: 'Messi' };
}
async function fetchDetails(leader) {
  return { ...leader, country: 'Argentina' };
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
      setLeader(enriched);
    }
    enhanceRecord();
  }, [leader.name]); // only trigger on the leader name change and not country

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
  const memoizedRecords = useMemo(() => records, [records]); // Memoize records to make sure not to re-run callback more than needed

  const handleClick = useCallback(() => {
    trackClick(records);
  }, [memoizedRecords]);

  return (
    <div>
      {records.map((record) => (
        <div id={record.id}>{record.name}</div>
      ))}
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

const validateEmail = (email) => email.includes('@'); // Function outside of the component to not be redefined on render
export function UnnecessaryFunctionRedefinitions(emails) {
  return (
    <div>
      {emails.map((email) => (
        <div key={email}>
          {email} is {validateEmail(email) ? 'Valid' : 'Invalid'}
        </div>
      ))}
    </div>
  );
}

async function fetchRecords() {
  return [{ id: 1, type: 'record' }];
}
async function fetchAlternateRecords() {
  return [{ id: 1, type: 'alt-record' }];
}

export function SerialLoading() {
  const [records, setRecords] = useState([]);
  const [altRecords, setAltRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const [recs, altRecs] = await Promise.all([
        fetchRecords(),
        fetchAlternateRecords(),
      ]); //fetch in parallel
      setRecords(recs);
      setAltRecords(altRecs);
    }
    loadRecords();
  }, []);

  return (
    <div>
      {records.map((rec) => (
        <div key={rec.id}></div>
      ))}
      {altRecords.map((rec) => (
        <div key={rec.id}></div>
      ))}
    </div>
  );
}

async function fetchRecords() {
  return [{ id: 1, type: 'record' }];
}
async function fetchAlternateRecords() {
  return [{ id: 1, type: 'alt-record' }];
}

// Hint: part of the rendering structure is re-rendered frequently unnecessarily
export function UnoptimizableRenderingStructure(altRecords) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const interval = setInterval(async () => {
        const recs = await fetchRecords();
        setRecords(recs);
      }, 5000);

      return () => clearInterval(interval);
    }
    loadRecords();
  }, []);
  // Cache records to be only re-render when each dependency updates
  const Records = useMemo(
    () => (
      <ul>
        {records.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
    ),
    [records],
  );

  const AltRecords = useMemo(
    () => (
      <ul>
        {altRecords.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
    ),
    [altRecords],
  );

  return (
    <div>
      <Records />
      <AltRecords />
    </div>
  );
}
