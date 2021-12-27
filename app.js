const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

/* =============== DB Connection =============== */
mongoose.connect(MONGOURI);
mongoose.connection.on("connected", () => {
  console.log("Connected with mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

/* =============== app.use =============== */
app.use(express.json());

/* =============== Register Models =============== */
require("./models/user");
require("./models/post");

/* =============== Routes =============== */
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

/* =============== Listen at PORT =============== */
app.listen(PORT, () => {
  console.log("App Started at port " + PORT);
});
