import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

    return (
        <header className={styles.header}>
          <Link to="/main" className={styles.headerTitle}>EduWithMe</Link>
          <div className={styles.authButtons}>
            <button onClick={handleLoginClick} className={styles.loginButton}>로그인</button>
            <button onClick={handleSignupClick} className={styles.signupButton}>회원가입</button>
          </div>
        </header>
    );
}

export default Header;
