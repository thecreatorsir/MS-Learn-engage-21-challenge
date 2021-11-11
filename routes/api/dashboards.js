const dashRoute = require("express").Router();
const mongoose = require("mongoose");
const Subject = require("../../models/Subject");
const User = mongoose.model("users");
const passport = require("passport");
const { getsubjects } = require("../../utils");

//   @route api/dashboard/test
//   @desc test route for dashboard
//   @access public
dashRoute.get("/test", (req, res) => {
  res.status(200).send("<h1>dashboard route test page</h1>");
});

//   @route api/dashboard
//   @desc route for dashboard according to all subject they study or teach
//   @access private
dashRoute.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findOne(req.user);
      let subjects = user.subjects;
      subjects = subjects.slice(0, subjects.length).split(",");
      const data = await getsubjects(subjects);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route api/dashboard/subject/:id
// @desc route form dashboard to perticular subject
// @access private
dashRoute.get(
  "/subject/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //const user = await User.findOne(req.user);
      const id = req.params.id;
      const subject = await Subject.findOne({ _id: id });
      res.json(subject);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = dashRoute;
