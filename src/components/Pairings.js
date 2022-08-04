import React from 'react';
import Pairing from './Pairing';

const Pairings = ({
  pairings,
  pairingText,
  isLoading,
  onSetRecommendation,
  searchByFood,
  setRecError,
  setRecLoading,
  query
}) => {
  return (
    <div>
      {!isLoading && pairingText !== '' && (
        <div>
          <h2>{query}</h2>
          <p>{pairingText}</p>
        </div>
        
      )}
      {pairings.length > 0 && (
        <ul>
          {pairings.map(pairing => (
            <Pairing
              key={pairing}
              value={pairing}
              setRecommendation={onSetRecommendation}
              searchByFood={searchByFood}
              setError={setRecError}
              isLoading={isLoading}
              setIsLoading={setRecLoading}
            >
              {pairing}
            </Pairing>
          ))}
        </ul>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Pairings;
