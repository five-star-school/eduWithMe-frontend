import React from 'react';
import styles from '../../styles/SolvedProblems.module.css';

function SolvedProblems({ problems }) {
    return (
        <div className={styles.solvedProblems}>
            <h2 className={styles.title}>해결한 문제</h2>
            {problems.length > 0 ? (
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
                        {problems.map((problem) => (
                            <tr key={problem.questionNo}>
                                <td>{problem.questionNo}</td>
                                <td>{problem.title}</td>
                                <td>{problem.difficulty}</td>
                                <td>{new Date(problem.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>해결한 문제가 없습니다.</p>
            )}
        </div>
    );
}

export default SolvedProblems;
