const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");
const environment = require("./.env");

// Requires official Node.js MongoDB Driver 3.0.0+

const connection = Client.connect();
const connect = connection;

let isAdmin = false;
let dbInfo;

let mysql = require("mysql");
var connectionSQL = mysql.createConnection(SQL_Database);

function mongoConnect(req, res, next) {
  connect.then(() => {
    let db = Client.db(Mgdb_Data_Name);

    let query = {};

    db.collection("users")
      .find(query)
      .toArray(function(err, doc) {
        dbInfo = doc;
        return dbInfo;
      });
  });
}

mongoConnect();

function fizzBuzzLogin(req, res, next) {
  if (req.body.database == "Mongo") {
    let found = dbInfo.find(found => found.user === req.body.user);

    if (
      req.body.user === found.user &&
      bcrypt.compareSync(req.body.password, found.password) === true &&
      found.admin === true
    ) {
      res
        .status(200)
        .send({ response: "Access Granted / Admin", admin: found.admin });
      isAdmin = true;
      // closeConnection;
      console.log("Auth Success - Connection Closed");

      return;
    }
    if (
      req.body.user === found.user &&
      bcrypt.compareSync(req.body.password, found.password) === true &&
      found.admin === false
    ) {
      res.send({ response: "Access Granted" });
      isAdmin = false;
      // closeConnection;
      console.log("Auth Success - Connection Closed");

      return;
    }
  }

  if (req.body.database == "SQL") {
    let loginUser =
      "SELECT * from Users WHERE `UserName`=" +
      connectionSQL.escape(req.body.user);

    connectionSQL.query(loginUser, function(err, result) {
      let userSql = result;

      if (userSql[0].UserName == undefined) {
        res.sendStatus(401);
        return;
      }
      if (
        userSql[0].UserName === req.body.user &&
        userSql[0].IsAdmin === "true" &&
        bcrypt.compareSync(req.body.password, userSql[0].Password) === true
      ) {
        res.status(200).send({
          response: "Access Granted / Admin",
          admin: userSql[0].IsAdmin
        });
        isAdmin = true;

        console.log("Auth Success - Connection Closed");

        return;
      } else if (
        userSql[0].username === req.body.user &&
        userSql[0].admin === "false" &&
        bcrypt.compareSync(req.body.password, userSql[0].password) === true
      ) {
        res.send({ response: "Access Granted" });
        isAdmin = false;

        console.log("Auth Success - Connection Closed");

        return;
      }
    });
    if (req.body.database == undefined) {
      res.sendStatus(401);
    }
  }
}

function userInfo(req, res, next) {
  if (isAdmin === true) {
    return dbInfo;
  }
}

function checkAdmin() {
  if (isAdmin === true) return true;
}

// module.exports.checkDataBase = checkDataBase;
module.exports.checkAdmin = checkAdmin;
module.exports.mongoConnect = mongoConnect;
module.exports.userInfo = userInfo;
module.exports.fizzBuzzLogin = fizzBuzzLogin;
