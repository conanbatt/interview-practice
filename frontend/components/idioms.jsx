/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.
  
  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.
*/

export function FunctionsAsComponents({ buttonText = 'Start Now' }) {
  const showButton = () => {
    <button>
      {buttonText}
    </button>
  }

  return (<div>
    {showButton()}
  </div>)
}

export function objectCopying() {
  const object = { a: { c: 1 }, b: 2 }
  const copy = { ...object }
  copy.a.c = 2
  return { ...object }
}

export function arrayCopying() {
  const array = [{ a: 1}, {a: 2}, {a: 3}]
  const copy = [...array]
  return copy;
}

export function UseEffect({ fetchURL, label }) {
  useEffect(async () => {
    await fetch(fetchURL)
  })

  return(
    <div>
      <button>{label}</button>
    </div>
  )
}

export function UseEffectDerivedCalculation(object) {
  const [sum, setSum] = useState()
  const [clickedTimes, setClickedTimes] = useState()

  useEffect(() => {
    setSum(sum + clickedTimes)
  }, [clickedTimes])

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

export function UseEffectLifeCycle(object) {
  const [loaded, setLoaded] = useState()

  useEffect(() => {
    setTimeout(() => setLoaded(true))
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

export function AvoidingUseState(object) {
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

export function AvoidingUseState(object) {
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

export function UntraceableState(object) {
  const [result, setResult] = useState()  

  useEffect(async () => {
    let loading = true;
    const result = await API();
    loading = false;
    setResult(result)
  }, [])

  return (
    <div>
      Result:{result}
    </div>
  )
}

export function CrudeDeclarations() {
  const calendarDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  return (<ol>
    {calendarDays.map((val) => <span key={val}>{val}</span>)}
  </ol>)
}

export function MagicNumbers(age) {
  return (<ol>
    { age < 18 ? <div>Spicy</div> : <div>You are not old enough</div>}
  </ol>)
}

export function unidiomaticHTMLStructure() {
  const [name, setName] = useState("")
  const handleSubmit = (e) => {}

  return (<div>
    <input value={name} name="name" type="text" onChange={setName} />
    <button type="submit" onClick={handleSubmit}>Submit</button>
  </div>)
}

export function CrudeStateManagement() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [location, setLocation] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  

  const handleSubmit = (e) => {}

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

  return (<li>
    {bids.map((bid, i) => <span key={i}>{bid}</span>)}
    {asks.map((ask, j) => <span key={j+'asks'}>{ask}</span>)}
  </li>)
}

export function UnidiomaticHTMLHierarchy() {
  const bids = [1,2,3]
  const asks = [1,2,3]

  return (<li>
    {bids.map((bid, i) => <span key={i}>{bid}</span>)}
    {asks.map((ask, j) => <span key={j+'asks'}>{ask}</span>)}
  </li>)
}
