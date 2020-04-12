module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['graphql', 'import', 'react', '@typescript-eslint', 'prettier'],
  root: true,
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'relay',
        schemaJson: require('./site/src/__generated__/gatsby-introspection.json'),
        tagName: 'graphql',
      },
    ],
    semi: ['error', 'never'],
    'no-param-reassign': ['error', { props: false }],
  },
  settings: {
    react: {
      version: 'detect',
    },
    // This handles things like: import type { Node } from 'unist'
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
