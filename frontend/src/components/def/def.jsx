function Def({ armor, initiative, speed, hitPoints, hitDice, saves }) {
  return (
    <ul>
      <li>Armor Class: {armor}</li>
      <li>Initiative: {initiative}</li>
      <li>Speed: {speed}</li>
      <li>
        <p>Health:</p>
        <ul>
          {Object.keys(hitPoints).map((key, index) => {
            return (
              <li key={index}>
                {key}: {hitPoints[key]}
              </li>
            );
          })}
        </ul>
      </li>
      <li>Hit dice: D{hitDice}</li>
      <li>
        <p>Death Saves:</p>
        <ul>
          {Object.keys(saves).map((key, index) => {
            return (
              <li key={index}>
                {key}: {saves[key]}
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}

export default Def;
