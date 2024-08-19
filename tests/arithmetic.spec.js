const calculator = require("../calculator");

describe("Arithmetic Operations Tests", function () {  
  test("Simple sum", function () {
      expect(calculator.calculate("1+1")).toEqual(2);
    }
  );
  test("Simple subtraction", function () {
      expect(calculator.calculate("5-3")).toEqual(2);
    }
  );
  test("Simple multiplication", function () {
      expect(calculator.calculate("2\u00d71")).toEqual(2);
    }
  );
test("Simple division", function () {
      expect(calculator.calculate("1\u00f71")).toEqual(1);
    }
  );
});