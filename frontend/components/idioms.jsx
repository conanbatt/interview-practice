/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.
  
  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.
*/

export function Button({ children }) {
  return <button>{children}</button>;
}

export function FunctionsAsComponents({ buttonText = 'Start Now' }) {
  // difining a function that returns jsx creates a stateless functional component that its function is recreated on rerender
  return (
    <div>
      <Button>{buttonText}</Button>
    </div>
  );
}

export function ObjectCopying(object) {
  return structuredClone(object) // creates a deep clone of the object
}

import { useEffect, useState } from 'react';

export function useData(fetchURL) {
  // useeffect on return set is mounted to false to stop state updates
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(fetchURL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        if (isMounted) {
          setData(responseData);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message || 'Failed to fetch data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchURL]);

  return { data, loading, error };
}


export function useEffectDerivedCalculation(object) {
  const [clickedTimes, setClickedTimes] = useState(0) // initialize state with 0
  // sum is not needed
  const handleClick = () => setClickedTimes(clickedTimes + 1)

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>
        {clickedTimes}
      </span>
    </div>
  )
}

export function useEffectLifeCycle(object) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timeoutId =setTimeout(() => setLoaded(true))
    return () => clearInterval(timeoutId) // added clean up function
  }, [])

  const handleClick = () => setClickedTimes(clickedTimes + 1)

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>
        {sum}
      </span>
    </div>
  )
}

// ref.current Unlike state, it is mutable.
// When you change the ref.current property, React does not re-render your component. 
export function avoidingUseState(object) {
  const [status, setStatus] = useState('Unmounted');

  useEffect(() => {
    setStatus('Mounted');
    return () => setStatus('Unmounted');
  }, []);

  return <div>{status}</div>;


async function API() { return true }

export function UntraceableState(object) {
  const [result, setResult] = useState()  
  const [loading, setLoading] = useState(true) // move loading to state
  const cancel = false
  useEffect(async () => {
    try {
      const result = await API(); // wrap async call on try catch
      if(cancel) return
      setResult(result)
    } catch {

    } finally{
      if(cancel) return
      setLoading(false)
    }

    return () => cancel=true
  }, [])

  return (
    <div>
      <span>Loading: {loading}</span>
      Result:{result}
    </div>
  )
}

export function CrudeDeclarations() {
  // const calendarDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  // instead use array
  const calendarDays = Array(30).fill(1).map((_,i)=>i+1)
  return (<ol>
    {calendarDays.map((val) => <span key={val}>{val}</span>)}
  </ol>)
}

const MIN_AGE = 18 // move age to a const
export function MagicNumbers(age) {
  return (<ol>
    { age < MIN_AGE ? <div>Spicy</div> : <div>You are not old enough</div>}
  </ol>)
}

export function unidiomaticHTMLStructure() {
  const [name, setName] = useState("")
  const handleSubmit = (e) => {}

  // move submit to form
  return (<form onSubmit={handleSubmit}>
    <input value={name} name="name" type="text" onChange={setName} />
    <button type="submit">Submit</button>
  </form>)
}

export function CrudeStateManagement() {
  const [formData, setFormData] = useState({
    name='',
    age='',
    location='',
    email='',
    password='',
  })

  const handleSubmit = (e) => {
    const {name, value} = e.target
    setFormData(
      {
        ...formData,
        [name]: value
      }
    )
  }

  return (<form onSubmit={handleSubmit}>
    <input value={name} name="name" type="text" onChange={setName} />
    <input value={age} name="age" type="number" onChange={setAge} />
    <input value={location} name="location" type="text" onChange={setLocation} />
    <input value={email} name="email" type="email" onChange={setEmail} />
    <input value={password} name="password" type="password" onChange={setPassword} />
    <button type="submit">Submit</button>
  </form>)
}

export function UnidiomaticHTMLHierarchy() {
  const bids = [1,2,3]
  const asks = [1,2,3]
  // created a unordered list with list itmes
  return (<ul>
    {bids.map((bid, i) => <li key={i}>{bid}</li>)}
    {asks.map((ask, j) => <li key={j+'asks'}>{ask}</li>)}
  </ul>)
}

export function SubstandardDataStructure() {
  const [errors, setErrors] = useState([]); // added error array

  function addError(newError) {
    setErrors(errors => [...errors, newError]);
  }
  
  function clearErrors() {
    setErrors([]);
  }

  return(
    <div>
      <button onClick={() => addError('Error A')}>Throw Error A</button>
      <button onClick={() => addError('Error B')}>Throw Error B</button>
      <button onClick={clearErrors}>Clear Errors</button>
      <div>
        {error}
      </div>
    </div>
  )
}

export function DangerousIdentifier() {
  const [people, setPeople] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const person = { id: Date.now(), name: e.target.name }; // added id
    setPeople(ppl => [...ppl, ...person])
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button>Add Person</button>
      </form>
      <ul>
        {people.map(person => <span key={person.id}>{person.name}</span>)}
      </ul>
    </div>
  )
}

async function fetchLeader() { return { name: 'Messi' }}
async function fetchDetails(leader) { return { ...leader, country: 'Argentina' }}

// Hint: this only requires a single line change!
export function UnnecessaryEffectTriggering() {
  const [leader, setLeader] = useState({})

  useEffect(() => {
    const interval = setInterval(async () => {
      const leader = await fetchLeader()
      setLeader(leader)
    }, 1000)
    return () => clearInterval(interval) // add clean up function
  }, [])

  // You can't declare async directly in the useEffect function. 
  useEffect(() => {
    async function enhanceRecord() {
      const enriched = await fetchDetails(leader);
      setLeader(enriched);
    }
    enhanceRecord(); // call async function
  }, [leader])

  return(
    <div>
      <div>Leader:{leader.name}</div>
      {leader.country && <div>{`From: ${leader.country}`}</div>}
    </div>
  )
}

async function trackClick(ids) { return ids }

// Hint: same error pattern as above
export function IncorrectDependencies({records}) {
  const handleClick = () => trackClick(records); // we dont need to track records as it will render on every records prop change anyways

  return(
    <div>
      {records.map(record => <div id={record.id}>{record.name}</div>)}
      <button onClick={handleClick}>Click me!</button>
    </div>
  )
}

const validateEmail = (email) => email.includes("@") // move function outside of the component to avoid redefinition
export function UnnecessaryFunctionRedefinitions(emails) {

  return(
    <div>
      {emails.map(email => (
        <div key={email}>
          {email} is {validateEmail(email) ? 'Valid' : 'Invalid'}
        </div>
      ))}
    </div>
  )
}


async function fetchRecords() { return [{id: 1, type: 'record'}]}
async function fetchAlternateRecords() { return [{ id: 1, type: 'alt-record' }]}

export function SerialLoading() {

  const [records, setRecords] = useState([])
  const [altRecords, setAltRecords] = useState([])
  
  useEffect(() => {
    async function loadRecords() {
      // added Promise.all() to fetch concurrently
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
        <div key={rec.id}>{rec.type}</div>
      ))}
      {altRecords.map((rec) => (
        <div key={rec.id}>{rec.type}</div>
      ))}
    </div>
  );
}

async function fetchRecords() {
  return [{ id: 3, type: "record" }];
}
async function fetchAlternateRecords() {
  return [{ id: 2, type: "alt-record" }];
}

// Hint: part of the rendering structure is re-rendered frequently unnecessarily
export default function UnoptimizableRenderingStructure({ altRecords }) {
  const [records, setRecords] = useState([]);
  let cancel = false;
  useEffect(() => {
    let interval;
    async function loadRecords() {
      interval = setInterval(async () => {
        const recs = await fetchRecords();
        if (!cancel) setRecords(recs);
      }, 5000);
    }
    loadRecords();
    return () => {
      cancel = true; // cancel on clean up
      clearInterval(interval); // clean up interval
    };
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
