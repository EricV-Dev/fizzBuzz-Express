const mongodb = require("mongodb");
const fizzBuzzLogin = require("./fizzBuzzLogin");
const displayuser = require("./displayuser");

const url = "mongodb://Fizz:Buzz123@ds151007.mlab.com:51007/heroku_blmkvj2v";
const client = mongodb.MongoClient(url, { useNewUrlParser: true });
const connection = client.connect();
const connect = connection;

let userInfo;
let index;

function deleteUser(req, res, next) {
  userInfo = fizzBuzzLogin.userInfo();

  index = req.body.index;
  deleteUser = req.body.delete;

  if (deleteUser === true) {
    deleteUserObj();
  }
}

function deleteUserObj(req, res, next) {
  let db = client.db("heroku_blmkvj2v");
  db.collection("users").deleteOne(
    userInfo[index],

    function() {
      fizzBuzzLogin.mongoConnect();
    },

    function() {
      displayuser.displayuser();
    }
  );
}

module.exports.deleteUser = deleteUser;
module.exports.deleteUserObj = deleteUserObj;
