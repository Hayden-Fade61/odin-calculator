describe("parseInput", function(){
  test("Can enter positive numbers", function () {
    expect(parseInput("374").toEqual(374));
  });
  test("Can enter negative numbers", function () {
    expect(parseInput("-374").toEqual(374));
  });
  test("Illegal characters ignored", function () {
    expect(parseInput("37 4a").toEqual(374));
  });
});