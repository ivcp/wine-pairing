import React from 'react';

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
      searchByFood
        ? setRecommendation({
            wineRecommendation: true,
            items: response.recommendedWines
          })
        : setRecommendation({
            wineRecommendation: false,
            items: response.results
          });

      // TODO: filter response.results for title with space in front

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError({
        error: true,
        message: err.message
      });
    }
  };
  return !isLoading && <li onClick={getRec.bind(null, value)}>{children}</li>;
};

export default Pairing;
