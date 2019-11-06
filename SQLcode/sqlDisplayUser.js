const fizzBuzzLogin = require("../fizzBuzzLogin");
const environment = require("../.env");

let mysql = require("mysql");
var connection = mysql.createConnection(SQL_Database);

let displayResult = "SELECT * from Users";

function sqlUsers(req, res) {
  userInfo = fizzBuzzLogin.userInfo();
  if (userInfo === undefined) {
    res.status(401).send({ response: "Access Denied / Not Admin" });
    console.log("Not Admmin Attempt Logged");
  } else
    connection.query(displayResult, function(error, results, fields) {
      res.send(results);
    });
}

module.exports.sqlUsers = sqlUsers;
