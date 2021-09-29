const express = require("express");
const Router = express.Router();
const College = require("../models/college");

Router.get("/list", async (req, res) => {
  try {
    let colleges = await College.find({}).exec();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(400).json(error);
  }
});
Router.get("/name/:collegeName", async (req, res) => {
  try {
    let colleges = await College.find({
      name: req.params.collegeName,
    }).exec();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(400).json(error);
  }
});
Router.get("/id/:collegeid", async (req, res) => {
  try {
    let colleges = await College.find({
      _id: req.params.collegeid,
    }).exec();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(400).json(error);
  }
});
Router.get("/similar/:collegeid", async (req, res) => {
  try {
    let firstColleges = await College.find({
      _id: req.params.collegeid,
    }).exec();
    let similarCollegeListWithFirstCollege = await College.find({
      city: firstColleges[0].city,
    });
    let similarCollegeList = similarCollegeListWithFirstCollege.filter(
      (item) => item._id != req.params.collegeid
    );
    res.status(200).json(similarCollegeList);
  } catch (error) {
    res.status(400).json(error);
  }
});
Router.get("/course/:courseName", async (req, res) => {
  try {
    let colleges = await College.find({
      courses: { $in: req.params.courseName },
    }).exec();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(400).json(error);
  }
});
Router.get("/state/:stateName", async (req, res) => {
  try {
    let colleges = await College.find({
      state: { $in: req.params.stateName },
    }).exec();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.post("/", async (req, res) => {
  try {
    let colleges = College.create(req.body);
    res.status(200).json(colleges);
    return;
  } catch (error) {
    res.status(400).json(error);
    return;
  }
});

module.exports = Router;
