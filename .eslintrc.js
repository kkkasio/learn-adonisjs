module.exports = {
  env: {
    commonjs: true,
    es6: true
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    strict: 'off',
    camelcase: 'off',
    'no-undef': 0,
    'consistent-return': 0,
    'class-methods-use-this': 'off',
    'no-param-reassign': 0,
    'no-multi-assign': "off"
    }
};
