const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

//Link Routs
const InventoryRoute = require("./Routes/InventoryRoutes.js");
const EmployeeRoute = require("./Routes/EmployeeRoutes.js");
const AttendanceRoute = require("./Routes/AttendanceRoutes.js");
const OrderRoute = require("./Routes/OrderRoute.js");
const SupplierRoute = require("./Routes/SupplierRoutes.js");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

//Routes
app.use("/inventory", InventoryRoute);
app.use("/employee", EmployeeRoute);
app.use("/attendance", AttendanceRoute);
app.use("/order", OrderRoute);
app.use("/supplier", SupplierRoute);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
