import { describe, it, expect, vi } from "vitest";
import { Connect4, PLAYER_ONE, PLAYER_TWO } from "../connect4.mjs";

describe("Connect4", () => {
  it("It should allow you play within bounds", async () => {
    const c4 = new Connect4({ width: 10, height: 10 });
    expect(c4.getValue(10, 1)).toBeFalsy();
    c4.play(1);
    expect(c4.getValue(10, 1)).toEqual(PLAYER_ONE);
  });

  it("It should do nothing if you play out of bounds", async () => {
    const c4 = new Connect4({ width: 10, height: 10 });
    c4.play(100);
    expect(c4.getValue(100, 1)).toBeFalsy();
  });

  it("it should detect horizontal winning", () => {
    const c4 = new Connect4({ width: 10, height: 10 });
    for (let i = 0; i < 4; i++) {
      c4.play(1);
      c4.play(1);
    }
    expect(c4.winner()).toEqual(PLAYER_ONE);
  });

  it("it should detect vertical winning", () => {
    const c4 = new Connect4({ width: 10, height: 10 });
    for (let i = 0; i < 4; i++) {
      c4.play(1);
      c4.play(2);
    }
    expect(c4.winner()).toEqual(PLAYER_ONE);
  });

  it("it should detect diagonal winning", () => {
    const c4 = new Connect4({ width: 10, height: 10 });
    const plays = [1, 2, 2, 3, 4, 3, 3, 4, 5, 4];
    plays.forEach((p) => c4.play(p));
    expect(c4.winner()).toEqual(PLAYER_ONE);
  });

  it("it should detect diagonal winning", () => {
    const c4 = new Connect4({ width: 10, height: 10 });
    const plays = [1, 2, 2, 3, 4, 3, 3, 4, 5, 4].reverse();
    plays.forEach((p) => c4.play(p));
    expect(c4.winner()).toEqual(PLAYER_ONE);
  });
});
