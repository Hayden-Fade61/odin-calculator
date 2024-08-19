const calculator = require("../calculator");

describe("Handling Parentheses within expressions", function () {
  test("Parentheses 1", function () {
      expect(calculator.calculate("7/(5*2-(6/3))")).toEqual(0.875);
    }
  );
});