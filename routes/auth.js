const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const requireLogin = require("../middlewares/requireLogin");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

router.post("/signup", (req, res) => {
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
        bcrypt.hash(password, saltRounds, function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            console.log("Error in bcrypting");
          } else {
            const newUser = new User({
              name: name,
              email: email,
              password: hash,
            });
            newUser.save();
            res.json({ message: "Successfully saved user" });
          }
        });
      }
    }
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "enter all fields" });
  }
  User.findOne({ email: email }, function (err, foundUser) {
    if (err) {
      console.log("Error finding pre-existing user");
    } else {
      if (!foundUser) {
        res.status(422).json({ error: "User with given email doesnot exist" });
      } else {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result) {
            const token = jwt.sign({ _id: foundUser._id }, JWT_SECRET, {
              expiresIn: "24h",
            });
            res.json({ token: token });
          } else {
            res.status(422).json({ message: "Wrong Password" });
          }
        });
      }
    }
  });
});

module.exports = router;
