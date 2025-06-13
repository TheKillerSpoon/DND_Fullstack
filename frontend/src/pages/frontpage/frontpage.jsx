//? Styles -----------------------------------------------------
import styles from "./frontpage.module.css";

//? Hooks ------------------------------------------------------
import { useFetch } from "../../hooks/useFetch.jsx";

//? React ------------------------------------------------------
import { useEffect } from "react";

//? Components -------------------------------------------------
import CharacterCard from "../../components/characterCard/characterCard.jsx";
import CreateCard from "../../components/createCard/createCard.jsx";

//? Frontpage --------------------------------------------------
function Frontpage() {
  const { getAllCharacters, createCharacter, deleteCharacter, characters } =
    useFetch();

  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <>
      <h1>FrontPage</h1>
      <a href="/character">test</a>
      <section className={styles.frontpage}>
        <CharacterCard
          characters={characters}
          deleteCharacter={deleteCharacter}
        />
        <CreateCard characters={characters} createCharacter={createCharacter} />
      </section>
    </>
  );
}

export default Frontpage;
