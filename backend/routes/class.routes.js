import express from "express";
import { getClass } from "../handlers/class.handler.js";
import Class from "../models/class.model.js";

const classRoute = express.Router();

//! universal routes -----------------------------------------------------------------

// get all classes
classRoute.get("/classes", async (req, res) => {
  try {
    const result = await getClass();
    console.log(
      "Classes found:",
      result.map((cls) => cls.className)
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
classRoute.post("/class", async (req, res) => {
  try {
    let body = req.body;
    const requiredFields = ["className"];

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

export default classRoute;
