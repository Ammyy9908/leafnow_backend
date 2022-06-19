const verifyAuth = require("../utils/verifyAuth");
const User = require("../models/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
dotenv.config();
const router = require("express").Router();

router
  .get("/me", verifyAuth, async (req, res) => {
    const { id } = req.user;
    const user = await User.findOne({ _id: id });
    res.json(user);
  })
  .post("/signup", async (req, res) => {
    const { email, name, password } = req.body;
    // check user already exists

    // if exist just create one token and send it token client

    const user = await User.findOne({
      email: email,
    });

    if (user) {
      return res.json({
        message: "User already exists",
        error: true,
      });
    }
    // else make an new entry

    // but make sure password is hashed
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = await User({
      email: email,
      name: name,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({
      token: token,
    });
  })
  .post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        message: "No user resgitered with this email",
        error: true,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        message: "Invalid email & password",
        error: true,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token: token,
      error: false,
    });
  })
  .put("/update", verifyAuth, async (req, res) => {
    const { id } = req.user;
    const { email, name } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: id },
      { email: email, name: name },
      { new: true }
    );
    res.json({
      message: "updated successfully",
      user,
    });
  });

module.exports = router;
