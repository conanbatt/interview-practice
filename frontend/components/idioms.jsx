/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.
  
  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { useEffect, useState } from 'react'

/*
start: 16:27
end: 16:33

what was the issue: by creating a function that returns JSX elements (React.createElement from behind), we're re-creating 
that element in each FunctionsAsComponents render, not leveraging the core feature of react which is Components. 
React re-renders components when their props change (and also in other ways with hooks).

improvement: I made the button a separate component and passed `buttonText` by prop. in this case I passed it as 
child to mantain the html button api. The text could have also been passed as a `text` prop
*/


export function FunctionsAsComponents({ buttonText = 'Start Now' }) {
  return <Button>{buttonText}</Button>
}

function Button({children}) {
  return ( 
    <button>
      {children}
    </button>
  )
}

/*
start: 16:33
end: 16:37

what was the issue: by using the spread operator inside an object, we get a one level copy. For deeper levels, we have the
reference (or pointer) to the same value.

improvement: copy object by serialization. note that this method only works for serializable, which are not all Javascript objects.
*/
export function objectCopying() {
  const object = { a: { c: 1 }, b: 2 }
  const copy = JSON.parse(JSON.stringify(object))
  copy.a.c = 2
  return { ...object }
}

/*
start: 16:38
end: 16:41

what was the issue: using the spread operator inside an array, we get a one level copy. For deeper levels, we have the
reference (or pointer) to the same value.

improvement: we could use the same method as above, but if all objects will only be one level deep, we could use the spread
operator to make a copy of its properties. For any depth, use the serialization method.
*/
export function arrayCopying() {
  const array = [{ a: 1}, {a: 2}, {a: 3}]
  const copy = [...array.map(obj => ({...obj}))]
  return copy;
}

/*
start: 16:43
end: 16:51

what was the issue: declaring fetchData inside useEffect callback.

improvement: what I'd change is moving the fetch logic out of the useEffect callback, add adding fetchData to useEffect
dependency array
*/
// user abort
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

/*
start: 16:51
end: 17:01

what was the issue: 
  1. `sum` is not declared anywhere
  2. when setting clickedTimes we're passing a value. This is a bad practice, because we depend on how this increase function is
    called. For example, if called multiple times only once the value will be increased.
  3. when calculating `remainder`, we're using an effect, which is not necessary and adds complexity to the code and open the
    possibility for unnecesary bugs.

improvement: 
  1. changed `sum` to `clickedTimes`
  2. pass an 'increase' callback to `setClickedTimes` to get the desired result (increase by one on each call)
  3. delete useEffect call, and calculate the remainder in each component render, if it was a more costly calculation,
    it could be memoized by wrapping it in a `useMemo` call.

*/
export function UseEffectDerivedCalculation() {
  const [clickedTimes, setClickedTimes] = useState()

  const handleClick = () => setClickedTimes((prev) => prev + 1)

  const remainder = clickedTimes % 5

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>
        {clickedTimes}
      </span>
      <span>
        {remainder}
      </span>
    </div>
  )
}

/*
start: 17:01
end: 17:08

what was the issue: 
1. (same as above) when setting clickedTimes we're passing a value. This is a bad practice, because we depend 
  on how this increase function is called. For example, if called multiple times only once the value will be increased.
2. `clickedTimes` and `setClickedTimes`. We're not calling useState.
3. we're not clearing the timeout. 

improvement: 
  1. (same as above) pass an 'increase' callback to `setClickedTimes` to get the desired result (increase by one on each call)
  2. add useState call to add state variables
  3. clear timeout on component unmount by adding a return of clearTimeout to useEffect callback parameter

*/
export function UseEffectLifeCycle() {
  const [_loaded, setLoaded] = useState();
  const [clickedTimes, setClickedTimes] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timeout)
  }, []);

  const handleClick = () => setClickedTimes((prev) => prev + 1);

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{clickedTimes}</span>
    </div>
  );
}

/*
start: 17:26
end: 17:27

what was the issue: same as above, not clearing the timeout

improvement: clear the timeout in the same way as above.

*/
export function DirtyUnmount() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      Clock in seconds: {time}
    </div>
  )
}

/*
start: 17:28
end: 17:30

what was the issue: the component will not re-render when the ref is changed

improvement: use useState

*/
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

/*
start: 17:30
end: 17:32

what was the issue:  by mutating `loading`, there will not be any visible changes. In each render `loading` will be re-initialized
  to `false`, so it's completely useless

improvement: use useState to create a state variable to keep track of `loading` state

*/

async function API() { return true }

export function UntraceableState() {
  const [result, setResult] = useState()  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await API();
      setLoading(false)
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

/*
start: 17:33
end: 17:37

what was the issue: 
  1. there is no need to explicitly declare each value of `calendrDays` if they are consecutive
  2. we're using an ordered list <ol> tag, but with no <li> inside

improvement: 
  1. use the Array class to initialize an empty 30 element array and then fill it with each index + 1 (arrays have 0 index)
  2. replace span with <li>

*/

const DAYS_IN_A_MONTH = 30

export function CrudeDeclarations() {
  const calendarDays = new Array(DAYS_IN_A_MONTH).fill(0).map(_, index => index + 1)
  return (<ol>
    {calendarDays.map((val) => <li key={val}>{val}</li>)}
  </ol>)
}

/*
start: 17:37
end: 17:43

what was the issue: 
  1. it doesn't make a lot of sense to have an <ol> element without <li> inside. Even more only having one element
  2. 18 is a magic number, we don't have any context of why that value was chosen.

improvement: 
  1. change the ol tag to div, because we're not represeting a list here.
  2. move 18 to constant to make it clear in the code where the number comes from


*/
const AGE_OF_MAJORITY  = 18

export function MagicNumbers(age) {
  return (<div>
    { age < AGE_OF_MAJORITY ? <div>Spicy</div> : <div>You are not old enough</div>}
  </div>)
}

/*
start: 17:38
end: 17:52

what was the issue: 
  1. we're using a `type="submit"` but there's no <form>. We could either use form submit logic or use controlled inputs and 
    remove `type="submit"` and `name` properties, which have no use for this usecase.
  2. we're passing `setName` to an input `onChange` prop. onChange expects a callback that takes 
    an event as parameter, not the input value.

improvement: 
  1. Made input uncontrolled and handled submit logic with `form.onSubmit`

*/
export function UnidiomaticHTMLStructure() {
  const handleSubmit = (event) => {
    event.preventDefault()
    // do something with the value
    console.log(event.target.name.value)          

  }

  return (<form onSubmit={handleSubmit}>
    <input name="name" type="text"/>
    <button type="submit">Submit</button>
  </form>)
}

/*
start: 17:53
end: 18:09

what was the issue: managing each form field separately is not ideal, it adds unnecesary complexity to the code when reading it.

improvement: manage all the form state in a single state variable, then mutate it according to the input name.

*/
const INIT_VALUES = {
  name: {value: '', type: "text" }, 
  age: {value: '', type: "number" }, 
  location: {value: '', type: "text" }, 
  email: {value: '', type: "email" }, 
  password: {value: '', type: "password" }, 
}

export function CrudeStateManagement() {
  const [values, setValues] = useState(INIT_VALUES)

  const setValue = (name, value) => {
    setValues(prev => ({...prev, [name]: {...(values[name]), value}}))
  }

  const handleSubmit = (e) => {}

  return (<form onSubmit={handleSubmit}>
    {Object.entries(values).map(([name, field]) => (
      <input value={field.value} name={name} type={field.type} onChange={(event) => setValue(name, event.target.value)} />
    ) )}
  
    <button type="submit">Submit</button>
  </form>)
}

/*
start: 18:10
end: 18:14

what was the issue: 
  1. tbh it's hard to know what was desired to do here. 
  2. it's not advised to use array index as `key`

improvement: 
  2. use element value instead of index as key

*/
export function UnidiomaticHTMLHierarchy() {
  const bids = [1,2,3]
  const asks = [1,2,3]

  return (<li>
    {bids.map((bid) => <span key={bid}>{bid}</span>)}
    {asks.map((ask) => <span key={ask}>{ask}</span>)}
  </li>)
}

/*
start: 18:14
end: 18:17

what was the issue: each time we throw an error, we remove the last one,
 keeping the user from knowing all the issues that happened

improvement: change error to be an array and push errors when they happen.
  clear errors by emptying the array

*/
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

/*
start: 18:18
end: 18:27

what was the issue:
  1. submit logic is wrong, we're adding a FormData object to people array, which is wrong and will not render anything.
  2. <ul> has no <li> inside
  3. person.name should be unique to avoid issues with mapping an array of elements

improvement: 
  1. add name to input tag, that way we'll be able to acces the input value with `formData.get('name)`
  2. replace span with li element
  3. add element index to key
  4. type="submit" can be added to button for clarity, even though its the default value

*/
export function DangerousIdentifier() {
  const [people, setPeople] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
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

/*
start: 18:28
end: 18:32

what was the issue: there's an unnecesary useEffect call.

improvement: make both fetch calls one after the other.
*/
async function fetchLeader() { return { name: 'Messi' }}
async function fetchDetails(leader) { return { ...leader, country: 'Argentina' }}

// Hint: this only requires a single line change!
export function UnnecessaryEffectTriggering() {
  const [leader, setLeader] = useState({})

  useEffect(() => {
    const interval = setInterval(async () => {
      const leader = await fetchLeader()
      const enriched = await fetchDetails(leader);
      setLeader(enriched);
    }, 1000)
    return () => clearInterval(interval)
  }, [])



  return(
    <div>
      <div>Leader:{leader.name}</div>
      {leader.country && <div>{`From: ${leader.country}`}</div>}
    </div>
  )
}

/*
start: 18:33
end: 18:35

what was the issue:  
  1. key missing for element in interation

improvement: 
  1. use record.id as key
*/
async function trackClick(ids) { return ids }

// Hint: same error pattern as above
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

/*
start: 18:36
end: 18:38

what was the issue: by defining the function is the component's function body, 
it gets redefined on each render.

improvement: move it out of the component. If a function is pure and only uses its parameters to 
return a value, it should always be declared outside. Same thing for values like constants.
*/
const validateEmail = (email) => email.includes("@")

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


/*
start: 18:38
end: 18:40

what was the issue: by setting state for both `records` and `altRecords` at the same time, we're loosing on the user
having part of the information beforehand. In this case records could be shown even before `altRecords` was fetched

improvement: move `setRecords` right after `fetchRecords`.
*/
async function fetchRecords() { return [{id: 1, type: 'record'}]}
async function fetchAlternateRecords() { return [{ id: 1, type: 'alt-record' }]}

export function SerialLoading() {

  const [records, setRecords] = useState([])
  const [altRecords, setAltRecords] = useState([])
  
  useEffect(() => {
    async function loadRecords() {
      const recs = await fetchRecords();
      setRecords(recs);
      const altRecs = await fetchAlternateRecords();
      setAltRecords(altRecs);
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

/*
start: 18:40
end: 18:45

what was the issue: we don't need to re-render the `altRecords` elements. By doing it like this, 
we're re-rendering the whole component

improvement: move the `records` logic to a separate component
*/
async function fetchRecords() { return [{id: 1, type: 'record'}]}
async function fetchAlternateRecords() { return [{ id: 1, type: 'alt-record' }]}

// Hint: part of the rendering structure is re-rendered frequently unnecessarily
export function UnoptimizableRenderingStructure(altRecords) {
  return(
    <div>
        <Records />
      <ul>
        {altRecords.map(rec => <li key={rec.id}>{rec.id}</li>)}
      </ul>
    </div>
  )
}

function Records(){
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
