import React from 'react';
import styles from '../../styles/SolvedAnswers.module.css';

function SolvedAnswers({ problems }) {
    console.log('All problems:', problems);

    return (
        <div className={styles.solvedProblems}>
            <h2 className={styles.title}>해결한 문제</h2>
            {problems && problems.length > 0 ? (
                <table className={styles.problemTable}>
                    <thead>
                    <tr>
                        <th>방 이름</th>
                        <th>문제 번호</th>
                        <th>카테고리</th>
                        <th>문제 제목</th>
                        <th>난이도</th>
                        <th>해결 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {problems.map((problem, index) => {
                        console.log(`Problem ${index + 1}:`, problem);
                        return (
                            <tr key={problem.questionId}>
                                <td>{problem.roomName}</td>
                                <td>{problem.orderInRoom || 'N/A'}</td>
                                <td>{problem.category}</td>
                                <td>{problem.title}</td>
                                <td>{problem.difficulty}</td>
                                <td>{problem.formattedUpdatedAt || 'N/A'}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            ) : (
                <p>아직 해결한 문제가 없습니다. 한 문제씩 차근차근 해결해 나가며 지식을 쌓아보세요! ☺️</p>
            )}
        </div>
    );
}

export default SolvedAnswers;