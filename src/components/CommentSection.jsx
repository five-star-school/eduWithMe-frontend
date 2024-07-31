import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../util/axiosConfig";
import styles from '../styles/QuestionDetail.module.css';

function CommentSection() {
    const [commentList, setCommentList] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [newComment, setNewComment] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { questionId } = useParams();

    const fetchComments = useCallback(async (page) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/question/${questionId}/comments`, {
                params: {
                    page: page,
                    sort: `createdAt,${sortOrder}`
                }
            });
            console.log('Server response:', response.data);
            if (response.data && response.data.data) {
                setCommentList(response.data.data.content);
                setCurrentPage(response.data.data.number);
                setTotalPages(response.data.data.totalPages);
                setTotalComments(response.data.data.totalElements);
            } else {
                setCommentList([]);
                setTotalPages(0);
                setTotalComments(0);
            }
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            setCommentList([]);
            setError('댓글을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [questionId, sortOrder]);

    useEffect(() => {
        fetchComments(0);
    }, [fetchComments]);

    const handleSort = (order) => {
        setSortOrder(order);
        fetchComments(0);
    };

    const handlePageChange = (page) => {
        fetchComments(page);
    };

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert('댓글 내용을 입력해 주세요.');
            return;
        }
        try {
            await axios.post(`/question/${questionId}/comments`, { comment: newComment });
            setNewComment('');
            fetchComments(0);
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const handleEditClick = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditContent(content);
    };

    const handleSaveClick = async (commentId) => {
        try {
            await axios.put(`/question/${questionId}/comments/${commentId}`, { comment: editContent });
            setEditingCommentId(null);
            setEditContent('');
            fetchComments(currentPage);
        } catch (error) {
            console.error('Failed to update comment:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingCommentId(null);
        setEditContent('');
    };

    const handleChange = (e) => {
        setEditContent(e.target.value);
    };

    const handleDeleteClick = async (commentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/question/${questionId}/comments/${commentId}`);
                fetchComments(currentPage);
            } catch (error) {
                console.error('Failed to delete comment:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 0; i < totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`${styles.pageButton} ${currentPage === i ? styles.activePage : ''}`}
                >
                    {i + 1}
                </button>
            );
        }
        return pageNumbers.length > 1 ? (
            <div className={styles.pagination}>
                {pageNumbers}
            </div>
        ) : null;
    };

    return (
        <div className={styles.commentSection}>
            <div className={styles.commentSort}>
                <button
                    className={`${styles.sortButton} ${sortOrder === 'asc' ? styles.active : ''}`}
                    onClick={() => handleSort('asc')}
                >
                    등록순
                </button>
                <button
                    className={`${styles.sortButton} ${sortOrder === 'desc' ? styles.active : ''}`}
                    onClick={() => handleSort('desc')}
                >
                    최신순
                </button>
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.commentList}>
                {commentList.length > 0 ? commentList.map(comment => (
                    <div key={comment.commentId} className={styles.commentItem}>
                        <div className={styles.commentHeader}>
                            <span className={styles.commentAuthor}>{comment.nickName}</span>
                            <span className={styles.commentDate}>{formatDate(comment.updatedAt)}</span>
                        </div>
                        {editingCommentId === comment.commentId ? (
                            <div className={styles.editingComment}>
                                <textarea
                                    value={editContent}
                                    onChange={handleChange}
                                    className={styles.editCommentInput}
                                />
                                <button
                                    className={styles.saveButton}
                                    onClick={() => handleSaveClick(comment.commentId)}
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
                                <p className={styles.commentContent}>{comment.comment}</p>
                                <div className={styles.commentActions}>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => handleEditClick(comment.commentId, comment.comment)}
                                    >
                                        댓글 수정
                                    </button>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => handleDeleteClick(comment.commentId)}
                                    >
                                        댓글 삭제
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )) : (
                    !isLoading && <p>댓글이 없습니다.</p>
                )}
            </div>

            {isLoading && <p>댓글을 불러오는 중...</p>}

            {renderPagination()}

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