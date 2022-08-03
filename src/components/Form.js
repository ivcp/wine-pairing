import React, { useRef } from 'react';

const Form = ({
  searchByFood,
  setIsLoading,
  setPairings,
  setPairingText,
  setError
}) => {
  const textInput = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const query = textInput.current.value.trim();
      if (query === '')
        throw new Error(
          searchByFood
            ? `Please enter your food of choice...`
            : `Please enter a type of wine...`
        );
      const data = await fetch(
        searchByFood
          ? `/.netlify/functions/fetch-pairings?type=food-pairing&food=${query}`
          : `/.netlify/functions/fetch-pairings?type=wine-pairing&wine=${query}`
      );

      if (data.status === 400) {
        const response = await data.json();
        throw new Error(response.body.message);
      }

      if (!data.ok) {
        throw new Error(
          `Failed to get ${searchByFood ? 'wine' : 'food'} pairing, sorry.`
        );
      }
      const { data: response } = await data.json();
      if (response.status === 'failure') {
        e.target.reset();
        throw new Error(response.message);
      }
      let pairingsArray;
      let textString;
      if (searchByFood) {
        const { pairedWines, pairingText } = response;
        pairingsArray = pairedWines;
        textString = pairingText;
      }
      if (!searchByFood) {
        const { pairings, text } = response;
        pairingsArray = pairings;
        textString = text;
      }
      if (pairingsArray.length === 0 && textString === '') {
        e.target.reset();
        throw new Error(
          `Cannot not find any match for ${query}. Try something else!`
        );
      }
      setError(false);
      setIsLoading(false);
      setPairings(pairingsArray);
      setPairingText(textString);
      e.target.reset();
    } catch (err) {
      setIsLoading(false);
      setError({
        error: true,
        message: err.message
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={textInput}
        type="text"
        id="input"
        placeholder={
          searchByFood ? "What's for dinner?" : 'What are we drinking?'
        }
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Form;
