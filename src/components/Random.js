import React from 'react';
import fetchData from '../helpers/fetchData';
import wineList from '../lists/wineList';
import foodList from '../lists/foodList';
import getRandomNum from '../helpers/getRandomNum';
import useMediaQuery from '../hooks/useMediaQuery';
import styles from './Random.module.css';

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
  const getRandomPairing = async () => {
    setIsLoading(true);
    let query;
    searchByFood
      ? (query = foodList[getRandomNum(foodList.length)])
      : (query = wineList[getRandomNum(wineList.length)]);

    const fetchResult = await fetchData(query, searchByFood);

    if (!fetchResult.error) {
      const {
        error,
        loading,
        pairings,
        pairingText,
        wineRecommendation,
        items
      } = fetchResult;

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

    if (fetchResult.error) {
      const { error, message, loading } = fetchResult;

      setIsLoading(loading);
      setError({
        error: error,
        message: message
      });
    }
  };

  //ON MOUNT GET RANDOM PAIRING: import useEff
  // useEffect(() => {
  //   getRandomPairing();
  // }, []);

  return (
    <button className={styles.mobileDice} onClick={getRandomPairing}></button>
  );
};

export default Random;
