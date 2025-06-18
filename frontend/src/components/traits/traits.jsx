//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Traits({ character, update }) {
  return (
    <ul>
      Traits:
      {character.featuresTraits.map((trait, index) => (
        <li key={index}>
          {trait}

          <button
            id="featuresTraits"
            onClick={(e) =>
              update(character._id, {
                [e.target.id]: character[e.target.id].filter(
                  (x) => x !== trait
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
          id="featuresTraits"
          character={character}
          update={update}
          blur={"array"}
        />
      </li>
    </ul>
  );
}

export default Traits;
