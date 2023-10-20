// 1. * Triple Step *: A child is running up a staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a time.
// Implement a method to count how many possible ways the child can run up the stairs.
// 3 => 3  -  2 1  - 1 2 - 1 1 1
// 4 => 1111 - 112 - 121 - 211 - 22 - 13 - 31 - 

const countSteps = (num, memo = {}) => {
  if(num === 0) return 1;
  if (memo[num]) return memo[num]
  const onThree = num >= 3 ? countSteps(num - 3, memo) : 0 
  const onTwo = num >= 2 ? countSteps(num - 2, memo) : 0  
  const onOne = num >= 1 ? countSteps(num - 1, memo) : 0  
  const total = onThree + onTwo + onOne;
  memo[num] = total
  return memo[num]
}