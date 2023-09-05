module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    // '@unocss',
    '@salomaosnff/eslint-config/typescript',
    '@salomaosnff/eslint-config/vue',
    './.eslintrc-auto-import.json',

  ],
  'overrides': [
    {
      'env': { 'node': true },
      'files': ['.eslintrc.{js,cjs}'],
      'parserOptions': { 'sourceType': 'script' },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {},
};
