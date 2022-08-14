import React from 'react';
import styles from './Toggle.module.css';

const Toggle = ({ searchByFood, toggleSearch, suggestions }) => {
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
      <label
        htmlFor="toggle"
        className={`${styles.label} ${
          suggestions.length > 1 ? styles.hidden : ''
        }`}
      >
        {/* git dank animation back */}
        <span
          className={`${styles.span} ${!searchByFood ? styles.checked : ''}`}
        >
          WINE
        </span>
        <span
          className={`${styles.span} ${searchByFood ? styles.checked : ''}`}
        >
          FOOD
        </span>
        <div
          className={`${styles.selected} ${searchByFood ? styles.move : ''}`}
        ></div>
      </label>
    </div>
  );
};

export default Toggle;
