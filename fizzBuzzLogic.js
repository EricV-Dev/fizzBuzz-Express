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

function fizzBuzzLog(urlnum) {
  let x = [];
  for (let num = 1; num <= urlnum; num++) {
    let result = fizzBuzz(num);
    x.push({ num, result });
  }
  const defaultValue = 10;
  if (x.length <= 0) {
    x = fizzBuzzLog(defaultValue);
  }
  return x;
}

function fizzBuzzParam(req, res) {
  let x = fizzBuzzLog(req.query.num);
  res.send(x);
}

module.exports.fizzBuzzLog = fizzBuzzLog;
module.exports.fizzBuzzParam = fizzBuzzParam;
