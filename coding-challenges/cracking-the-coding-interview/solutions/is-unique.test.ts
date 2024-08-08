import { expect, it } from "vitest";
import isUnique from "./is-unique";

it("should return false for strings that have duplicate characters", () => {
  expect(isUnique("asda")).toBe(false);
});

it("should return true for strings that do not have duplicate characters", () => {
  expect(isUnique("asd")).toBe(true);
});
