import React from 'react';
import logo from '../../../assets/images/logo.svg';
import { Page } from '../../components';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <Page title="Home">
      <div className={styles.logo}>
        <img src={logo} alt="React Logo" />
      </div>
      <p className={styles.lead}>
        <strong>universsr</strong> is universal React web app boilerplate.
      </p>
      <br />
      <a
        href="https://github.com/borisding/universsr"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub repository
      </a>
    </Page>
  );
}
