const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middlewares/requireLogin");

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, photo } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "enter all fields" });
  }
  const newPost = new Post({
    title: title,
    body: body,
    photo: photo,
    postedby: req.user,
  });
  newPost.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.json({ mssg: "Successfully created new post" });
    }
  });
});

module.exports = router;
