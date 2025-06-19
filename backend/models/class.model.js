import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

// Defining the different possible character stats
const stats = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

const skills = [
  //strength
  "Athletics",
  //dexterity
  "Acrobatics",
  "Sleight of Hand",
  "Stealth",
  //intelligence
  "Arcana",
  "Investigation",
  "History",
  "Religion",
  "Nature",
  //wisdom
  "Animal Handling",
  "Insight",
  "Medicine",
  "Perception",
  "Survival",
  //charisma
  "Deception",
  "Intimidation",
  "Performance",
  "Persuasion",
];

const classSchema = new Schema(
  {
    //* Class name ----------------------------------------------------------------------
    className: { type: String, required: [true, "Name is required"] },
    //* Primary Ability -----------------------------------------------------------------
    primaryAbility: {
      amount: {
        type: Number,
        min: [1, "Amount must be at least 1"],
        max: [5, "Amount must be at most 5"],
        default: 1,
      },
      ability: {
        type: [String],
        enum: { values: stats, message: "Invalid ability" },
        default: ["strength"],
      },
    },
    //* Hit Point Die -------------------------------------------------------------------
    hitPointDie: {
      type: Number,
      enum: { values: [4, 6, 8, 10, 12, 20], message: "Invalid hit point die" },
      default: 4,
    },
    //* Saving Throw Proficiencies ------------------------------------------------------
    savingThrowProficiencies: {
      amount: {
        type: Number,
        min: [1, "Amount must be at least 1"],
        max: [3, "Amount must be at most 3"],
        default: 2,
      },
      throw: {
        type: [String],
        enum: { values: stats, message: "Invalid saving throw" },
        default: ["strength"],
      },
    },
    //* Skill Proficiencies -------------------------------------------------------------
    skillProficiencies: {
      amount: {
        type: Number,
        min: [1, "Amount must be at least 1"],
        max: [5, "Amount must be at most 5"],
        default: 2,
      },
      skill: {
        type: [String],
        enum: { values: skills, message: "Invalid skill" },
        default: ["strength"],
      },
    },
    //* Weapon Proficiencies ------------------------------------------------------------
    weaponProficiencies: {
      weaponMastery: {
        type: [String],
        enum: {
          values: ["simple", "martial"],
          message: "Invalid weapon mastery",
        },
        default: [],
      },
      weaponType: {
        type: [String],
        enum: {
          values: ["ranged", "melee"],
          message: "Invalid weapon type",
        },
        default: [],
      },
      weaponProperties: {
        type: [String],
        enum: {
          values: [
            "ammunition",
            "finesse",
            "heavy",
            "light",
            "loading",
            "reach",
            "special",
            "thrown",
            "two-handed",
            "versatile",
          ],
          message: "Invalid weapon property",
        },
        default: [],
      },
    },
  },

  { timestamps: true }
);

export default mongoose.model("class", classSchema);
