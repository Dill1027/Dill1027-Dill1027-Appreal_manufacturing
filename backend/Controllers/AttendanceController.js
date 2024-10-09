const AttendanceModel = require("../Model/AttendanceModel");

const getAll = async (req, res, next) => {
  let attendance;
  try {
    attendance = await AttendanceModel.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!attendance) {
    return res.status(404).json({ message: "not found" });
  }
  return res.status(200).json({ attendance });
};

// data Insert
const add = async (req, res, next) => {
  const {
    AttID,
    EmployeID,
    fullname,
    date,
    CheckIn,
    CheckOut,
    TotalHours,
    status,
    Leavetype,
  } = req.body;

  let attendance;

  try {
    attendance = new AttendanceModel({
      AttID,
      EmployeID,
      fullname,
      date,
      CheckIn,
      CheckOut,
      TotalHours,
      status,
      Leavetype,
    });
    await attendance.save();
  } catch (err) {
    console.log(err);
  }
  if (!attendance) {
    return res.status(404).json({ message: "unable to add data" });
  }
  return res.status(200).json({ attendance });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let attendance;

  try {
    attendance = await AttendanceModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!attendance) {
    return res.status(404).json({ message: "Not Found" });
  }
  return res.status(200).json({ attendance });
};

//Update  Details
const update = async (req, res, next) => {
  const id = req.params.id;
  const {
    AttID,
    EmployeID,
    fullname,
    date,
    CheckIn,
    CheckOut,
    TotalHours,
    status,
    Leavetype,
  } = req.body;

  let attendance; 

  try {
    attendance = await AttendanceModel.findByIdAndUpdate(id, {
      AttID: AttID,
      EmployeID: EmployeID,
      fullname: fullname,
      date: date,
      CheckIn: CheckIn,
      CheckOut: CheckOut,
      TotalHours: TotalHours,
      status: status,
      Leavetype: Leavetype,
    });
    attendance = await attendance.save();
  } catch (err) {
    console.log(err);
  }
  if (!attendance) {
    return res
      .status(404)
      .json({ message: "Unable to Update AttendanceModel Details" });
  }
  return res.status(200).json({ attendance });
};

//Delete attendance Details
const deleteData = async (req, res, next) => {
  const id = req.params.id;

  let attendance;

  try {
    attendance = await AttendanceModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!attendance) {
    return res
      .status(404)
      .json({ message: "Unable to Delete AttendanceModel Details" });
  }
  return res.status(200).json({ attendance });
};

exports.getAll = getAll;
exports.add = add;
exports.getById = getById;
exports.update = update;
exports.deleteData = deleteData;
