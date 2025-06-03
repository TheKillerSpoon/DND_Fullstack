import express from "express";
import { getCharacter } from "../handlers/character.handler.js";

const characterRoute = express.Router();

// get all characters
characterRoute.get("/character", async (req, res) => {
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

export default characterRoute;
