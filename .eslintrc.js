module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json']
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  env: {
    node: true,
    browser: true,
    es2021: true
  }
};