module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    quotes: "off",
    "comma-dangle": "off",
    "object-curly-newline": "off",
    camelcase: "off",
  },
};