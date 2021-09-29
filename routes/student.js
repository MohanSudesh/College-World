const express = require("express");
const Router = express.Router();
const Student = require("../models/student");

Router.get("/name/:studentName", async (req, res, next) => {
  try {
    let student = await Student.find({
      name: req.params.studentName,
    }).exec();
    res.status(200).send(student);
  } catch (error) {
    res.status(400).json(error);
  }
});
Router.get("/id/:studentid", async (req, res, next) => {
  try {
    let student = await Student.find({
      _id: req.params.studentid,
    }).exec();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json(error);
  }
});
Router.get("/college/:collegeid", async (req, res, next) => {
  try {
    let student = await Student.find({
      college: req.params.collegeid,
    }).exec();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json(error);
  }
});

Router.post("/", async (req, res, next) => {
  try {
    let student = Student.create(req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Router;
