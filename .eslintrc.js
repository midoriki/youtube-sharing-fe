module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'eslint:recommended',
    'react-app',
    'react-app/jest',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',
    'object-curly-spacing': [ 'warn', 'always' ],
    'array-bracket-spacing': [ 'warn', 'always' ],
    'block-spacing': [ 'warn', 'always' ],
    'semi': [ 'warn', 'always' ],
    'func-call-spacing': [ 'warn', 'never' ],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-function': [ 'warn', { allow: [ 'arrowFunctions' ] } ],
    'no-multi-spaces': 'warn',
    'space-in-parens': 'warn',
    'comma-dangle': [ 'warn', 'always-multiline' ],
    'space-infix-ops': 'warn',
    'quotes': [ 'warn', 'single' ],
    'key-spacing': 'warn',
    'space-before-function-paren': 'warn',
    'multiline-ternary': 'off',
    'object-shorthand': 'off',
    'curly': [ 'warn', 'multi-line' ],
    'indent': [ 'warn', 2 ],
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-wrap-multilines': [ 'warn', {
      'declaration': 'parens-new-line',
      'assignment': 'parens-new-line',
      'return': 'parens-new-line',
      'arrow': 'parens-new-line',
      'condition': 'parens-new-line',
      'logical': 'parens-new-line',
    } ],
    'testing-library/no-unnecessary-act': 'off',
    'testing-library/no-node-access': 'off',
  },
};
