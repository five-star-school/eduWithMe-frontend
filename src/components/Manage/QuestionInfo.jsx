import React from 'react';
import styles from '../../styles/ManageModifyPage.module.css';

const QuestionInfo = ({ question, reverseCategoryMapping, reverseDifficultyMapping, onInputChange, onAnswerOptionChange }) => {
  return (
    <div className={styles.questionInfo}>
      <div className={styles.infoItem}>
        <label className={styles.infoLabel}>카테고리</label>
        <select
          className={styles.infoSelect}
          name="category"
          value={reverseCategoryMapping[question.category] || question.category}
          onChange={(e) => onInputChange({
            target: {
              name: 'category',
              value: e.target.value
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
        <label className={styles.infoLabel}>난이도</label>
        <select
          className={styles.infoSelect}
          name="difficulty"
          value={reverseDifficultyMapping[question.difficulty]}
          onChange={onInputChange}
        >
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
          name="point"
          value={question.point}
          readOnly
        />
      </div>
      <div className={styles.infoItem}>
        <label className={styles.infoLabel}>정답</label>
        <select
          className={styles.infoSelect}
          name="answered"
          value={question.answerOption.answered}
          onChange={(e) => onAnswerOptionChange('answered', e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>
  );
};

export default QuestionInfo;
