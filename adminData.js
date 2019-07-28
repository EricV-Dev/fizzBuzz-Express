const fizzBuzzLogin = require("./fizzBuzzLogin");

function adminData(req, res, next) {
  let userInfo = fizzBuzzLogin.userInfo();
  res.send(userInfo);
}

module.exports.adminData = adminData;
