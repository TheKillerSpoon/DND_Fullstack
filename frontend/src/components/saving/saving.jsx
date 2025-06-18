//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Saving({ character, update }) {
  return (
    <ul>
      <li>Saving throws:</li>
      {character.saves.map((save, index) => (
        <li key={index}>
          {save}
          <button
            id="saves"
            onClick={(e) =>
              update(character._id, {
                [e.target.id]: character[e.target.id].filter((x) => x !== save),
              })
            }
          >
            delete
          </button>
        </li>
      ))}
      <li>
        <Input
          id="saves"
          character={character}
          update={update}
          blur={"array"}
        />
      </li>
    </ul>
  );
}

export default Saving;
