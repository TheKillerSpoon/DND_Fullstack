import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

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

// Function to create traits, ideals, bonds, and flaws
const TIBF = ["personalityTraits", "ideals", "bonds", "flaws"];
const traitsIdealsBondsFlaws = () => {
  let TIBFObject = {};
  TIBF.forEach((_TIBF) => {
    TIBFObject[_TIBF] = {
      type: [String],
      maxlength: [500, `${_TIBF} can't be longer than 500 characters`],
      minlength: [0, `Not possible to have less than 0 characters`],
      default: [""],
    };
  });
  return TIBFObject;
};

const backgroundSchema = new Schema(
  {
    //* background name ----------------------------------------------------------------------
    name: { type: String, required: [true, "Name is required"] },
    //* Feature ---------------------------------------------------------------
    feature: {
      type: String,
      maxlength: [50, "Feat can't be longer than 50 characters"],
      minlength: [0, "Feat can't be shorter than 0 characters"],
    },
    //* Skill Proficiencies -------------------------------------------------------------
    skillProficiencies: {
      type: [String],
      enum: { values: skills, message: "Invalid skill" },
    },
    //* Tool Proficiencies --------------------------------------------------------------
    toolProficiencies: {
      type: [String],
      maxlength: [100, "Tool proficiency can't be longer than 50 characters"],
      minlength: [0, "Tool proficiency can't be shorter than 0 characters"],
    },
    //* languages ----------------------------------------------------------------------
    languages: {
      type: Number,
      min: [1, "You must know at least one language"],
      max: [5, "You can't know more than 5 languages"],
    },
    //* speacialty ----------------------------------------------------------------------
    specialty: {
      type: [String],
    },
    //* personality traits, Ideals, Bonds and Flaws ---------------------------------------
    ...traitsIdealsBondsFlaws(),
    //* Equipment ----------------------------------------------------------------------
    equipment: {
      type: [String],
      maxlength: [500, "Equipment can't be longer than 500 characters"],
      minlength: [0, "Equipment can't be shorter than 0 characters"],
    },
  },

  { timestamps: true }
);

export default mongoose.model("background", backgroundSchema);
