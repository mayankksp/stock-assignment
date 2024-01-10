const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const jwt_decode = require("jwt-decode");

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());


require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = "w490nrcy948rywn984hnihuwyrdouoojfhw9fu9axf";

mongoose.connect(process.env.MONGO_URL);

router.post('/login-google', async (req, res) => {
  const { cred } = req.body;
  const decoded = jwt_decode(cred);
  const { email, sub } = decoded;
  console.log(email, sub);
  try {
    let userDoc = await User.findOne({ email: email });
    if(userDoc){
      const passOk = bcrypt.compareSync(sub, userDoc.password);
      if (passOk) {
        const tokkn = {
          httpOnly: true,
          SameSite: "none",
          expires: new Date(Date.now() + 1500 * 1000 * 60),
        };

        const pp = jwt.sign(
          { username: userDoc.username, email: userDoc.email, id: userDoc._id },
          jwtSecret
        );

        res.cookie("token", pp, tokkn).json(userDoc);
      }else{
        res.status(403).json("wrong password");
      }
    }else{
      res.status(422).json("user not found");
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
    
});





router.post("/login", async (req, res) => {
  const { user, password, emailLogin } = req.body;
  console.log(user, password, emailLogin);

  try {
    let userDoc;
    if (emailLogin) {
      userDoc = await User.findOne({ email: user });
    } else {
      userDoc = await User.findOne({ username: user });
    }

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        const tokkn = {
          httpOnly: true,
          SameSite: "none",
          expires: new Date(Date.now() + 1500 * 1000 * 60),
        };

        const pp = jwt.sign(
          { username: userDoc.username, email: userDoc.email, id: userDoc._id },
          jwtSecret
        );

        res.cookie("token", pp, tokkn).json(userDoc);
      } else {
        res.status(403).json("wrong password");
      }
    } else {
      res.status(422).json("user not found");
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userDoc = await User.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    console.log(userDoc);
    res.json(userDoc);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json("not logged in");
  } else {
    jwt.verify(token, jwtSecret, {}, (err, decoded) => {
      if (err) throw err;

      res.json(decoded);
    });
  }
  // console.log(req.cookies);
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").json(true);
  res.end();
});

module.exports = router;
