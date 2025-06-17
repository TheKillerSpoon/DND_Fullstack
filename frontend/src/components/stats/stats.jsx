function Stats({ character, update }) {
  // console.log(Object.keys(stats).map((key) => `${key}: ${stats[key]}`));

  console.log(
    Object.keys(character.stats)
      .sort()
      .map((key) => `${key}: ${character.stats[key]}`)
  );

  return (
    <ul>
      {Object.keys(character.stats)
        .sort()
        .map((key, index) => {
          return (
            <li key={index}>
              {key}: {character.stats[key]}
              <input
                type="number"
                id={key}
                placeholder={character.stats[key]}
                onBlur={(e) => {
                  if (character[e.target.id] !== e.target.value) {
                    update(character._id, {
                      stats: {
                        ...character.stats,
                        [e.target.id]: e.target.value,
                      },
                    });
                  }
                }}
                defaultValue={character.stats[key]}
              />
            </li>
          );
        })}
    </ul>
  );
}

export default Stats;
