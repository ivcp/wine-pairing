import React, { useRef, useState, useEffect } from 'react';
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
  setRecError,
  suggestions,
  setSuggestions
}) => {
  const textInput = useRef(null);
  const formRef = useRef(null);

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
      setSuggestions([]);
      e.target.reset();
    }

    if (fetchResult.error) {
      const { error, message, loading } = fetchResult;
      e.target.reset();
      setSuggestions([]);
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
    if (e.target.value === '') {
      setSuggestions([]);
      return;
    }
    let matches;
    if (searchByFood) {
      matches = foodList.filter(food =>
        food.startsWith(e.target.value.toLowerCase())
      );
    }
    if (!searchByFood) {
      matches = wineList.filter(food =>
        food.startsWith(e.target.value.toLowerCase())
      );
    }
    setSuggestions(matches);
  };

  const handleSuggestion = suggestion => {
    textInput.current.value = suggestion;
    formRef.current.requestSubmit();
    setSuggestions([]);
  };

  const selectSuggestion = (suggestion, e) => {
    if (e.keyCode === 13) handleSuggestion(suggestion);
    if (e.keyCode === 40) {
      e.target.nextElementSibling
        ? e.target.nextElementSibling.focus()
        : document.querySelector('[role="tab"]').focus();
    }
    if (e.keyCode === 38) {
      if (e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
        return;
      }
      textInput.current.focus();
      setSuggestions([]);
    }
  };

  const arrowNavigation = e => {
    if (e.keyCode !== 40) return;
    if (suggestions.length === 0) return;
    document.querySelector('[role="tab"]').focus();
  };

  const updateInputValue = value => {
    textInput.current.value = value;
  };

  const hideSuggestions = e => {
    if (e.target === formRef.current) return;
    if (e.target !== textInput.current) {
      setSuggestions([]);
      setError({
        error: false,
        message: ''
      });
    }
  };

  useEffect(() => {
    document.addEventListener('click', hideSuggestions);
    return () => {
      document.removeEventListener('click', hideSuggestions);
    };
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <input
        className={`${styles.input} ${error.error ? styles.error : ''}`}
        ref={textInput}
        onChange={getSuggestions}
        type="text"
        id="input"
        placeholder={
          searchByFood ? "What's for dinner?" : 'What are we drinking?'
        }
        autoComplete="off"
        onKeyDown={arrowNavigation}
      />
      <button className={styles.btn} type="submit"></button>
      {suggestions.length > 0 && (
        <ul className={styles.suggestions} role={'tablist'}>
          {suggestions.map(suggestion => (
            <li
              onClick={handleSuggestion.bind(null, suggestion)}
              className={styles.suggestion}
              key={suggestion}
              role={'tab'}
              tabIndex={0}
              onFocus={updateInputValue.bind(null, suggestion)}
              onKeyDown={selectSuggestion.bind(null, suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {error.error && (
        <label className={styles.warning} htmlFor="input">
          {error.message}
        </label>
      )}
    </form>
  );
};

export default Form;
