//? Styles -----------------------------------------------------
import styles from "./frontpage.module.css";

//? Hooks ------------------------------------------------------
import { fetchCharacter } from "../../hooks/character/FetchCharacter.jsx";

//? React ------------------------------------------------------
import { useEffect } from "react";

//? Components -------------------------------------------------
import CharacterCard from "../../components/characterCard/characterCard.jsx";
import CreateCard from "../../components/createCard/createCard.jsx";

//? Frontpage --------------------------------------------------
function Frontpage() {
  const { getAllCharacters, createCharacter, deleteCharacter, characters } =
    fetchCharacter();

  useEffect(() => {
    getAllCharacters();
    localStorage.removeItem("character");
  }, []);

  return (
    <section className={styles.frontpageContainer}>
      <h1>FrontPage</h1>
      <section className={styles.frontpage}>
        <CharacterCard
          characters={characters}
          deleteCharacter={deleteCharacter}
        />
        <CreateCard characters={characters} createCharacter={createCharacter} />
      </section>
    </section>
  );
}

export default Frontpage;
