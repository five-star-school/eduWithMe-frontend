import React from 'react';
import styles from '../styles/ManageMainHeaderNav.module.css';

function ManageMainHeaderNav() {
  return (
      <nav className={styles.headerNav}>
        <button className={`${styles.navButton} ${styles.activeButton}`}>문제 목록</button>
        <div className={styles.rightButtons}>
          <button className={`${styles.navButton} ${styles.editButton}`}>방 수정</button>
          <button className={`${styles.navButton} ${styles.deleteButton}`}>방 삭제</button>
        </div>
      </nav>
  );
}

export default ManageMainHeaderNav;