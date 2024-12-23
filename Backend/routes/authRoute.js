const express = require("express");
const router = express.Router();
const roleBaseModal = require("../modals/roleBaseUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const authController= require('../controller/authController');

// router.post('/register', authController.userRegistration)
// router.post('/registration', function(req, res){
//     authController.userRegistration
//   });
// router.post('/login', authController.userLogin)

router.post("/registration", async (req, res) => {
  const { email, password, role } = req.body;
  const user = await roleBaseModal.findOne({ email: email });
  if (user) {
    res.send({ status: "failed", message: "Email already exists" });
  } else {
    //   if ( email && password && password_confirmation && tc) {
    if (email && password && role) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const doc = new roleBaseModal({
          role: role,
          email: email,
          password: hashPassword,
        });
        await doc.save();
        const saved_user = await roleBaseModal.findOne({ email: email });
        // Generate JWT Token
        const token = jwt.sign(
          { userID: saved_user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        res.status(201).send({
          status: "success",
          message: "Registration Success",
          token: token,
        });
      } catch (error) {
        console.log(error);
        res.send({ status: "failed", message: "Unable to Register" });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await roleBaseModal.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          // Generate JWT Token
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.send({
            status: "success",
            message: "Login Success",
            token: token,
          });
        } else {
          res.send({
            status: "failed",
            message: "Email or Password is not Valid",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "You are not a Registered User",
        });
      }
    } else {
      res.send({ status: "failed", message: "All Fields are Required" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", message: "Unable to Login" });
  }
});

module.exports = router;
