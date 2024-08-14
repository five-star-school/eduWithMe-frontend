import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../util/axiosConfig";
import styles from '../styles/QuestionDetail.module.css';
import { getCookie } from '../util/cookie';

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
    const [currentUserId, setCurrentUserId] = useState(null);
    const { questionId } = useParams();

    useEffect(() => {
        const userId = getCookie('userId');
        setCurrentUserId(userId ? parseInt(userId, 10) : null);
    }, []);

    const fetchComments = useCallback(async (page, order) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/question/${questionId}/comments`, {
                params: {
                    page: page,
                    sort: `createdAt,${order}`
                }
            });
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
            setCommentList([]);
            setError('댓글을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [questionId]);

    useEffect(() => {
        fetchComments(0, sortOrder);
    }, [fetchComments, sortOrder]);

    const isCommentEdited = (formattedCreatedAt, formattedUpdatedAt) => {
        return formattedCreatedAt !== formattedUpdatedAt;
    };

    const isCommentOwner = (comment) => {
        return currentUserId === comment.userId;
    };

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handlePageChange = (page) => {
        fetchComments(page, sortOrder);
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
            await axios.post(`/api/question/${questionId}/comments`, { comment: newComment });
            setNewComment('');
            fetchComments(0, sortOrder);
        } catch (error) {
            alert('댓글 작성에 실패했습니다.');
        }
    };

    const handleEditClick = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditContent(content);
    };

    const handleSaveClick = async (commentId) => {
        try {
            const response = await axios.put(`/api/question/${questionId}/comments/${commentId}`, { comment: editContent });

            setCommentList(prevComments =>
                prevComments.map(comment =>
                    comment.commentId === commentId
                        ? {
                            ...comment,
                            comment: response.data.data.comment,
                            formattedCreatedAt: response.data.data.formattedCreatedAt,
                            formattedUpdatedAt: response.data.data.formattedUpdatedAt
                        }
                        : comment
                )
            );
            setEditingCommentId(null);
            setEditContent('');
        } catch (error) {
            alert(error.response?.data?.msg || '댓글 수정에 실패했습니다.');
        }
    };

    const handleDeleteClick = async (commentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/question/${questionId}/comments/${commentId}`);
                fetchComments(currentPage, sortOrder);
            } catch (error) {
                alert(error.response?.data?.msg || '댓글 삭제에 실패했습니다.');
            }
        }
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
                            <span className={styles.commentDate}>
                                {isCommentEdited(comment.formattedCreatedAt, comment.formattedUpdatedAt)
                                    ? comment.formattedUpdatedAt
                                    : comment.formattedCreatedAt}
                                {isCommentEdited(comment.formattedCreatedAt, comment.formattedUpdatedAt) && " (수정됨)"}
                            </span>
                        </div>
                        {editingCommentId === comment.commentId ? (
                            <div className={styles.editingComment}>
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
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
                                    onClick={() => setEditingCommentId(null)}
                                >
                                    취소
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className={styles.commentContent}>{comment.comment}</p>
                                {isCommentOwner(comment) && (
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
                                )}
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
                <div className={styles.submitCommentWrapper}>
                    <button
                        className={styles.submitComment}
                        onClick={handleAddComment}
                    >
                        댓글 등록
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommentSection;