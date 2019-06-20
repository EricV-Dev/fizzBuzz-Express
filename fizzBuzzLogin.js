function fizzBuzzLogin(req, res) {
  let object = {
    user: "Fizz",
    password: "Buzz"
  };

  if (req.body.user === object.user && req.body.password === object.password) {
    res.status(200).send({ response: "Access Granted" });
  } else {
    res.sendStatus(401);
  }
}

module.exports.fizzBuzzLogin = fizzBuzzLogin;
