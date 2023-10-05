// 7. * Build Order *: You are given a list of projects and a list of dependencies(which is a list of pairs of projects,
// where the second project is dependent on the first project).All of a project's dependencies must be built before the project is.
// Find a build order that will allow the projects to be built. If there is no valid build order, return an error.

// (dependency, dependant)

//   ```
// EXAMPLE Input:
// projects: a, b, c, d, e, f
// dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)
// Output: F, e, a, b, d, c
// ```


// dependencies: (f, b), 

//    c   e
//     \
//      d
//     / \
//    a   b
//     \ / 
//      f  

let projects = ['a', 'b', 'c', 'd', 'e', 'f']
const dependencies = [
  ['a', 'd'],
  ['f', 'b'],
  ['b', 'd'],
  ['f', 'a'],
  ['d', 'c'],
  // ['c', 'f'], // uncomment this to get a dependencies built error message
]
const projectsObject = {}

for (const project of projects) {
  projectsObject[project] = []
}

for (const dependencyItem of dependencies) {
  const [dependency, dependsOf] = dependencyItem
  if (!projectsObject[dependsOf]) projectsObject[dependsOf] = []
  projectsObject[dependsOf].push(dependency)
}

const dependencyOrder = []

let foundEmptyIndex = Object.values(projectsObject).findIndex(item => item.length === 0)
let foundEmptyElement = projects[foundEmptyIndex]
while (foundEmptyElement !== undefined) {
  delete projectsObject[foundEmptyElement]
  dependencyOrder.push(foundEmptyElement)
  projects = projects.filter(item => item !== foundEmptyElement)
  // recorrer cada lista de arrays y filtrar el empty element

  Object.keys(projectsObject).forEach((key) => {
    projectsObject[key] = projectsObject[key].filter(item => item !== foundEmptyElement)
  })

  foundEmptyIndex = Object.values(projectsObject).findIndex(item => item.length === 0)
  foundEmptyElement = projects[foundEmptyIndex]
}


if(projects.length){
  throw new Error("Error: dependencies build order")
} else {
  console.log('dependencies installation order: ', dependencyOrder.join()) // e, f, a, b, d, c
}