import React from 'react';

const Recommendations = ({
  recommendations,
  searchByFood,
  error,
  isLoading
}) => {
  return (
    <div>
      {!error.error &&
        !isLoading &&
        recommendations.length > 0 &&
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
      {error.error && !isLoading && <p>{error.message}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Recommendations;
