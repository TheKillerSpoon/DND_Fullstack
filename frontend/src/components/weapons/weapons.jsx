//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Weapons({ character, weaponUpdate, weaponDelete, update }) {
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
      {character.attack.map((weapon, windex) => (
        <li key={weapon?._id || windex}>
          <ul>
            {weapon &&
              Object.keys(weapon).map((key, index) => {
                console.log("key:", [key], "index:", index);
                if (key && index > 1) {
                  if (key !== "_id")
                    return (
                      <li key={key}>
                        {key}: {weapon[key]}
                        <Input
                          id={key}
                          type="number"
                          character={character}
                          update={weaponUpdate}
                          blur="attack"
                          weaponId={weapon._id}
                          layer={windex}
                        />
                      </li>
                    );
                } else if (index === 0) {
                  var damage = weapon[key];
                  return (
                    <li key={key}>
                      {key}:{" "}
                      {Object.keys(damage)
                        .map((key) => damage[key])
                        .join("D")}
                      {Object.keys(damage).map((key) => (
                        <p key={key}>
                          {key}
                          <Input
                            id={key}
                            type="number"
                            character={character}
                            update={weaponUpdate}
                            blur="attackDamage"
                            weaponId={weapon._id}
                            layer={windex}
                            layer2="damage"
                          />
                        </p>
                      ))}
                    </li>
                  );
                } else {
                  return (
                    <li key={key}>
                      {key}: {weapon[key]}
                      <button
                        id={key}
                        onClick={(e) =>
                          weaponDelete(character._id, weapon._id, {
                            attack: character.attack.filter(
                              (x) => x._id !== weapon._id
                            ),
                          })
                        }
                      >
                        delete
                      </button>
                      <Input
                        id={key}
                        character={character}
                        update={weaponUpdate}
                        blur="attack"
                        weaponId={weapon._id}
                        layer={windex}
                      />
                    </li>
                  );
                }
              })}
          </ul>
        </li>
      ))}
      <li>
        <Input
          id="attackName"
          character={character}
          update={update}
          blur="weapon"
        />
      </li>
    </ul>
  );
}

export default Weapons;
