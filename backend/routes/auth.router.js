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

    const checkUserEmail = await User.findOne({ email: user.email });
    //console.log(checkUserEmail);
    if (checkUserEmail != null) {
      res.status(400).json({ message: "Bu mail adresi daha önce kullanıldı." });
    } else {
      await user.save();
      const token = jwt.sign({}, secretKey, options);
      let model = { token: token, user: user };
      res.json(model);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //kullanıcıdan gelen email ve password

    //userSchema formatındaki dataları emaile göre kontrol etti.
    let user = await User.findOne({ email: email });
    if (user == null) {
      res.status(403).json({ message: "Kullanıcı Bulunamadı!" });
    } else {
      if (user.password != password) {
        res.status(403).json({ message: " Hatalı Şifre" });
      } else {
        const token = jwt.sign({}, secretKey, options);
        let model = { apiMessage: "Login Başarılı", token: token, user: user };
        res.json(model);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
