import React from 'react';
import styles from '../../styles/ManageModifyPage.module.css';

const AnswerOption = ({ optionNumber, value, onChange }) => {
  return (
    <div className={styles.answerOption}>
      <span className={styles.optionNumber}>{optionNumber}</span>
      <input
        type="text"
        className={styles.optionContent}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AnswerOption;
