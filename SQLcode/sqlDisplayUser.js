const fizzBuzzLogin = require("../fizzBuzzLogin");

let mysql = require("mysql");
var connection = mysql.createConnection({
  host: "fnx6frzmhxw45qcb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "mqzdfrd6f1g51w98",
  password: "ydd1q0o7d6i76u6v",
  database: "iibflt0h88ep5e76"
});

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