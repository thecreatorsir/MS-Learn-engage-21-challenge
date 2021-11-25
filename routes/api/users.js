const userRoute = require("express").Router();
const User = require("../../models/User");
const bcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const { addnotifications } = require("../../utils");

//   @route api/users/test
//   @desc test route for users
//   @access public
userRoute.get("/test", (req, res) => {
  res.status(200).send("<h1>user route test page</h1>");
});

//   @route api/users/register
//   @desc  route for users to register themselves
//   @access public

userRoute.post("/register", async (req, res) => {
  try {
    const errors = {};
    let userWithEmail = await User.findOne({ email: req.body.email });

    //check if user has a roll number
    let userWithRoll;
    if (req.body.roll_number) {
      userWithRoll = await User.findOne({
        roll_number: req.body.roll_number,
      });
    }

    // if email alrady exists, show err
    if (userWithEmail) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }
    // if roll numer already exists
    else if (userWithRoll) {
      errors.roll_number = "You are using someone else Roll Number";
      return res.status(400).json(errors);
    } else {
      //password hashing
      const salt = await bcypt.genSalt(10);
      const hash = await bcypt.hash(req.body.password, salt);

      // user creation
      let createUser = {};
      createUser.name = req.body.name;
      createUser.email = req.body.email;
      createUser.role = req.body.role;
      createUser.password = hash;
      createUser.subjects = req.body.subjects;
      createUser.department = req.body.department;

      if (req.body.roll_number) {
        createUser.roll_number = req.body.roll_number;
      }
      if (req.body.designation) {
        createUser.designation = req.body.designation;
      }
      if (req.body.group) {
        createUser.group = req.body.group;
      }
      if (req.body.y_of_passing) {
        createUser.y_of_passing = req.body.y_of_passing;
      }

      // create new user
      const newUser = new User(createUser);
      // save to DB
      user = await newUser.save();
      return res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
  }
});

//   @route api/users/login
//   @desc  route for users to login themselves
//   @access public
userRoute.post("/login", async (req, res) => {
  try {
    const errors = {};
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    const isMatched = await bcypt.compare(password, user.password);
    if (isMatched) {
      // user matched
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      //sign a token
      const token = jwt.sign(payload, keys.secretKey, { expiresIn: 7200 });
      return res.json({
        success: true,
        token: "Bearer " + token,
      });
    } else {
      errors.password = "Password incorrect";
      return res.status(400).json(errors);
    }
  } catch (error) {
    console.log(error);
  }
});

//   @route api/users/current
//   @desc  test route for logged in users
//   @access private

userRoute.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user._id, name: req.user.name, email: req.user.email });
  }
);

//test notification
userRoute.get("/notifications", async (req, res) => {
  try {
    const updated = await addnotifications(
      "both",
      null,
      "Cyber Security",
      "theek hai"
    );
    return res.json(updated);
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRoute;
