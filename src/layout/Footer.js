import React from 'react';
import { ReactComponent as Svg } from '../assets/twitter.svg';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a
        href="https://twitter.com/iv_p_"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Svg />
      </a>
    </div>
  );
};

export default Footer;
