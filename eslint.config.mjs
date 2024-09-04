// @ts-check
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/**', 'dist/**', '.env'], // Add your ignore patterns here
  },
  {
    // Specify file extensions to lint

    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
  {
    files: ['/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: { globals: globals.node },
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
