// https://github.com/streamich/react-use/blob/master/docs/useDebounce.md
export function useDebounce(fn, delay, deps) {
  function isReady() {}
  function cancel() {}

  return [isReady, cancel];
}
