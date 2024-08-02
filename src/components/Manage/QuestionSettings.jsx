import React from 'react';
import styles from '../../styles/ManageCreatePage.module.css';

const QuestionSettings = ({
  category, onCategoryChange,
  difficulty, onDifficultyChange,
  points, onPointsChange,
  correctAnswer, onCorrectAnswerChange
}) => {
  return (
      <div className={styles.questionInfo}>
        <div className={styles.infoItem}>
          <label className={styles.infoLabel}>카테고리:</label>
          <select className={styles.infoSelect} value={category} onChange={e => onCategoryChange(e.target.value)}>
            <option value="">선택하세요</option>
            <option value="MATH">MATH</option>
            <option value="SCIENCE">SCIENCE</option>
            <option value="ENGLISH">ENGLISH</option>
            <option value="KOREAN">KOREAN</option>
          </select>
        </div>

        <div className={styles.infoItem}>
          <label className={styles.infoLabel}>난이도:</label>
          <select className={styles.infoSelect} value={difficulty} onChange={e => onDifficultyChange(e.target.value)}>
            <option value="">선택하세요</option>
            <option value="LEVEL_ONE">Lv1</option>
            <option value="LEVEL_TWO">Lv2</option>
            <option value="LEVEL_THREE">Lv3</option>
            <option value="LEVEL_FOUR">Lv4</option>
            <option value="LEVEL_FIVE">Lv5</option>
          </select>
        </div>

        <div className={styles.infoItem}>
          <label className={styles.infoLabel}>포인트:</label>
          <input
              type="number"
              className={styles.infoInput}
              placeholder="100"
              value={points}
              onChange={e => onPointsChange(e.target.value)}
          />
        </div>

        <div className={styles.infoItem}>
          <label className={styles.infoLabel}>정답:</label>
          <select className={styles.infoSelect} value={correctAnswer} onChange={e => onCorrectAnswerChange(e.target.value)}>
            <option value="">선택하세요</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
  );
};

export default QuestionSettings;