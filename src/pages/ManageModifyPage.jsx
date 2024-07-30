// src/pages/ManageModifyPage.jsx
import React from 'react';
import SidebarComponent from '../components/SidebarComponent';
import ManageMainHeaderNav from '../components/ManageMainHeaderNav';
import styles from '../styles/ManageModifyPage.module.css';

function ManageModifyPage() {
  return (
      <div className={styles.manageModifyPage}>
        <SidebarComponent />
        <div className={styles.mainContent}>
          <ManageMainHeaderNav />
          <div className={styles.modifyContent}>
            <div className={styles.questionSection}>
              <div className={styles.questionTitleSection}>
                <span className={styles.questionLabel}>문제 제목</span>
                <input type="text" className={styles.questionTitleInput} placeholder="문제 제목"/>
              </div>
              <div className={styles.questionContentSection}>
                <span className={styles.questionLabel}>객관식 문제</span>
                <textarea className={styles.questionContentInput} placeholder="문제를 입력해주세요."></textarea>
              </div>
            </div>
            <div className={styles.answerOptions}>
              {[1, 2, 3, 4].map((num) => (
                  <div key={num} className={styles.answerOption}>
                    <span className={styles.optionNumber}>{num}</span>
                    <input type="text" className={styles.optionContent} placeholder={`객관식${num}`} />
                  </div>
              ))}
            </div>
            <div className={styles.questionInfo}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>카테고리:</label>
                <select className={styles.infoSelect}>
                  <option value="">선택하세요</option>
                  <option value="MATH">MATH</option>
                  <option value="SCIENCE">SCIENCE</option>
                  <option value="ENGLISH">ENGLISH</option>
                  <option value="KOREAN">KOREAN</option>
                </select>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>난이도:</label>
                <select className={styles.infoSelect}>
                  <option value="">선택하세요</option>
                  <option value="Lv1">Lv1</option>
                  <option value="Lv2">Lv2</option>
                  <option value="Lv3">Lv3</option>
                  <option value="Lv4">Lv4</option>
                  <option value="Lv5">Lv5</option>
                </select>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>포인트:</label>
                <input type="number" className={styles.infoInput} placeholder="100" />
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>정답:</label>
                <select className={styles.infoSelect}>
                  <option value="">선택하세요</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.cancelButton}>취소</button>
              <button className={styles.saveButton}>저장</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ManageModifyPage;