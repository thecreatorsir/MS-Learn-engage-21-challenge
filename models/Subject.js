const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  students_opted: [
    {
      _id: {
        type: String,
      },
    },
  ],
  teachers_opted: [
    {
      _id: {
        type: String,
      },
    },
  ],
  assignments: [
    {
      name: {
        type: String,
      },
      desc: {
        type: String,
      },
      _file: {
        type: String,
      },
      responses: [
        {
          _id: {
            type: String,
          },
          student_name: {
            type: String,
          },
          graded: { type: Boolean },
          grade: { type: Number },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Subject = mongoose.model("subjects", subjectSchema);
