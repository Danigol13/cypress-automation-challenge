const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
require('dotenv').config();

const baseUrls = {
  production: 'https://www.automationexercise.com',
  staging: 'https://www.automationexercise.com',
};
const environment = process.env.ENVIRONMENT || 'production';

module.exports = defineConfig({
  e2e: {
    baseUrl: baseUrls[environment] || baseUrls.production,
    specPattern: 'cypress/e2e/features/**/*.feature',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/evidencias',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    retries: { runMode: 1, openMode: 0 },
    env: {
      environment,
      TRELLO_ACTION_ID: process.env.TRELLO_ACTION_ID || '592f11060f95a3d3d46a987a',
    },
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      config.env.TRELLO_KEY = process.env.TRELLO_KEY || '';
      config.env.TRELLO_TOKEN = process.env.TRELLO_TOKEN || '';
      return config;
    },
  },
});
