import React from 'react';
import Pairing from './Pairing';
import Random from './Random';
import useMediaQuery from '../hooks/useMediaQuery';
import styles from './Pairings.module.css';

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
    <article className={styles.pairings}>
      <div className={styles.result}>
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
          <>
            <h2 className={styles.title}>{query}</h2>
            <p className={styles.text}>{pairingText}</p>
            <hr className={styles.line} />
          </>
        )}
      </div>
      {pairings.length > 0 && (
        <div className={styles.searchByTag}>
          {!isLoading && (
            <p className={styles.tagsLabel}>Get recommendations for:</p>
          )}
          <ul className={styles.tags} role={'tablist'}>
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
        </div>
      )}
      {isLoading && <div className={styles.loader}></div>}
    </article>
  );
};

export default Pairings;
