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

export function ObjectCopying(object) {
  const object = { a: { c: 1 }, b: 2 }
  const copy = { ...object }
  copy.a.c = 2
  return { ...object }
}

export function useEffect({ fetchURL, label }) {
  useEffect(async () => {
    await fetch(fetchURL)
  })

  return(
    <div>
      <button>{label}</button>
    </div>
  )
}

export function useEffectDerivedCalculation(object) {
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

export function useEffectLifeCycle(object) {
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

export function avoidingUseState(object) {
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

export function avoidingUseState(object) {
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
