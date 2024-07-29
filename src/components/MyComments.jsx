import React from 'react';
import styles from '../styles/SolvedProblems.module.css';

function MyComments() {
    const myComments = [
        { id: 1, title: '문제 1', commentDate: '2024-07-18' },
        { id: 2, title: '문제 2', commentDate: '2024-07-19' },
        { id: 3, title: '문제 3', commentDate: '2024-07-20' },
    ];

    return (
        <div className={styles.solvedProblems}>
            <h2>작성한 댓글</h2>
            <table className={styles.problemTable}>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>댓글</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                {myComments.map((comment, index) => (
                    <tr key={comment.id}>
                        <td>{index + 1}</td>
                        <td>{comment.title}</td>
                        <td>{comment.commentDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyComments;