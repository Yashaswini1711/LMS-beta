import { defaults } from "jest-config";

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts", "cts"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};

export default config;
