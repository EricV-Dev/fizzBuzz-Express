const fizzBuzzLogin = require("./fizzBuzzLogin");
const mongodb = require("mongodb");

// Requires official Node.js MongoDB Driver 3.0.0+

const url = "mongodb://Fizz:Buzz123@ds151007.mlab.com:51007/heroku_blmkvj2v";
const client = mongodb.MongoClient(url, { useNewUrlParser: true });
// const closeConnection = client.close();
const connection = client.connect();
const connect = connection;

function displayUser(req, res, next) {
  userInfo = fizzBuzzLogin.checkAdmin();
  if (userInfo === true) {
    connect.then(() => {
      let db = client.db("heroku_blmkvj2v");

      let query = {};

      db.collection("users")
        .find(query)
        .toArray(function(err, doc) {
          dbInfo = doc;
          res.send(dbInfo);
        });
    });
  } else {
    console.log("Access Denied - Logged ");
  }
}

module.exports.displayUser = displayUser;
