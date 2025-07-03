import express from "express";
import { getSpecies } from "../handlers/species.handler.js";
import Species from "../models/species.model.js";

const speciesRoute = express.Router();

//! universal routes -----------------------------------------------------------------

// get all speciess
speciesRoute.get("/speciess", async (req, res) => {
  try {
    const result = await getSpecies();
    console.log(
      "Speciess found:",
      result.map((cls) => cls.speciesName)
    );
    return res.status(200).send({
      status: "ok",
      message: "Speciess found!",
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

// create a new species
speciesRoute.post("/species", async (req, res) => {
  try {
    let body = req.body;
    const requiredFields = ["speciesName"];

    // Check if all required fields are present
    for (const field of requiredFields) {
      if (!body[field]) {
        return res.status(400).send({
          status: "error",
          message: `${field} is required`,
        });
      }
    }

    const newSpecies = await Species.create(body);
    return res.status(201).send({
      status: "ok",
      message: "Species created successfully!",
      data: newSpecies,
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

// update a species by id
speciesRoute.put("/species/:id", async (req, res) => {
  try {
    const speciesId = req.params.id;
    const body = req.body;

    if (!speciesId) {
      return res.status(400).send({
        status: "error",
        message: "Species ID is required",
      });
    }

    const updatedSpecies = await Species.findByIdAndUpdate(speciesId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSpecies) {
      return res.status(404).send({
        status: "error",
        message: "Species not found",
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Species updated successfully!",
      data: updatedSpecies,
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

// delete a species by id
speciesRoute.delete("/species/:id", async (req, res) => {
  try {
    const speciesId = req.params.id;

    if (!speciesId) {
      return res.status(400).send({
        status: "error",
        message: "Species ID is required",
      });
    }

    const deletedSpecies = await Species.findByIdAndDelete(speciesId);

    if (!deletedSpecies) {
      return res.status(404).send({
        status: "error",
        message: "Species not found",
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Species deleted successfully!",
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

export default speciesRoute;
