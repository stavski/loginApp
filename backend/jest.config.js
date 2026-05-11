/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  clearMocks: true,
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  collectCoverageFrom: ["src/**/*.ts"],
};