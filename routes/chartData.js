var express = require("express");
var chartDataRouter = express.Router();
const College = require("../models/college");

chartDataRouter.get("/list/StatesvsCount", async (req, res, next) => {
  try {
    let stateList = await College.find().distinct("state").exec();

    const getCountData = async (stateList) => {
      return Promise.all(
        stateList.map((item) => College.countDocuments({ state: item }).exec())
      );
    };

    getCountData(stateList)
      .then((countDataList) => {
        let stateNameWithCountList = [];
        stateList.map((stateName, idx) => {
          let localStateNameWithCount = [];
          localStateNameWithCount.push(stateName);
          localStateNameWithCount.push(countDataList[idx]);
          stateNameWithCountList.push(localStateNameWithCount);
        });
        res.status(200).json(stateNameWithCountList);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});
chartDataRouter.get("/list/CoursesvsCount", async (req, res, next) => {
  try {
    let coursesList = await College.find().distinct("courses").exec();

    const getCountData = async (coursesList) => {
      return Promise.all(
        coursesList.map((item) =>
          College.countDocuments({ courses: { $in: item } }).exec()
        )
      );
    };

    getCountData(coursesList)
      .then((countDataList) => {
        let collegeNameWithCountList = [];
        coursesList.map((courseName, idx) => {
          let localCourseNameWithCount = [];
          localCourseNameWithCount.push(courseName);
          localCourseNameWithCount.push(countDataList[idx]);
          collegeNameWithCountList.push(localCourseNameWithCount);
        });
        res.status(200).json(collegeNameWithCountList);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = chartDataRouter;
