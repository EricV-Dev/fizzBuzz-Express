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
      for (let value of Object.values(results)) {
        if (value.username.indexOf(user) !== -1) {
          res.status(403).send({
            response: "Duplicate"
          });
          return;
        } else res.send(userInfo);
        createNewUser();
        return;
      }
    });
}

function createNewUser(req, res) {
  displayinfo = fizzBuzzLogin.userInfo();

  if (displayinfo != undefined) {
    let createNewUserQuery =
      " INSERT INTO `iibflt0h88ep5e76`.`Users` (`username`, `password`, `admin`) VALUES (" +
      connection.escape(user) +
      "," +
      connection.escape(password) +
      "," +
      connection.escape(String(admin)) +
      ")";

    console.log(typeof admin);
    connection.query(createNewUserQuery, function(err, result) {
      if (err) throw err;
    });
  }
}

module.exports.createUserSql = createUserSql;

// function createNewUser(req, res) {
//   displayinfo = fizzBuzzLogin.userInfo();
//   if (displayinfo != undefined) {
//     let createNewUserQuery =
//       " INSERT INTO `iibflt0h88ep5e76`.`Users` (`username`, `password`, `admin`) VALUES ('" +
//       user +
//       "', '" +
//       hashedPassword +
//       "' , '" +
//       admin +
//       "')";

//     connection.query(createNewUserQuery, function(err, result) {
//       if (err) throw err;
//     });
//   }
// }
