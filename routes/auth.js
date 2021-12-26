const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Enter all valid fields" });
  }
  res.json({ message: "Successfully Submitted" });
});

module.exports = router;
