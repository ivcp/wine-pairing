import React from 'react';

const Pairing = ({ children, value, setRecommendation, searchByFood }) => {
  const getWineRec = async value => {
    try {
      const data = await fetch(
        searchByFood
          ? `/.netlify/functions/fetch-pairings?type=wine-recommendation&wine=${value}`
          : `/.netlify/functions/fetch-pairings?type=food-recommendation&food=${value}`
      );
      if (data.status === 400) {
        const response = await data.json();
        throw new Error(response.body.message);
      }
      if (!data.ok) throw new Error('Something went wrong!');
      const { data: response } = await data.json();
      if (response.status === 'failure') {
        throw new Error(response.message);
      }
      searchByFood
        ? setRecommendation(response.recommendedWines)
        : setRecommendation(response.results);
    } catch (err) {
      console.log(err.message);
        //TODO: add error state 
    }
  };
  return <li onClick={getWineRec.bind(null, value)}>{children}</li>;
};

export default Pairing;
