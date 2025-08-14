//? Styles -----------------------------------------------------
import styles from "./createCard.module.css";

//? React ------------------------------------------------------
import { useForm } from "react-hook-form";
import { useEffect } from "react";

//? Hooks ------------------------------------------------------
import useAuth from "../../hooks/auth/useAuth";

//? Components -------------------------------------------------
import FormInput from "../formInput/formInput.jsx";

//? CreateCard -------------------------------------------------
function CreateCard({ createCharacter }) {
  const { register, handleSubmit, setValue } = useForm();
  const { user } = useAuth();

  useEffect(() => {
    setValue("userID", user._id);
  }, []);

  return (
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
        <fieldset>
          <legend>Name Your Character</legend>
          <input
            {...register("name", { required: true })}
            type="text"
            id="characterName"
            placeholder="Name *"
            required
          />
        </fieldset>

        <FormInput location="class" register={register} />
        <FormInput location="race" register={register} />
        <FormInput location="background" register={register} />

        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default CreateCard;
