class CustomPromise<T> {
  private value?: T | void | null;
  private error?: any;
  private state: "pending" | "fulfilled" | "rejected" = "pending";
  private thenCallbacks: Array<(value: T) => void> = [];
  private catchCallbacks: Array<(error: any) => void> = [];

  constructor(
    executor: (
      resolve: (value?: T | void | null) => void,
      reject: (error: any) => void,
    ) => void,
  ) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  private resolve(value: T | void | null | undefined) {
    if (this.state !== "pending") return;
    this.value = value;
    this.state = "fulfilled";
    this.thenCallbacks.forEach((callback) => callback(this.value!));
  }

  private reject(error: any) {
    if (this.state !== "pending") return;
    this.error = error;
    this.state = "rejected";
    this.catchCallbacks.forEach((callback) => callback(this.error));
  }

  then(
    onFulfilled?: (value: T) => T | CustomPromise<T> | undefined | void | null,
    onRejected?: (error: any) => T | CustomPromise<T> | undefined | void | null,
  ) {
    return new CustomPromise<T>((resolve, reject) => {
      const handleFulfillment = (value: T) => {
        try {
          if (onFulfilled) {
            const result = onFulfilled(value);
            if (result instanceof CustomPromise) {
              result.then(resolve).catch(reject);
            } else {
              resolve(result);
            }
          }
        } catch (error) {
          reject(error);
        }
      };

      const handleRejection = (error: any) => {
        try {
          if (onRejected) {
            const result = onRejected(error);
            if (result instanceof CustomPromise) {
              result.then(resolve).catch(reject);
            } else {
              resolve(result);
            }
          } else {
            // If no onRejected callback is provided, pass the error to the next reject
            reject(error);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === "fulfilled") {
        handleFulfillment(this.value!);
      } else if (this.state === "rejected") {
        handleRejection(this.error);
      } else if (this.state === "pending") {
        this.thenCallbacks.push(handleFulfillment);
        this.catchCallbacks.push(handleRejection);
      }
    });
  }

  catch(
    onRejected: (error: any) => T | void | null | undefined | CustomPromise<T>,
  ) {
    return new CustomPromise<T>((resolve, reject) => {
      const handleRejection = (error: any) => {
        try {
          const result = onRejected(error);
          if (result instanceof CustomPromise) {
            result.then(resolve).catch(reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === "rejected") {
        handleRejection(this.error);
      } else if (this.state === "pending") {
        this.catchCallbacks.push(handleRejection);
      }
    });
  }

  static all(promises: Array<CustomPromise<any>>): CustomPromise<any[]> {
    return new CustomPromise<any[]>((resolve, reject) => {
      const results: any[] = [];

      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            results[index] = value;
            if (index === promises.length - 1) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    });
  }
}

export { CustomPromise };
