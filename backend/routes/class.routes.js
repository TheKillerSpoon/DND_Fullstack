import express from "express";
import Class from "../models/class.model.js";
import { adminAuth } from "../middelware/auth.middelware.js";

const classRoute = express.Router();

//! universal routes -----------------------------------------------------------------

// get all classes
classRoute.get("/classes", async (req, res) => {
  try {
    const result = await Class.find({});
    console.log(
      "Classes found:",
      result.map((x) => x.name)
    );
    return res.status(200).send({
      status: "ok",
      message: "Classes found!",
      data: result,
    });
  } catch (error) {
    console.error("Server error", error);
    return res.status(500).send({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
});

// create a new class
classRoute.post("/class", adminAuth, async (req, res) => {
  try {
    let body = req.body;
    const requiredFields = ["name"];

    // Check if all required fields are present
    for (const field of requiredFields) {
      if (!body[field]) {
        return res.status(400).send({
          status: "error",
          message: `${field} is required`,
        });
      }
    }

    const newClass = await Class.create(body);
    return res.status(201).send({
      status: "ok",
      message: "Class created successfully!",
      data: newClass,
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// update a class by id
classRoute.put("/class/:id", adminAuth, async (req, res) => {
  try {
    const classId = req.params.id;
    const body = req.body;

    if (!classId) {
      return res.status(400).send({
        status: "error",
        message: "Class ID is required",
      });
    }

    const updatedClass = await Class.findByIdAndUpdate(classId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedClass) {
      return res.status(404).send({
        status: "error",
        message: "Class not found",
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Class updated successfully!",
      data: updatedClass,
    });
  } catch (error) {
    console.error("Server error", error);
    return res.status(500).send({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
});

// delete a class by id
classRoute.delete("/class/:id", adminAuth, async (req, res) => {
  try {
    const classId = req.params.id;

    if (!classId) {
      return res.status(400).send({
        status: "error",
        message: "Class ID is required",
      });
    }

    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      return res.status(404).send({
        status: "error",
        message: "Class not found",
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Class deleted successfully!",
    });
  } catch (error) {
    console.error("Server error", error);
    return res.status(500).send({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
});

export default classRoute;
