import React from 'react';
import styles from '../../styles/SolvedProblems.module.css';
import { format } from 'date-fns';

function SolvedProblems({ problems }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd');  // 원하는 포맷으로 변경
    };

    return (
        <div className={styles.solvedProblems}>
            <h2 className={styles.title}>해결한 문제</h2>
            {problems.length > 0 ? (
                <table className={styles.problemTable}>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>카테고리</th>
                        <th>문제 제목</th>
                        <th>난이도</th>
                        <th>해결 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem) => (
                            <tr key={problem.questionNo}>
                                <td>{problem.questionNo}</td>
                                <td>{problem.category}</td>
                                <td>{problem.title}</td>
                                <td>{problem.difficulty}</td>
                                <td>{formatDate(problem.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>해결한 문제가 없습니다. 한 문제씩 차근차근 해결해 나가며 지식을 쌓아보세요! ☺️</p>
            )}
        </div>
    );
}

export default SolvedProblems;
