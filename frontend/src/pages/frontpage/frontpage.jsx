//? Styles -----------------------------------------------------
import styles from "./frontpage.module.css";

//? Hooks ------------------------------------------------------
import { useFetch } from "../../hooks/useFetch.jsx";

//? React ------------------------------------------------------
import { useEffect, useState } from "react";

//? FSrontpage -------------------------------------------------
function Frontpage() {
  const { getAllCharacters, characters } = useFetch();
  const [img, setImg] = useState("");

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
      </section>
    </>
  );
}

export default Frontpage;
