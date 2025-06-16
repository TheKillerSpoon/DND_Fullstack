function Equipment({ equipment }) {
  return (
    <ul>
      Equipment:{" "}
      {equipment.map((equip) => (
        <li key={equip}>{equip}</li>
      ))}
    </ul>
  );
}

export default Equipment;
