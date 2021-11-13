const dashRoute = require("express").Router();
const mongoose = require("mongoose");
const Subject = require("../../models/Subject");
const User = mongoose.model("users");
const passport = require("passport");
const { getsubjects, getassignment } = require("../../utils");

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
      const subject = await Subject.findById(id);
      res.json(subject);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route api/dashboard/subject/:id
// @desc route for uploding assignment by teacher
// @access private
dashRoute.post(
  "/subject/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== "Teacher") {
        return res.send(
          "Your Are not Authorised to upload question assignments"
        );
      }
      const id = req.params.id;
      const subject = await Subject.findById(id);
      const data = {};
      data.name = req.body.name;
      data.desc = req.body.desc;
      data._file = req.body._file;
      data.uploaded_by = req.user.id;
      subject.assignments.unshift(data);
      await subject.save();
      return res.json(subject.assignments[0]);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route api/dashboard/subject/:id/assignment/:aid/responses
// @desc route for get the responses
// @access private
dashRoute.get(
  "/subject/:id/assignment/:aid/responses",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== "Teacher") {
      return res.send("Your Are not Authorised to see the responses");
    }
    try {
      const assignment = await getassignment(req.params.id, req.params.aid);
      return res.json(assignment.responses);
    } catch (error) {
      console.log("catch" + error);
    }
  }
);

// @route api/dashboard/subject/:id/assignment/:aid/responses/:res_id
// @desc route for post a grade for a student
// @access private
dashRoute.post(
  "/subject/:id/assignment/:aid/responses/:res_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== "Teacher") {
        return res.send("Your Are not Authorised to give grades");
      }
      //finding the subject

      const subject = await Subject.findById(req.params.id);
      //get the assignment index
      const asignIndex = subject.assignments
        .map((assign) => assign._id.toString())
        .indexOf(req.params.aid);

      // get the response index
      const resIndex = subject.assignments[asignIndex].responses
        .map((response) => response._id)
        .indexOf(req.params.res_id.toString());
      subject.assignments[asignIndex].responses[resIndex].grade =
        req.body.grade;
      subject.assignments[asignIndex].responses[resIndex].graded = true;
      await subject.save();
      return res.json(subject.assignments[asignIndex].responses[resIndex]);
    } catch (error) {
      console.log("catch" + error);
    }
  }
);

// @route api/dashboard/subject/assignment/:id
// @desc route for assignment page
// @access private
dashRoute.get(
  "/subject/:id/assignment/:aid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== "Student") {
      return res.send("Your Are not Authorised to upload solutions");
    }
    try {
      const assignment = await getassignment(req.params.id, req.params.aid);
      return res.json(assignment);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route api/dashboard/subject/assignment/:id
// @desc route for assignment submission
// @access private
dashRoute.post(
  "/subject/:id/assignment/:aid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== "Student") {
        return res.send("Your Are not Authorised to upload solutions");
      }
      const id = req.params.id;
      const aid = req.params.aid;

      //finding the subject
      const subject = await Subject.findById(id);
      // get the index of assignment
      const index = subject.assignments
        .map((assign) => assign._id.toString())
        .indexOf(aid);
      const data = {};
      data._id = req.user.id;
      data.student_name = req.user.name;
      data.file = req.body.file;
      subject.assignments[index].responses.push(data);
      await subject.save();
      return res.json(subject.assignments[index]);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = dashRoute;