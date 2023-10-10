// 5. * Recursive Multiply *: Write a recursive function to multiply two positive integers without using the * operator.
// You can use addition, subtraction, and bit shifting, but you should minimize the number of those operations.

const recursiveMultiply = (a, b) => {
  if(b === 1) return a;
  let positive = true
  if((a < 0 && b > 0)||( a> 0 && b < 0)){
    positive=false
  }
  const total = Math.abs(a) + recursiveMultiply(Math.abs(a), Math.abs(b) -1)
  return positive ? total : -total
}

recursiveMultiply(2,3)