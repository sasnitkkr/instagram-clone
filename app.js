const express = require("express");
const app = express();
const PORT = 3000;

function customMiddleware(req, res, next) {
  console.log("Middleware Executed");
  next();
}

app.get("/", (req, res) => {
  console.log("Inside Home route");
  res.send("Hello Insta");
});

app.get("/about", customMiddleware, (req, res) => {
  console.log("Inside about route");
  res.send("Hello About");
});

app.listen(PORT, () => {
  console.log("App Started at port " + PORT);
});
