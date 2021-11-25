const User = require("../models/User");
// function for getting all subjects
const getsubjects = (subjects) => {
  const promises = subjects.map(
    async (subject) => await Subject.findOne({ name: subject })
  );
  return Promise.all(promises);
};

// function for getting a unique assignment
const getassignment = async (id, aid) => {
  //finding the subject
  const subject = await Subject.findById(id);
  //get the assignment
  const index = subject.assignments
    .map((assign) => assign._id.toString())
    .indexOf(aid);
  return subject.assignments[index];
};

const addnotifications = async (role, userid, subject, message) => {
  let filter = { _id: userid, role, subjects: subject };
  //if not for specific user
  if (userid === null) {
    filter = { role, subjects: subject };
  }
  // if for both the users
  if (role === "both") {
    filter = { subjects: subject };
  }
  const updated = await User.updateMany(filter, {
    $push: { notifications: { $each: [message], $position: 0 } },
  });
  return updated;
};
module.exports = {
  getsubjects,
  getassignment,
  addnotifications,
};
