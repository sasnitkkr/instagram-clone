const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middlewares/requireLogin");

router.get("/allposts", requireLogin, (req, res) => {
  Post.find({})
    .populate("postedby", "_id, name")
    .exec(function (err, posts) {
      if (err) {
        console.log(err);
        res.json({ err: "Could Not Fetch Posts" });
      } else {
        res.send(posts);
      }
    });
});

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

router.get("/myposts", requireLogin, (req, res) => {
  Post.find({ postedby: req.user._id })
    .populate("postedby", "_id, name")
    .exec(function (err, posts) {
      if (err) {
        console.log(err);
      } else {
        res.json(posts);
      }
    });
});

module.exports = router;
