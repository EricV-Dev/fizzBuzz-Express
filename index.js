const express = require("express");
const fizzBuzzLogin = require("./fizzBuzzLogin");
const fizzBuzzParam = require("./fizzBuzzLogic");
const app = express();

const cors = require("cors");

app.use(cors());

app.get("/", (req, res, next) => {
  res.send("FizzBuzzApp");
  next();
});

app.get("/login", fizzBuzzLogin);

app.use("/api/fizzBuzz", fizzBuzzParam);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
