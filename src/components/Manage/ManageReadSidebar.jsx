// 문제 상세 조회 시 보여줄 사이드바 화면임.
import React from 'react';
import styles from '../../styles/ManageReadSidebar.module.css';

function ManageReadSidebar() {
  return (
      <aside className={styles.sidebar}>
        <h2 className={styles.roomTitle}>수학 뽀개기</h2>
        <ul className={styles.memberList}>
          <li className={styles.roomOwner}>홍수학 <span className={styles.ownerTag}>선생님</span></li>
          <li className={styles.sectionTitle}>문제 푼 학생</li>
          <li className={styles.student}>홍준빈 <span className={styles.studentTag}>학생</span></li>
          <li className={styles.student}>이세원 <span className={styles.studentTag}>학생</span></li>
          <li className={styles.student}>이지우 <span className={styles.studentTag}>학생</span></li>
          <li className={styles.student}>신성훈 <span className={styles.studentTag}>학생</span></li>
        </ul>
      </aside>
  );
}

export default ManageReadSidebar;