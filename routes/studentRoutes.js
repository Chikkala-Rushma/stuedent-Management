const express = require("express");
const Student = require("../models/students");

const studentRouter = express.Router();

// CREATE a new Student
studentRouter.post("/create", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newStudent = new Student({ name, email, age });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Error creating Student", error });
  }
});

// READ all Students
studentRouter.post("/get", async (req, res) => {
  try {
    console.log("inside sdwew")
    const Students = await Student.find();
    res.json(Students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Students", error });
  }
});

// READ a single Student by ID
studentRouter.post("/get/:id", async (req, res) => {
  try {
    console.log("req.params.id",req.params.id)
    const Student = await Student.findById(req.params.id);
    console.log('Student', Student)
    if (!Student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(Student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Student", error });
  }
});

// UPDATE a Student by ID
studentRouter.post("/update/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating Student", error });
  }
});

// DELETE a Student by ID
studentRouter.post("/delete/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Student", error });
  }
});

module.exports = studentRouter;
