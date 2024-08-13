import React from 'react';
import styles from '../../styles/MyComments.module.css';

function MyComments({ comments }) {
    return (
        <div className={styles.solvedProblems}>
            <h2 className={styles.title}>작성한 댓글</h2>
            {comments.length > 0 ? (
                <table className={styles.problemTable}>
                    <thead>
                    <tr>
                        <th>방 이름</th>
                        <th>문제 번호</th>
                        <th>댓글 내용</th>
                        <th>작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {comments.map((comment) => (
                        <tr key={comment.commentId}>
                            <td>{comment.roomName || 'N/A'}</td>
                            <td>{comment.questionOrderInRoom || 'N/A'}</td>
                            <td>{comment.comment}</td>
                            <td>{comment.formattedUpdatedAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>아직 작성한 댓글이 없습니다. 다른 사용자들과 의견을 나누어 보세요! 📝</p>
            )}
        </div>
    );
}

export default MyComments;