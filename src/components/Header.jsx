import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
          <Link to="/main" className={styles.headerTitle}>EduWithMe</Link>
          <div className={styles.authButtons}>
            <button className={styles.loginButton}>로그인</button>
            <button className={styles.signupButton}>회원가입</button>
          </div>
        </header>
    );
}

export default Header;
