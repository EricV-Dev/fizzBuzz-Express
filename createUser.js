const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");
const fizzBuzzLogin = require("./fizzBuzzLogin");

const url = "mongodb://Fizz:Buzz123@ds151007.mlab.com:51007/heroku_blmkvj2v";
const client = mongodb.MongoClient(url, { useNewUrlParser: true });
const connection = client.connect();
const connect = connection;

let userInfo;
let user;
let password;
let hashedPassword;
let salt = 10;

function createUser(req, res, next) {
  userInfo = fizzBuzzLogin.userInfo();
  user = req.body.user;
  password = req.body.password;
  admin = req.body.admin;

  for (let value of Object.values(userInfo)) {
    if (value.user.indexOf(user) !== -1) {
      res.status(403).send({
        response: "Duplicate"
      });
    }
  }
  res.send(userInfo);
  hashedPassword = bcrypt.hashSync(password, salt);

  if (admin === undefined) {
    admin = false;
  }

  createNewUser();
}

function createNewUser(req, res, next) {
  let newValues = {
    user: user,
    password: hashedPassword,
    admin: admin
  };

  let db = client.db("heroku_blmkvj2v");
  db.collection("users").insertOne(
    newValues,

    function() {
      fizzBuzzLogin.mongoConnect();
    }
  );
}

module.exports.createUser = createUser;
