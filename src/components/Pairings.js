import React from 'react';
import Pairing from './Pairing';

const Pairings = ({
  pairings,
  pairingText,
  error,
  errorMessage,
  isLoading,
  onSetRecommendation,
  searchByFood,
  setRecError,
  setRecLoading
}) => {
  return (
    <div>
      {!error && pairingText !== '' && <p>{pairingText}</p>}
      {!error && pairings.length > 0 && (
        <ul>
          {pairings.map(pairing => (
            <Pairing
              key={pairing}
              value={pairing}
              setRecommendation={onSetRecommendation}
              searchByFood={searchByFood}
              setError={setRecError}
              setIsLoading={setRecLoading}
            >
              {pairing}
            </Pairing>
          ))}
        </ul>
      )}
      {error && !isLoading && <p>{errorMessage}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Pairings;
