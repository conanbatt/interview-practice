# Guide

Many of the snippets of code presented here come from take-homes and homework from real assignments. Many concepts are described in the bible of code design code-complete, available in the repo.

The code will be represented in Javascript but the code design errors are not language specific.

To solve, fork this repository and rewrite the snippet of code to a better version and a description of why the code is improved.
To get the solutions, request them at gabriel@silver.dev or ask question in the community Slack.

## Code Reviewing Exercises

1. 
```
class Node {
  id: string,
  on: boolean
}

function searchTree(node, id) {
  if (node.id === id) {
    node.on === !node.value
    return
  }
  node.children.map((child) => searchTree(child, id))
}
```

2. 

```
const list = [{ id: 1, valid: true }, { id: 1, valid: true }]

function invalidateOrders(list) {
  while (var item = list.find(item => Boolean(item.valid))) {
    item.val = false
  }
}
```

3. 
```
function calc() {
  const a = 7
  const b = 5

  // if a is bigger than be, return average Otherwise return  the sum
  return a >= b ? (a + b) / 2 : a + b
}
```
