// RoomPage.jsx
import React from 'react';
import styles from '../styles/RoomPage.module.css';

function RoomPage() {
    return (
        <div className={styles.roomPage}>
            <div className={styles.roomContent}>
                <aside className={styles.sidebar}>
                    <h2 className={styles.roomTitle}>수학 뽀개기</h2>
                    <ul className={styles.memberList}>
                        <li>이학생</li>
                        <li>김학생</li>
                        <li>박학생</li>
                    </ul>
                </aside>
                <main className={styles.mainContent}>
                    <nav className={styles.roomNav}>
                        <button className={styles.navButton}>문제 목록</button>
                        <button className={styles.navButton}>AI 아바 만들 예정</button>
                        <button className={styles.navButton}>관리자 페이지</button>
                    </nav>
                    <div className={styles.contentArea}>
                        <p>문제 목록 또는 선택된 기능의 내용이 여기에 표시됩니다.</p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default RoomPage;