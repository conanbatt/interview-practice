// connect4.test.ts
import { initializeGame, drop } from "../connect4";

describe("Connect4 Game", () => {
  beforeEach(() => {
    initializeGame(7, 6); // Standard Connect4 board size
  });

  test("drop should throw an error if the column is invalid", () => {
    expect(() => drop(7, 1)).toThrow("Invalid column");
  });

  test("drop should throw an error if the column is full", () => {
    expect(drop(0, 1)).toBe(false);
    expect(drop(0, 2)).toBe(false);
    expect(drop(0, 1)).toBe(false);
    expect(drop(0, 2)).toBe(false);
    expect(drop(0, 1)).toBe(false);
    expect(drop(0, 2)).toBe(false);
    expect(() => drop(0, 1)).toThrow("Column is full");
  });

  test("drop should throw an error if the player is invalid", () => {
    expect(() => drop(10, 3)).toThrow("Invalid player");
    expect(drop(0, 1)).toBe(false);
    expect(drop(0, 2)).toBe(false);
    expect(() => drop(0, 2)).toThrow("Invalid player");
  });

  test("drop should place a piece and return false", () => {
    const result = drop(0, 1);
    expect(result).toBe(false);
  });

  test("drop should return true if the game is won", () => {
    expect(drop(0, 1)).toBe(false);
    expect(drop(1, 2)).toBe(false);
    expect(drop(0, 1)).toBe(false);
    expect(drop(1, 2)).toBe(false);
    expect(drop(0, 1)).toBe(false);
    expect(drop(1, 2)).toBe(false);
    expect(drop(0, 1)).toBe(true);
  });

  describe("winning games", () => {
    test("should return true if the game is won horizontally", () => {
      expect(drop(0, 1)).toBe(false);
      expect(drop(4, 2)).toBe(false);
      expect(drop(0, 1)).toBe(false);
      expect(drop(5, 2)).toBe(false);
      expect(drop(0, 1)).toBe(false);
      expect(drop(6, 2)).toBe(false);
      expect(drop(0, 1)).toBe(true);
    });

    test("should return true if the game is won vertically", () => {
      expect(drop(3, 1)).toBe(false);
      expect(drop(1, 2)).toBe(false);
      expect(drop(3, 1)).toBe(false);
      expect(drop(2, 2)).toBe(false);
      expect(drop(3, 1)).toBe(false);
      expect(drop(4, 2)).toBe(false);
      expect(drop(3, 1)).toBe(true);
    });

    test("should return true if the game is won diagonally", () => {
      expect(drop(3, 1)).toBe(false);
      expect(drop(4, 2)).toBe(false);
      expect(drop(4, 1)).toBe(false);
      expect(drop(5, 2)).toBe(false);
      expect(drop(5, 1)).toBe(false);
      expect(drop(6, 2)).toBe(false);
      expect(drop(5, 1)).toBe(false);
      expect(drop(6, 2)).toBe(false);
      expect(drop(6, 1)).toBe(false);
      expect(drop(0, 2)).toBe(false);
      expect(drop(6, 1)).toBe(true);
    });
  });
});
