const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

router.get("/protected", requireLogin, (req, res) => {
  console.log(req);
  console.log(req.user.count);
  //User.updateOne({name: req.user.name})
  User.updateOne(
    { name: req.user.name },
    { $set: { count: req.user.count + 1 } },
    function (err, respon) {
      if (err) {
        console.log(err);
        res.send(JSON.stringify(req.user.count));
      } else {
        console.log("1 doc updated");
        console.log(respon);
        console.log("updated res");
        res.send(JSON.stringify(req.user.count + 1));
      }
    }
  );
  //User.findByIdAndUpdate(req.user.id, { count: 3 });
});

router.post("/signup", (req, res) => {
  console.log(req.body.name);
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

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, count, followers, following, pic } =
            savedUser;
          res.json({
            token,
            user: { _id, name, email, count },
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
