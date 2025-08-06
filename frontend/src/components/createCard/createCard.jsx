//? Styles -----------------------------------------------------
import styles from "./createCard.module.css";

//? React ------------------------------------------------------
import { useForm } from "react-hook-form";

//? Components -------------------------------------------------
import FormInput from "../formInput/formInput.jsx";

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

          <FormInput location="class" register={register} />
          <FormInput location="race" register={register} />
          <FormInput location="background" register={register} />

          <button type="submit">Create Character</button>
        </form>
      </div>
    )
  );
}

export default CreateCard;
