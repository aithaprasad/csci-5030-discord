const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");


router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(422).json({ error: "please add all the fields" });
    }
    User.findOne({
      email: email,
    })
      .then((savedUser) => {
        if (savedUser) {
          return res.status(422).json({ error: "emailId already exists" });
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            name,
            count: 0,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "saved succesfully" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    res.json({ message: "successfully posted" });
  });

  module.exports = router;