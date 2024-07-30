import React from 'react';
import ManageReadSidebar from '../components/ManageReadSidebar';
import ManageMainHeaderNav from '../components/ManageMainHeaderNav';
import styles from '../styles/ManageReadPage.module.css';

function ManageReadPage() {
  return (
      <div className={styles.manageReadPage}>
        <ManageReadSidebar />
        <div className={styles.mainContent}>
          <ManageMainHeaderNav />
          <div className={styles.readContent}>
            <div className={styles.questionSection}>
              <div className={styles.questionTitleSection}>
                <span className={styles.questionLabel}>문제 제목</span>
                <input type="text" className={styles.questionTitleInput} readOnly />
              </div>
              <div className={styles.questionContentSection}>
                <span className={styles.questionLabel}>객관식 문제</span>
                <textarea className={styles.questionContentInput} readOnly></textarea>
              </div>
            </div>
            <div className={styles.answerOptions}>
              {[1, 2, 3, 4].map((num) => (
                  <div key={num} className={styles.answerOption}>
                    <span className={styles.optionNumber}>{num}</span>
                    <input type="text" className={styles.optionContent} readOnly />
                  </div>
              ))}
            </div>
            <div className={styles.questionInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>카테고리</span>
                <input type="text" className={styles.infoInput} readOnly />
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>난이도</span>
                <input type="text" className={styles.infoInput} readOnly />
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>포인트</span>
                <input type="text" className={styles.infoInput} readOnly />
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>정답</span>
                <input type="text" className={styles.infoInput} readOnly />
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.editButton}>수정</button>
              <button className={styles.deleteButton}>삭제</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ManageReadPage;