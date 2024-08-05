import React from 'react';
import styles from '../styles/ManageReadSidebar.module.css';

function ManageReadSidebar({ roomName, solvedStudents }) {
  return (
      <aside className={styles.sidebar}>
        <h2 className={styles.roomTitle}>{roomName}</h2>
        <ul className={styles.memberList}>
          <li className={styles.sectionTitle}>문제 푼 학생</li>
          {solvedStudents.map((student, index) => (
              <li key={index} className={styles.student}>
                {student.nickName} <span className={styles.studentTag}>학생</span>
              </li>
          ))}
        </ul>
      </aside>
  );
}

export default ManageReadSidebar;