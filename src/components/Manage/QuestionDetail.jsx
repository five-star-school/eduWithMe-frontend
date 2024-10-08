import React from 'react';
import styles from '../../styles/QuestionDetail.module.css';
import AnswerOption from './AnswerOption';  

function QuestionDetail({ 
  titleValue, 
  contentValue, 
  onTitleChange, 
  onContentChange, 
  options, 
  onOptionChange 
}) {
  return (
    <div className={styles.questionSection}>
      <div className={styles.questionTitleSection}>
        <span className={styles.questionLabel}>문제 제목</span>
        <input 
          type="text" 
          className={styles.questionTitleInput} 
          placeholder="문제 제목"
          value={titleValue} 
          onChange={e => onTitleChange(e.target.value)}
        />
      </div>
      <div className={styles.questionContentSection}>
        <span className={styles.questionLabel}>객관식 문제</span>
        <textarea 
          className={styles.questionContentInput} 
          placeholder="문제를 입력해주세요."
          value={contentValue} 
          onChange={e => onContentChange(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.answerOptions}>
        {options.map((option, index) => (
          <AnswerOption
            key={index}
            optionNumber={index + 1}
            value={option}
            onChange={(e) => onOptionChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionDetail;
