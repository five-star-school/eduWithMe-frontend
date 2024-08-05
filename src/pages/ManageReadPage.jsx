import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../util/axiosConfig";
import { getCookie } from '../util/cookie';
import ManageReadSidebar from '../components/ManageReadSidebar';
import ManageMainHeaderNav from '../components/ManageMainHeaderNav';
import styles from '../styles/ManageReadPage.module.css';

function ManageReadPage() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [solvedStudents, setSolvedStudents] = useState([]);
  const { roomId, questionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('AccessToken');
    if (token === null) {
      navigate('/login');
    } else {
      fetchRoomInfo();
      fetchQuestionDetail();
      fetchSolvedStudents();
    }
  }, [roomId, questionId, navigate]);

  const fetchRoomInfo = async () => {
    try {
      const response = await axios.get(`/rooms/one/${roomId}`);
      if (response.data && response.data.data) {
        const roomData = response.data.data;
        setRoomName(roomData.roomName);
        setIsPrivate(roomData.roomPassword !== null && roomData.roomPassword !== '');
      }
    } catch (error) {
      console.error('Failed to fetch room info:', error);
    }
  };

  const fetchQuestionDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/rooms/${roomId}/question/${questionId}`);
      console.log('Question Detail:', response.data);
      if (response.data && response.data.data) {
        setQuestion(response.data.data);
      } else {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch question detail:', error);
      if (error.response && error.response.status === 403) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSolvedStudents = async () => {
    try {
      const response = await axios.get(`/rooms/${roomId}/question/${questionId}/solved-students`);
      if (response.data && response.data.data) {
        setSolvedStudents(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch solved students:', error);
    }
  };

  const handleQuestionListClick = () => {
    navigate(`/room/${roomId}/manageMain`);
  };

  const handleEdit = () => {
    navigate(`/room/${roomId}/question/${questionId}/manageModify`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 문제를 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/rooms/${roomId}/question/${questionId}`);
        alert('문제가 삭제되었습니다.');
        navigate(`/room/${roomId}/manageMain`);
      } catch (error) {
        console.error('Failed to delete question:', error);
        alert('문제 삭제에 실패했습니다.');
      }
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!question) {
    return <div>문제를 찾을 수 없습니다.</div>;
  }

  return (
      <div className={styles.manageReadPage}>
        <ManageReadSidebar roomName={roomName} solvedStudents={solvedStudents} />
        <div className={styles.mainContent}>
          <ManageMainHeaderNav
              roomId={roomId}
              roomName={roomName}
              roomIsPrivate={isPrivate}
              onQuestionListClick={handleQuestionListClick}
          />
          <div className={styles.readContent}>
            <div className={styles.questionSection}>
              <div className={styles.questionTitleSection}>
                <span className={styles.questionLabel}>문제 제목</span>
                <input type="text" className={styles.questionTitleInput} value={question.title} readOnly />
              </div>
              <div className={styles.questionContentSection}>
                <span className={styles.questionLabel}>객관식 문제</span>
                <textarea className={styles.questionContentInput} value={question.content} readOnly></textarea>
              </div>
            </div>
            <div className={styles.answerOptions}>
              {['first', 'second', 'third', 'fourth'].map((option, index) => (
                  <div key={index} className={styles.answerOption}>
                    <span className={styles.optionNumber}>{index + 1}</span>
                    <input type="text" className={styles.optionContent} value={question.answerOption[option]} readOnly />
                  </div>
              ))}
            </div>
            <div className={styles.questionInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>카테고리</span>
                <input type="text" className={styles.infoInput} value={question.category} readOnly />
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>난이도</span>
                <input type="text" className={styles.infoInput} value={question.difficulty} readOnly />
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>포인트</span>
                <input type="text" className={styles.infoInput} value={question.point} readOnly />
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>정답</span>
                <input type="text" className={styles.infoInput} value={question.answerOption.answered} readOnly />
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.editButton} onClick={handleEdit}>수정</button>
              <button className={styles.deleteButton} onClick={handleDelete}>삭제</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ManageReadPage;