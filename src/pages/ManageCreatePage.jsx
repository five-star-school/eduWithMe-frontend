import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarComponent from '../components/SidebarComponent';
import ManageMainHeaderNav from '../components/Manage/ManageMainHeaderNav';
import styles from '../styles/ManageCreatePage.module.css';
import QuestionDetail from '../components/Manage/QuestionDetail';
import axios from '../util/axiosConfig';

function ManageCreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [points, setPoints] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [roomName, setRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoomInfo();
  }, [roomId]);

  const fetchRoomInfo = async () => {
    try {
      const response = await axios.get(`/api/rooms/one/${roomId}`);
      if (response.data && response.data.data) {
        const roomData = response.data.data;
        setRoomName(roomData.roomName);
        setIsPrivate(roomData.roomPassword !== null && roomData.roomPassword !== '');
      }
    } catch (error) {
      console.error('Failed to fetch room info:', error);
    }
  };

  const handleQuestionListClick = () => {
    navigate(`/room/${roomId}/manageMain`);
  };

  const categoryMapping = {
    '수학': 'MATH',
    '과학': 'SCIENCE',
    '영어': 'ENGLISH',
    '국어': 'KOREAN',
  };

  const difficultyMapping = {
    'Lv1': 'LEVEL_ONE',
    'Lv2': 'LEVEL_TWO',
    'Lv3': 'LEVEL_THREE',
    'Lv4': 'LEVEL_FOUR',
    'Lv5': 'LEVEL_FIVE',
  };

  const difficultyPointMapping = {
    'Lv1': 10,
    'Lv2': 20,
    'Lv3': 30,
    'Lv4': 40,
    'Lv5': 50,
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCategoryChange = (value) => {
    setCategory(categoryMapping[value] || value);
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(difficultyMapping[value]);
    setPoints(difficultyPointMapping[value]);
  };

  const handleSave = async () => {
    try {
      const questionData = {
        title,
        content,
        category,
        difficulty,
        point: parseInt(points),
        answer: {
          first: options[0],
          second: options[1],
          third: options[2],
          fourth: options[3],
          answered: parseInt(correctAnswer)
        }
      };

      await axios.post(`/api/rooms/${roomId}/question`, questionData);
      alert('문제가 성공적으로 생성되었습니다.');
      navigate(`/room/${roomId}/manageMain`);
    } catch (error) {
      alert('문제 생성에 실패했습니다: ' + error.response?.data?.message || error.message);
    }
  };

  return (
      <div className={styles.manageCreatePage}>
        <SidebarComponent />
        <div className={styles.mainContent}>
          <ManageMainHeaderNav
              roomId={roomId}
              roomName={roomName}
              roomIsPrivate={isPrivate}
              onQuestionListClick={handleQuestionListClick}
          />
          <div className={styles.createContent}>
            <QuestionDetail
                titleValue={title}
                contentValue={content}
                onTitleChange={setTitle}
                onContentChange={setContent}
                options={options}
                onOptionChange={handleOptionChange}
            />
            <div className={styles.questionInfo}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>카테고리</label>
                <select
                    className={styles.infoSelect}
                    value={Object.keys(categoryMapping).find(key => categoryMapping[key] === category) || ''}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="수학">수학</option>
                  <option value="과학">과학</option>
                  <option value="영어">영어</option>
                  <option value="국어">국어</option>
                </select>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>난이도</label>
                <select
                    className={styles.infoSelect}
                    value={Object.keys(difficultyMapping).find(key => difficultyMapping[key] === difficulty) || ''}
                    onChange={(e) => handleDifficultyChange(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="Lv1">Lv1</option>
                  <option value="Lv2">Lv2</option>
                  <option value="Lv3">Lv3</option>
                  <option value="Lv4">Lv4</option>
                  <option value="Lv5">Lv5</option>
                </select>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>포인트</label>
                <input
                    type="number"
                    className={styles.infoInput}
                    value={points}
                    readOnly
                />
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>정답</label>
                <select
                    className={styles.infoSelect}
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                >
                  <option value="">선택하세요</option>
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

export default ManageCreatePage;