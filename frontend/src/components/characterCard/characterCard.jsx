//? Styles -----------------------------------------------------
import styles from "./characterCard.module.css";

//? React ------------------------------------------------------
import { useNavigate } from "react-router-dom";

//? CharacterCard ----------------------------------------------
export default function CharacterCard({ deleteCharacter, character }) {
  const navigate = useNavigate();

  const selectCharacter = (characterId) => {
    localStorage.removeItem("character");
    localStorage.setItem("character", characterId);
    navigate("/character");
  };

  return (
    <div className={styles.characterCard}>
      <i
        className={"fa-solid " + "fa-trash-can " + styles.trash}
        onClick={() => deleteCharacter(character._id)}
      ></i>
      <h2>{character.name}</h2>
      <img
        src={`/src/assets/class/${character.class}.png`}
        alt="test"
        className={styles.img}
      ></img>
      <p>
        {character.background} {character.class}
      </p>
      <button onClick={() => selectCharacter(character._id)}>
        Select {character.race}
      </button>
    </div>
  );
}
