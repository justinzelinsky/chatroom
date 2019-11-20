const ERROR = 2;
const WARN = 1;

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
    API_ADDRESS: true
  },
  plugins: ['react', 'jest'],
  rules: {
    indent: [ERROR, 2, { ignoredNodes: ['JSXElement *'], SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/jsx-indent': 0,
    'react/jsx-indent-props': [ERROR, 'first'],
    'object-curly-spacing': [ERROR, 'always'],
    'no-trailing-spaces': ['error'],
    'no-console': 0,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '16.6.3'
    },
    propWrapperFunctions: ['forbidExtraProps']
  }
};
