var expert = require('expect');

describe('App', () => {
    it("should properly run tests", () => {
        expert(1).toBe(1);
    });
});