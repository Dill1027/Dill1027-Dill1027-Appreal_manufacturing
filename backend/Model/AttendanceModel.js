const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  AttID: {
    type: String,
    required: true,
  },
  EmployeID: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  CheckIn: {
    type: String,
    required: true,
  },
  CheckOut: {
    type: String,
    required: true,
  },
  TotalHours: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  Leavetype: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
