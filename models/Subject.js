const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  assignments: [
    {
      name: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      _file: {
        type: String,
        required: true,
      },
      uploaded_by: {
        type: String,
        required: true,
      },
      due: {
        type: Boolean,
        default: true,
      },
      responses: [
        {
          _id: {
            type: String,
          },
          student_name: {
            type: String,
          },
          roll_num: {
            type: Number,
            required: true,
          },
          group: {
            type: String,
            required: true,
          },
          graded: { type: Boolean, default: false },
          grade: { type: Number },
          file: { type: String, required: true },
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
