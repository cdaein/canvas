/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  setupFiles: ["jest-canvas-mock"],
  testEnvironment: "jest-environment-jsdom",
};
