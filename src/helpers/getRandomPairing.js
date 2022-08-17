import foodList from '../lists/foodList';
import wineList from '../lists/wineList';
import fetchData from './fetchData';
import getRandomNum from './getRandomNum';

const getRandomPairing = async searchByFood => {
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

    return {
      error,
      loading,
      pairings,
      pairingText,
      wineRecommendation,
      items,
      query
    };
  }

  if (fetchResult.error) {
    const { error, message, loading } = fetchResult;
    return {
      error,
      message,
      loading
    };
  }
};
export default getRandomPairing;
