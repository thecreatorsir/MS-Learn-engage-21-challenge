const getsubjects = (subjects) => {
  const promises = subjects.map(
    async (subject) => await Subject.findOne({ name: subject })
  );
  return Promise.all(promises);
};
const getassignment = async (id, aid) => {
  //finding the subject
  const subject = await Subject.findById(id);
  //get the assignment
  const assignment = subject.assignments.map((assign) => {
    if (assign._id == aid) {
      return assign;
    }
  });
  return assignment[0];
};
module.exports = {
  getsubjects,
  getassignment,
};
