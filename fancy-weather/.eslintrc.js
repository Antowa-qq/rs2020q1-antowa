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
        "guard-for-in": "off",
        "no-loop-func": "off",
        "import/prefer-default-export": "off",
        "no-use-before-define": "off",
        "no-restricted-syntax": "off",
        "no-underscore-dangle":"off",
        "no-param-reassign":"off",
        "camelcase": "off"
    }
};