import * as React from 'react';

const useInterval = (handler, timeout) => {
  React.useEffect(() => {
    if (timeout === null || timeout === undefined) {
      console.log('no timeout')
    } else {
      const interval = setInterval(handler, timeout)
      console.log('new interval', interval)
      return () => {
        console.log('cleared interval', interval)
        clearInterval(interval)
      };
    }
  }, [timeout]);
}

export default useInterval