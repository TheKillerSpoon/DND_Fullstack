import { dbConnect } from "../dbConnect.js";
import speciesModel from "../models/species.model.js";

// Get all species
export const getSpecies = async () => {
  try {
    await dbConnect();
    const species = await speciesModel.find({});
    return species;
  } catch (error) {
    throw new Error("Der skete en fejl:");
  }
};

// create a new species
export const createSpecies = async (body) => {
  try {
    await dbConnect();
    const species = await speciesModel.create(body);
    return species;
  } catch (error) {
    console.error("something went wrong:", error);
    throw new Error("something went wrong:", error);
  }
};
