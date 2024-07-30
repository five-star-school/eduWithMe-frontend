import React, { useState } from 'react';
import styles from '../styles/QuestionDetail.module.css';

function CommentSection({ comments }) {
    const [commentList, setCommentList] = useState(comments);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [newComment, setNewComment] = useState('');

    // 댓글 입력 변경 핸들러
    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // 댓글 등록 핸들러
    const handleAddComment = () => {
        if (!newComment.trim()) {
            alert('댓글 내용을 입력해 주세요.');
            return;
        }
        const newCommentObj = {
            id: commentList.length ? Math.max(commentList.map(comment => comment.id)) + 1 : 1,
            author: '작성자', // 기본 작성자 이름
            content: newComment,
            date: formatDate(new Date())
        };
        setCommentList([...commentList, newCommentObj]);
        setNewComment('');
    };

    // 댓글 수정 클릭 핸들러
    const handleEditClick = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditContent(content);
    };

    // 댓글 저장 핸들러
    const handleSaveClick = (commentId) => {
        setCommentList(commentList.map(comment =>
            comment.id === commentId ? { ...comment, content: editContent } : comment
        ));
        setEditingCommentId(null);
        setEditContent('');
    };

    // 댓글 수정 취소 핸들러
    const handleCancelClick = () => {
        setEditingCommentId(null);
        setEditContent('');
    };

    // 댓글 내용 변경 핸들러
    const handleChange = (e) => {
        setEditContent(e.target.value);
    };

    // 댓글 삭제 핸들러
    const handleDeleteClick = (commentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setCommentList(commentList.filter(comment => comment.id !== commentId));
        }
    };

    // 날짜 포맷팅 함수
    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return new Intl.DateTimeFormat('ko-KR', options).format(date);
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
                <textarea
                    placeholder="댓글을 입력하세요"
                    value={newComment}
                    onChange={handleNewCommentChange}
                    className={styles.newCommentInput}
                />
                <button
                    className={styles.submitComment}
                    onClick={handleAddComment}
                >
                    댓글 등록
                </button>
            </div>
        </div>
    );
}

export default CommentSection;
