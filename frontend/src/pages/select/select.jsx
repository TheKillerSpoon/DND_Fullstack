//? Styles -----------------------------------------------------
import styles from "./select.module.css";

//? Hooks ------------------------------------------------------
import { fetchCharacter } from "../../hooks/character/FetchCharacter.jsx";
import useAuth from "../../hooks/auth/useAuth";

//? React ------------------------------------------------------
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//? Components -------------------------------------------------
import CharacterCard from "../../components/characterCard/characterCard.jsx";
import CreateCard from "../../components/createCard/createCard.jsx";

//? Select Character Page --------------------------------------------------
function SelectPage() {
  const { createCharacter, deleteCharacter, characters } = fetchCharacter();
  const { signOut, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("character");
  }, []);

  !token && navigate("/");

  return (
    <section className={styles.frontpageContainer}>
      <h1>Select Character</h1>
      <button onClick={signOut}>Sign Out</button>
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
