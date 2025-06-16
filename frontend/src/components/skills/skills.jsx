function Skills({ skills }) {
  return (
    <ul>
      <li>Skills</li>
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  );
}

export default Skills;
