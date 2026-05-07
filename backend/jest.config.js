const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  preset: 'ts-jest',

  testEnvironment: "node",

  transform: {
    ...tsJestTransformCfg,
  },

  testMatch: ["<rootDir>/tests/**/*.test.ts"],

  moduleFileExtensions: ["ts", "js", "json"],

  clearMocks: true,

  roots: ["<rootDir>/src", "<rootDir>/tests"],

  collectCoverageFrom: ["src/**/*.ts"],
};