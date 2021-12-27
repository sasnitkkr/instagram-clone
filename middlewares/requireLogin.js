const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

function requireLogin(req, res, next) {
  const { authorization } = req.headers; // authorization = Bearer obrakglvan
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in first." });
  } else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(422).json("You must be logged in.");
      } else {
        const _id = decoded._id;
        User.findById(_id, function (err, foundUser) {
          console.log(req.user);
          req.user = foundUser;
          next();
        });
      }
    });
  }
}

module.exports = requireLogin;
