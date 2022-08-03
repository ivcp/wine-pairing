import React, { useState } from 'react';
import Form from './components/Form';
import Pairings from './components/Pairings';
import Recommendations from './components/Recommendations';

function App() {
  const [searchByFood, setSearchByFood] = useState(true);
  const [pairings, setPairings] = useState([]);
  const [pairingText, setPairingText] = useState('');
  const [error, setError] = useState({
    error: false,
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [recError, setRecError] = useState({
    error: false,
    message: ''
  });
  const [recIsLoading, setRecIsLoading] = useState(false);

  return (
    <main>
      {/* TODO: toggle btn */}
      <Form
        searchByFood={searchByFood}
        setPairings={setPairings}
        setPairingText={setPairingText}
        error={error}
        setError={setError}
        setIsLoading={setIsLoading}
        setRecommendations={setRecommendations}
      />
      <Pairings
        pairings={pairings}
        pairingText={pairingText}
        isLoading={isLoading}
        onSetRecommendation={setRecommendations}
        setRecError={setRecError}
        setRecLoading={setRecIsLoading}
        searchByFood={searchByFood}
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
