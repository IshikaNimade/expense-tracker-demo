const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const responseHandler = require("../utils/responseHandler");

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return responseHandler(res, 201, "User registered successfully!", { user });
  } catch (error) {
    return responseHandler(res, 500, "Server error", { error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return responseHandler(res, 400, "User not found", null);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responseHandler(res, 400, "Invalid password", null);
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    return responseHandler(res, 200, "Login successful", { token, user });
  } catch (error) {
   return responseHandler(res, 500, "Server error", { error: error.message });
  }
};

module.exports = { registerUser, loginUser };
