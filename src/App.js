import React, { useState, useEffect } from 'react';
import Pairings from './components/Pairings';
import Recommendations from './components/Recommendations';
import Footer from './layout/Footer';
import Header from './layout/Header';
import getRandomPairing from './helpers/getRandomPairing';
import styles from './App.module.css';

function App() {
  const [searchByFood, setSearchByFood] = useState(true);
  const [query, setQuery] = useState('');
  const [pairings, setPairings] = useState([]);
  const [pairingText, setPairingText] = useState('');
  const [error, setError] = useState({
    error: false,
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState({
    wineRecommendation: true,
    items: []
  });
  const [recError, setRecError] = useState({
    error: false,
    message: ''
  });
  const [recIsLoading, setRecIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRandomPairing() {
      setIsLoading(true);
      const result = await getRandomPairing(searchByFood);
      if (!result.error) {
        const {
          error,
          loading,
          pairings,
          pairingText,
          wineRecommendation,
          items,
          query
        } = result;

        setError({ error: error, message: '' });
        setIsLoading(loading);
        setPairings(pairings);
        setPairingText(pairingText);
        setRecommendations({
          wineRecommendation: wineRecommendation,
          items: items
        });
        setQuery(query);
        setRecError({
          error: false,
          message: ''
        });
      }

      if (result.error) {
        const { error, message, loading } = result;
        setIsLoading(loading);
        setError({
          error: error,
          message: message
        });
      }
    }
    fetchRandomPairing();
  }, []);

  return (
    <div className={styles.app}>
      <Header
        searchByFood={searchByFood}
        setSearchByFood={setSearchByFood}
        setPairings={setPairings}
        setPairingText={setPairingText}
        error={error}
        setError={setError}
        setRecError={setRecError}
        setIsLoading={setIsLoading}
        setRecommendations={setRecommendations}
        setQuery={setQuery}
      />
      <main>
        <Pairings
          query={query}
          pairingText={pairingText}
          pairings={pairings}
          isLoading={isLoading}
          onSetRecommendation={setRecommendations}
          setRecError={setRecError}
          setRecLoading={setRecIsLoading}
          searchByFood={searchByFood}
          setPairings={setPairings}
          setPairingText={setPairingText}
          error={error}
          setError={setError}
          setIsLoading={setIsLoading}
          setQuery={setQuery}
        />
        <Recommendations
          recommendations={recommendations}
          searchByFood={searchByFood}
          error={recError}
          isLoading={recIsLoading}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
