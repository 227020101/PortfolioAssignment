/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000, // Set the default timeout to10 seconds
  maxWorkers: 2,
  bail: true,
};