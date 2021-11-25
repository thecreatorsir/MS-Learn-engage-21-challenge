const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*overall user Schema for both teacher and student, the fields will be required according to the role
/ and the required constraints will be implimented on front end.*/
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  subjects: [String],
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
  },
  roll_number: {
    type: Number,
  },
  group: {
    type: String,
  },
  y_of_passing: {
    type: Number,
  },
  notifications: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", userSchema);
