/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.
  
  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { useEffect, useMemo } from 'react'

const Button = ({children}) => <button>{children}</button>

export function FunctionsAsComponents({ buttonText = 'Start Now' }) {
  // moving the button to it's own component will prevent the function from recreating it on every render
  return (<div>
    <Button>{buttonText}</Button>
  </div>)
}

// the issue here is the shallow copy of the spread operator.
// you can either use a library like lodash or the classical JSON.parse(JSON.stringify(...))
// the JSON API solution won't work for non-serializable attributes
export function objectCopying() {
  const object = { a: { c: 1 }, b: 2 }
  const copy = { ...object }
  copy.a.c = 2
  return { ...object }
}

// same as above, objects in both arrays share the same memory address respectively due to the shallow copy
export function arrayCopying() {
  const array = [{ a: 1}, {a: 2}, {a: 3}]
  const copy = [...array]
  return copy;
}

// user abort
export function UseEffect({ fetchURL, label }) {
  useEffect(() => {
    const abortController = new AbortController();
    // the request can be aborted on unmount
    const fetchData = async () => {
      await fetch(fetchURL, {signal: abortController.signal});
    };
    
    fetchData();
    return () => {
      abortController.abort();
    }
  }, [fetchURL]);

  return (
    <div>
      <button>{label}</button>
    </div>
  );
}

export function UseEffectDerivedCalculation() {
  const [clickedTimes, setClickedTimes] = useState()

  // memoizing this might be an overkill.
  // the useEffect will trigger the reconciliation algorithm twice, one after setting the clickedItems state
  // and one after setting the remainder state.
  // we saved some commits with this derived state
  const remainder = useMemo(() => clickedTimes % 5, [clickedTimes]);

  const handleClick = () => setClickedTimes(clickedTimes + 1)

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>
        {sum}
      </span>
      <span>
        {remainder}
      </span>
    </div>
  )
}

// not sure what's going on with this example 😛
export function UseEffectLifeCycle() {
  const [_loaded, setLoaded] = useState()

  useEffect(() => {
    setTimeout(() => setLoaded(true), 1000)
  }, [])

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

// this interval needs to get cleared as you might end up updating the state of an unmounted component
export function DirtyUnmount() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1)
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div>
      Clock in seconds: {time}
    </div>
  )
}
// triggers for the reconciliation algorithm are mainly: state changes or prop changes
// this is not achievable as a change in a ref won't make the component re-render, hence not updating the UI
export function AvoidingUseState() {
  const ref = useRef('Unmounted');

  useEffect(() => {
    ref.current = "Mounted"
  }, [])

  return (
    <div>
      {ref.current}
    </div>
  )
}

async function API() { return true }
// the loading can either: be a derived state or be a state on it's own
export function UntraceableState() {
  const [result, setResult] = useState(null)  
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
      <span>Loading: {loading}</span>
      Result:{result}
    </div>
  )
}
// any object has to be outside the component's declaration as it will be recreated on every render
// if the object is compound of any state or props we would need to go in the memoization path
const calendarDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
export function CrudeDeclarations() {
  return (<ol>
    {/*also, keep the html semantic for a11y*/}
    {calendarDays.map((val) => <li key={val}>{val}</li>)}
  </ol>)
}

const LEGAL_AGE = 18;
const isUnderage = (age) => age < LEGAL_AGE;
// improves code readability 
export function MagicNumbers(age) {
  return (<ol>
    { !isUnderage(age) ? <div>Spicy</div> : <div>You are not old enough</div>}
  </ol>)
}

// adds semantic HTML tags that improves a11y and takes advantage of native component's APIs
export function UnidiomaticHTMLStructure() {
  const [name, setName] = useState("")
  const handleSubmit = (e) => {}

  return (<form onSubmit={handleSubmit}>
    <input value={name} name="name" type="text" onChange={(e) => setName(e.target.value)} />
    <button type="submit" onClick={handleSubmit}>Submit</button>
  </form>)
}

export function CrudeStateManagement() {
  // here we can have all fields in a single state
  const [formData, setFormData] = useState({
    name: '', 
    age: '', 
    location: '',
    email: '',
    password: '',
  })
  const handleSubmit = (e) => {}

  // create a single onChange handler
  const onChange = (e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))

  return (<form onSubmit={handleSubmit}>
    <input value={formData.name} name="name" type="text" onChange={onChange} />
    <input value={formData.age} name="age" type="number" onChange={onChange} />
    <input value={formData.location} name="location" type="text" onChange={onChange} />
    <input value={formData.email} name="email" type="email" onChange={onChange} />
    <input value={formData.password} name="password" type="password" onChange={onChange} />
    <button type="submit">Submit</button>
  </form>)
}

const bids = [1,2,3]
const asks = [1,2,3]
export function UnidiomaticHTMLHierarchy() {
  // we should be careful using array indexes as keys
  return (
  <>
    <ul>
      {bids.map((bid, i) => <li key={i}>{bid}</li>)}
      {asks.map((ask, j) => <li key={j+'asks'}>{ask}</li>)}
    </ul>
  </>
  )
}

// I guess this is what the example is looking for
export function SubstandardDataStructure() {
  const [error, setError] = useState([])

  return(
    <div>
      <button onClick={() => setError(prev => ([...prev, 'Error A']))}>Throw Error A</button>
      <button onClick={() => setError(prev => ([...prev, 'Error B']))}>Throw Error B</button>
      <button onClick={() => setError([])}>Clear Errors</button>
      <div>
        {error.map((err, i)=> <li key={i}>{err}</li>)}
      </div>
    </div>
  )
}

// apart from handling the FormData wrong (I don't think this was intentional)
// the key for each list item must be unique. Names are not unique
export function DangerousIdentifier() {
  const [people, setPeople] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const person = new FormData(e.target);
    setPeople(ppl => ([...ppl, ...person]))
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button>Add Person</button>
      </form>
      <ul>
        {people.map(person => <li key={person.name}>{person.name}</li>)}
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
      // next line is returning a new object every time,
      const leader = await fetchLeader()
      setLeader(prev => leader.name !== prev.name ? leader : prev)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function enhanceRecord() {
      const enriched = await fetchDetails(leader);
      setLeader(enriched);
    }
    enhanceRecord();
  }, [leader]); 


  return(
    <div>
      <div>Leader:{leader.name}</div>
      {leader.country && <div>{`From: ${leader.country}`}</div>} {/* this will be inconsistent for a few secs, there should be a loading state */}
    </div>
  )
}

async function trackClick(ids) { return ids }

// Hint: same error pattern as above
// LGTM
export function IncorrectDependencies({records}) {
  const handleClick = useCallback(() => {
    trackClick(records);
  }, [records]);

  return(
    <div>
      {records.map(record => <div key={record.id}>{record.name}</div>)}
      <button onClick={handleClick}>Click me!</button>
    </div>
  )
}
// avoid redefining the fn in every render
const validateEmail = (email) => email.includes("@")
export function UnnecessaryFunctionRedefinitions({emails}) {

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
      // parallelize 
      const [rec, alternateRec] = await Promise.all([fetchRecords(), fetchAlternateRecords()]);
      setRecords(rec);
      setAltRecords(alternateRec);
    }
    loadRecords();
  }, []);

  return(
    <div>
      {records.map(rec => <div key={rec.id}></div>)}
      {altRecords.map(rec => <div key={rec.id}></div>)}
    </div>
  )
}

async function fetchRecords() { return [{id: 1, type: 'record'}]}
async function fetchAlternateRecords() { return [{ id: 1, type: 'alt-record' }]}

// Hint: part of the rendering structure is re-rendered frequently unnecessarily
export function UnoptimizableRenderingStructure(altRecords) {
  const [records, setRecords] = useState([])
  
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

  // you can either do this or use the React.memo HOC by creating another component
  const memoizedAltRecords = useMemo(() => (
    <ul>
      {altRecords.map(rec => <li key={rec.id}>{rec.id}</li>)}
    </ul>
  ), [altRecords]);

  return(
    <div>
      <ul>
        {records.map(rec => <li key={rec.id}>{rec.id}</li>)}
      </ul>
      {memoizedAltRecords}
    </div>
  )
}
