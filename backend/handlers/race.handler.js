import { dbConnect } from "../dbConnect.js";
import raceModel from "../models/race.model.js";

// Get all race
export const getRace = async () => {
  try {
    await dbConnect();
    const race = await raceModel.find({});
    return race;
  } catch (error) {
    throw new Error("Der skete en fejl:");
  }
};

// create a new race
export const createRace = async (body) => {
  try {
    await dbConnect();
    const race = await raceModel.create(body);
    return race;
  } catch (error) {
    console.error("something went wrong:", error);
    throw new Error("something went wrong:", error);
  }
};
