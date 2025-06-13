//? Styles -----------------------------------------------------
import styles from "./characterCard.module.css";

//? Hooks ------------------------------------------------------
import { useFetch } from "../../hooks/useFetch.jsx";

//? CharacterCard ----------------------------------------------
function CharacterCard({ characters, deleteCharacter }) {
  const { getCharacterById, character } = useFetch();

  const selectCharacter = (characterId) => {
    console.log("Selected Character ID:", characterId);
    getCharacterById(characterId);
  };

  character && console.log("Selected Character:", character);

  return characters.map((character) => (
    <div key={character._id} className={styles.characterCard}>
      <i
        className={"fa-solid " + "fa-trash-can " + styles.trash}
        onClick={() => deleteCharacter(character._id)}
      ></i>
      <h2>{character.name}</h2>
      {character.image ? (
        <img
          src={character.image}
          alt={character.name}
          className={styles.characterImage}
        />
      ) : (
        <i className={"fa-regular " + "fa-image " + styles.icon}></i>
      )}
      <p>{character.class}</p>
      <button onClick={() => selectCharacter(character._id)}>
        Select Character
      </button>
    </div>
  ));
}

export default CharacterCard;
