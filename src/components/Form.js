import React, { useRef, useState } from 'react';
import fetchData from '../helpers/fetchData';
import foodList from '../lists/foodList';
import wineList from '../lists/wineList';
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
  const [suggestions, setSuggestions] = useState([]);

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

  const getSuggestions = e => {
    const matches = foodList.filter(food =>
      food.startsWith(e.target.value.toLowerCase())
    );
    setSuggestions(matches);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={`${styles.input} ${error.error ? styles.error : ''}`}
        ref={textInput}
        onChange={getSuggestions}
        type="text"
        id="input"
        placeholder={
          searchByFood ? "What's for dinner?" : 'What are we drinking?'
        }
      />
      <button className={styles.btn} type="submit"></button>
      {suggestions.length > 0 && suggestions.map(s => <div>{s}</div>)}
      {error.error && (
        <label className={styles.warning} htmlFor="input">
          {error.message}
        </label>
      )}
    </form>
  );
};

export default Form;
