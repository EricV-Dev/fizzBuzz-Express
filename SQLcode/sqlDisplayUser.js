const fizzBuzzLogin = require("../fizzBuzzLogin");

let mysql = require("mysql");
var connection = mysql.createConnection({
  host: "fnx6frzmhxw45qcb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "mqzdfrd6f1g51w98",
  password: "ydd1q0o7d6i76u6v",
  database: "iibflt0h88ep5e76"
});

function sqlUsers(req, res) {
  displayinfo = fizzBuzzLogin.userInfo();
  if (displayinfo != undefined) {
    connection.query("SELECT * from Users", function(error, results, fields) {
      if (error) throw error;

      res.send(results);
    });
  }
}

module.exports.sqlUsers = sqlUsers;
