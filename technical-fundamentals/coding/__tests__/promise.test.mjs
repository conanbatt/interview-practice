import { describe, it, expect, vi } from "vitest";
import { SilverPromise } from "../promise.mjs";

function sleep(time) {
  return new Promise((r) => setTimeout(r, time));
}

describe("SilverPromises - then and catch methods", () => {
  it("should resolve and call then function", async () => {
    let fulfillment;
    const promise = new SilverPromise((resolve) => {
      setTimeout(() => resolve("Success"), 100);
    });

    promise.then((result) => {
      fulfillment = result;
    });

    //for testing purposes
    await sleep(200);
    expect(fulfillment).toBe("Success");
  });

  it("should catch errors using catch method", async () => {
    const promise = new SilverPromise((_, reject) => {
      setTimeout(() => reject(new Error("Failure")), 100);
    });

    promise.catch((error) => {
      expect(error.message).toBe("Failure");
    });
  });

  it("should handle then chaining with unresolved promise", async () => {
    const promise = new SilverPromise((resolve) => {
      setTimeout(() => resolve(0), 100);
    });

    const then0 = vi.fn().mockReturnValue(1);
    const then1 = vi.fn().mockReturnValue(2);
    const then2 = vi.fn();

    promise.then(then0).then(then1).then(then2);

    await sleep(200);

    expect(then0).toHaveBeenCalledWith(0);
    expect(then1).toHaveBeenCalledWith(1);
    expect(then2).toHaveBeenCalledWith(2);
  });

  it("should handle then chaining with resolved promise", async () => {
    const promise = new SilverPromise((resolve, reject) => {
      resolve(0);
    });

    const then0 = vi.fn().mockReturnValue(1);
    const then1 = vi.fn().mockReturnValue(2);
    const then2 = vi.fn();

    promise.then(then0).then(then1).then(then2);

    expect(then0).toHaveBeenCalledWith(0);
    expect(then1).toHaveBeenCalledWith(1);
    expect(then2).toHaveBeenCalledWith(2);
  });

  it("should handle breaking promises", async () => {
    const promise = new SilverPromise((resolve) => {
      setTimeout(() => resolve("Success"), 100);
    });

    let error;

    promise.then((result) => {
      error = new Error("Should never be called");
    });
    promise.break();
    await sleep(200);
    expect(error).toBeUndefined();
  });
});
