import React, { useRef } from 'react';
import fetchData from '../helpers/fetchData';
import styles from './Form.module.css';

const Form = ({
  searchByFood,
  setIsLoading,
  setPairings,
  setPairingText,
  error,
  setError,
  setRecommendations,
  setQuery
}) => {
  const textInput = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const query = textInput.current.value.trim();

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
      e.target.reset();
    }

    if (fetchResult.error) {
      const { error, message, loading } = fetchResult;
      e.target.reset();
      setIsLoading(loading);
      setError({
        error: error,
        message: message
      });
    }

    // try {
    //   setIsLoading(true);
    //   const query = textInput.current.value.trim();
    //   if (query === '')
    //     throw new Error(
    //       searchByFood
    //         ? `Please enter your food of choice...`
    //         : `Please enter a type of wine...`
    //     );
    //   const data = await fetch(
    //     searchByFood
    //       ? `/.netlify/functions/fetch-pairings?type=food-pairing&food=${query}`
    //       : `/.netlify/functions/fetch-pairings?type=wine-pairing&wine=${query}`
    //   );

    //   if (data.status === 400) {
    //     e.target.reset();
    //     const response = await data.json();
    //     throw new Error(response.body.message);
    //   }

    //   if (data.status === 402) {
    //     e.target.reset();
    //     throw new Error(
    //       'Sorry, no more food and wine matching today. API limit reached.'
    //     );
    //   }

    //   if (!data.ok) {
    //     e.target.reset();
    //     throw new Error(
    //       `Failed to get ${searchByFood ? 'wine' : 'food'} pairing, sorry.`
    //     );
    //   }
    //   const { data: response } = await data.json();
    //   if (response.status === 'failure') {
    //     e.target.reset();
    //     throw new Error(response.message);
    //   }
    //   let pairingsArray;
    //   let textString;
    //   if (searchByFood) {
    //     const { pairedWines, pairingText } = response;
    //     pairingsArray = pairedWines;
    //     textString = pairingText;
    //   }
    //   if (!searchByFood) {
    //     const { pairings, text } = response;
    //     pairingsArray = pairings;
    //     textString = text;
    //   }
    //   if (pairingsArray.length === 0 && textString === '') {
    //     e.target.reset();
    //     throw new Error(
    //       `Cannot not find any match for ${query}. Try something else!`
    //     );
    //   }
    //   setError(false);
    //   setIsLoading(false);
    //   setPairings(pairingsArray);
    //   setPairingText(textString);
    //   setRecommendations({
    //     wineRecommendation: searchByFood ? true : false,
    //     items: []
    //   });
    //   setQuery(query);
    //   e.target.reset();
    // } catch (err) {
    //   setIsLoading(false);
    //   setError({
    //     error: true,
    //     message: err.message
    //   });
    // }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={textInput}
        type="text"
        id="input"
        placeholder={
          searchByFood ? "What's for dinner?" : 'What are we drinking?'
        }
      />
      <button type="submit">Search</button>
      {error.error && <label htmlFor="input">{error.message}</label>}
    </form>
  );
};

export default Form;
