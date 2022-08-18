import React from 'react';
import { ReactComponent as Svg } from '../assets/twitter.svg';
import styles from './Footer.module.css';
import stylesF from '../components/Form.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a
        href="https://twitter.com/iv_p_"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Svg />
        <span className={stylesF.srOnly}>Twitter</span>
      </a>
    </div>
  );
};

export default Footer;
