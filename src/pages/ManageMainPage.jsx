import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ManageMainHeaderNav from '../components/ManageMainHeaderNav';
import SidebarComponent from '../components/SidebarComponent';
import axios from "../util/axiosConfig";
import { getCookie } from '../util/cookie';
import styles from '../styles/ManageMainPage.module.css';
import { format } from 'date-fns';

function ManageMainPage() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { roomId } = useParams();
  const navigate = useNavigate();
  const questionsPerPage = 10;

  useEffect(() => {
    const token = getCookie('AccessToken');
    if (token === null) {
      navigate('/login');
    } else {
      fetchQuestions();  // Call fetchQuestions on mount
    }
  }, [roomId]);  // Re-fetch on roomId change

  useEffect(() => {
    if (page >= 0) {
      fetchQuestions();  // Call fetchQuestions on page change
    }
  }, [page]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/rooms/${roomId}/question`, {
        params: {
          page: page,
          size: questionsPerPage,
        }
      });
      console.log('Fetch Questions Response:', response.data);
      if (response.data && response.data.data && response.data.data.content) {
        setQuestions(response.data.data.content);  // 데이터가 'content'에 있음
        setTotalPages(response.data.data.totalPages || 0);
      } else {
        console.error('Unexpected fetch data format:', response.data);
        setQuestions([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      if (error.response && error.response.status === 403) {
        navigate('/login');
      }
      setQuestions([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/search/rooms/${roomId}/question/title`, {
        params: {
          keyword: searchKeyword,
          page: 0,
          size: questionsPerPage,
        }
      });
      console.log('Search API Response:', response.data);
      if (response.data && Array.isArray(response.data.data)) {
        setQuestions(response.data.data);  // 데이터가 직접 배열 형태로 있음
        setTotalPages(Math.ceil(response.data.data.length / questionsPerPage));  // 페이지 수 계산
        setPage(0);
      } else {
        console.error('Unexpected search data format:', response.data);
        setQuestions([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error('Failed to search questions:', error);
      setQuestions([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };  

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm');
  };

  const handleQuestionClick = (questionId) => {
    navigate(`/room/${roomId}/question/${questionId}/manageRead`);
  };

  const handleCreateClick = () => {
    navigate(`/room/${roomId}/manageCreate`);
  };

  return (
    <div className={styles.managePage}>
      <SidebarComponent />
      <div className={styles.mainContent}>
        <ManageMainHeaderNav roomId={roomId} />
        <div className={styles.manageContent}>
          <div className={styles.contentHeader}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="검색어 ( 제목 )"
                value={searchKeyword}
                onChange={handleSearchInputChange}
              />
              <button className={styles.searchButton} onClick={handleSearch}>검색</button>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.filterButton}>난이도</button>
              <button className={styles.filterButton}>출제일</button>
              <button className={styles.createButton} onClick={() => navigate(`/manageCreate`)}>생성</button>
            </div>
          </div>
          {loading ? (
            <p>로딩 중...</p>
          ) : (
            questions.length > 0 ? (
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
                  {questions.map((question) => (
                    <tr key={question.questionId} onClick={() => handleQuestionClick(question.questionId)} style={{ cursor: 'pointer' }}>
                      <td>{question.questionId}</td>
                      <td>{question.category}</td>
                      <td>{question.title}</td>
                      <td>{question.difficulty}</td>
                      <td>{question.updatedAt ? formatDate(question.updatedAt) : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>검색 결과가 없습니다.</p>
            )
          )}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                disabled={page === 0}
                onClick={() => setPage(prev => Math.max(0, prev - 1))}
              >
                이전
              </button>
              <span>{page + 1} / {totalPages}</span>
              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageMainPage;