// src/components/Header.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../util/AuthContext';
import styles from '../styles/Header.module.css';
function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const handleLogoutClick = () => {
    logout();
    alert('로그아웃되었습니다.'); // 로그아웃 알림창 추가
    navigate('/main');
  };
  return (
      <header className={styles.header}>
        <Link to="/main" className={styles.headerTitle}>EduWithMe</Link>
        <div className={styles.authButtons}>
          {user ? (
              <>
                <span className={styles.nickName}>{user.nickName}</span>
                <button onClick={() => navigate('/mypage')} className={styles.myPageButton}>마이페이지</button>
                <button onClick={handleLogoutClick} className={styles.logoutButton}>로그아웃</button>
              </>
          ) : (
              <>
                <button onClick={() => navigate('/login')} className={styles.loginButton}>로그인</button>
                <button onClick={() => navigate('/signup')} className={styles.signupButton}>회원가입</button>
              </>
          )}
        </div>
      </header>
  );
}
export default Header;