import { describe, expect, test } from "vitest";
import zeroMatrix from "../08_zeroMatrix";

describe("08 - zeroMatrix", () => {
  test("zeroes 2x2 matrix", () => {
    const matrix = [
      [0, 2],
      [3, 4],
    ];
    const expected = [
      [0, 0],
      [0, 4],
    ];
    const resultMatrix = zeroMatrix(matrix);
    expect(resultMatrix).toEqual(expected);
  });

  test("zeroes 3x3 matrix", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 0, 9],
    ];
    const expected = [
      [1, 0, 3],
      [4, 0, 6],
      [0, 0, 0],
    ];
    const resultMatrix = zeroMatrix(matrix);
    expect(resultMatrix).toEqual(expected);
  });

  test("zeroes 4x4 matrix", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 0, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const expected = [
      [1, 2, 0, 4],
      [0, 0, 0, 0],
      [9, 10, 0, 12],
      [13, 14, 0, 16],
    ];
    const resultMatrix = zeroMatrix(matrix);
    expect(resultMatrix).toEqual(expected);
  });

  test("2 zeroes 4x4 matrix", () => {
    const matrix = [
      [0, 2, 3, 4],
      [5, 6, 0, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const expected = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 10, 0, 12],
      [0, 14, 0, 16],
    ];
    const resultMatrix = zeroMatrix(matrix);
    expect(resultMatrix).toEqual(expected);
  });
});
