import React, { useRef, useState } from 'react';

const Form = ({ searchByFood }) => {
  const [pairings, setPairings] = useState([]);
  const [pairingText, setPairingText] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputText = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const query = inputText.current.value;
      if (query === '')
        throw new Error(
          searchByFood
            ? `Please enter your food of choice...`
            : `Please enter a type of wine...`
        );
      const data = await fetch(
        searchByFood
          ? `/.netlify/functions/fetch-pairings?food=${query}`
          : `/.netlify/functions/fetch-pairings?wine=${query}`
      );

      if (data.status === 400) {
        const response = await data.json();
        throw new Error(response.body.message);
      }

      if (!data.ok) {
        throw new Error('Something went wrong!');
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
      setError(true);
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputText}
          type="text"
          name=""
          id="input"
          placeholder={
            searchByFood ? "What's for dinner?" : 'What are we drinking?'
          }
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {!error && pairings.length > 0 && (
          <ul>
            {pairings.map(pairing => (
              <li key={pairing}>{pairing}</li>
            ))}
          </ul>
        )}
        {!error && pairingText !== '' && <p>{pairingText}</p>}
        {error && !isLoading && <p>{errorMessage}</p>}
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default Form;
