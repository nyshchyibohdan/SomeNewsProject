const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },
});

// const { defineConfig } = require('cypress');
// const webpackConfig = require('./config/webpack.config.cypress');
//
// module.exports = defineConfig({
//   component: {
//     devServer: {
//       framework: 'react',
//       bundler: 'webpack',
//       webpackConfig,
//     },
//     specPattern: ['src/**/*.cy.{js,jsx}'],
//     setupNodeEvents(on, config) {
//       // component testing node events setup code
//       // https://docs.cypress.io/guides/tooling/code-coverage
//       require('@cypress/code-coverage/task')(on, config);
//
//       on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));
//
//       return config;
//     },
//   },
//
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
