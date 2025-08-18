import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

// Defining the possible hit dice for characters
const hitDice = [4, 6, 8, 10, 12, 20];

const wesponSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "weapon name",
    minlength: [1, "Attack name can't be empty"],
    maxlength: [100, "Attack name can't be longer than 100 characters"],
  },
  bonus: {
    type: Number,
    default: 0,
    min: [-20, "Attack bonus can't be below -20"],
    max: [20, "Attack bonus can't be above 20"],
  },
  damage: {
    hits: {
      type: Number,
      default: 1,
      min: [1, "Damage hits can't be below 1"],
      max: [10, "Damage hits can't be above 10"],
    },
    hitDice: {
      type: Number,
      enum: { values: hitDice, message: "invalid hit dice" },
      default: 4,
    },
  },
  extra: {
    type: Number,
    default: 0,
    min: [0, "Damage type can't be below 0"],
    max: [50, "Damage type can't be above 50"],
  },
});

export default mongoose.model("weapon", wesponSchema);
