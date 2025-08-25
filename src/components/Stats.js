import React from "react";

function Stats({ movies }) {
  const perMonth = {};
  const perYear = {};

  movies.forEach((m) => {
    const date = new Date(m.watchedAt);
    const month = `${date.getMonth() + 1}-${date.getFullYear()}`;
    const year = date.getFullYear();

    perMonth[month] = (perMonth[month] || 0) + 1;
    perYear[year] = (perYear[year] || 0) + 1;
  });

  return (
    <div className="stats card">
      <h3>📊 Your Stats</h3>
      <p>Total Movies: {movies.length}</p>
      <p>Movies this year: {perYear[new Date().getFullYear()] || 0}</p>
      <h4>Movies per month:</h4>
      <ul>
        {Object.keys(perMonth).map((m, i) => (
          <li key={i}>{m}: {perMonth[m]}</li>
        ))}
      </ul>
    </div>
  );
}

export default Stats;
