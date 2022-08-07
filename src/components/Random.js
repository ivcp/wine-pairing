import React from 'react';
import fetchData from '../helpers/fetchData';
import wineList from '../lists/wineList';
import foodList from '../lists/foodList';
import getRandomNum from '../helpers/getRandomNum';

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

  //Call getRandomPairing here with use Effect TODO:

  return <button onClick={getRandomPairing}>Random</button>;
};

export default Random;
