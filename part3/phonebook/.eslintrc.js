module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    "no-console": 0
  }
}
