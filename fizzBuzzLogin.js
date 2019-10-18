const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

// Requires official Node.js MongoDB Driver 3.0.0+

const url = "mongodb://Fizz:Buzz123@ds151007.mlab.com:51007/heroku_blmkvj2v";
const client = mongodb.MongoClient(url, { useNewUrlParser: true });
// const closeConnection = client.close();
const connection = client.connect();
const connect = connection;

let isAdmin = false;
let dbInfo;

let mysql = require("mysql");
var connectionSQL = mysql.createConnection({
  host: "fnx6frzmhxw45qcb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "mqzdfrd6f1g51w98",
  password: "ydd1q0o7d6i76u6v",
  database: "iibflt0h88ep5e76"
});

function mongoConnect(req, res, next) {
  connect.then(() => {
    let db = client.db("heroku_blmkvj2v");

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
  // seems to not be actually getting the database upon login
  if (req.body.database == "SQL") {
    let loginUser =
      "SELECT * from Users WHERE `username`='" + req.body.user + "';";
    connectionSQL.query(loginUser, function(err, result) {
      let userSql = result;

      if (userSql[0].username == undefined) {
        res.sendStatus(401);
        return;
      }
      if (
        userSql[0].username === req.body.user &&
        userSql[0].admin === "true" &&
        bcrypt.compareSync(req.body.password, userSql[0].password) === true
      ) {
        res.status(200).send({
          response: "Access Granted / Admin",
          admin: userSql[0].admin
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
