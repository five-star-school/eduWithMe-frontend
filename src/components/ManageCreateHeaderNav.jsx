// src/components/ManageCreateHeaderNav.jsx
import React from 'react';
import styles from '../styles/ManageCreateHeaderNav.module.css';

function ManageCreateHeaderNav() {
  return (
      <nav className={styles.headerNav}>
        <button className={`${styles.navButton} ${styles.activeButton}`}>문제 목록</button>
        <div className={styles.rightButtons}>
          <button className={styles.navButton}>방 수정</button>
          <button className={styles.navButton}>방 삭제</button>
        </div>
      </nav>
  );
}

export default ManageCreateHeaderNav;