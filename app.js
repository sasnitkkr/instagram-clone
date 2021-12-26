const express = require("express");
const app = express();
const PORT = 3000;  

app.get("/", (req, res) => {
  res.send("Hello Insta");
});

app.listen(PORT, () => {
  console.log("App Started at port " + PORT);
});
