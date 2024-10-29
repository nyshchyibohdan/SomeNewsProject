const codeCoverage = require('@cypress/code-coverage/task');

const index = (on, config) => {
    codeCoverage(on, config);
    return config;
};
module.exports = index;
