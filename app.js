const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const PORT = process.env.PORT || 5000;

const collegeRouter = require("./routes/college");
const studentRouter = require("./routes/student");
const chartDataRouter = require("./routes/chartData");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/college", collegeRouter);
app.use("/student", studentRouter);
app.use("/chartData", chartDataRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("./client/build"));
}

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});

module.exports = app;
