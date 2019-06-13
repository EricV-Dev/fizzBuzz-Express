const express = require("express");
const bodyParser = require("body-parser");
const fizzBuzzLogin = require("./fizzBuzzLogin");
const fizzBuzzParam = require("./fizzBuzzLogic");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("FizzBuzzApp");
  next();
});

app.use("/api/login", fizzBuzzLogin);

app.use("/api/fizzBuzz", fizzBuzzParam);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
