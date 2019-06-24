let bcrypt = require("bcryptjs");

function fizzBuzzLogin(req, res) {
  let object = {
    user: "Fizz",
    password: "$2a$10$8GWVflBMw2ZaE3YqrqLD0uMjGzUXyx.lGsJDQ6o1tb8xRMekbntyu"
  };

  if (
    req.body.user === object.user &&
    bcrypt.compareSync(req.body.password, object.password) === true
  ) {
    res.status(200).send({ response: "Access Granted" });
  } else {
    res.sendStatus(401);
  }
}

module.exports.fizzBuzzLogin = fizzBuzzLogin;
