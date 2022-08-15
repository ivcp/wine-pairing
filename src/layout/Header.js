import React, { useState } from 'react';
import Form from '../components/Form';
import Random from '../components/Random';
import Toggle from '../components/Toggle';
import useMediaQuery from '../hooks/useMediaQuery';
import styles from './Header.module.css';

const Header = ({
  searchByFood,
  setSearchByFood,
  setPairings,
  setPairingText,
  error,
  setError,
  setRecError,
  setIsLoading,
  setRecommendations,
  setQuery
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const isDesktop = useMediaQuery('(min-width: 37.5em)');
  const toggle = () => {
    setSearchByFood(prev => !prev);
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Wine Pairing</h1>
      <Toggle
        searchByFood={searchByFood}
        toggleSearch={toggle}
        suggestions={suggestions}
      />
      <Form
        searchByFood={searchByFood}
        setPairings={setPairings}
        setPairingText={setPairingText}
        error={error}
        setError={setError}
        setRecError={setRecError}
        setIsLoading={setIsLoading}
        setRecommendations={setRecommendations}
        setQuery={setQuery}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
      />
      {isDesktop && (
        <Random
          searchByFood={searchByFood}
          setPairings={setPairings}
          setPairingText={setPairingText}
          error={error}
          setError={setError}
          setRecError={setRecError}
          setIsLoading={setIsLoading}
          setRecommendations={setRecommendations}
          setQuery={setQuery}
        />
      )}
    </header>
  );
};

export default Header;
