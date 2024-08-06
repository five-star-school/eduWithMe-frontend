import React from 'react';
import styles from '../../styles/ManageReadPage.module.css';

const QuestionDetail = ({ question, onEdit, onDelete }) => {
  return (
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
        <button className={styles.editButton} onClick={onEdit}>수정</button>
        <button className={styles.deleteButton} onClick={onDelete}>삭제</button>
      </div>
    </div>
  );
};

export default QuestionDetail;
