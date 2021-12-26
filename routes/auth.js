const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Enter all valid fields" });
  }
  User.findOne({ email: email }, function (err, foundUser) {
    if (err) {
      console.log("Error finding user with given mail.");
      console.log(err);
    } else {
      if (foundUser) {
        res.status(422).json({ err: "User already exists with given email." });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });
        newUser.save();
        res.json({ message: "Successfully saved user" });
      }
    }
  });
});

module.exports = router;
