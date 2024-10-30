const { defineConfig } = require('cypress');
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
    // e2e: {
    //     setupNodeEvents(on, config) {
    //         codeCoverageTask(on, config);
    //         return config;
    //     },
    // },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
        setupNodeEvents(on, config) {
            codeCoverageTask(on, config);
            return config;
        },
        webpackConfig: {
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                ],
            },
        },
    },
});
