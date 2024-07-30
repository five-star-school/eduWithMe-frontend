import React from 'react';
import styles from '../styles/QuestionDetail.module.css';

function CommentSection({ comments }) {
    return (
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
    );
}

export default CommentSection;
