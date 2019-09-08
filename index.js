const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");

const fizzBuzzLogin = require("./fizzBuzzLogin");
const fizzBuzzLogic = require("./fizzBuzzLogic");
const updateUsername = require("./updateUsername");
const deleteUser = require("./deleteUser");
const createUser = require("./createUser");
const displayUser = require("./displayUser");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

app.get("/", (req, res, next) => {
  res.send("FizzBuzzApp");
  next();
});

app.use("/api/login", fizzBuzzLogin.fizzBuzzLogin);

app.use("/api/fizzBuzz", fizzBuzzLogic.fizzBuzzParam);

app.use("/api/updateUsername", updateUsername.showUsers);

app.use("/api/deleteUser", deleteUser.deleteUser);

app.use("/api/createUser", createUser.createUser);

app.use("/api/displayUser", displayUser.displayUser);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
