const fizzBuzzLogin = require("./fizzBuzzLogin");
const mongodb = require("mongodb");
const environment = require("./.env");

// Requires official Node.js MongoDB Driver 3.0.0+

// const url = "mongodb://Fizz:Buzz123@ds151007.mlab.com:51007/heroku_blmkvj2v";
// const client = mongodb.MongoClient(url, { useNewUrlParser: true });

const connection = CLIENT.connect();
const connect = connection;

function displayUser(req, res, next) {
  displayinfo = fizzBuzzLogin.userInfo();

  if (displayinfo != undefined) {
    connect.then(() => {
      let db = CLIENT.db(MGDB_DATA_NAME);

      let query = {};

      db.collection("users")
        .find(query)

        .toArray(function(err, doc) {
          dbInfo = doc;
          console.log("Userdetail Sent");
          res.send(dbInfo);
        });
    });
  } else {
    console.log("Not Admin Logged");
  }
}

module.exports.displayUser = displayUser;
