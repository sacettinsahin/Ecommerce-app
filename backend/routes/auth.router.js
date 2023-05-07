const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const secretKey = "My Secret Key My Secret Key 1234.!";
const options = {
  expiresIn: "1d",
  // "1h", "1M", "1Y"
};

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    user._id = uuidv4();
    user.createdDate = new Date();
    user.isAdmin = false;

    await user.save();
    const token = jwt.sign({}, secretKey, options);
    let model = { token: token, user: user };
    res.json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
