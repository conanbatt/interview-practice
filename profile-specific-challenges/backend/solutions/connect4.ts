let board: number[][];
let lastPlayer: number;

const assertPlayer = (player: number): void => {
  if (player !== 1 && player !== 2) {
    throw new Error("Invalid player");
  }
  if (player === lastPlayer) {
    throw new Error("Invalid player");
  }
  lastPlayer = player;
};

const assertPosition = (
  row: number,
  column: number,
  player: number
): boolean => {
  if (row >= board.length || column >= board[0].length) {
    return false;
  }
  return board[row][column] === player;
};

const assertWin = (row: number, column: number, player: number): boolean => {
  if (
    assertPosition(row - 1, column + 1, player) &&
    assertPosition(row - 2, column + 2, player) &&
    assertPosition(row - 3, column - 3, player)
  ) {
    return true;
  }
  if (
    assertPosition(row, column + 1, player) &&
    assertPosition(row, column + 2, player) &&
    assertPosition(row, column + 3, player)
  ) {
    return true;
  }
  if (
    assertPosition(row + 1, column + 1, player) &&
    assertPosition(row + 2, column + 2, player) &&
    assertPosition(row + 3, column + 3, player)
  ) {
    return true;
  }
  if (
    assertPosition(row + 1, column, player) &&
    assertPosition(row + 2, column, player) &&
    assertPosition(row + 3, column, player)
  ) {
    return true;
  }
  if (
    assertPosition(row + 1, column - 1, player) &&
    assertPosition(row + 2, column - 2, player) &&
    assertPosition(row + 3, column - 3, player)
  ) {
    return true;
  }
  if (
    assertPosition(row, column - 1, player) &&
    assertPosition(row, column - 2, player) &&
    assertPosition(row, column - 3, player)
  ) {
    return true;
  }
  if (
    assertPosition(row - 1, column - 1, player) &&
    assertPosition(row - 2, column - 2, player) &&
    assertPosition(row - 3, column - 3, player)
  ) {
    return true;
  }

  return false;
};

export const initializeGame = (columns: number, rows: number): void => {
  board = Array.from({ length: rows }, () => Array(columns).fill(0));
  lastPlayer = 2;
};

export const drop = (column: number, player: number): boolean => {
  assertPlayer(player);

  if (column >= board[0].length) {
    throw new Error("Invalid column");
  }

  let row = 0;

  for (let i = 0; i < board.length; i++) {
    if (i + 1 === board.length || board[i + 1][column] !== 0) {
      board[i][column] = player;
      row = i;
      break;
    }
  }

  return assertWin(row, column, player);
};
