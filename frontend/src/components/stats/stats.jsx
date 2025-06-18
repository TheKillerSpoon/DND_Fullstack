//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Stats({ character, update }) {
  // console.log(Object.keys(stats).map((key) => `${key}: ${stats[key]}`));

  return (
    <ul>
      {Object.keys(character.stats)
        .sort()
        .map((key, index) => {
          return (
            <li key={index}>
              {key}: {character.stats[key]}
              <Input
                id={key}
                type="number"
                character={character}
                update={update}
                blur={"object"}
                layer={["stats"]}
              />
            </li>
          );
        })}
    </ul>
  );
}

export default Stats;
