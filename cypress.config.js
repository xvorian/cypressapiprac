const { defineConfig } = require("cypress");

module.exports = defineConfig({
  baseURL: "https://gorest.co.in/public/v2/",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
