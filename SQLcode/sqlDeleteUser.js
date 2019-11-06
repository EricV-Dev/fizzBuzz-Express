const fizzBuzzLogin = require("../fizzBuzzLogin");

let mysql = require("mysql");
var connection = mysql.createConnection(SQL_Database);

let userInfo;
let user;

let displayResult = "SELECT * from Users";

function deleteUserSQL(req, res, next) {
  userInfo = fizzBuzzLogin.userInfo();

  if (userInfo === undefined) {
    res.status(401).send({ response: "Access Denied / Not Admin" });
    console.log("Not Admmin Attempt Logged");
  } else
    connection.query(displayResult, function(error, results, fields) {
      result = results;

      res.send(results);
    });

  user = req.body.user;
  deleteUser = req.body.delete;

  if (deleteUser === true) {
    sqlDelete();
  }
}

function sqlDelete(req, res, next) {
  let updateNewUserQuery =
    "DELETE FROM `iibflt0h88ep5e76`.`Users` WHERE `username`=" +
    connection.escape(user);
  connection.query(updateNewUserQuery, function(err, result) {
    if (err) throw err;
  });
}

module.exports.deleteUserSQL = deleteUserSQL;
module.exports.sqlDelete = sqlDelete;

//let updateNewUserQuery = "DELETE FROM `iibflt0h88ep5e76`.`Users` WHERE `username`='" + user + "';";
