const calculator = require("../calculator");

describe("Arithmetic Operations Tests", function () {  
  test("Simple sum", function () {
      expect(calculator.add(1,1)).toEqual(2);
    }
  );
  test("Simple subtraction", function () {
      expect(calculator.subtract(5,3)).toEqual(2);
    }
  );
  test("Simple multiplication", function () {
      expect(calculator.multiply(2,1)).toEqual(2);
    }
  );
test("Simple division", function () {
      expect(calculator.divide(1,1)).toEqual(1);
    }
  );
});