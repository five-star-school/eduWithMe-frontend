import React from 'react';
import styles from '../../styles/ManageMainPage.module.css';

function QuestionTable({ problems }) {
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
            <tr key={problem.id}>
              <td>{problem.id}</td>
              <td>{problem.category}</td>
              <td>{problem.title}</td>
              <td>{problem.difficulty}</td>
              <td>{problem.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionTable;
