import React from 'react';
import fetchData from '../helpers/fetchData';
import wineList from '../wineList';
import foodList from '../foodList';

function getRandomNum(max) {
  return Math.floor(Math.random() * (max + 1));
}

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

    console.log(query);
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
      ///NEW - CHECK!!! TODO:
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
