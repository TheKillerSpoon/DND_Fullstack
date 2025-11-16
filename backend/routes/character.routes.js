import express from "express";
import Character from "../models/character.model.js";
import classModel from "../models/class.model.js";
import raceModel from "../models/race.model.js";
import backgroundModel from "../models/background.model.js";
import userModel from "../models/user.model.js";

const characterRoute = express.Router();

//! test variables ---------------------------------------------------------------------
const test = ["class", "race", "background", "alignment", "name"];

//! validation -----------------------------------------------------------------------
// This variable is used to control the validation state
let validate = true;
const validateCharacter = async (body, userID) => {
  const characterValidationCriteria = [
    {
      data: await classModel.find({}),
      comparison: body.class,
    },
    {
      data: await raceModel.find({}),
      comparison: body.race,
    },
    {
      data: await backgroundModel.find({}),
      comparison: body.background,
    },
  ];

  const validationPromises = characterValidationCriteria.map((v) => {
    if (!v.comparison) return true; // If no comparison value, skip validation

    return v.data.some(
      (x) =>
        x.name.toLowerCase().trim(" ") === v.comparison.toLowerCase().trim(" ")
    );
  });

  const validationResults = await Promise.all(validationPromises);

  if (!userID) {
    validationResults.push(false); // Ensure userID is always present
  }

  // if any of the checks fail, set validate to false
  validate = validationResults.every((x) => x === true);
};

//! universal routes -----------------------------------------------------------------

// get all characters
characterRoute.get("/characters/:userID", async (req, res) => {
  try {
    console.log("request", req.params.userID);

    let user = await userModel.findById(req.params.userID);

    const result = await Character.find({
      _id: {
        $in: user.characterIDs,
      },
    });
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

    await validateCharacter(req.body, body.userID);

    if (!validate) {
      return res.status(400).send({
        status: "error",
        message: "Invalid character provided",
      });
    }

    const userID = body.userID;

    let user = await userModel.findById(userID);

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
        data: null,
      });
    }

    if (user.characterIDs.length >= 10) {
      return res.status(400).send({
        status: "error",
        message: "User has already reached the limit of 10 characters.",
        data: null,
      });
    }

    body = {
      name: body.name,
      class: body.class,
      race: body.race,
      background: body.background,
      alignment: body.alignment,
    };

    var character = await Character.create(body);

    user.characterIDs.push(character._id);

    await userModel.findByIdAndUpdate(
      userID,
      { characterIDs: user.characterIDs },
      {
        new: true,
        runValidators: true,
      }
    );

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
characterRoute.delete("/character/:id/:userID", async (req, res) => {
  try {
    if (!req.params.id || !req.params.userID) {
      return res.status(400).send({
        status: "error",
        message: "Character ID and userID is required",
      });
    }

    const user = await userModel.findById(req.params.userID);

    user.characterIDs = user.characterIDs.filter(
      (characterID) => characterID.toString() !== req.params.id
    );

    await userModel.findByIdAndUpdate(
      req.params.userID,
      { characterIDs: user.characterIDs },
      {
        new: true,
        runValidators: true,
      }
    );

    await Character.findByIdAndDelete(req.params.id);

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

// // add a new character attack
// characterRoute.post("/weapon/:id", async (req, res) => {
//   try {
//     if (!req.params.id) {
//       return res.statu(400).send({
//         status: "error",
//         message: "Character ID is required",
//       });
//     }

//     const character = await Character.findById(req.params.id);
//     if (!character) {
//       return res.status(404).send("Character not found");
//     }

//     character.attack.push(req.body);
//     await character.save();

//     res.status(201).send({
//       status: "ok",
//       message: "Weapon added successfully",
//       data: character,
//     });
//   } catch (error) {
//     console.error("Server-error", error);
//     res.status(500).send({
//       status: "error",
//       message: "Server-error",
//       error: error.message,
//     });
//   }
// });

// // update a character attack by id
// characterRoute.put("/weapon/:id/:aid", async (req, res) => {
//   try {
//     if (!req.params.aid) {
//       return res.status(400).send({
//         status: "error",
//         message: "Weapon ID is required",
//       });
//     }

//     const weapon = await Character.findOneAndUpdate(
//       { _id: req.params.id, "attack._id": req.params.aid },
//       { $set: { "attack.$": req.body } },
//       { new: true }
//     );
//     if (!weapon) {
//       return res.status(404).send("Weapon not found");
//     }
//     res.status(200).send({
//       status: "ok",
//       message: "Weapon updated successfully",
//       data: weapon,
//     });
//   } catch (error) {
//     console.error("Server-error", error);
//     res.status(500).send({
//       status: "error",
//       message: "Server-error",
//       error: error.message,
//     });
//   }
// });

// // delete a character attack by id
// characterRoute.delete("/weapon/:id/:aid", async (req, res) => {
//   try {
//     if (!req.params.aid) {
//       return res.status(400).send({
//         status: "error",
//         message: "Weapon ID is required",
//       });
//     }

//     const result = await Character.findByIdAndUpdate(
//       req.params.id,
//       { $pull: { attack: { _id: req.params.aid } } },
//       { new: true }
//     );

//     if (!result) {
//       return res.status(404).send({
//         status: "error",
//         message: "Character not found",
//       });
//     }

//     // const weapon = await Character.findOneAndDelete({
//     //   _id: req.params.id,
//     //   "attack._id": req.params.aid,
//     // });

//     res.status(200).send({
//       status: "ok",
//       message: result,
//     });
//   } catch (error) {
//     console.error("Server-error", error);
//     res.status(500).send({
//       status: "error",
//       message: "Server-error",
//       error: error.message,
//     });
//   }
// });

export default characterRoute;
