function ProfLang({ character, update }) {
  return (
    <ul>
      <li>ProfLang:</li>
      {character.otherProficiencies.map((proficiency, index) => (
        <li key={index}>{proficiency}</li>
      ))}
    </ul>
  );
}

export default ProfLang;
