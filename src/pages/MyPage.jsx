import React, { useState } from 'react';
import styles from '../styles/MyPage.module.css';
import UserInfo from '../components/UserInfo';
import SolvedProblems from '../components/SolvedProblems';
import WrongAnswers from '../components/WrongAnswers';
import MyComments from '../components/MyComments';

function MyPage() {
    const [activeTab, setActiveTab] = useState('solved');

    const renderContent = () => {
        switch(activeTab) {
            case 'solved':
                return <SolvedProblems />;
            case 'wrong':
                return <WrongAnswers />;
            case 'comments':
                return <MyComments />;
            default:
                return <SolvedProblems />;
        }
    };

    return (
        <div className={styles.myPage}>
            <header className={styles.header}>
                <h1 className={styles.title}>마이페이지</h1>
                <div className={styles.headerButtons}>
                    <button className={styles.headerButton}>문제 목록</button>
                    <button className={styles.headerButton}>관리자 페이지</button>
                </div>
            </header>
            <div className={styles.content}>
                <aside className={styles.sidebar}>
                    <button
                        className={`${styles.sidebarButton} ${activeTab === 'solved' ? styles.active : ''}`}
                        onClick={() => setActiveTab('solved')}
                    >
                        해결한 문제
                    </button>
                    <button
                        className={`${styles.sidebarButton} ${activeTab === 'wrong' ? styles.active : ''}`}
                        onClick={() => setActiveTab('wrong')}
                    >
                        오답 문제
                    </button>
                    <button
                        className={`${styles.sidebarButton} ${activeTab === 'comments' ? styles.active : ''}`}
                        onClick={() => setActiveTab('comments')}
                    >
                        작성한 댓글
                    </button>
                </aside>
                <main className={styles.mainContent}>
                    <UserInfo />
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default MyPage;