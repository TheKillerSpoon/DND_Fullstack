import express from "express";
import Weapon from "../models/weapon.model.js";
import CharacterModel from "../models/character.model.js";
import characterModel from "../models/character.model.js";

const weaponRoute = express.Router();

// get all weapons
weaponRoute.get("/weapons/:characterID", async (req, res) => {
  try {
    const { characterID } = req.params;

    if (!characterID) {
      return res.status(400).send({
        status: "error",
        message: "Character ID is required",
      });
    }

    let character = await characterModel.findById(characterID);

    const result = await Weapon.find({
      _id: {
        $in: character.attack,
      },
    });

    console.log(
      "Weapons found:",
      result.map((x) => x.name)
    );

    return res.status(200).send({
      status: "ok",
      message: "Weapons found!",
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

// get Weapon by id
weaponRoute.get("/weapon/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        status: "error",
        message: "id missing",
      });
    }

    const weapon = await Weapon.findById(id);

    return res.status(200).send({
      status: "ok",
      message: "Weapons found!",
      data: weapon,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

// create a new weapon
weaponRoute.post("/weapon/:characterID", async (req, res) => {
  try {
    const { characterID } = req.params;

    if (!characterID) {
      return res.status(400).send({
        status: "error",
        message: "Character ID is required",
      });
    }

    let body = req.body;

    if (!body.name || body.name == " ") {
      return res.status(400).send({
        status: "error",
        message: `${field} is required`,
      });
    }

    let character = await characterModel.findById(characterID);

    if (!character) {
      return res.status(404).send({
        status: "error",
        message: "character not found",
        data: null,
      });
    }

    if (character.attack.length >= 10) {
      return res.status(400).send({
        status: "error",
        message: "character has already reached the limit of 10 weapons.",
        data: null,
      });
    }

    const newWeapon = await Weapon.create(body);

    character.attack.push(newWeapon._id);

    await characterModel.findByIdAndUpdate(
      characterID,
      { attack: character.attack },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(201).send({
      status: "ok",
      message: "Weapon created successfully!",
      data: newWeapon,
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

// update a weapon by id
weaponRoute.put("/weapon/:id", async (req, res) => {
  try {
    const weaponId = req.params.id;
    const body = req.body;

    if (!weaponId) {
      return res.status(400).send({
        status: "error",
        message: "Weapon ID is required",
      });
    }

    const updatedWeapon = await Weapon.findByIdAndUpdate(weaponId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedWeapon) {
      return res.status(404).send({
        status: "error",
        message: "Weapon not found",
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Weapon updated successfully!",
      data: updatedWeapon,
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

// delete a weapon by id
weaponRoute.delete("/weapon/:id/:characterID", async (req, res) => {
  try {
    if (!req.params.id || !req.params.characterID) {
      return res.status(400).send({
        status: "error",
        message: "Weapon ID is required",
      });
    }

    const character = await characterModel.findById(req.params.characterID);

    character.attack = character.attack.filter(
      (att) => att.toString() !== req.params.id
    );

    await characterModel.findByIdAndUpdate(
      req.params.characterID,
      { attack: character.attack },
      {
        new: true,
        runValidators: true,
      }
    );

    const deletedWeapon = await Weapon.findByIdAndDelete(req.params.id);

    if (!deletedWeapon) {
      return res.status(404).send({
        status: "error",
        message: "Weapon not found",
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Weapon deleted successfully!",
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

export default weaponRoute;
