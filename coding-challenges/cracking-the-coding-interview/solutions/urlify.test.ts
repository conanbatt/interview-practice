import { expect, it } from "vitest";
import URLify from "./urlify";

it("should replace all spaces with %20", () => {
  expect(URLify("   asdads asdas sss")).toEqual(
    "%20%20%20asdads%20asdas%20sss"
  );
  expect(URLify("http://asd .com")).toEqual("http://asd%20.com");
  expect(URLify("Just A Name")).toEqual("Just%20A%20Name");
});
