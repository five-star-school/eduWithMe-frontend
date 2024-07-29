import React from 'react';
import {useParams} from 'react-router-dom';
import RoomLayout from './RoomLayout';
import styles from '../styles/QuestionDetailPage.module.css';

function QuestionDetailPage() {
    const {roomId, questionId} = useParams();
    const comments = [
        { id: 1, author: '준범2', content: '안녕하세요 여러분들!', date: '2024.07.18 08:12' },
        { id: 2, author: '성훈', content: '반갑습니다.', date: '2024.07.18' },
    ];

    return (
        <RoomLayout>
            <div className={styles.questionDetailPage}>
                <div className={styles.questionSection}>
                    <div className={styles.questionTitleSection}>
                        <span className={styles.questionLabel}>문제 제목</span>
                        <input type="text" className={styles.questionTitleInput} placeholder="문제 제목"/>
                    </div>

                    <div className={styles.questionContentSection}>
                        <span className={styles.questionLabel}>객관식 문제</span>
                        <textarea className={styles.questionContentInput} placeholder="진짜 문제가 들어갑니다."></textarea>
                    </div>
                </div>

                <div className={styles.answerOptions}>
                    <div className={styles.answerOption}>
                        <span className={styles.optionNumber}>1</span>
                        <span className={styles.optionContent}>문제1</span>
                    </div>
                    <div className={styles.answerOption}>
                        <span className={styles.optionNumber}>2</span>
                        <span className={styles.optionContent}>문제2</span>
                    </div>
                    <div className={styles.answerOption}>
                        <span className={styles.optionNumber}>3</span>
                        <span className={styles.optionContent}>문제3</span>
                    </div>
                    <div className={styles.answerOption}>
                        <span className={styles.optionNumber}>4</span>
                        <span className={styles.optionContent}>문제4</span>
                    </div>
                </div>

                <div className={styles.questionInfo}>
                    <span className={styles.difficulty}>
                        <span className={styles.infoLabel}>난이도:</span> 중
                    </span>
                    <span className={styles.points}>
                      <span className={styles.infoLabel}>포인트:</span> 100
                     </span>
                </div>

                <div className={styles.commentSection}>
                    <div className={styles.commentSort}>
                        <button className={`${styles.sortButton} ${styles.active}`}>등록순</button>
                        <button className={styles.sortButton}>최신순</button>
                    </div>

                    <div className={styles.commentList}>
                        {comments.map(comment => (
                            <div key={comment.id} className={styles.commentItem}>
                                <div className={styles.commentHeader}>
                                    <span className={styles.commentAuthor}>{comment.author}</span>
                                    <span className={styles.commentDate}>{comment.date}</span>
                                </div>
                                <p className={styles.commentContent}>{comment.content}</p>
                                <div className={styles.commentActions}>
                                    <button className={styles.actionButton}>댓글 수정</button>
                                    <button className={styles.actionButton}>댓글 삭제</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.commentInput}>
                        <textarea placeholder="댓글을 입력하세요"></textarea>
                        <button className={styles.submitComment}>댓글 등록</button>
                    </div>
                </div>
            </div>
        </RoomLayout>
    );
}

export default QuestionDetailPage;