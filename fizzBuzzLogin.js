function fizzBuzzLogin(req, res) {
  let object = {
    user: "Fizz",
    password: "Buzz"
  };

  if (req.body.user === object.user && req.body.password === object.password) {
    res.send({ resposne: "Access Granted" });
  } else {
    res.send({ resposne: "Access Denied" });
  }
}

module.exports = fizzBuzzLogin;
