import React from 'react';
import styles from '../../styles/SolvedProblems.module.css';

function WrongAnswers() {
    const wrongAnswers = [
        { id: 1, title: '문제 1', difficulty: '상', wrongDate: '2024-07-18' },
        { id: 2, title: '문제 2', difficulty: '중', wrongDate: '2024-07-19' },
        { id: 3, title: '문제 3', difficulty: '하', wrongDate: '2024-07-20' },
    ];

    return (
        <div className={styles.solvedProblems}>
            <h2>오답 문제</h2>
            <table className={styles.problemTable}>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>문제 제목</th>
                    <th>난이도</th>
                    <th>해결 날짜</th>
                </tr>
                </thead>
                <tbody>
                {wrongAnswers.map((problem, index) => (
                    <tr key={problem.id}>
                        <td>{index + 1}</td>
                        <td>{problem.title}</td>
                        <td>{problem.difficulty}</td>
                        <td>{problem.wrongDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default WrongAnswers;