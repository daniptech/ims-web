module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest:true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': 1,
    'no-undef': 1,
    'multiline-ternary': 0,
    'no-mixed-operators': 0,
    'react/prop-types': 0,
    'no-unexpected-multiline': 0,
    'array-callback-return': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-debugger':1,
  },
  settings: {
    react: {
      version: 'detect', // You can also specify a specific version like '17'
    },
  },
};
