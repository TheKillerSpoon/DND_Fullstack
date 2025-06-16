function Weapons({ weapons }) {
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
      {weapons.map((weapon) => (
        <li key={weapon._id}>
          <ul>
            {Object.keys(weapon).map((key, index) => {
              if (index !== 0) {
                if (key !== "_id")
                  return (
                    <li key={key}>
                      {key}: {weapon[key]}
                    </li>
                  );
              } else {
                var damage = weapon[key];
                return (
                  <li key={key}>
                    Damage:{" "}
                    {Object.keys(damage)
                      .map((key) => damage[key])
                      .join("D")}
                  </li>
                );
              }
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Weapons;
