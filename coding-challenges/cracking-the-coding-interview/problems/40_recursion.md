Recursion Cheat Sheet

# Inducción: Base cases + function

- Test the function with small numbers and cases.
- Find a pattern between the base cases
- Apply the pattern generally, using the base cases for returns

```
  function fibonacci(n) {
    if (n === 1) {
      return 1;
    }
    if (n === 2) {
      return 2;
    }
    return fibonacci(n-1) + fibonacci(n-2)
  }
```

# Divide & Conquer

- Can you split the problem in smaller pieces?
  - Can you divide it?
  - Can you solve for a part of the input, and re-iterate the rest?

```
  function mergeSort(array) {
    merge(
      mergeSort(array.slice(0, array.length/2)),
      mergeSort(array.slice(array.length/2, array.length)),
    )
  }
```


# Dynamic Programming

- All DP problems can be implemented top-down or bottom up.
  - Top-down implementations need memoization to work
  - Bottom-up implementations are strictly more performant but less intuitive
- Problems that can be thought of as the sum of subsolutions might be solved by DP
