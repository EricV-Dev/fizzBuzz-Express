const express = require("express");
const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

const app = express();

// Requires official Node.js MongoDB Driver 3.0.0+

let client = mongodb.MongoClient;
let url =
  "mongodb://Eric1924:Swiss1987!@ds151007.mlab.com:51007/heroku_blmkvj2v";

function fizzBuzzLogin(req, res) {
  client.connect(url, function(err, client) {
    let db = client.db("heroku_blmkvj2v");

    let collection = db.collection("users");

    collection.find("Fizz");

    let query = {};

    let cursor = collection.find(query);

    cursor.forEach(
      function(doc) {
        if (
          req.body.user === doc.user &&
          bcrypt.compareSync(req.body.password, doc.password) === true
        ) {
          res.status(200).send({ response: "Access Granted" });
        } else {
          res.sendStatus(401);
        }
      },
      function(err) {
        client.close();
      }
    );

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/
  });
}

module.exports.fizzBuzzLogin = fizzBuzzLogin;
