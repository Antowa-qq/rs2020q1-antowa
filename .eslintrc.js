module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: "babel-eslint",
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "import/no-cycle": "off",
    "guard-for-in": "off",// need fix!
    "no-loop-func": "off",// need fix!
    "no-restricted-syntax": "off" // need fix!
  }
};