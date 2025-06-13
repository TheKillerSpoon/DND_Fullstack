//? Styles -----------------------------------------------------
import styles from "./createCard.module.css";

//? React ------------------------------------------------------
import { useForm } from "react-hook-form";

//? CreateCard -------------------------------------------------
function CreateCard({ characters, createCharacter }) {
  const { register, handleSubmit, setValue } = useForm();

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
          <select id="class" {...register("class")}>
            <option value="">--Please choose an option--</option>
            <option value="barbarian">Barbarian</option>
            <option value="bard">Bard</option>
            <option value="cleric">Cleric</option>
            <option value="druid">Druid</option>
            <option value="fighter">Fighter</option>
            <option value="monk">Monk</option>
            <option value="paladin">Paladin</option>
            <option value="ranger">Ranger</option>
            <option value="rogue">Rogue</option>
            <option value="sorcerer">Sorcerer</option>
            <option value="warlock">Warlock</option>
            <option value="wizard">Wizard</option>
            <option value="artificer">Artificer</option>
          </select>

          <label htmlFor="race">Choose a race</label>
          <select id="race" {...register("race")}>
            <option value="">--Please choose an option--</option>
            <option value="human">Human</option>
            <option value="elf">Elf</option>
            <option value="dwarf">Dwarf</option>
            <option value="halfling">Halfling</option>
            <option value="dragonborn">Dragonborn</option>
            <option value="gnome">Gnome</option>
            <option value="half-elf">Half-Elf</option>
            <option value="half-orc">Half-Orc</option>
            <option value="tiefling">Tiefling</option>
          </select>

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
