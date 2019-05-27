const fB = require("../fizzBuzzLogic");

test("fizzBuzzLogic - should match expected values array", () => {
  const result = fB.fizzBuzzResults();
  let resultString =
    "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, Fizz Buzz, 16, 17, Fizz, 19, Buzz, Fizz, 22, 23, Fizz, Buzz, 26, Fizz, 28, 29, Fizz Buzz, 31, 32, Fizz, 34, Buzz, Fizz";
  let output = resultString.split(", ");

  expect(result).toEqual(output);
});
