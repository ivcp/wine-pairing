import React from 'react';

const addDashes = input => {
  const withDashes = input
    .trim()
    .split(' ')
    .join('-');
  return withDashes;
};

const Recommendations = ({ recommendations, error, isLoading }) => {
  return (
    <div>
      {!error.error &&
        !isLoading &&
        recommendations.items.length > 0 &&
        recommendations.items.map(rec => (
          <article key={rec.id}>
            <a
              href={
                recommendations.wineRecommendation
                  ? rec.link
                  : `https://spoonacular.com/${addDashes(rec.title)}-${rec.id}`
              }
            >
              {' '}
              <img
                src={
                  recommendations.wineRecommendation ? rec.imageUrl : rec.image
                }
                alt={rec.title}
              />
            </a>
            <h2>{rec.title}</h2>
          </article>
        ))}

      {error.error && !isLoading && <p>{error.message}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Recommendations;
