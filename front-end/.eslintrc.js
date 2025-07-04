// https://eslint.org/docs/v8.x/

const config = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        /* https://www.npmjs.com/package/eslint-plugin-react */
        'plugin:react/recommended',
        /* https://www.npmjs.com/package/eslint-plugin-react-hooks */
        'plugin:react-hooks/recommended',
        /*https://www.npmjs.com/package/eslint-plugin-import*/
        'plugin:import/errors',
        'plugin:import/warnings',
        /*https://www.npmjs.com/package/eslint-plugin-unicorn*/
        'plugin:unicorn/recommended',
        /*https://www.npmjs.com/package/eslint-plugin-cypress*/
        'plugin:cypress/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    /* https://github.com/import-js/eslint-plugin-import */
    settings: {
        react: {
            version: 'detect', // Automatically detects the React version
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx'],
            },
            webpack: {
                config: './config/webpack.dev.config.js',
            },
        },
    },
    plugins: ['simple-import-sort', 'react', 'prettier'],
    ignorePatterns: ['node_modules', '*.json', '*.css'],
    rules: {
        'prettier/prettier': 'off',
        semi: ['warn', 'always'],
        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    camelCase: true,
                    pascalCase: true,
                },
            },
        ],
        'no-undef': 'off',
        'cypress/unsafe-to-chain-command': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
        'no-unused-vars': 'off',
        'unicorn/prefer-logical-operator-over-ternary': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/no-empty-file': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
        'import/namespace': [2, { allowComputed: true }],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/namespaces': 'off',
    },
    overrides: [
        {
            files: ['*.json', '*.css'],
            rules: {
                'prettier/prettier': 'off',
            },
        },
        {
            files: ['*rc.js', '*.config.js'],
            rules: {
                'unicorn/prefer-module': 'off',
                'unicorn/filename-case': 'off',
            },
        },
    ],
    globals: {
        Cypress: true,
    },
};

module.exports = config;
