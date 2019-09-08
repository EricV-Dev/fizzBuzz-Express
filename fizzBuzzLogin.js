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

const cors = require("cors");

app.use(cors());

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

  res.sendStatus(401);
}

function userInfo(req, res, next) {
  if (isAdmin === true) {
    return dbInfo;
  }
}

function checkAdmin() {
  if (isAdmin === true) return true;
}

module.exports.checkAdmin = checkAdmin;
module.exports.mongoConnect = mongoConnect;
module.exports.userInfo = userInfo;
module.exports.fizzBuzzLogin = fizzBuzzLogin;
