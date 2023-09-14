import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "1g29qo",
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://192.168.0.24:5173/'
  },
});
