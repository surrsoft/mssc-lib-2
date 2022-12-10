module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier',
    // 'prettier/react',
    // 'prettier/@typescript-eslint',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    'strict-boolean-expressions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-floating-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'no-misused-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'react/prop-types': 'off',
  }
};
