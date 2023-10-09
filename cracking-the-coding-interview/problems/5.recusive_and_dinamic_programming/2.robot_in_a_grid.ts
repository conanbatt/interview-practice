/// 2. * Robot in a Grid *: Imagine a robot sitting on the upper left corner of a grid with r rows and c columns.
// The robot can only move in two directions, right and down, but certain cells are "off limits" such that the robot 
// cannot step on them.Design an algorithm to find a path for the robot from the top left to the bottom right.
// [LeetCode](https://leetcode.com/problems/unique-paths-ii/)

const obstacleGrid = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
]


const getUniquePathsWithObstacles = function (obstacleGrid, c = 0, r = 0, path = [], result = []) {
  const columnLengh = obstacleGrid?.length ?? 0
  const rowLengh = obstacleGrid[0]?.length ?? 0
  if(columnLengh === 0 || rowLengh === 0 || (c > columnLengh - 1) || (r > rowLengh + 1) || obstacleGrid[c][r] === 1) return false
  if (c === (columnLengh - 1) && r === (rowLengh - 1)) result.push([...path]);
  getUniquePathsWithObstacles(obstacleGrid, c + 1, r, [...path, 'down'], result)
  getUniquePathsWithObstacles(obstacleGrid, c, r + 1, [...path, 'right'], result)

  return result;
};

// /**
//  * @param {number[][]} obstacleGrid
//  * @return {number}
//  */
// var uniquePathsWithObstacles = function (obstacleGrid) {
//   return getUniquePathsWithObstacles(obstacleGrid)?.length ?? 0
// };

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
// var uniquePathsWithObstacles = function (obstacleGrid, c = 0, r = 0,) {
//   const columnLengh = obstacleGrid?.length ?? 0
//   const rowLengh = obstacleGrid[0]?.length ?? 0
//   if (columnLengh === 0 || rowLengh === 0 || (c > columnLengh - 1) || (r > rowLengh + 1) || obstacleGrid[c][r] === 1) return 0
//   if (c === (columnLengh - 1) && r === (rowLengh - 1)) return 1;

//   const goDown = uniquePathsWithObstacles(obstacleGrid, c + 1, r,)
//   const goRight = uniquePathsWithObstacles(obstacleGrid, c, r + 1)

//   return goDown + goRight
// };


// memoized

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid, c = 0, r = 0, memo = []) {
  const columnLengh = obstacleGrid?.length ?? 0
  const rowLengh = obstacleGrid[0]?.length ?? 0
  if (c >= columnLengh || r >= rowLengh || obstacleGrid[c][r] === 1) return 0
  if (c === (columnLengh - 1) && r === (rowLengh - 1)) return 1;

  if (memo[c] === undefined) {
    memo[c] = [];
  }

  if (memo[c][r] !== undefined) return memo[c][r];


  const goDown = uniquePathsWithObstacles(obstacleGrid, c + 1, r, memo);
  const goRight = uniquePathsWithObstacles(obstacleGrid, c, r + 1, memo);

  memo[c][r] = goDown + goRight;

  return memo[c][r];
};
