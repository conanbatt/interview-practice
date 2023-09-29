// 1. * Three in One *: Describe how you could use a single array to implement three stacks.

function ThreeStacks<T>() {
  const array = []

  const stackLength = {
    1: 0,
    2: 0,
    3: 0,
  }

  const push = (stack, value) => {
    array[stack - 1 + (stackLength[stack] * Object.values(stackLength).length)] = value
    stackLength[stack]++
  }

  const pop = (stack) => {
    const element = array[stack - 1 + ((stackLength[stack] -1) * Object.values(stackLength).length)]
    array[stack - 1 + ((stackLength[stack] - 1) * Object.values(stackLength).length)] = undefined
    if (stackLength[stack] !== 0) stackLength[stack]--
    return element
  }

  const length = (stack) => stackLength[stack]

  this.push = push
  this.pop = pop
  this.length = length
}

const stacks = new ThreeStacks<number>()

stacks.push(1, 1)
stacks.push(2, 2)
stacks.push(3, 3)
stacks.push(1, 4)
stacks.push(2, 5)
stacks.push(3, 6)
stacks.push(1, 7)
stacks.push(2, 8)
stacks.push(3, 9)