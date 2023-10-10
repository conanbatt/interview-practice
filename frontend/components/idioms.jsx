/*
  To solve, fork this repository and rewrite the snippet of code to a better version and a description of why the code is improved.
  To get the solutions, request them at gabriel@silver.dev or ask question in the community Slack.
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
