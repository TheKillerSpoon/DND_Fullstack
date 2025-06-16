function ProfLang({ proficiencies }) {
  return (
    <ul>
      <li>ProfLang:</li>
      {proficiencies.map((proficiency, index) => (
        <li key={index}>{proficiency}</li>
      ))}
    </ul>
  );
}

export default ProfLang;
