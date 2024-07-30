import React from 'react';
import styles from '../../styles/SolvedProblems.module.css';
import { format } from 'date-fns';

function WrongAnswers({ problems = [] }) {
    return (
        <div className={styles.solvedProblems}>
            <h2 className={styles.title}>오답 문제</h2>
            {Array.isArray(problems) && problems.length > 0 ? (
                <table className={styles.problemTable}>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>문제 제목</th>
                            <th>난이도</th>
                            <th>오답 날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem, index) => (
                            <tr key={problem.questionNo}>
                                <td>{index + 1}</td>
                                <td>{problem.title}</td>
                                <td>{problem.difficulty}</td>
                                <td>{format(new Date(problem.createdAt), 'yyyy-MM-dd')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>아직 오답 문제가 없습니다. 도전해보세요!</p>
            )}
        </div>
    );
}

export default WrongAnswers;
