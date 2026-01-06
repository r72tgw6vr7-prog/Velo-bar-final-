import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import designSystemPlugin from './eslint-plugin-deep.js';

export default [
  {
    ignores: ['archived/**'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'design-system': designSystemPlugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // React rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import rules
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/default': 'error',
      'import/namespace': 'error',

      // Accessibility rules
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/aria-props': 'off', // Allow boolean expressions in ARIA attributes

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      // Design System Enforcement - spacing rule disabled as it breaks layouts
      'design-system/enforce-8px-spacing': 'off',
      'design-system/enforce-card-layout': 'warn',
      'design-system/enforce-transitions': 'warn',

      // Prefer @ aliases over nested relative imports into core folders
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: [
                '^\\.{1,2}/components/.*',
                '^\\.{1,2}/foundation/.*',
                '^\\.{1,2}/lib/.*',
                '^\\.{1,2}/hooks/.*',
                '^\\.{1,2}/types/.*',
              ],
              message:
                'Use @/ alias (e.g., import x from "@/components/..." ) instead of deeply nested relative imports.',
            },
          ],
        },
      ],
    },
  },
  {
    // Override for test files - relax import rules since testing library exports aren't properly resolved
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      'import/named': 'off',
      'import/default': 'off',
      'import/namespace': 'off',
    },
  },
];
