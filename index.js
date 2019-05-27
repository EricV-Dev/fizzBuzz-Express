const express = require("express");
const fizzBuzzLogic = require("./fizzBuzzLogic");
const app = express();

app.use(fizzBuzzLogic);

app.get("/", (req, res) => {
  res.send("FizzBuzzApp");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
