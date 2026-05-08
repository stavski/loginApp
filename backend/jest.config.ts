import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>./tests/jest.setup.ts"],

  moduleFileExtensions: ["ts", "js", "json"],
  clearMocks: true,
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  collectCoverageFrom: ["src/**/*.ts"],
};