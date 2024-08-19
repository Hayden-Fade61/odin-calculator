const calculator = require("./calculator");

// describe("parseInput", function(){
//   test("Can enter positive numbers", function () {
//     expect(parseInput("374").toEqual(374));
//   });
//   test("Can enter negative numbers", function () {
//     expect(parseInput("-374").toEqual(374));
//   });
//   test("Illegal characters ignored", function () {
//     expect(parseInput("37 4a").toEqual(374));
//   });
// });

describe("calculate", function() {
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
  test("Order of operations", function () {
      expect(calculator.calculate("25-32+3\u00d76")).toEqual(11);
    }
  );
});