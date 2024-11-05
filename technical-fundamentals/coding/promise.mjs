/*
  Regretfully, at Silver we do sometimes break our promises.
  We wanted to express this in code, but Javascript's native Promises are not easy to modify.
  We need to implement our own Promises that mimic and extend Javascript's core promises.

  Step 1
  ------
  Implement native style promises with the functions then and catch.
  You can consult the reference at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

  Notes:
  - Promise chaining must be supported
  - Then functions carry over resolution values to future calls of the function

  Step 2
  ------
  Implement a "break" method that prevents previous callbacks from being called.
*/

export class SilverPromise {}
