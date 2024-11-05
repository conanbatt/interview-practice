import { defineConfig } from "vitest/config";
//import SilverReporter from "./silverReporter";

export default defineConfig({
  test: {
    globals: true,
    //reporters: ["default", new SilverReporter()],
  },
});
