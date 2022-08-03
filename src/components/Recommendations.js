import React from 'react';

const addDashes = input => {
  const withDashes = input
    .trim()
    .split(' ')
    .join('-');
  return withDashes;
};

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
            <a
              href={
                searchByFood
                  ? rec.link
                  : `https://spoonacular.com/${addDashes(rec.title)}-${rec.id}`
              }
            >
              {' '}
              <img
                src={searchByFood ? rec.imageUrl : rec.image}
                alt={rec.title}
              />
            </a>
          </article>
        ))}
      {error.error && !isLoading && <p>{error.message}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Recommendations;
