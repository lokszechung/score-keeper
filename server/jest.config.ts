import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	transform: {},
	// preset: "ts-jest",
	testEnvironment: "node",
	verbose: true,
	testMatch: ["<rootDir>/dist/**/*.{spec,test}.js"],
	transformIgnorePatterns: [],
};

export default config;
