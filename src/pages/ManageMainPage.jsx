import React from 'react';
import ManageMainHeaderNav from '../components/ManageMainHeaderNav';
import SidebarComponent from '../components/SidebarComponent';
import styles from '../styles/ManageMainPage.module.css';

function ManageMainPage() {
  return (
      <div className={styles.managePage}>
        <SidebarComponent />
        <div className={styles.mainContent}>
          <ManageMainHeaderNav />
          <div className={styles.manageContent}>
            <div className={styles.contentHeader}>
              <div className={styles.searchContainer}>
                <input type="text" className={styles.searchInput} placeholder="검색어 ( 제목 )" />
                <button className={styles.searchButton}>검색</button>
              </div>
              <div className={styles.actionButtons}>
                <button className={styles.filterButton}>난이도</button>
                <button className={styles.filterButton}>출제일</button>
                <button className={styles.createButton}>생성</button>
              </div>
            </div>
            <table className={styles.problemTable}>
              <thead>
              <tr>
                <th>문제 번호</th>
                <th>카테고리</th>
                <th>문제 제목</th>
                <th>난이도</th>
                <th>출제일</th>
              </tr>
              </thead>
              <tbody>
              <tr><td>1</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>2</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>3</td><td></td><td></td><td></td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default ManageMainPage;