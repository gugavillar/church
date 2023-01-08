module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'next/core-web-vitals',
    'standard',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'jsx-a11y', 'prettier', '@typescript-eslint'],
  ignorePatterns: ['yarn.lock', 'package.json', '*/**/*.png', 'README.md'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'jsx-quotes': ['error', 'prefer-single'],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'none',
        arrowParens: 'always',
        semi: false,
        singleAttributePerLine: true,
        endOfLine: 'auto'
      }
    ],
    'no-extra-boolean-cast': 'off',
    camelcase: 'off',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/prefer-single-boolean-return': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'array-callback-return': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/order': [
      'error',
      {
        groups: [['external', 'builtin'], 'internal', ['parent', 'sibling'], ['index', 'object', 'type']],
        pathGroups: [
          {
            pattern: '@chakra-ui/react',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@*/components',
            group: 'internal',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'jsx-a11y/alt-text': [
      'warn',
      {
        elements: ['img'],
        img: ['Image']
      }
    ],
    'no-implicit-coercion': ['warn', { allow: ['!!'] }],
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {}
    },
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts']
    }
  }
}
