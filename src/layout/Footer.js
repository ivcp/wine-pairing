import React from 'react';
import { ReactComponent as Svg } from '../assets/twitter.svg';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a href="https://twitter.com/iv_p_">
        <Svg style={{ fill: 'green' }} />
      </a>
    </div>
  );
};

export default Footer;
