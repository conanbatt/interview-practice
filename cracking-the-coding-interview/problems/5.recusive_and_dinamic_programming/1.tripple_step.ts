// 1. * Triple Step *: A child is running up a staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a time.
// Implement a method to count how many possible ways the child can run up the stairs.
// 3 => 3  -  2 1  - 1 2 - 1 1 1
// 4 => 1111 - 112 - 121 - 211 - 22 - 13 - 31 - 

const countSteps = (numero, memo = {}) => {
  if(numero === 0) return 1;
  if (memo[numero]) return memo[numero]
  const hayTres = numero >= 3
  const hayDos = numero >= 2
  const hayUno = numero >= 1
  const enTres = hayTres ? countSteps(numero - 3, memo) : 0 
  const enDos = hayDos ? countSteps(numero - 2, memo) : 0  
  const enUno = hayUno ? countSteps(numero - 1, memo) : 0  
  const total = enTres + enDos + enUno;
  memo[numero] = total
  return memo[numero]
}