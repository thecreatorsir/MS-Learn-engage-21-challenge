const getsubjects = (subjects) => {
  const promises = subjects.map(
    async (subject) => await Subject.findOne({ name: subject })
  );
  return Promise.all(promises);
};

module.exports = {
  getsubjects,
};
