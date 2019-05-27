function fizzBuzzLogic(req, res, next) {
  let x = [];
  for (let i = 1; i <= 36; i++) {
    let resArray = fizzBuzz(i);
    x.push(resArray);
  }
  res.send(x);
  console.log(x.length);
}

function fizzBuzz(i) {
  let retVal = "";

  let notDivBy3 = false;
  let notDivBy5 = false;

  if (i % 3 == 0) {
    retVal += "Fizz";
    notDivBy3 = true;
  }

  if (i % 5 == 0) {
    retVal += " Buzz";
    retVal = retVal.trim();
    notDivBy5 = true;
  }

  if (notDivBy3 == false && notDivBy5 == false) {
    return String(i);
  }
  return retVal;
}

module.exports = fizzBuzzLogic;

module.exports.fizzBuzzResults = function() {
  let x = [];
  for (let i = 1; i <= 36; i++) {
    let resArray = fizzBuzz(i);
    x.push(resArray);
  }
  return x;
};
