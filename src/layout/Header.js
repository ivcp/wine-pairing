import React from 'react';
import Form from '../components/Form';
import Toggle from '../components/Toggle';
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
  const toggle = () => {
    setSearchByFood(prev => !prev);
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Wine Pairing</h1>
      <Toggle searchByFood={searchByFood} toggleSearch={toggle} />
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
      />
    </header>
  );
};

export default Header;
