import React, { useRef, useEffect } from 'react';
import addDashes from '../helpers/addDashes';
import styles from './Recommendations.module.css';

const Recommendations = ({ recommendations, error, isLoading }) => {
  const recRef = useRef(null);
  useEffect(() => {
    if (recommendations.items.length > 0 && !error.error)
      recRef.current.scrollIntoView({
        behavior: 'smooth'
      });
  }, [recommendations.items, error.error]);
  return (
    <div className={styles.recommendations} ref={recRef}>
      {!error.error &&
        !isLoading &&
        recommendations.items.length > 0 &&
        recommendations.items.map(rec => (
          <a
            key={rec.id}
            className={styles.recommendation}
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
            <h2>{rec.title}</h2>
          </a>
        ))}

      {error.error && !isLoading && <p>{error.message}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Recommendations;
