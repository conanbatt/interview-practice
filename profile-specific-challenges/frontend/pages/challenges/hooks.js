
// Debounce 
export const useDebounce = (callback, time, dependencie) => {
  let timeDelay;

  useEffect(() => {
    timeDelay = setTimeout(callback, time);
    return () => cancel();
  }, dependencie);

  const cancel = () => clearTimeout(timeDelay);

  return [null, cancel];
}



export default function Hooks() {
  return(
    <>
      <h1>
        Hooks
      </h1>
      <ol>
        <li>Build a useInterval hook. See Documentation [here](https://github.com/streamich/react-use/blob/master/docs/useInterval.md)</li>
        <li>Build a useDebounce hook. See Documentation [here](https://github.com/streamich/react-use/blob/master/docs/useDebounce.md)</li>
      </ol>
    </>
  )
}
