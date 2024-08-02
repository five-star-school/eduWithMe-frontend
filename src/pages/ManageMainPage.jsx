import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
  const [roomName, setRoomName] = useState('');
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const questionsPerPage = 10;

  useEffect(() => {
    const token = getCookie('AccessToken');
    if (token === null) {
      navigate('/login');
    } else {
      fetchRoomInfo(); // 방 정보 가져오기
      fetchQuestions();
    }
  }, [roomId, page]);

  const fetchRoomInfo = async () => {
    try {
      const response = await axios.get(`/rooms/${roomId}`);
      if (response.data && response.data.data) {
        const rooms = response.data.data;
        const room = rooms.find(r => r.roomId === parseInt(roomId, 10));
        if (room) {
          setRoomName(room.roomName);
        }
      } else {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch room info:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/rooms/${roomId}/question`, {
        params: {
          page: page,
          size: questionsPerPage,
        }
      });
      if (response.data && response.data.data) {
        const questionsData = response.data.data.content || [];
        // 각 질문에 roomQuestionNumber 추가
        const questionsWithNumber = questionsData.map((question, index) => ({
          ...question,
          roomQuestionNumber: page * questionsPerPage + index + 1
        }));
        setQuestions(questionsWithNumber);
        setTotalPages(response.data.data.totalPages);
      } else {
        console.error('Unexpected data format:', response.data);
        setQuestions([]);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      setQuestions([]);
      if (error.response && error.response.status === 403) {
        navigate('/login');
      }
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

      if (response.data && Array.isArray(response.data.data)) {
        const questionsWithNumber = response.data.data.map((question, index) => ({
          ...question,
          roomQuestionNumber: index + 1
        }));
        setQuestions(questionsWithNumber);
        setTotalPages(Math.ceil(response.data.data.length / questionsPerPage));
        setPage(0);
      } else {
        console.error('Unexpected search data format:', response.data);
        setQuestions([]);
      }
    } catch (error) {
      console.error('Failed to search questions:', error);
      setQuestions([]);
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

  const handleQuestionListClick = () => {
    if (location.pathname.includes('/question/')) {
      navigate(`/room/${roomId}/manageMain`);
    } else {
      window.location.reload();
    }
  };

  return (
      <div className={styles.managePage}>
        <SidebarComponent />
        <div className={styles.mainContent}>
          <ManageMainHeaderNav roomId={roomId} roomName={roomName} onQuestionListClick={handleQuestionListClick} />
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
              <button className={styles.createButton} onClick={handleCreateClick}>생성</button>
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
                          <td>{question.roomQuestionNumber}</td>
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