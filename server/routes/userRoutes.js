const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controller/authController");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name field cannot be empty."),
    body("email").isEmail().withMessage("Enter a valid email."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Enter a valid password."),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password is not valid"),
  ],
  loginUser
);

module.exports = router;
