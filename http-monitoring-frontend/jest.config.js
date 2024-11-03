/** @type {import('jest').Config} */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Specify the root directory of your Next.js app
});

// You can customize the Jest configuration here
const customJestConfig = {
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Set up testing library after the environment is created
  moduleNameMapper: {
    // Handle CSS imports (and other non-JS imports) here
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: ['app/**/*.{js,jsx}', '!app/test/**/*'], // Collect coverage from specific files
};

module.exports = createJestConfig(customJestConfig);