const express = require("express");
const router = express.Router();
const AttendanceController = require("../Controllers/AttendanceController");

router.get("/", AttendanceController.getAll);
router.post("/", AttendanceController.add);
router.put("/:id", AttendanceController.update);
router.delete("/:id", AttendanceController.deleteData);
router.get("/:id", AttendanceController.getById);

module.exports = router;
