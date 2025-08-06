import { dbConnect } from "../dbConnect.js";
import backgroundModel from "../models/background.model.js";

// Get all backgrounds
export const getBackground = async () => {
  try {
    await dbConnect();
    const background = await backgroundModel.find({});
    return background;
  } catch (error) {
    throw new Error("Der skete en fejl:");
  }
};

// create a new background
export const createBackground = async (body) => {
  try {
    await dbConnect();
    const background = await backgroundModel.create(body);
    return background;
  } catch (error) {
    console.error("something went wrong:", error);
    throw new Error("something went wrong:", error);
  }
};
