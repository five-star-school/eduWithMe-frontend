import React, { useState } from 'react';
import styles from '../styles/QuestionDetail.module.css';

function CommentSection({ comments }) {
    const [commentList, setCommentList] = useState(comments);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');

    const handleEditClick = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditContent(content);
    };

    const handleSaveClick = (commentId) => {
        setCommentList(commentList.map(comment =>
            comment.id === commentId ? { ...comment, content: editContent } : comment
        ));
        setEditingCommentId(null);
        setEditContent('');
    };

    const handleCancelClick = () => {
        setEditingCommentId(null);
        setEditContent('');
    };

    const handleChange = (e) => {
        setEditContent(e.target.value);
    };

    const handleDeleteClick = (commentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setCommentList(commentList.filter(comment => comment.id !== commentId));
        }
    };
    
    return (
        <div className={styles.commentSection}>
            <div className={styles.commentSort}>
                <button className={`${styles.sortButton} ${styles.active}`}>등록순</button>
                <button className={styles.sortButton}>최신순</button>
            </div>

            <div className={styles.commentList}>
                {commentList.map(comment => (
                    <div key={comment.id} className={styles.commentItem}>
                        <div className={styles.commentHeader}>
                            <span className={styles.commentAuthor}>{comment.author}</span>
                            <span className={styles.commentDate}>{comment.date}</span>
                        </div>
                        {editingCommentId === comment.id ? (
                            <div className={styles.editingComment}>
                                <textarea
                                    value={editContent}
                                    onChange={handleChange}
                                    className={styles.editCommentInput}
                                />
                                <button
                                    className={styles.saveButton}
                                    onClick={() => handleSaveClick(comment.id)}
                                >
                                    저장
                                </button>
                                <button
                                    className={styles.cancelButton}
                                    onClick={handleCancelClick}
                                >
                                    취소
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className={styles.commentContent}>{comment.content}</p>
                                <div className={styles.commentActions}>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => handleEditClick(comment.id, comment.content)}
                                    >
                                        댓글 수정
                                    </button>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => handleDeleteClick(comment.id)}
                                    >
                                        댓글 삭제
                                    </button>                                
                                </div>
                            </>
                        )}
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
