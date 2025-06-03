import dbConnect from "../dbConnect.js";

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
