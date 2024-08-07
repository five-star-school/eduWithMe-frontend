import React from 'react';
import RoomLayout from '../components/RoomLayout'; 
import QuestionDetail from '../components/QuestionDetail'; 
import CommentSection from '../components/CommentSection'; 
import styles from '../styles/QuestionDetail.module.css'; 

function QuestionDetailPage() {
    return (
        <RoomLayout>
            <div className={styles.questionDetailPage}>
                <QuestionDetail />
                <CommentSection />
            </div>
        </RoomLayout>
    );
}

export default QuestionDetailPage;
