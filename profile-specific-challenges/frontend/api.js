export const API = {
  unrenderableState: async () =>
    new Promise((res, rej) => {
      setTimeout(() => {
        res("Fetched Successfully");
      }, 1000);
    }),
};
