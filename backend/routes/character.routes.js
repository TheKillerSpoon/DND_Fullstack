import express from "express";
import { getCharacter } from "../handlers/character.handler.js";
import Character from "../models/character.model.js";

const characterRoute = express.Router();

// get all characters
characterRoute.get("/characters", async (req, res) => {
  try {
    const result = await getCharacter();
    return res.status(200).send({
      status: "ok",
      message: "characters blev hentet!",
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

// add a new character
characterRoute.post("/character", async (req, res) => {
  try {
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
    res.status(500).send("sonething went wrong");
  }
});

export default characterRoute;
