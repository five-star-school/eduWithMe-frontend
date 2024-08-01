import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/ManageMainPage.module.css';

function QuestionTable({ problems, roomId }) {
  const navigate = useNavigate();

  const handleQuestionClick = (questionId) => {
    navigate(`/room/${roomId}/question/${questionId}/manage`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '유효하지 않은 날짜';
    }
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
      <div className={styles.solvedProblems}>
        <h2>문제 목록</h2>
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
          {problems.map((problem) => (
              <tr key={problem.questionId} onClick={() => handleQuestionClick(problem.questionId)} style={{ cursor: 'pointer' }}>
                <td>{problem.questionId}</td>
                <td>{problem.category}</td>
                <td>{problem.title}</td>
                <td>{problem.difficulty}</td>
                <td>{formatDate(problem.updatedAt)}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default QuestionTable;
