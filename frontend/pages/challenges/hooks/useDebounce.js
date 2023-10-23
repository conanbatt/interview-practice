import * as React from 'react';

const useDebounce = (fn, ms, deps = []) => {
  const [readyState, setReadyState] = React.useState(true)
  const [innerTimeout, setInnerTimeout] = React.useState()

  const isReady = () => innerTimeout ? readyState : null

  const cancel = () => {
    clearTimeout(innerTimeout)
    setInnerTimeout(null)
  }

  React.useEffect(() => {
    const callback = () => {
      fn();
      setReadyState(true);
    }
    setReadyState(false)
    const timeout = setTimeout(callback, ms)
    setInnerTimeout(timeout)

    return () => {
      if (innerTimeout) {
        cancel()
      }
    }
  }, [...deps, ms]);
  return [isReady, cancel]
}

export default useDebounce