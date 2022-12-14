import React from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import getRandomPairing from '../helpers/getRandomPairing';
import styles from './Random.module.css';
import stylesF from './Form.module.css';

const Random = ({
  searchByFood,
  setIsLoading,
  setPairings,
  setPairingText,
  setError,
  setRecError,
  setRecommendations,
  setQuery
}) => {
  const isDesktop = useMediaQuery('(min-width: 37.5em)');

  const randomBtnHandler = async () => {
    setIsLoading(true);
    const result = await getRandomPairing(searchByFood);

    if (!result.error) {
      const {
        error,
        loading,
        pairings,
        pairingText,
        wineRecommendation,
        items,
        query
      } = result;

      setError({ error: error, message: '' });
      setIsLoading(loading);
      setPairings(pairings);
      setPairingText(pairingText);
      setRecommendations({
        wineRecommendation: wineRecommendation,
        items: items
      });
      setQuery(query);
      setRecError({
        error: false,
        message: ''
      });
    }

    if (result.error) {
      const { error, message, loading } = result;
      setIsLoading(loading);
      setError({
        error: error,
        message: message
      });
    }
  };

  return (
    <button className={styles.dice} onClick={randomBtnHandler}>
      {isDesktop && (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="7" width="21" height="33" fill="#FAF9F7" />
          <path d="M29.1429 0H4.85714C2.17205 0 0 2.17205 0 4.85714V29.1429C0 31.8279 2.17205 34 4.85714 34H29.1429C31.8279 34 34 31.8279 34 29.1429V4.85714C34 2.17205 31.8295 0 29.1429 0ZM9.71429 26.7143C8.37705 26.7143 7.28571 25.6229 7.28571 24.2857C7.28571 22.9485 8.37705 21.8571 9.71429 21.8571C11.0515 21.8571 12.1429 22.9485 12.1429 24.2857C12.1429 25.6229 11.05 26.7143 9.71429 26.7143ZM9.71429 12.1429C8.37857 12.1429 7.28571 11.05 7.28571 9.71429C7.28571 8.37857 8.37705 7.28571 9.71429 7.28571C11.0515 7.28571 12.1429 8.37705 12.1429 9.71429C12.1429 11.0515 11.05 12.1429 9.71429 12.1429ZM17 19.4286C15.6643 19.4286 14.5714 18.3357 14.5714 17C14.5714 15.6643 15.6628 14.5714 17 14.5714C18.3372 14.5714 19.4286 15.6628 19.4286 17C19.4286 18.3372 18.3357 19.4286 17 19.4286ZM24.2857 26.7143C22.9485 26.7143 21.8571 25.6229 21.8571 24.2857C21.8571 22.9485 22.9485 21.8571 24.2857 21.8571C25.6229 21.8571 26.7143 22.9485 26.7143 24.2857C26.7143 25.6229 25.6214 26.7143 24.2857 26.7143ZM24.2857 12.1429C22.9485 12.1429 21.8571 11.0515 21.8571 9.71429C21.8571 8.37705 22.9485 7.28571 24.2857 7.28571C25.6229 7.28571 26.7143 8.37705 26.7143 9.71429C26.7143 11.0515 25.6214 12.1429 24.2857 12.1429Z" />
        </svg>
      )}
      <span className={stylesF.srOnly}>Random</span>
    </button>
  );
};

export default Random;
