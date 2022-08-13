import React from 'react';
import styles from './Toggle.module.css';

const Toggle = ({ searchByFood, toggleSearch }) => {
  return (
    <div className={styles.toggle}>
      <label className={styles.searchby} htmlFor="checkbox">
        search by:
      </label>
      <input
        className={styles.checkbox}
        checked={searchByFood}
        onChange={toggleSearch}
        type="checkbox"
        name="toggle search"
        id="toggle"
      />
      <label htmlFor="toggle" className={styles.label}>
        <span className={styles.span}>WINE</span>
        <span className={styles.span}>FOOD</span>
        <div
          className={`${styles.selected} ${searchByFood ? styles.move : ''}`}
        >
          {searchByFood ? 'FOOD' : 'WINE'}
        </div>
      </label>
    </div>
  );
};

export default Toggle;
