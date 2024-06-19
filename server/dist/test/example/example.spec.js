import example from "../../example/example.js";
describe("example test suite", () => {
    it("returns sum of 3 and 2", () => {
        const actual = example(3, 2);
        expect(actual).toBe(5);
    });
});
