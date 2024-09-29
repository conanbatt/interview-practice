export const API = {
  unrenderableState: async () =>
    new Promise((res) => {
      setTimeout(() => {
        res("Fetched Successfully");
      }, 1000);
    }),
  fetchLeader: async () => {
    return new Promise((res) => res({ name: "Messi" }));
  },
  fetchDetails: async (leader) => {
    return new Promise((res) => res({ ...leader, country: "Argentina" }));
  },
  trackView: async (records) => records.map((r) => r.id),
  fetchRecords: async () => {
    return [{ id: 1, type: "record" }];
  },
  fetchAlternateRecords: async () => {
    return [{ id: 2, type: "alt-record" }];
  },
};
