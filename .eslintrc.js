module.exports = {
  plugins: ['prettier', 'sort-imports-es6-autofix', 'html', 'json'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: { es6: true, browser: true, node: true },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
        arrowParens: 'always',
      },
    ],
    indent: ['error', 2, { flatTernaryExpressions: false }],
    'no-undef': ['error'],
    'no-unused-vars': ['warn'],
    'arrow-parens': ['error', 'always'],
    'no-debugger': 'warn',
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
  },
}
