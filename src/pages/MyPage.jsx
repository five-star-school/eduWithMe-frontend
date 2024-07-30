import React, { useState } from 'react';
import styles from '../styles/MyPage.module.css';
import UserInfo from '../components/MyPage/UserInfo';
import SolvedProblems from '../components/MyPage/SolvedProblems';
import WrongAnswers from '../components/MyPage/WrongAnswers';
import MyComments from '../components/MyPage/MyComments';
import SideBar from '../components/MyPage/SideBar';

function MyPage() {
    const [activeTab, setActiveTab] = useState('solved');

    const renderContent = () => {
        switch (activeTab) {
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
                <SideBar activeTab={activeTab} onTabChange={setActiveTab} />
                <main className={styles.mainContent}>
                    <UserInfo />
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default MyPage;
