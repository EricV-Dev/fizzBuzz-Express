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

  //   if (this.user == user) {
  //     res.send(user);
  //   } else {
  //     res.send("blah");
  //   }
}

module.exports = fizzBuzzLogin;
