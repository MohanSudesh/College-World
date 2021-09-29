const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yearFounded: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  noOfStudents: {
    type: Number,
    required: true,
  },
  courses: [String],
});

const College = mongoose.model("College", collegeSchema, "colleges");

module.exports = College;
