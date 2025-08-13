import express from "express";
import Background from "../models/background.model.js";
import { adminAuth } from "../middelware/auth.middelware.js";

const backgroundRoute = express.Router();

//! universal routes -----------------------------------------------------------------

// get all backgrounds
backgroundRoute.get("/backgrounds", async (req, res) => {
  try {
    const result = await Background.find({});
    console.log(
      "Backgrounds found:",
      result.map((x) => x.name)
    );
    return res.status(200).send({
      status: "ok",
      message: "Backgrounds found!",
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

// create a new background
backgroundRoute.post("/background", adminAuth, async (req, res) => {
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

    const newBackground = await Background.create(body);
    return res.status(201).send({
      status: "ok",
      message: "Background created successfully!",
      data: newBackground,
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

// update a background by id
backgroundRoute.put("/background/:id", adminAuth, async (req, res) => {
  try {
    const backgroundId = req.params.id;
    const body = req.body;

    if (!backgroundId) {
      return res.status(400).send({
        status: "error",
        message: "Background ID is required",
      });
    }

    const updatedBackground = await Background.findByIdAndUpdate(
      backgroundId,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBackground) {
      return res.status(404).send({
        status: "error",
        message: "Background not found",
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Background updated successfully!",
      data: updatedBackground,
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

// delete a background by id
backgroundRoute.delete("/background/:id", adminAuth, async (req, res) => {
  try {
    const backgroundId = req.params.id;

    if (!backgroundId) {
      return res.status(400).send({
        status: "error",
        message: "Background ID is required",
      });
    }

    const deletedBackground = await Background.findByIdAndDelete(backgroundId);

    if (!deletedBackground) {
      return res.status(404).send({
        status: "error",
        message: "Background not found",
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Background deleted successfully!",
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

export default backgroundRoute;
