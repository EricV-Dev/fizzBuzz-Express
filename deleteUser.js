const mongodb = require("mongodb");
const fizzBuzzLogin = require("./fizzBuzzLogin");
const environment = require("./.env");

const connection = CLIENT.connect();
const connect = connection;

let userInfo;
let index;

function deleteUser(req, res, next) {
  userInfo = fizzBuzzLogin.userInfo();

  if (userInfo === undefined) {
    res.status(401).send({ response: "Access Denied / Not Admin" });
    console.log("Not Admmin Attempt Logged");
  } else res.send(userInfo);

  index = req.body.index;
  deleteUser = req.body.delete;

  if (deleteUser === true) {
    deleteUserObj();
  }
}

function deleteUserObj(req, res, next) {
  let db = CLIENT.db(MGDB_DATA_NAME);
  db.collection("users").deleteOne(
    userInfo[index],

    function() {
      fizzBuzzLogin.mongoConnect();
    }
  );
}

module.exports.deleteUser = deleteUser;
module.exports.deleteUserObj = deleteUserObj;
