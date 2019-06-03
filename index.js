const express = require("express");
const fizzBuzzLogic = require("./fizzBuzzLogic");
const app = express();

const cors = require("cors");

app.use(cors());

app.get("/", (req, res, next) => {
  res.send("FizzBuzzApp");
  next();
});

app.use("/api/fizzBuzz", fizzBuzzLogic);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
