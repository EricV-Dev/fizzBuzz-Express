const fizzBuzzLogin = require("../fizzBuzzLogin");

let mysql = require("mysql");
var connection = mysql.createConnection({
  host: "fnx6frzmhxw45qcb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "mqzdfrd6f1g51w98",
  password: "ydd1q0o7d6i76u6v",
  database: "iibflt0h88ep5e76"
});

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
    "DELETE FROM `iibflt0h88ep5e76`.`Users` WHERE `username`='" + user + "';";

  connection.query(updateNewUserQuery, function(err, result) {
    if (err) throw err;
  });
}

module.exports.deleteUserSQL = deleteUserSQL;
module.exports.sqlDelete = sqlDelete;
