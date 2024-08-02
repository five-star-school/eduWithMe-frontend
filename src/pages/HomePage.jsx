import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';

function HomePage() {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.introSection}>
                <h1>Welcome to EduWithMe</h1>
                <p>
                    EduWithMe는 선생님과 학생들이 함께 학습하고 소통할 수 있는 맞춤형 학습 플랫폼입니다.
                </p>
                <p>
                    선생님은 문제를 출제하고, 학생은 문제를 풀면서 포인트를 쌓아 학습 진척도를 확인할 수 있습니다.
                </p>
                <Link to="/main" className={styles.mainLink}>
                    학습하러 가기 ✏️
                </Link>
            </div>

            <div className={styles.featuresSection}>
                <h2>주요 기능 소개</h2>
                <ul className={styles.featuresList}>
                    <li>
                        <strong>방 생성 및 문제 출제: </strong> 선생님과 학생이 자유롭게 방을 생성하고, 문제를 출제할 수 있습니다.
                    </li>
                    <li>
                        <strong>포인트 및 랭킹 시스템: </strong> 문제를 풀면서 포인트를 쌓고, 랭킹을 확인할 수 있습니다.
                    </li>
                    <li>
                        <strong>오답 관리: </strong> 마이페이지에서 본인이 푼 문제와 오답을 관리할 수 있습니다.
                    </li>
                    <li>
                        <strong>실시간 채팅: </strong> 방 내에서 실시간 채팅을 통해 소통할 수 있습니다.
                    </li>
                </ul>

                <p className={styles.signupPrompt}>
                    아직 회원이 아니신가요? <Link to="/signup" className={styles.signupLink}>회원가입</Link>을 해보세요!
                </p>
            </div>
        </div>
    );
}

export default HomePage;
