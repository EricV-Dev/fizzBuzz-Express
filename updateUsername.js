const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");
const fizzBuzzLogin = require("./fizzBuzzLogin");

const url = "mongodb://Fizz:Buzz123@ds151007.mlab.com:51007/heroku_blmkvj2v";
const client = mongodb.MongoClient(url, { useNewUrlParser: true });
const connection = client.connect();
const connect = connection;

let userInfo;
let index;
let user;
let password;
let hashedPassword;
let salt = 10;

function showUsers(req, res, next) {
  userInfo = fizzBuzzLogin.userInfo();

  index = req.body.index;
  user = req.body.user;
  password = req.body.password;
  admin = req.body.admin;
  passChanged = req.body.passChanged;

  if (passChanged === true) {
    hashedPassword = bcrypt.hashSync(password, salt);
  } else {
    hashedPassword = req.body.password;
  }

  updateUserName();
}

function updateUserName(req, res, next) {
  let newValues = {
    $set: { user: user, password: hashedPassword, admin: admin }
  };

  let db = client.db("heroku_blmkvj2v");
  db.collection("users").updateMany(
    userInfo[index],
    newValues,

    function() {
      fizzBuzzLogin.mongoConnect();
    }
  );
}

module.exports.showUsers = showUsers;
module.exports.updateUserName = updateUserName;
