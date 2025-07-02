//? Styles -----------------------------------------------------
import styles from "./createCard.module.css";

//? React ------------------------------------------------------
import { useForm } from "react-hook-form";
import { useEffect } from "react";

//? Hooks ------------------------------------------------------
import { fetchClass } from "../../hooks/class/FetchClass.jsx";

//? CreateCard -------------------------------------------------
function CreateCard({ characters, createCharacter }) {
  const { getAllClasses, classes } = fetchClass();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    getAllClasses();
  }, []);

  console.log("classes", classes);

  const classInfo = (ability, hitDie, saves) => {
    return `Ability: ${ability}. Hit die: D${hitDie}. Saves: ${saves.join(
      " & "
    )}.`;
  };

  const raceInfo = (Traits) => {
    return `${Traits.join(", ")}.`;
  };

  const BackgroundInfo = (Feature, Proficiencies) => {
    return `Feat: ${Feature}. Proficiencies: ${Proficiencies.join(", ")}.`;
  };

  return (
    characters.length < 10 && (
      <div className={styles.characterCard}>
        <h2>New Character</h2>

        <form
          onSubmit={handleSubmit((data) => {
            createCharacter(data);
            setValue("name", "");
            setValue("class", "");
            setValue("race", "");
            setValue("background", "");
          })}
        >
          <input
            {...register("name", { required: true })}
            type="text"
            id="characterName"
            placeholder="Character Name *"
            required
          />

          <label htmlFor="class">Choose a class</label>
          <input
            type="text"
            placeholder="Class"
            list="class"
            {...register("class")}
          />

          <datalist id="class">
            {classes.map((classItem) => (
              <option value={classItem.className}>
                Ability:{" "}
                {classItem.primaryAbility.ability.length > 1
                  ? classItem.primaryAbility.amount > 1
                    ? classItem.primaryAbility.ability.join(" & ")
                    : classItem.primaryAbility.ability.join(" or ")
                  : classItem.primaryAbility.ability}
                . Hit die: D{classItem.hitPointDie}. Saves:{" "}
                {classItem.savingThrowProficiencies.join(" & ")}.
              </option>
            ))}
          </datalist>

          {/* <datalist id="class">
            <option value="Barbarian">
              {...classInfo("Strength", 12, ["Strength", "Constitution"])}
            </option>
            <option value="Bard">
              {...classInfo("Charisma", 8, ["Dexterity", "Charisma"])}
            </option>
            <option value="Cleric">
              {...classInfo("Wisdom", 8, ["Wisdom", "Charisma"])}
            </option>
            <option value="Druid">
              {...classInfo("Wisdom", 8, ["Intelligence", "Wisdom"])}
            </option>
            <option value="Fighter">
              {...classInfo("Strength or Dexterity", 10, [
                "Strength",
                "Constitution",
              ])}
            </option>
            <option value="Monk">
              {...classInfo("Dexterity & Wisdom", 8, ["Strength", "Dexterity"])}
            </option>
            <option value="Paladin">
              {...classInfo("Strength & Charisma", 10, ["Wisdom", "Charisma"])}
            </option>
            <option value="Ranger">
              {...classInfo("Dexterity & Wisdom", 10, [
                "Strength",
                "Dexterity",
              ])}
            </option>
            <option value="Rogue">
              {...classInfo("Dexterity", 8, ["Dexterity", "Intelligence"])}
            </option>
            <option value="Sorcerer">
              {...classInfo("Charisma", 6, ["Constitution", "Charisma"])}
            </option>
            <option value="Warlock">
              {...classInfo("Charisma", 8, ["Wisdom", "Charisma"])}
            </option>
            <option value="Wizard">
              {...classInfo("Intelligence", 6, ["Intelligence", "Wisdom"])}
            </option>
            <option value="Artificer">
              {...classInfo("Intelligence", 8, [
                "Constitution",
                "Intelligence",
              ])}
            </option>
          </datalist> */}

          <label htmlFor="race">Choose a race</label>
          <input
            type="text"
            placeholder="Race"
            list="race"
            {...register("race")}
          />
          <datalist id="race">
            <option value="Aasimar">
              {...raceInfo([
                "Celestial Resistance",
                "Darkvision",
                "Healing Hands",
                "Light Bearer",
                "Celestial Revelation",
              ])}
            </option>
            <option value="Dragonborn">
              {...raceInfo([
                "Dragon Ancestry",
                "Breath Weapon",
                "Damage Resistance",
                "Darkvision",
                "Draconic Flight",
              ])}
            </option>
            <option value="Dwarf">
              {...raceInfo([
                "Darkvision",
                "Dwarven Resilience",
                "Dwarven Toughness",
                "Stonecunning",
              ])}
            </option>
            <option value="Elf">
              {...raceInfo([
                "Darkvision",
                "Elven Lineage",
                "Fey Ancestry",
                "Keen Senses",
                "Trance",
              ])}
            </option>
            <option value="Gnome">
              {...raceInfo([
                "Darkvision",
                "Gnomish Cunning",
                "Gnomish lineage",
              ])}
            </option>
            <option value="Goliath">
              {...raceInfo(["Giant Ancestry", "Large Form", "Powerful Build"])}
            </option>
            <option value="Halfling">
              {...raceInfo([
                "Brave",
                "Halfling Nimbleness",
                "Luck",
                "Naturally Stealthy",
              ])}
            </option>
            <option value="Human">
              {...raceInfo(["Resourceful", "Skillful", "Verdatile"])}
            </option>
            <option value="Orc">
              {...raceInfo([
                "Adrenaline Rush",
                "Darkvision",
                "Relentless Endurance",
              ])}
            </option>
            <option value="Tiefling">
              {...raceInfo([
                "Darkvision",
                "Fiendish Legacy",
                "Otherworldly Presence",
              ])}
            </option>
          </datalist>

          <label htmlFor="background">Choose a background</label>
          <input
            type="text"
            placeholder="Background"
            list="background"
            {...register("background")}
          />
          <datalist id="background">
            <option value="Acolyte">
              {...BackgroundInfo("Magic Initiate (Cleric)", [
                "Insight",
                "Religion",
              ])}
            </option>
            <option value="Artisan">
              {...BackgroundInfo("Crafter", ["Investigation", "Persuation"])}
            </option>
            <option value="Charlatan">
              {...BackgroundInfo("Skilled", ["Deception", "Sleight of Hand"])}
            </option>
            <option value="Criminal">
              {...BackgroundInfo("Alert", ["Stealth", "Sleight of Hand"])}
            </option>
            <option value="Entertainer">
              {...BackgroundInfo("Musician", ["Acrobatics", "Performance"])}
            </option>
            <option value="Farmer">
              {...BackgroundInfo("Tough", ["Animal Handling", "Nature"])}
            </option>
            <option value="Guard">
              {...BackgroundInfo("Alert", ["Athletics", "Perception"])}
            </option>
            <option value="Guide">
              {...BackgroundInfo("Magic Initiate (Druid)", [
                "Stealth",
                "Survival",
              ])}
            </option>
            <option value="Hermit">
              {...BackgroundInfo("Healer", ["Medicine", "Religion"])}
            </option>
            <option value="Merchant">
              {...BackgroundInfo("Lucky", ["Animal Handling", "Persuasion"])}
            </option>
            <option value="Noble">
              {...BackgroundInfo("Skilled", ["History", "Persuasion"])}
            </option>
            <option value="Sage">
              {...BackgroundInfo("Magic Initiate (Wizard)", [
                "Arcana",
                "History",
              ])}
            </option>
            <option value="Sailor">
              {...BackgroundInfo("tavern Brawler", [
                "Acrobatics",
                "Perception",
              ])}
            </option>
            <option value="Scribe">
              {...BackgroundInfo("Skilled", ["Investigation", "Perception"])}
            </option>
            <option value="Soldier">
              {...BackgroundInfo("Savage Attacker", [
                "Athletics",
                "Intimidation",
              ])}
            </option>
            <option value="Wayfarer">
              {...BackgroundInfo("lucky", ["Insight", "Stealth"])}
            </option>
          </datalist>

          <button type="submit">Create Character</button>
        </form>
      </div>
    )
  );
}

export default CreateCard;
