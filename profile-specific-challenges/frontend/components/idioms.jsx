/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.
  
  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { useEffect } from 'react'

// I remove the function and set the button directly in the return to avoid re render.
export function FunctionsAsComponents({ buttonText = 'Start Now' }) {
  return (<div>
    <button>
      {buttonText}
    </button>
  </div>)
}

// I added the parameter object to make this function dinamically and also make a copy of the object.
export function objectCopying(object) {
  return Object.assign({}, object);
}
// I added the parameter array to make this function dinamically and also make a copy of the array.
export function arrayCopying(array) {
  return Array.from(array);
}


export function UseEffect({
  fetchURL,
  label,
}) {
  const fetchData = useCallback(async () => {
    await fetch(fetchURL);
  }, [fetchURL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <button>{label}</button>
    </div>
  );
}

// I remove unnecessary code and avoid use of useState and useEffects.
export function UseEffectDerivedCalculation() {
  const [clickedTimes, setClickedTimes] = useState();
  const handleClick = () => setClickedTimes(clickedTimes + 1)

  const reminder = clickedTimes % 5;
  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>
        {sum}
      </span>
      <span>
        {reminder}
      </span>
    </div>
  )
}

// I remove unnecessary code and improve the use of lifecycle.
export function UseEffectLifeCycle() {
  const [clickedTimes, setClickedTimes] = useState(0);

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

// I add the clearInterval to kill the interval process once the component is unmounted.
export function DirtyUnmount() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)

  return () => clearInterval(intervalId);
  }, [])

  return (
    <div>
      Clock in seconds: {time}
    </div>
  )
}

// I refactor the code to use useState and show the Mounted string only when it's mounted.
export function AvoidingUseState() {
  const [value, setValue] = useState('Unmounted');

  useEffect(() => {
    setValue("Mounted")
  }, [])

  return (
    <div>
      {value}
    </div>
  )
}

async function API() { return true }

// I added the loading as react state and not as a common javascript variable, when we use common variables in the react state could cause issues.
export function UntraceableState() {
  const [result, setResult] = useState()  
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

// I added a more dynamic way to create an array.
export function CrudeDeclarations() {
  const calendarDays = Array(30).fill(0).map((_, i) => i + 1);
  return (<ol>
    {calendarDays.map((val) => <span key={val}>{val}</span>)}
  </ol>)
}

// I move the compare value outside the function and also move the conditional value outside the return.
const AGE_LIMIT = 18;
export function MagicNumbers(age) {
  const isLessThanAge = age < AGE_LIMIT;
  return (<ol>
    {isLessThanAge ? <div>Spicy</div> : <div>You are not old enough</div>}
  </ol>)
}

//  I wrap the code in a form to have a better semantics in html.
export function UnidiomaticHTMLStructure() {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (<form  onSubmit={handleSubmit} >
    <input value={name} id="name" name="name" type="text" onChange={(event) => setName(event.target.value)} />
    <button type="submit" />
  </form>)
}

// I refactor the code to only use one state related with the form and make the component more easy to understand.
export function CrudeStateManagement() {
  const [fields, setFields] = useState({})
  const handleSubmit = (e) => {};

  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFields({...fields, [name]: value });
  }

  return (<form onSubmit={handleSubmit}>
    <input value={fields?.name} name="name" type="text" onChange={onChangeField} />
    <input value={fields?.age} name="age" type="number" onChange={onChangeField} />
    <input value={fields?.location} name="location" type="text" onChange={onChangeField} />
    <input value={fields?.email} name="email" type="email" onChange={onChangeField} />
    <input value={fields?.password} name="password" type="password" onChange={onChangeField} />
    <button type="submit">Submit</button>
  </form>);
}

// I wrap the list in a ul/li structure to have a better semantics in the list and also concat the lists to iterate over the unique list and avoid key issues.
export function UnidiomaticHTMLHierarchy() {
  const bids = [1,2,3]
  const asks = [1,2,3]

  const list = bids.concat(asks);
  return (<ul>
    {list.map((item, i) => <li><span key={i}>{item}</span></li>)}
  </ul>)
}

//
export function SubstandardDataStructure() {
  const [errors, setErrors] = useState([])

  return(
    <div>
      <button onClick={() => setErrors(prev => [...prev, 'Error A'])}>Throw Error A</button>
      <button onClick={() => setErrors(prev => [...prev, 'Error B'])}>Throw Error B</button>
      <button onClick={() => setErrors([])}>Clear Errors</button>
      <div>
        {errors.map(error => <p>{error}</p>)}
      </div>
    </div>
  )
}

// I mainly add the right identifier to list of li to avoid issues with re render.
export function DangerousIdentifier() {
  const [people, setPeople] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setPeople(ppl => [...ppl, formData.get('name')])
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Add Person</button>
      </form>
      <ul>
        {people.map((person, i) => <li key={`${person.name}-${i}`}>{person.name}</li>)}
      </ul>
    </div>
  )
}

async function fetchLeader() { return { name: 'Messi' }}
async function fetchDetails(leader) { return { ...leader, country: 'Argentina' }}

// I add the condition to only call enhanceRecord once we have the leader information.
export function UnnecessaryEffectTriggering() {
  const [leader, setLeader] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const leader = await fetchLeader()
      setLeader(leader);
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function enhanceRecord() {
      const enriched = await fetchDetails(leader);
      setLeader(enriched);
    }
    if (Object.keys(leader) > 0) {
      enhanceRecord();
    }
  }, [leader]); 


  return(
    <div>
      <div>Leader:{leader.name}</div>
      {leader.country && <div>{`From: ${leader.country}`}</div>}
    </div>
  )
}

async function trackClick(ids) { return ids }

// I add the key over li, to avoid issues with the re render of list.
export function IncorrectDependencies(records) {
  const handleClick = useCallback(() => {
    trackClick(records);
  }, [records]);

  return(
    <div>
      {records.map(record => <div key={record.id} id={record.id}>{record.name}</div>)}
      <button onClick={handleClick}>Click me!</button>
    </div>
  )
}

// I set outside of function component the function isValidEmail to avoid re defined in the render.
const isValidEmail = (email) => email.includes("@");

export function UnnecessaryFunctionRedefinitions(emails) {
  return(
    <div>
      {emails.map(email => (
        <div key={email}>
          {email} is {isValidEmail(email) ? 'Valid' : 'Invalid'}
        </div>
      ))}
    </div>
  )
}

// I set the requests in parallel to not wait for loading in a serial way and has the response more fast, 
// also I concat the records to use the same list and not modify the state two times.
async function fetchRecords() { return [{id: 1, type: 'record'}]}
async function fetchAlternateRecords() { return [{ id: 1, type: 'alt-record' }]}

export function SerialLoading() {

  const [records, setRecords] = useState([])
  
  useEffect(() => {
    async function loadRecords() {
      const [recs, altRecs] = await Promise.all(
        [
        fetchRecords(),
        fetchAlternateRecords(),
      ]
      );
      setRecords(recs.concat(altRecs));

    }

    loadRecords();
  }, []);

  return(
    <div>
      {records.map(rec => <div key={rec.id}></div>)}
    </div>
  )
}

async function fetchRecords() { return [{id: 1, type: 'record'}]}
async function fetchAlternateRecords() { return [{ id: 1, type: 'alt-record' }]}

// I movethe async call and effects to other component to not re render the entire component and only re render what will be updated.
export function UnoptimizableRenderingStructure(altRecords) {

  return(
    <div>
      <AsyncRecords />
      <ul>
        {altRecords.map(rec => <li key={rec.id}>{rec.id}</li>)}
      </ul>
    </div>
  )
}

function AsyncRecords() {
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

  return <ul>{records.map(rec => <li key={rec.id}>{rec.id}</li>)} </ul>
}