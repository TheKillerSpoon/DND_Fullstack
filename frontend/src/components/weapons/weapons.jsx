//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Weapons({ character, update }) {
  // console.log("Weapons:", weapons);
  // console.log(
  //   weapons.map((weapon) =>
  //     Object.keys(weapon).map((key, index) => {
  //       if (index !== 0) {
  //         return `${key}: ${weapon[key]}`;
  //       } else {
  //         var test = weapon[key];
  //         return Object.keys(test).map((key) => `${key}: ${test[key]}`);
  //       }
  //     })
  //   )
  // );

  return (
    <ul>
      <li>Weapons:</li>
      {character.attack.map((weapon) => (
        <li key={weapon._id}>
          <ul>
            {Object.keys(weapon).map((key, index) => {
              if (index > 1) {
                if (key !== "_id")
                  return (
                    <li key={key}>
                      {key}: {weapon[key]}
                      <Input
                        id={key}
                        type="number"
                        character={character}
                        update={update}
                        blur={"object"}
                        layer={["attack"]}
                      />
                    </li>
                  );
              } else if (index === 0) {
                var damage = weapon[key];
                return (
                  <li key={key}>
                    Damage:{" "}
                    {Object.keys(damage)
                      .map((key) => damage[key])
                      .join("D")}
                    {Object.keys(damage).map((key) => (
                      // damage[key]
                      <Input
                        key={key}
                        id={key}
                        character={character}
                        update={update}
                        blur={"object"}
                        layer={["attack", "damage"]}
                      />
                    ))}
                  </li>
                );
              } else {
                return (
                  <li key={key}>
                    {key}: {weapon[key]}
                    <Input
                      id={key}
                      character={character}
                      update={update}
                      blur={"object"}
                      layer={["attack"]}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Weapons;
