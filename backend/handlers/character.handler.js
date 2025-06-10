import { dbConnect } from "../dbConnect.js";
import characterModel from "../models/character.model.js";

// Get all characters
export const getCharacter = async () => {
  try {
    await dbConnect();
    const character = await characterModel.find({});
    return character;
  } catch (error) {
    throw new Error("Der skete en fejl:");
  }
};

// create a new character
export const createCharacter = async (body) => {
  try {
    await dbConnect();
    const character = await characterModel.create(body);
    return character;
  } catch (error) {
    console.error("something went wrong:", error);
    throw new Error("something went wrong:", error);
  }
};
