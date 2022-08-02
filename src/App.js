import React, { useState } from 'react';
import Form from './components/Form';
import Pairings from './components/Pairings';
import Recommendations from './components/Recommendations';

function App() {
  const [searchByFood, setSearchByFood] = useState(true);
  const [pairings, setPairings] = useState([]);
  const [pairingText, setPairingText] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handlePairings = pairings => {
    setPairings(pairings);
  };
  const handlePairingText = text => {
    setPairingText(text);
  };
  const handleError = err => {
    setError(err);
  };
  const handleErrorMessage = msg => {
    setErrorMessage(msg);
  };
  const handleLoading = loading => {
    setIsLoading(loading);
  };

  return (
    <main>
      <Form
        searchByFood={searchByFood}
        setPairings={handlePairings}
        setPairingText={handlePairingText}
        setError={handleError}
        setErrorMessage={handleErrorMessage}
        setIsLoading={handleLoading}
      />
      <Pairings
        pairings={pairings}
        pairingText={pairingText}
        error={error}
        errorMessage={errorMessage}
        isLoading={isLoading}
        onSetRecommendation={setRecommendations}
        searchByFood={searchByFood}
      />
      <Recommendations
        recommendations={recommendations}
        searchByFood={searchByFood}
      />
    </main>
  );
}

export default App;
