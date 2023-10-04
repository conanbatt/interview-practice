// 1. * Route Between Nodes *: Given a directed graph, design an algorithm to find out whether there is a route between two nodes.


class GraphNode {
  children
  constructor () {
    this.children = []
  }
}

const nodeA = new GraphNode()
const nodeB = new GraphNode()
const nodeC = new GraphNode()
const nodeD = new GraphNode()
const nodeE = new GraphNode()
const nodeF = new GraphNode()

//   A
//  / \
// B   C
//    /  \
//   D -> E
//  / 
// F

nodeA.children.push(nodeB)
nodeA.children.push(nodeC)
nodeC.children.push(nodeD)
nodeC.children.push(nodeE)
nodeD.children.push(nodeE)
nodeD.children.push(nodeF)

const hasPath = (nodeFrom, nodeTo) => {
  if(nodeFrom.children.includes(nodeTo)) return true
  return nodeFrom.children.some(itemFrom => hasPath(itemFrom,nodeTo))
}