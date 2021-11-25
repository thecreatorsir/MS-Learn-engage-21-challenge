const dashRoute = require("express").Router();
const mongoose = require("mongoose");
const Subject = require("../../models/Subject");
const User = mongoose.model("users");
const passport = require("passport");
const { getsubjects, getassignment, addnotifications } = require("../../utils");

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
      const data = await getsubjects(user.subjects);
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
      //creating a data object
      const data = {};
      data.name = req.body.name;
      data.desc = req.body.desc;
      data._file = req.body.file;
      data.uploaded_by = req.user.id;
      // pushing the assignment a the top
      subject.assignments.unshift(data);

      // adding notifications for both the users
      await addnotifications(
        "both",
        null,
        subject.name,
        `New Assignment "${req.body.name}" has been added for ${subject.name}`
      );
      //save to DB
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

      // update the grade
      subject.assignments[asignIndex].responses[resIndex].grade =
        req.body.grade;
      //update the grading status
      subject.assignments[asignIndex].responses[resIndex].graded = true;

      // adding notification for specific student
      await addnotifications(
        "Student",
        req.params.res_id.toString(),
        subject.name,
        `You have been awarded a grade for assignment ${subject.assignments[asignIndex].name}`
      );

      //save to DB
      await subject.save();
      return res.json(subject.assignments[asignIndex].responses[resIndex]);
    } catch (error) {
      console.log("catch" + error);
    }
  }
);

// @route api/dashboard/subject/:id/assignment/:aid
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

// @route api/dashboard/subject/:id/assignment/:aid
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
      const user = await User.findById(req.user.id);
      // get the index of assignment
      const index = subject.assignments
        .map((assign) => assign._id.toString())
        .indexOf(aid);
      //getting the data ready
      const data = {};
      data._id = req.user.id;
      data.student_name = req.user.name;
      data.roll_num = user.roll_number;
      data.group = user.group;
      data.file = req.body.file;

      // pusing it to the responses array
      subject.assignments[index].responses.push(data);

      // adding notification for the teachers
      await addnotifications(
        "Teacher",
        null,
        subject.name,
        `New Response has been added for ${subject.assignments[index].name}`
      );

      // adding notification for the students
      await addnotifications(
        "Student",
        req.user.id,
        subject.name,
        `Your Grading is in progress for ${subject.assignments[index].name}`
      );
      //saving to DB
      await subject.save();

      return res.json(subject.assignments[index]);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route api/dashboard/subject/:id/assignment/:aid
// @desc route for deleting the assignment
// @access private
dashRoute.delete(
  "/subject/:id/assignment/:aid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== "Teacher") {
      return res.send("Your Are not Authorised to delete the assignment");
    }
    try {
      const errors = {};
      const subject = await Subject.findById(req.params.id);
      //getting the index to be removed
      const removeIndex = subject.assignments
        .map((assign) => assign._id.toString())
        .indexOf(req.params.aid);
      const removedAssign = subject.assignments[removeIndex];

      //getting the user that has uploaded this assignment
      const user = await User.findById(removedAssign.uploaded_by);

      // if user not match, can't delete the assignment
      if (user._id != req.user.id) {
        errors.notAllowed = `Only ${user.name} sir is allowed to delete this assignment`;
        errors.subid = req.params.id;
        return res.status(404).json(errors);
      }

      // else delete the assignment
      subject.assignments.splice(removeIndex, 1);

      // adding notification both the users
      await addnotifications(
        "both",
        null,
        subject.name,
        `Assignment ${removedAssign.name} has been deleted by ${user.name}`
      );

      // save to DB
      await subject.save();
      return res.json(removedAssign);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route api/dashboard/subject/:id/assignment/:aid
// @desc route for updating assignment status
// @access private
dashRoute.put(
  "/subject/:id/assignment/:aid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== "Teacher") {
        return res.send("Your Are not Authorised to update the status");
      }
      //finding the subject

      const subject = await Subject.findById(req.params.id);
      //get the assignment index
      const asignIndex = subject.assignments
        .map((assign) => assign._id.toString())
        .indexOf(req.params.aid);

      // update the assignment status
      subject.assignments[asignIndex].due = false;

      // notification for all the users
      await addnotifications(
        "both",
        null,
        subject.name,
        `Assignment ${subject.assignments[asignIndex].name} has been maked as completed by ${req.user.name}`
      );
      // save to DB
      await subject.save();
      return res.json(subject.assignments[asignIndex]);
    } catch (error) {
      console.log("catch" + error);
    }
  }
);

module.exports = dashRoute;
