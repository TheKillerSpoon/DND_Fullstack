function Def({ character, update }) {
  return (
    <ul>
      <li>Armor Class: {character.armor}</li>
      <li>Initiative: {character.initiative}</li>
      <li>Speed: {character.speed}</li>
      <li>
        <p>Health:</p>
        <ul>
          {Object.keys(character.health).map((key, index) => {
            return (
              <li key={index}>
                {key}: {character.health[key]}
              </li>
            );
          })}
        </ul>
      </li>
      <li>Hit dice: D{character.dice}</li>
      <li>
        <p>Death Saves:</p>
        <ul>
          {Object.keys(character.deathSaves).map((key, index) => {
            return (
              <li key={index}>
                {key}: {character.deathSaves[key]}
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}

export default Def;
