const bcrypt = require("bcryptjs");
const fizzBuzzLogin = require("../fizzBuzzLogin");
const sqlDisplyUser = require("./sqlDisplayUser");

let mysql = require("mysql");
var connection = mysql.createConnection(SQL_Database);
let result;

let userInfo;
let index;
let user;
let userOg;
let password;
let hashedPassword;
let salt = 10;
let duplicate = false;

let displayResult = "SELECT * from Users";

function sqlUpdateUser(req, res, next) {
  userInfo = fizzBuzzLogin.userInfo();

  index = req.body.index;
  user = req.body.user;
  userOg = req.body.ogUserSend;
  password = req.body.password;
  admin = req.body.admin;
  passChanged = req.body.passChanged;
  userChanged = req.body.userChanged;

  if (passChanged === true) {
    hashedPassword = bcrypt.hashSync(password, salt);
  }
  if (passChanged === false) {
    hashedPassword = req.body.password;
  }

  if (userInfo === undefined) {
    res.status(401).send({ response: "Access Denied / Not Admin" });
    console.log("Not Admmin Attempt Logged");
    return;
  }

  if (userChanged === true) {
    // sending only first unless delete if statement.
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
      sqlUpdate();
      return;
    });
  }
}

function sqlUpdate(req, res, next) {
  let updateNewUserQuery =
    "UPDATE `iibflt0h88ep5e76`.`Users` SET `UserName`=" +
    connection.escape(user) +
    ", `Password`=" +
    connection.escape(hashedPassword) +
    ", `IsAdmin`=" +
    connection.escape(admin) +
    " WHERE `UserName`=" +
    connection.escape(userOg);

  connection.query(updateNewUserQuery, function(err, result) {
    if (err) throw err;
  });
}

module.exports.sqlUpdateUser = sqlUpdateUser;

// if (value.UserName.indexOf(user) !== -1) {
//   res.status(403).send({
//     response: "Duplicate"
//   });
//   return;
// } else res.send(userInfo);
// sqlUpdate();
// return;
