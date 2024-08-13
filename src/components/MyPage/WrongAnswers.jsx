import React from 'react';
import styles from '../../styles/SolvedAnswers.module.css';

function WrongAnswers({ problems = [] }) {
    return (
        <div className={styles.solvedProblems}>
            <h2 className={styles.title}>오답 문제</h2>
            {Array.isArray(problems) && problems.length > 0 ? (
                <table className={styles.problemTable}>
                    <thead>
                    <tr>
                        <th>방 이름</th>
                        <th>문제 번호</th>
                        <th>카테고리</th>
                        <th>문제 제목</th>
                        <th>난이도</th>
                        <th>오답 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {problems.map((problem) => (
                        <tr key={problem.questionId}>
                            <td>{problem.roomName}</td>
                            <td>{problem.orderInRoom || 'N/A'}</td>
                            <td>{problem.category}</td>
                            <td>{problem.title}</td>
                            <td>{problem.difficulty}</td>
                            <td>{problem.formattedUpdatedAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>아직 오답 문제가 없습니다. 틀린 문제를 다시 풀면서 실력을 키워보세요! 💪</p>
            )}
        </div>
    );
}

export default WrongAnswers;