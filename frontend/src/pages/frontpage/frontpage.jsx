//? Styles -----------------------------------------------------
import styles from "./frontpage.module.css";

//? Hooks ------------------------------------------------------
import { useFetch } from "../../hooks/useFetch.jsx";

//? React ------------------------------------------------------
import { useEffect } from "react";

//? FSrontpage -------------------------------------------------
function Frontpage() {
  const { getAllCharacters, deleteCharacter, characters } = useFetch();

  useEffect(() => {
    getAllCharacters();
    console.log("Characters:", characters);
  }, []);

  return (
    <>
      <h1>FrontPage</h1>
      <section className={styles.frontpage}>
        {characters.map((character) => (
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
            <p>{character.level}</p>
          </div>
        ))}
        {characters.length < 10 && (
          <div className={styles.characterCard}>
            <h2>New Character</h2>
            <i
              className={"fa-solid " + "fa-trash-can " + styles.trash}
              onClick={() => deleteCharacter(character._id)}
            ></i>
            <form>
              <input
                type="text"
                id="characterName"
                placeholder="Character Name *"
                required
              />
              <input type="text" id="class" placeholder="Class" />
              <button>Create Character</button>
            </form>
          </div>
        )}
      </section>
    </>
  );
}

export default Frontpage;
