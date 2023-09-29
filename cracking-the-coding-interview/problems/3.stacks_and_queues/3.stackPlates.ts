// 3. * Stack of Plates *: Imagine a(literal) stack of plates.
// If the stack gets too high, it might topple.Therefore, in real life, we would likely start a
// new stack when the previous stack exceeds some threshold.Implement a data structure SetOfStacks
// that mimics this.SetOfStacks should be composed of several stacks and should create a new stack once
// the previous one exceeds capacity.SetOfStacks.push() and SetOfStacks.pop() should behave identically to
// a single stack(that is, pop() should return the same values as it would if there were just a single stack).


function StackPlates (threshold) {
  const array = [];

  this.array = array

  this.push = (value) => {
    array.push(value);
  }

  this.pop = () => {
    if (array.length === 0) {
      return undefined; // Stack is empty.
    }
    const popped = array.pop();
    return popped;
  }

  this.getStack = (stack) => {
    const bottom = (stack) * threshold
    const top = (stack + 1) * threshold
    return array.slice(bottom, top)
  }

  this.length = (stack) => {
    const bottom = (stack) * threshold
    const top = (stack + 1) * threshold
    const isHigherThanTop = array.length > top
    const isHigherThanBottom = array.length > bottom
    if(isHigherThanTop){
      return top - bottom
    } else if (isHigherThanBottom){
      return array.length - bottom
    } else {
      return array.length - bottom
    }
  }
}

const stack = new StackPlates(3);

stack.push(5);
stack.push(2);
stack.push(3);
stack.push(7);
stack.push(88);
stack.push(11);
stack.push(5);
stack.push(1);
stack.push(19);
stack.push(81);
