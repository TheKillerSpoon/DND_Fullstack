function Stats({ stats }) {
  // console.log(Object.keys(stats).map((key) => `${key}: ${stats[key]}`));

  return (
    <ul>
      {Object.keys(stats).map((key, index) => {
        return (
          <li key={index}>
            {key}: {stats[key]}
          </li>
        );
      })}
    </ul>
  );
}

export default Stats;
