import React from 'react';
import styles from '../../styles/SolvedAnswers.module.css';
import { format } from 'date-fns';

function MyComments({ comments }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd HH:mm');
    };

    return (
        <div className={styles.solvedProblems}>
            <h2 className={styles.title}>작성한 댓글</h2>
            {comments.length > 0 ? (
                <table className={styles.problemTable}>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>댓글 내용</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment.commentNo}>
                                <td>{comment.commentNo}</td>
                                <td>{comment.comment}</td>
                                <td>{formatDate(comment.updatedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>작성한 댓글이 없습니다. 다른 사용자들과 의견을 나누어 보세요!</p>
            )}
        </div>
    );
}

export default MyComments;