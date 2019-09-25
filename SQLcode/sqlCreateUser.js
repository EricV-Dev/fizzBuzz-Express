const fizzBuzzLogin = require("../fizzBuzzLogin");
const bcrypt = require("bcryptjs");

let mysql = require("mysql");
var connection = mysql.createConnection({
  host: "fnx6frzmhxw45qcb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "mqzdfrd6f1g51w98",
  password: "ydd1q0o7d6i76u6v",
  database: "iibflt0h88ep5e76"
});

let userInfo;
let index;
let user;
let admin;
let password;
let hashedPassword;
let salt = 10;

let displayResult = "SELECT * from Users";

function createUserSql(req, res, next) {
  userInfo = fizzBuzzLogin.userInfo();

  if (userInfo === undefined) {
    res.status(401).send({ response: "Access Denied / Not Admin" });
    console.log("Not Admmin Attempt Logged");
  } else
    connection.query(displayResult, function(error, results, fields) {
      res.send(results);
    });

  index = req.body.index;
  user = req.body.user;
  password = req.body.password;
  admin = req.body.admin;

  hashedPassword = bcrypt.hashSync(password, salt);

  if (admin === undefined) {
    admin = false;
  }

  createNewUser();
}

function createNewUser(req, res) {
  displayinfo = fizzBuzzLogin.userInfo();
  if (displayinfo != undefined) {
    let createNewUserQuery =
      " INSERT INTO `iibflt0h88ep5e76`.`Users` (`username`, `password`, `admin`) VALUES ('" +
      user +
      "', '" +
      password +
      "' , '" +
      admin +
      "')";

    connection.query(createNewUserQuery, function(err, result) {
      if (err) throw err;
    });
  }
}

module.exports.createUserSql = createUserSql;
