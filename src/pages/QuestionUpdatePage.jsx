import React from 'react';
import RoomLayout from '../components/RoomLayout';
import QuestionDetail from '../components/QuestionDetail';
import styles from '../styles/QuestionDetail.module.css';

function QuestionUpdatePage() {
  const comments = [
    { id: 1, author: '준범2', content: '안녕하세요 여러분들!', date: '2024.07.18 08:12' },
    { id: 2, author: '성훈', content: '반갑습니다.', date: '2024.07.18' },
  ];

  return (
      <RoomLayout>
        <div className={styles.questionDetailPage}>
          <QuestionDetail />
        </div>
      </RoomLayout>
  );
}

export default QuestionUpdatePage;
