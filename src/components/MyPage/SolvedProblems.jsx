import React from 'react';
import styles from '../../styles/SolvedProblems.module.css';

function SolvedProblems() {
    const solvedProblems = [
        { id: 1, title: '문제 1', difficulty: '상', solvedDate: '2024-07-18' },
        { id: 2, title: '문제 2', difficulty: '중', solvedDate: '2024-07-19' },
        { id: 3, title: '문제 3', difficulty: '하', solvedDate: '2024-07-20' },
    ];

    return (
        <div className={styles.solvedProblems}>
            <h2 className={styles.title}>해결한 문제</h2>
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
                {solvedProblems.map((problem) => (
                    <tr key={problem.id}>
                        <td>{problem.id}</td>
                        <td>{problem.title}</td>
                        <td>{problem.difficulty}</td>
                        <td>{problem.solvedDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SolvedProblems;