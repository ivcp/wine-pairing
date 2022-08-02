import React from 'react';

const Recommendations = ({ recommendations, searchByFood }) => {
  return (
    <div>
      {recommendations.length > 0 &&
        recommendations.map(rec => (
          <article key={rec.id}>
            <h2>{rec.title}</h2>
            <img
              src={searchByFood ? rec.imageUrl : rec.image}
              alt={rec.title}
            />
            {/* TODO: link */}
          </article>
        ))}
    </div>
  );
};

export default Recommendations;
