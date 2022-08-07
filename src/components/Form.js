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
  setQuery,
  setRecError
}) => {
  const textInput = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
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
      setRecError({
        error: false,
        message: ''
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
      setRecError({
        error: false,
        message: ''
      });
    }
   
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
