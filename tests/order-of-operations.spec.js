 describe("Order of Operations tests" ,function () {
  test("Order of operations 1", function () {
      expect(calculator.calculate("-25+32+3*6")).toEqual(25);
    }
  );
  test("Order of operations 2", function () {
      expect(calculator.calculate("3+6*7")).toEqual(45);
    }
  );
});