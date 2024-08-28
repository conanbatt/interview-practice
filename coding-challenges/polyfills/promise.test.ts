// customPromise.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CustomPromise } from "./promise";

describe("CustomPromise", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it("should resolve with the correct value", () => {
    const promise = new CustomPromise<string>((resolve, reject) => {
      setTimeout(() => resolve("success"), 100);
    });

    const result = promise.then((value) => {
      expect(value).toBe("success");
    });

    vi.runAllTimers();
    return result;
  });

  it("should reject with the correct error", () => {
    const promise = new CustomPromise<string>((resolve, reject) => {
      setTimeout(() => reject("error"), 100);
    });

    const result = promise.catch((error) => {
      expect(error).toBe("error");
    });

    vi.runAllTimers();
    return result;
  });

  it("should chain then methods", () => {
    return new CustomPromise<number>((resolve, reject) => {
      resolve(1);
    })
      .then((value) => {
        expect(value).toBe(1);
        return value + 1;
      })
      .then((value) => {
        expect(value).toBe(2);
        return value + 1;
      })
      .then((value) => {
        expect(value).toBe(3);
      });
  });

  it("should handle rejection in then method", () => {
    return new CustomPromise<string>((resolve, reject) => {
      reject("error");
    })
      .then(() => {
        throw new Error("Should not be called");
      })
      .catch((error) => {
        expect(error).toBe("error");
      });
  });

  it("should handle errors thrown in then method", () => {
    return new CustomPromise<number>((resolve, reject) => {
      resolve(1);
    })
      .then(() => {
        throw new Error("error");
      })
      .catch((error) => {
        expect(error.message).toBe("error");
      });
  });

  it("should chain catch methods", () => {
    return new CustomPromise<string>((resolve, reject) => {
      reject("error1");
    })
      .catch((error) => {
        expect(error).toBe("error1");
        throw new Error("error2");
      })
      .catch((error) => {
        expect(error.message).toBe("error2");
      });
  });

  it("should resolve all promises with all method", () => {
    const promise1 = new CustomPromise<number>((resolve) => resolve(1));
    const promise2 = new CustomPromise<number>((resolve) => resolve(2));
    const promise3 = new CustomPromise<number>((resolve) => resolve(3));

    return CustomPromise.all([promise1, promise2, promise3]).then((values) => {
      expect(values).toEqual([1, 2, 3]);
    });
  });

  it("should reject if any promise in all method rejects", () => {
    const promise1 = new CustomPromise<number>((resolve) => resolve(1));
    const promise2 = new CustomPromise<number>((_, reject) => reject("error"));
    const promise3 = new CustomPromise<number>((resolve) => resolve(3));

    return CustomPromise.all([promise1, promise2, promise3])
      .then(() => {
        throw new Error("Should not be called");
      })
      .catch((error) => {
        expect(error).toBe("error");
      });
  });
});
