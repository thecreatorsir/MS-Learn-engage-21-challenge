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
  const index = subject.assignments
    .map((assign) => assign._id.toString())
    .indexOf(aid);
  return subject.assignments[index];
};
module.exports = {
  getsubjects,
  getassignment,
};
