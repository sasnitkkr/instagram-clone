const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
require("./models/user");
mongoose.connect(MONGOURI);
app.use(express.json());

/*  Route :-  /signup       */
app.use(require("./routes/auth"));

mongoose.connection.on("connected", () => {
  console.log("Connected with mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log("App Started at port " + PORT);
});
