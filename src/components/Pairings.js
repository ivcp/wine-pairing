import React from 'react';
import Pairing from './Pairing';
import Random from './Random';
import useMediaQuery from '../hooks/useMediaQuery';

const Pairings = ({
  pairings,
  pairingText,
  isLoading,
  onSetRecommendation,
  searchByFood,
  setRecError,
  setRecLoading,
  query,
  setPairings,
  setPairingText,
  error,
  setError,
  setIsLoading,
  setQuery
}) => {
  const isDesktop = useMediaQuery('(min-width: 37.5em)');
  return (
    <article>
      {!isDesktop && (
        <Random
          searchByFood={searchByFood}
          setPairings={setPairings}
          setPairingText={setPairingText}
          error={error}
          setError={setError}
          setRecError={setRecError}
          setIsLoading={setIsLoading}
          setRecommendations={onSetRecommendation}
          setQuery={setQuery}
        />
      )}
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
    </article>
  );
};

export default Pairings;
