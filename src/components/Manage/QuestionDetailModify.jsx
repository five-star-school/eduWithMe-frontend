import React from 'react';
import styles from '../../styles/ManageModifyPage.module.css';

const QuestionDetailModify = ({ question, onInputChange, onAnswerOptionChange }) => {
  return (
    <div className={styles.questionSection}>
      <div className={styles.questionTitleSection}>
        <span className={styles.questionLabel}>문제 제목</span>
        <input
          type="text"
          className={styles.questionTitleInput}
          name="title"
          value={question.title}
          onChange={onInputChange}
        />
      </div>
      <div className={styles.questionContentSection}>
        <span className={styles.questionLabel}>객관식 문제</span>
        <textarea
          className={styles.questionContentInput}
          name="content"
          value={question.content}
          onChange={onInputChange}
        ></textarea>
      </div>
      <div className={styles.answerOptions}>
        {['first', 'second', 'third', 'fourth'].map((option, index) => (
          <div key={index} className={styles.answerOption}>
            <span className={styles.optionNumber}>{index + 1}</span>
            <input
              type="text"
              className={styles.optionContent}
              value={question.answerOption[option]}
              onChange={(e) => onAnswerOptionChange(option, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDetailModify;
