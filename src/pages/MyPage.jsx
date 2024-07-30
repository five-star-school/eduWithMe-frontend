import React, { useState, useEffect } from 'react';
import styles from '../styles/MyPage.module.css';
import UserInfo from '../components/MyPage/UserInfo';
import SolvedProblems from '../components/MyPage/SolvedProblems';
import WrongAnswers from '../components/MyPage/WrongAnswers';
import MyComments from '../components/MyPage/MyComments';
import SideBar from '../components/MyPage/SideBar';
import axios from '../util/axiosConfig';

function MyPage() {
    const [activeTab, setActiveTab] = useState('solved');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // 쿠키에서 AccessToken 가져오기
                const token = document.cookie.split('; ').find(row => row.startsWith('AccessToken='))?.split('=')[1];
                console.log('AccessToken:', token);  // 디버깅용 로그

                if (!token) {
                    throw new Error('AccessToken이 없습니다.');
                }

                // API 요청
                const response = await axios.get('/profiles', {
                    headers: {
                        'AccessToken': token  // Authorization 헤더 대신 AccessToken 헤더를 사용
                    }
                });

                console.log('Response:', response);  // 디버깅용 로그

                if (response.status === 200 && response.data.data) {
                    setUser(response.data.data);
                } else {
                    throw new Error(response.data.message || '프로필 조회에 실패했습니다.');
                }
            } catch (error) {
                console.error('프로필 조회 오류:', error);
                setError(error.message || '알 수 없는 오류가 발생했습니다.');

                if (error.response) {
                    console.error('Error status:', error.response.status);
                    console.error('Error data:', JSON.stringify(error.response.data, null, 2));
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error details:', error.message);
                }
            }
        };

        fetchUserProfile();
    }, []);

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

    if (error) {
        return <div className={styles.error}>에러: {error}</div>;
    }

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
                    {user ? <UserInfo user={user} /> : <p>로딩 중...</p>}
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default MyPage;
