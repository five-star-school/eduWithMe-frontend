import React, { useState } from 'react';
import ManageMainHeaderNav from '../components/ManageMainHeaderNav';
import SidebarComponent from '../components/SidebarComponent';
import ProblemTable from '../components/Manage/QuestionTable';
import styles from '../styles/ManageMainPage.module.css';

function ManageMainPage() {
  const [problems, setProblems] = useState([
    { id: 1, category: 'Math', title: 'Simple Addition', difficulty: 'Easy', date: '2024-01-01' },
    { id: 2, category: 'Science', title: 'Newton\'s Laws', difficulty: 'Medium', date: '2024-01-02' },
    { id: 3, category: 'History', title: 'World War II', difficulty: 'Hard', date: '2024-01-03' },
  ]);

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
          <ProblemTable problems={problems} /> {/* 문제 테이블 렌더링 */}
        </div>
      </div>
    </div>
  );
}

export default ManageMainPage;
