import express from "express";
import Race from "../models/race.model.js";
import { adminAuth } from "../middelware/auth.middelware.js";

const raceRoute = express.Router();

//! universal routes -----------------------------------------------------------------

// get all races
raceRoute.get("/races", async (req, res) => {
  try {
    const result = await Race.find({});
    console.log(
      "Races found:",
      result.map((x) => x.name)
    );
    return res.status(200).send({
      status: "ok",
      message: "Races found!",
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

// create a new race
raceRoute.post("/race", adminAuth, async (req, res) => {
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

    const newRace = await Race.create(body);
    return res.status(201).send({
      status: "ok",
      message: "Race created successfully!",
      data: newRace,
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

// update a race by id
raceRoute.put("/race/:id", adminAuth, async (req, res) => {
  try {
    const raceId = req.params.id;
    const body = req.body;

    if (!raceId) {
      return res.status(400).send({
        status: "error",
        message: "Race ID is required",
      });
    }

    const updatedRace = await Race.findByIdAndUpdate(raceId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRace) {
      return res.status(404).send({
        status: "error",
        message: "Race not found",
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Race updated successfully!",
      data: updatedRace,
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

// delete a race by id
raceRoute.delete("/race/:id", adminAuth, async (req, res) => {
  try {
    const raceId = req.params.id;

    if (!raceId) {
      return res.status(400).send({
        status: "error",
        message: "Race ID is required",
      });
    }

    const deletedRace = await Race.findByIdAndDelete(raceId);

    if (!deletedRace) {
      return res.status(404).send({
        status: "error",
        message: "Race not found",
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Race deleted successfully!",
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

export default raceRoute;
