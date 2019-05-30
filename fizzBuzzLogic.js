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

function fizzBuzzLog() {
  const fizzLoop = 36;
  let x = [];
  for (let i = 1; i <= fizzLoop; i++) {
    let resArray = fizzBuzz(i);
    x.push(resArray);
  }
  return x;
}

function fizzBuzzLogic(req, res) {
  let x = fizzBuzzLog();
  res.send(x);
}

module.exports = fizzBuzzLogic;

module.exports.fizzBuzzResults = function() {
  let x = fizzBuzzLog();
  return x;
};
