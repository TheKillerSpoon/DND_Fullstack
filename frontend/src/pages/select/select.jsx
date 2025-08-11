//? Styles -----------------------------------------------------
import styles from "./select.module.css";

//? Hooks ------------------------------------------------------
import { fetchCharacter } from "../../hooks/character/FetchCharacter.jsx";

//? React ------------------------------------------------------
import { useEffect } from "react";

//? Components -------------------------------------------------
import CharacterCard from "../../components/characterCard/characterCard.jsx";
import CreateCard from "../../components/createCard/createCard.jsx";

//? Select Character Page --------------------------------------------------
function SelectPage() {
  const { createCharacter, deleteCharacter, characters } = fetchCharacter();

  useEffect(() => {
    localStorage.removeItem("character");
  }, []);

  return (
    <section className={styles.frontpageContainer}>
      <h1>Select Character</h1>
      <section className={styles.frontpage}>
        {characters.length
          ? characters.map((character) => (
              <CharacterCard
                deleteCharacter={deleteCharacter}
                character={character}
              />
            ))
          : ""}
        {characters.length < 10 && (
          <CreateCard createCharacter={createCharacter} />
        )}
      </section>
    </section>
  );
}

export default SelectPage;
