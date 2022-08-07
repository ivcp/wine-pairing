import React, { useState } from 'react';
import Form from './components/Form';
import Pairings from './components/Pairings';
import Recommendations from './components/Recommendations';
import Toggle from './components/Toggle';
import Random from './components/Random';

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

  const toggle = () => {
    setSearchByFood(prev => !prev);
  };
  return (
    <main>
      {/* TODO: toggle btn */}
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
      <Pairings
        pairings={pairings}
        pairingText={pairingText}
        isLoading={isLoading}
        onSetRecommendation={setRecommendations}
        setRecError={setRecError}
        setRecLoading={setRecIsLoading}
        searchByFood={searchByFood}
        query={query}
      />
      <Recommendations
        recommendations={recommendations}
        searchByFood={searchByFood}
        error={recError}
        isLoading={recIsLoading}
      />
    </main>
  );
}

export default App;
