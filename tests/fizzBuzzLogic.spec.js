const fizzBuzzLogic = require("../fizzBuzzLogic");

describe("fB", function() {
  it("should be a function", function() {
    expect(fizzBuzzLogic.fizzBuzzLog).toBeInstanceOf(Function);
  });
});

test("fizzBuzzLog - should match expected values array", () => {
  let x = [];
  const result = fizzBuzzLogic.fizzBuzzLog(36);
  for (var results in result) {
    if (result.hasOwnProperty(results)) {
      var myActualPropFromObj = result[results];

      var shouldbeRessults = myActualPropFromObj.result;
    }
    x.push(shouldbeRessults);
  }

  let resultString =
    "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, Fizz Buzz, 16, 17, Fizz, 19, Buzz, Fizz, 22, 23, Fizz, Buzz, 26, Fizz, 28, 29, Fizz Buzz, 31, 32, Fizz, 34, Buzz, Fizz";
  let output = resultString.split(", ");

  expect(x).toEqual(output);
});

test("fizzBuzzLog default should be length of 10", () => {
  let x = [];
  const result = fizzBuzzLogic.fizzBuzzLog(0);
  for (var results in result) {
    if (result.hasOwnProperty(results)) {
      var myActualPropFromObj = result[results];

      var shouldbeRessults = myActualPropFromObj.result;
    }
    x.push(shouldbeRessults);
  }
  expect(x.length).toEqual(10);
});

test("fizzBuzzLog should be right length", () => {
  let x = [];
  const result = fizzBuzzLogic.fizzBuzzLog(5);
  for (var results in result) {
    if (result.hasOwnProperty(results)) {
      var myActualPropFromObj = result[results];

      var shouldbeRessults = myActualPropFromObj.result;
    }
    x.push(shouldbeRessults);
  }
  expect(x.length).toEqual(5);
});
