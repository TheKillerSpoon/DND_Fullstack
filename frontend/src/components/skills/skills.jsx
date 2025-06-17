function Skills({ character, update }) {
  return (
    <ul>
      <li>Skills</li>
      {character.skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  );
}

export default Skills;
