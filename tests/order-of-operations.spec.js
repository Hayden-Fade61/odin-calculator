const calculator = require("../calculator.js");

 describe("Order of Operations tests", function () {
  test("Order of operations 1", function () {
      expect(calculator.calculate("-25+32+3*6")).toEqual(25);
    }
  );
  test("Order of operations 2", function () {
      expect(calculator.calculate("3+6*7")).toEqual(45);
    }
  );
  test("Order of operations 3", function () {
      expect(calculator.calculate("3/2+7")).toEqual(8.5);
    }
  );
  test("Left-to-right rule 1", function (){
    expect(calculator.calculate("7-3-2")).toEqual(2);
    }
  );
  test("Left-to-right rule 2", function (){
    expect(calculator.calculate("25-32+18")).toEqual(11);
    }
  );
  }
);