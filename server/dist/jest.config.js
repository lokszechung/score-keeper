const config = {
    transform: {},
    // preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    testMatch: ["<rootDir>/dist/**/*.{spec,test}.js"],
    transformIgnorePatterns: [],
};
export default config;
