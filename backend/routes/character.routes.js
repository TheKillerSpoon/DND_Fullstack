import express from "express";
import { getCharacter } from "../handlers/character.handler.js";
import { getClass } from "../handlers/class.handler.js";
import { getSpecies } from "../handlers/species.handler.js";
import Character from "../models/character.model.js";

const characterRoute = express.Router();

//! test variables ---------------------------------------------------------------------
const test = ["class", "race", "background", "alignment", "name"];

//! validation -----------------------------------------------------------------------
let validate = true;
const validateCharacter = async (body) => {
  validate = true;
  let classesExists = true;
  let speciesExists = true;

  // fetching data

  const [classes, species] = await Promise.all([getClass(), getSpecies()]);

  // validation checks
  if (body.class) {
    classesExists = classes.some(
      (cls) => cls.className.toLowerCase() === body.class.toLowerCase()
    );
  }
  if (body.race) {
    speciesExists = species.some(
      (spec) => spec.speciesName.toLowerCase() === body.race.toLowerCase()
    );
  }

  // returning validation result
  if (!classesExists || !speciesExists) {
    console.log("Validation failed");
    validate = false;
  }
};

//! universal routes -----------------------------------------------------------------

// get all characters
characterRoute.get("/characters", async (req, res) => {
  try {
    const result = await getCharacter();
    return res.status(200).send({
      status: "ok",
      message: "characters found!",
      data: result,
    });
  } catch (error) {
    console.error("Server-fejl", error);
    return res.status(500).send({
      status: "error",
      message: "Server-fejl",
      error: error.message,
    });
  }
});

// get a single character by id
characterRoute.get("/character/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        status: "error",
        message: "Character ID is required",
      });
    }
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).send("Character not found");
    }
    res.status(200).send({
      status: "ok",
      message: "Character found!",
      data: character,
    });
  } catch (error) {
    console.error("Server-error", error);
    res.status(500).send("Server-error");
  }
});

//! characters routes ------------------------------------------------------------------

// add a new character
characterRoute.post("/character", async (req, res) => {
  try {
    let body = req.body;
    test.map((key) => {
      if (body[key] == "" || !body[key]) body[key] = undefined;
    });

    await validateCharacter(req.body);

    var character = new Character(req.body);
    await character.save();
    res.status(201).send(character);
  } catch (error) {
    console.error("Server-fejl", error);
    if (error.errors) {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send(errors);
    }
    res.status(500).send({
      status: "error",
      message: "sonething went wrong",
      error: error.message,
    });
  }
});

// update a character by id
characterRoute.put("/character/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        status: "error",
        message: "Character ID is required",
      });
    }

    await validateCharacter(req.body);

    if (!validate) {
      return res.status(400).send({
        status: "error",
        message: "Invalid class provided",
      });
    }

    const character = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!character) {
      return res.status(404).send("Character not found");
    }
    res.status(200).send({
      status: "ok",
      message: "Character updated successfully",
      data: character,
    });
  } catch (error) {
    console.error("Server-error", error);
    res.status(500).send({
      status: "error",
      message: "Server-error",
      error: error.message,
    });
  }
});

// delete a character by id
characterRoute.delete("/character/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        status: "error",
        message: "Character ID is required",
      });
    }
    const character = await Character.findByIdAndDelete(req.params.id);
    res.status(200).send({
      status: "ok",
      message: "Character deleted successfully",
    });
  } catch (error) {
    console.error("Server-error", error);
    res.status(500).send({
      status: "error",
      message: "Server-error",
      error: error.message,
    });
  }
});

//! weapon routes -----------------------------------------------------------------------------

// add a new character attack
characterRoute.post("/weapon/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        status: "error",
        message: "Character ID is required",
      });
    }

    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).send("Character not found");
    }

    character.attack.push(req.body);
    await character.save();

    res.status(201).send({
      status: "ok",
      message: "Weapon added successfully",
      data: character,
    });
  } catch (error) {
    console.error("Server-error", error);
    res.status(500).send({
      status: "error",
      message: "Server-error",
      error: error.message,
    });
  }
});

// update a character attack by id
characterRoute.put("/weapon/:id/:aid", async (req, res) => {
  try {
    if (!req.params.aid) {
      return res.status(400).send({
        status: "error",
        message: "Weapon ID is required",
      });
    }

    const weapon = await Character.findOneAndUpdate(
      { _id: req.params.id, "attack._id": req.params.aid },
      { $set: { "attack.$": req.body } },
      { new: true }
    );
    if (!weapon) {
      return res.status(404).send("Weapon not found");
    }
    res.status(200).send({
      status: "ok",
      message: "Weapon updated successfully",
      data: weapon,
    });
  } catch (error) {
    console.error("Server-error", error);
    res.status(500).send({
      status: "error",
      message: "Server-error",
      error: error.message,
    });
  }
});

// delete a character attack by id
characterRoute.delete("/weapon/:id/:aid", async (req, res) => {
  try {
    if (!req.params.aid) {
      return res.status(400).send({
        status: "error",
        message: "Weapon ID is required",
      });
    }

    const result = await Character.findByIdAndUpdate(
      req.params.id,
      { $pull: { attack: { _id: req.params.aid } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({
        status: "error",
        message: "Character not found",
      });
    }

    // const weapon = await Character.findOneAndDelete({
    //   _id: req.params.id,
    //   "attack._id": req.params.aid,
    // });

    res.status(200).send({
      status: "ok",
      message: result,
    });
  } catch (error) {
    console.error("Server-error", error);
    res.status(500).send({
      status: "error",
      message: "Server-error",
      error: error.message,
    });
  }
});

export default characterRoute;
