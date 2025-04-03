/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testTimeout: 10_000,
  testEnvironment: 'node',
  transform: {
    '^.+\.tsx?$': ['ts-jest', {}],
  },
};
