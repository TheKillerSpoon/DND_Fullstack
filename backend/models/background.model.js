import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

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

const backgroundSchema = new Schema(
  {
    //* background name ----------------------------------------------------------------------
    backgroundName: { type: String, required: [true, "Name is required"] },
    //* Skill Proficiencies -------------------------------------------------------------
    skillProficiencies: {
      type: [String],
      enum: { values: skills, message: "Invalid skill" },
      default: ["Athletics"],
    },
    //* background name ----------------------------------------------------------------------
    //* background name ----------------------------------------------------------------------
    //* background name ----------------------------------------------------------------------
    //* background name ----------------------------------------------------------------------
    //* background name ----------------------------------------------------------------------
    //* background name ----------------------------------------------------------------------
    //* background name ----------------------------------------------------------------------
  },

  { timestamps: true }
);

export default mongoose.model("background", backgroundSchema);
