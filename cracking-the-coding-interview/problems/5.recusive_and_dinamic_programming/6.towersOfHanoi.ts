// 6. * Towers of Hanoi *: In the classic problem of the Towers of Hanoi, you have 3 towers and N disks of different sizes 
// which can slide onto any tower.The puzzle starts with disks sorted in ascending order of size from top to bottom
// (i.e., each disk sits on top of an even larger one).
// You have the following constraints:

// Only one disk can be moved at a time.
// A disk is slid off the top of one tower onto another tower.
// A disk cannot be placed on top of a smaller disk.
// Write a program to move the disks from the first tower to the last using stacks.
// Permutations without Dups: Write a method to compute all permutations of a string of unique characters.

const originTower =[
  [3, 2, 1],
  [],
  [],
]
// ----------------------- 0
//  [3, 2, 1]
//  []
//  []
// ----------------------- 1
//  [3, 2]
//  []
//  [1]
// ----------------------- 2
//  [3]
//  [2]
//  [1]
// ----------------------- 3
//  [3]
//  [2, 1]
//  []
// ----------------------- 4
//  []
//  [2, 1]
//  [3]
// ----------------------- 5
//  [1]
//  [2]
//  [3]
// ----------------------- 6
//  [1]
//  []
//  [3, 2]
// ----------------------- 7
//  []
//  []
//  [3, 2, 1]

const resultTower = [
  [],
  [],
  [3, 2, 1],
]

function moveDisk(sourceTower, targetTower) {
  const disk = sourceTower.pop();
  targetTower.push(disk);
}


function towersOfHanoi(originTower) {
  const numDisks = originTower[0].length;

  function moveDisk(sourceTower, targetTower) {
    const disk = sourceTower.pop();
    targetTower.push(disk);
  }

  function solveHanoi(n, source, auxiliary, target) {
    if (n === 1) {
      moveDisk(source, target);
      console.log('--->', ...originTower)

      return;
    }

    solveHanoi(n - 1, source, target, auxiliary);
    moveDisk(source, target);
    console.log('--->', ...originTower)

    solveHanoi(n - 1, auxiliary, source, target);
  }

  solveHanoi(numDisks, originTower[0], originTower[1], originTower[2]);
}


towersOfHanoi(originTower);