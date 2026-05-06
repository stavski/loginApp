const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",

  transform: {
    ...tsJestTransformCfg,
  },

  // Onde o Jest vai procurar testes
  testMatch: ["<rootDir>/tests/**/*.test.ts"],

  // Extensões que ele deve entender
  moduleFileExtensions: ["ts", "js", "json"],

  // Limpa mocks automaticamente entre testes
  clearMocks: true,

  // Diretório base (opcional, mas ajuda muito)
  roots: ["<rootDir>/src"],

  // Coverage (opcional mas recomendado)
  collectCoverageFrom: ["src/**/*.ts"],
};