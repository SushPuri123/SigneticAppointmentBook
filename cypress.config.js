// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    env:{
      qa:{baseUrl: 'https://feature.qa.signetic.com/'},
      prod:{baseUrl: 'google.com'}
    },

    // other configurations
  },
});
