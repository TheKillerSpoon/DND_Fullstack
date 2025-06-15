//? Styles -----------------------------------------------------
import styles from "./createCard.module.css";

//? React ------------------------------------------------------
import { useForm } from "react-hook-form";

//? CreateCard -------------------------------------------------
function CreateCard({ characters, createCharacter }) {
  const { register, handleSubmit, setValue } = useForm();

  const classInfo = (ability, hitDie, saves) => {
    return `Ability: ${ability}. Hit die: D${hitDie}. Saves: ${saves}.`;
  };

  const raceInfo = (test) => {
    return test.map((item, index) => {
      if (index !== test.length - 1) {
        return `${item}, `;
      } else {
        return `${item}.`;
      }
    });
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
            <option value="Barbarian">
              {...classInfo("Strength", 12, "Strength & Constitution")}
            </option>
            <option value="Bard">
              {...classInfo("Charisma", 8, "Dexterity & Charisma")}
            </option>
            <option value="Cleric">
              {...classInfo("Wisdom", 8, "Wisdom & Charisma")}
            </option>
            <option value="Druid">
              {...classInfo("Wisdom", 8, "Intelligence & Wisdom")}
            </option>
            <option value="Fighter">
              {...classInfo(
                "Strength or Dexterity",
                10,
                "Strength & Constitution"
              )}
            </option>
            <option value="Monk">
              {...classInfo("Dexterity & Wisdom", 8, "Strength & Dexterity")}
            </option>
            <option value="Paladin">
              {...classInfo("Strength & Charisma", 10, "Wisdom & Charisma")}
            </option>
            <option value="Ranger">
              {...classInfo("Dexterity & Wisdom", 10, "Strength & Dexterity")}
            </option>
            <option value="Rogue">
              {...classInfo("Dexterity", 8, "Dexterity & Intelligence")}
            </option>
            <option value="Sorcerer">
              {...classInfo("Charisma", 6, "Constitution & Charisma")}
            </option>
            <option value="Warlock">
              {...classInfo("Charisma", 8, "Wisdom & Charisma")}
            </option>
            <option value="Wizard">
              {...classInfo("Intelligence", 6, "Intelligence & Wisdom")}
            </option>
            <option value="Artificer">
              {...classInfo("Intelligence", 8, "Constitution & Intelligence")}
            </option>
          </datalist>

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
          <select id="background" {...register("background")}>
            <option value="">--Please choose an option--</option>
            <option value="acolyte">Acolyte</option>
            <option value="charlatan">Charlatan</option>
            <option value="criminal">Criminal</option>
            <option value="entertainer">Entertainer</option>
            <option value="folk hero">Folk Hero</option>
            <option value="guild artisan">Guild Artisan</option>
            <option value="hermit">Hermit</option>
            <option value="noble">Noble</option>
            <option value="outlander">Outlander</option>
            <option value="sage">Sage</option>
            <option value="soldier">Soldier</option>
            <option value="urchin">Urchin</option>
          </select>

          <button type="submit">Create Character</button>
        </form>
      </div>
    )
  );
}

export default CreateCard;
