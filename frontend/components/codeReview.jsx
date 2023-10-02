export function Component1({ buttonText = 'Start Now' }) {
  // Function gets re-defined of every render. This means extra CPU cycles and memory.
  // This also gets re-defined for each component instantiation.
  // If this were outside the component, it would only be defined once, and it could be memo'd more effectively.
  const showButton = () => {
    <button>
      {buttonText}
    </button>
  }

  return (<div>
    {showButton()}
  </div>)
}

export function Component2({ fetchURL, label }) {
  useEffect(async () => {
    await fetch(fetchURL)
  })

  return(
    <div>
      <button>{label}</button>
    </div>
  )
}


export function ObjectCopying(object) {
  const object = { a: { c: 1 }, b: 2 }
  const copy = { ...object }
  copy.a.c = 2
  return { ...object }
}
