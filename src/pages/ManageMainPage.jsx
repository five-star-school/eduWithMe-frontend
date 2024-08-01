import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ManageMainHeaderNav from '../components/ManageMainHeaderNav';
import SidebarComponent from '../components/SidebarComponent';
import QuestionTable from '../components/Manage/QuestionTable';
import axios from "../util/axiosConfig";
import { getCookie } from '../util/cookie';
import styles from '../styles/ManageMainPage.module.css';

function ManageMainPage() {
  const [problems, setProblems] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    const token = getCookie('AccessToken');
    if (token !== null) {
      fetchProblems();
    }
  }, [roomId]);

  const fetchProblems = async () => {
    try {
      const response = await axios.get(`/rooms/${roomId}/question?page=0`);
      if (response.data && response.data.data) {
        const sortedProblems = response.data.data.sort((a, b) => a.questionId - b.questionId);
        setProblems(sortedProblems);
      }
    } catch (error) {
      console.error('문제 데이터를 가져오는데 실패했습니다:', error);
    }
  };

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
            <QuestionTable problems={problems} roomId={roomId} /> {/* 문제 테이블 렌더링 */}
          </div>
        </div>
      </div>
  );
}

export default ManageMainPage;
