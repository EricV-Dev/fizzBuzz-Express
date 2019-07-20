const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

// Requires official Node.js MongoDB Driver 3.0.0+

const url = "mongodb://Fizz:Buzz123@ds151007.mlab.com:51007/heroku_blmkvj2v";
const client = mongodb.MongoClient(url, { useNewUrlParser: true });
const closeConnection = client.close();
const connection = client.connect();
const connect = connection;
let dbInfo;

connect.then(() => {
  console.log("connected to db");
  let db = client.db("heroku_blmkvj2v");

  let collection = db.collection("users");
  let query = {};

  let cursor = collection.find(query);
  cursor.forEach(function(doc) {
    dbInfo = doc;
  });
});

function fizzBuzzLogin(req, res) {
  if (
    req.body.user === dbInfo.user &&
    bcrypt.compareSync(req.body.password, dbInfo.password) === true
  ) {
    res.status(200).send({ response: "Access Granted" });
    closeConnection;
    console.log("Auth Success - Connection Closed");
  } else {
    res.sendStatus(401);
  }
}

module.exports.fizzBuzzLogin = fizzBuzzLogin;
