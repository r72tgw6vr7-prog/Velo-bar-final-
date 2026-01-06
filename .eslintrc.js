module.exports = {
  extends: [
    // Your existing extends...
  ],
  rules: {
    // Allow any type in specific cases
    '@typescript-eslint/no-explicit-any': 'warn',
    // Temporarily allow console statements in development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // Allow unused variables with _ prefix
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // Prefer Node.js built-in modules but not required
    'node/prefer-global/process': 'warn',
    // Other rules...
  },
  ignorePatterns: ['node_modules/**', 'dist/**', 'tests/**', '**/*.d.ts'],
};
