const fizzBuzzLogin = require("../fizzBuzzLogin");
const bcrypt = require("bcryptjs");

let mysql = require("mysql");
var connection = mysql.createConnection(SQL_Database);

let userInfo;
let user;
let admin;
let password;
let hashedPassword;
let salt = 10;

let displayResult = "SELECT * from Users";

function createUserSql(req, res, next) {
  userInfo = fizzBuzzLogin.userInfo();
  user = req.body.user;
  password = bcrypt.hashSync(req.body.password, salt);
  admin = req.body.admin;

  if (admin === undefined) {
    admin = false;
  }

  if (userInfo === undefined) {
    res.status(401).send({ response: "Access Denied / Not Admin" });
    console.log("Not Admmin Attempt Logged");
    return;
  } else
    connection.query(displayResult, function(error, results, fields) {
      for (value of results) {
        if (value.UserName === user) {
          res.status(403).send({
            response: "Duplicate"
          });
          return;
        }
      }
      res.send(userInfo);
      createNewUser();
      return;
    });
}

function createNewUser(req, res) {
  displayinfo = fizzBuzzLogin.userInfo();

  if (displayinfo != undefined) {
    let createNewUserQuery =
      " INSERT INTO `iibflt0h88ep5e76`.`Users` (`UserName`, `Password`, `IsAdmin`) VALUES (" +
      connection.escape(user) +
      "," +
      connection.escape(password) +
      "," +
      connection.escape(String(admin)) +
      ")";

    connection.query(createNewUserQuery, function(err, result) {
      if (err) throw err;
    });
  }
}

module.exports.createUserSql = createUserSql;
