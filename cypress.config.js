const { defineConfig } = require('cypress')

module.exports = defineConfig({
  pageLoadTimeout: 90000,

  reporter: 'mochawesome',

  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    watchForFileChanges: false,
  },
})