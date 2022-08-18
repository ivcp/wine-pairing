import React from 'react';
import styles from './Pairing.module.css';

const Pairing = ({
  children,
  value,
  setRecommendation,
  searchByFood,
  isLoading,
  setError,
  setIsLoading
}) => {
  const getRec = async value => {
    try {
      setIsLoading(true);
      const data = await fetch(
        searchByFood
          ? `/.netlify/functions/fetch-pairings?type=wine-recommendation&wine=${value}`
          : `/.netlify/functions/fetch-pairings?type=food-recommendation&food=${value}`
      );
      if (data.status === 400) {
        const response = await data.json();
        throw new Error(response.body.message);
      }
      if (!data.ok)
        throw new Error(
          `Failed to get ${
            searchByFood ? 'wine' : 'dish'
          } recommendations, sorry.`
        );
      const { data: response } = await data.json();
      if (response.status === 'failure') {
        throw new Error(response.message);
      }

      const recommendations = searchByFood
        ? response.recommendedWines
        : response.results;

      if (recommendations.length === 0)
        throw new Error(
          `No ${searchByFood ? 'wines' : 'recipes'} found for ${value}, sorry.`
        );
      searchByFood
        ? setRecommendation({
            wineRecommendation: true,
            items: recommendations
          })
        : setRecommendation({
            wineRecommendation: false,
            items: recommendations
          });

      setError({
        error: false,
        message: ''
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError({
        error: true,
        message: err.message
      });
    }
  };
  return (
    !isLoading && (
      <li
        onClick={getRec.bind(null, value)}
        className={styles.pairing}
        role={'tab'}
        tabIndex={0}
      >
        {children}
      </li>
    )
  );
};

export default Pairing;
