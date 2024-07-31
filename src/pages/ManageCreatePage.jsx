import React, { useState } from 'react';
import SidebarComponent from '../components/SidebarComponent';
import ManageMainHeaderNav from '../components/ManageMainHeaderNav';
import styles from '../styles/ManageCreatePage.module.css';
import QuestionDetail from '../components/Manage/QuestionDetail';
import QuestionSettings from '../components/Manage/QuestionSettings';

function ManageCreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [points, setPoints] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className={styles.manageCreatePage}>
      <SidebarComponent />
      <div className={styles.mainContent}>
        <ManageMainHeaderNav />
        <div className={styles.createContent}>
          <QuestionDetail 
            titleValue={title} 
            contentValue={content} 
            onTitleChange={setTitle} 
            onContentChange={setContent} 
            options={options} 
            onOptionChange={handleOptionChange} 
          />
          <QuestionSettings 
            category={category} 
            onCategoryChange={setCategory}
            difficulty={difficulty} 
            onDifficultyChange={setDifficulty}
            points={points} 
            onPointsChange={setPoints}
            correctAnswer={correctAnswer} 
            onCorrectAnswerChange={setCorrectAnswer}
          />
          <div className={styles.actionButtons}>
            <button className={styles.cancelButton}>취소</button>
            <button className={styles.saveButton}>저장</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCreatePage;
