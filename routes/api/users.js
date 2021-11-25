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

//   @route api/users/notifications/:id
//   @desc  notifications route for logged in users
//   @access private
userRoute.get(
  "/notifications/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const notifications = user.notifications ? user.notifications : null;
      return res.json(notifications);
    } catch (err) {
      console.log(err);
    }
  }
);

//   @route api/users/notifications/:id
//   @desc  clear notifications route for logged in users
//   @access private
userRoute.delete(
  "/notifications/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      let notifications = user.notifications;
      let blank = [];
      //set the notification to the empty string
      user.notifications = blank;
      user.save();
      return res.json(notifications);
    } catch (err) {
      console.log(err);
    }
  }
);
//test route to add notification
// userRoute.get("/notifications", async (req, res) => {
//   const temp = await addnotifications(
//     "Teacher",
//     "619930c91ee04731caf9766a",
//     "Cyber Security",
//     "test"
//   );
//   return res.json(temp);
// });

module.exports = userRoute;
