const { defineConfig } = require('cypress');

module.exports = defineConfig({
    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
            webpackConfig: require('./config/webpack.config.js'),
            supportFile: './src/index.js',
        },
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);

            on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

            return config;
        },
    },

    e2e: {
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);
            return config;
        },
    },
});
