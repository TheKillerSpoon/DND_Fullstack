function Equipment({ character, update }) {
  return (
    <ul>
      Equipment:{" "}
      {character.equipment.map((equip) => (
        <li key={equip}>{equip}</li>
      ))}
    </ul>
  );
}

export default Equipment;
