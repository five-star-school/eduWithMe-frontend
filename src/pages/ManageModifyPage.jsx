import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../util/axiosConfig";
import SidebarComponent from '../components/SidebarComponent';
import ManageMainHeaderNav from '../components/ManageMainHeaderNav';
import styles from '../styles/ManageModifyPage.module.css';

function ManageModifyPage() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { roomId, questionId } = useParams();
  const navigate = useNavigate();

  const categoryMapping = {
    '수학': 'MATH',
    '과학': 'SCIENCE',
    '영어': 'ENGLISH',
    '국어': 'KOREAN',
  };

  const reverseCategoryMapping = {
    'MATH': '수학',
    'SCIENCE': '과학',
    'ENGLISH': '영어',
    'KOREAN': '국어',
  };

  const difficultyMapping = {
    'Lv1': 'LEVEL_ONE',
    'Lv2': 'LEVEL_TWO',
    'Lv3': 'LEVEL_THREE',
    'Lv4': 'LEVEL_FOUR',
    'Lv5': 'LEVEL_FIVE',
  };

  const reverseDifficultyMapping = {
    'LEVEL_ONE': 'Lv1',
    'LEVEL_TWO': 'Lv2',
    'LEVEL_THREE': 'Lv3',
    'LEVEL_FOUR': 'Lv4',
    'LEVEL_FIVE': 'Lv5',
  };

  const difficultyPointMapping = {
    'Lv1': 10,
    'Lv2': 20,
    'Lv3': 30,
    'Lv4': 40,
    'Lv5': 50,
  };

  useEffect(() => {
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
        const fetchedQuestion = response.data.data;
        const difficulty = reverseDifficultyMapping[fetchedQuestion.difficulty];
        setQuestion({
          ...fetchedQuestion,
          point: difficultyPointMapping[difficulty]
        });
      } catch (error) {
        console.error('Failed to fetch question detail:', error);
        alert('문제 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomInfo();
    fetchQuestionDetail();
  }, [roomId, questionId]);

  const handleQuestionListClick = () => {
    navigate(`/room/${roomId}/manageMain`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'difficulty') {
      setQuestion(prev => ({
        ...prev,
        difficulty: difficultyMapping[value],
        point: difficultyPointMapping[value]
      }));
    } else {
      setQuestion(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAnswerOptionChange = (option, value) => {
    setQuestion(prev => ({
      ...prev,
      answerOption: {
        ...prev.answerOption,
        [option]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const updatedQuestion = {
        title: question.title,
        content: question.content,
        category: categoryMapping[question.category] || question.category,
        difficulty: question.difficulty,
        point: question.point,
        answer: {
          first: question.answerOption.first,
          second: question.answerOption.second,
          third: question.answerOption.third,
          fourth: question.answerOption.fourth,
          answered: parseInt(question.answerOption.answered)
        }
      };

      console.log('Sending update:', updatedQuestion);

      const response = await axios.put(`/rooms/${roomId}/question/${questionId}`, updatedQuestion);
      console.log('Server response:', response.data);

      alert('문제가 성공적으로 수정되었습니다.');
      navigate(`/room/${roomId}/manageMain`);
    } catch (error) {
      console.error('Failed to update question:', error.response?.data || error);
      alert('문제 수정에 실패했습니다. 오류 내용: ' + (error.response?.data?.message || error.message));
    }
  };

    if (loading) return <div>로딩 중...</div>;
    if (!question) return <div>문제를 찾을 수 없습니다.</div>;

  return (
      <div className={styles.manageModifyPage}>
        <SidebarComponent />
        <div className={styles.mainContent}>
          <ManageMainHeaderNav
              roomId={roomId}
              roomName={roomName}
              roomIsPrivate={isPrivate}
              onQuestionListClick={handleQuestionListClick}
          />
          <div className={styles.modifyContent}>
            <div className={styles.questionSection}>
              <div className={styles.questionTitleSection}>
                <span className={styles.questionLabel}>문제 제목</span>
                <input
                    type="text"
                    className={styles.questionTitleInput}
                    name="title"
                    value={question.title}
                    onChange={handleInputChange}
                />
              </div>
              <div className={styles.questionContentSection}>
                <span className={styles.questionLabel}>객관식 문제</span>
                <textarea
                    className={styles.questionContentInput}
                    name="content"
                    value={question.content}
                    onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className={styles.answerOptions}>
              {['first', 'second', 'third', 'fourth'].map((option, index) => (
                  <div key={index} className={styles.answerOption}>
                    <span className={styles.optionNumber}>{index + 1}</span>
                    <input
                        type="text"
                        className={styles.optionContent}
                        value={question.answerOption[option]}
                        onChange={(e) => handleAnswerOptionChange(option, e.target.value)}
                    />
                  </div>
              ))}
            </div>
            <div className={styles.questionInfo}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>카테고리:</label>
                <select
                    className={styles.infoSelect}
                    name="category"
                    value={reverseCategoryMapping[question.category] || question.category}
                    onChange={(e) => handleInputChange({
                      target: {
                        name: 'category',
                        value: categoryMapping[e.target.value] || e.target.value
                      }
                    })}
                >
                  <option value="수학">수학</option>
                  <option value="과학">과학</option>
                  <option value="영어">영어</option>
                  <option value="국어">국어</option>
                </select>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>난이도:</label>
                <select
                    className={styles.infoSelect}
                    name="difficulty"
                    value={reverseDifficultyMapping[question.difficulty]}
                    onChange={handleInputChange}
                >
                  <option value="Lv1">Lv1</option>
                  <option value="Lv2">Lv2</option>
                  <option value="Lv3">Lv3</option>
                  <option value="Lv4">Lv4</option>
                  <option value="Lv5">Lv5</option>
                </select>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>포인트:</label>
                <input
                    type="number"
                    className={styles.infoInput}
                    name="point"
                    value={question.point}
                    readOnly
                />
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>정답:</label>
                <select
                    className={styles.infoSelect}
                    name="answered"
                    value={question.answerOption.answered}
                    onChange={(e) => handleAnswerOptionChange('answered', e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.cancelButton} onClick={() => navigate(`/room/${roomId}/manageMain`)}>취소</button>
              <button className={styles.saveButton} onClick={handleSave}>저장</button>
            </div>
          </div>
        </div>
      </div>
  );
  }

  export default ManageModifyPage;