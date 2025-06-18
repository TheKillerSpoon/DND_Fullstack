//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function ProfLang({ character, update }) {
  return (
    <ul>
      <li>ProfLang:</li>
      {character.otherProficiencies.map((proficiency, index) => (
        <li key={index}>
          {proficiency}

          <button
            id="otherProficiencies"
            onClick={(e) =>
              update(character._id, {
                [e.target.id]: character[e.target.id].filter(
                  (x) => x !== proficiency
                ),
              })
            }
          >
            delete
          </button>
        </li>
      ))}
      <li>
        <Input
          id="otherProficiencies"
          character={character}
          update={update}
          blur={"array"}
        />
      </li>
    </ul>
  );
}

export default ProfLang;
