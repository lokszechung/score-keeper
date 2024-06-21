import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	transform: { "^.+\\.ts?$": "ts-jest" },
	testEnvironment: "node",
	verbose: true,
	testRegex: "/test/.*\\.(test|spec)?\\.(ts|tsx)$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
