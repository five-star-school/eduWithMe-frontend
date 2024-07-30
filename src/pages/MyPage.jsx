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

    // 문제 목록 관련 상태
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('AccessToken='))?.split('=')[1];

                if (!token) {
                    throw new Error('AccessToken이 없습니다.');
                }

                const response = await axios.get('/profiles', {
                    headers: {
                        'AccessToken': token
                    }
                });

                if (response.status === 200 && response.data.data) {
                    setUser(response.data.data);
                } else {
                    throw new Error(response.data.message || '프로필 조회에 실패했습니다.');
                }
            } catch (error) {
                console.error('프로필 조회 오류:', error);
                setError(error.message || '알 수 없는 오류가 발생했습니다.');
            }
        };

        const fetchSolvedProblems = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/profiles/solve?page=${page}&size=5`, {
                    headers: {
                        'AccessToken': document.cookie.split('; ').find(row => row.startsWith('AccessToken='))?.split('=')[1]
                    }
                });

                if (response.status === 200) {
                    setSolvedProblems(response.data.data.content);
                    setTotalPages(response.data.data.totalPages);
                    console.table(response.data.data.content);
                } else {
                    throw new Error('문제 목록 조회에 실패했습니다.');
                }
            } catch (error) {
                console.error('문제 목록 조회 오류:', error);
                setError(error.message || '알 수 없는 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        const fetchWrongAnswers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/profiles/wrong?page=${page}&size=5`, {
                    headers: {
                        'AccessToken': document.cookie.split('; ').find(row => row.startsWith('AccessToken='))?.split('=')[1]
                    }
                });

                if (response.status === 200) {
                    setWrongAnswers(response.data.data.content);
                    setTotalPages(response.data.data.totalPages);
                    console.table(response.data.data.content);
                } else {
                    throw new Error('오답 문제 목록 조회에 실패했습니다.');
                }
            } catch (error) {
                console.error('오답 문제 목록 조회 오류:', error);
                setError(error.message || '알 수 없는 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();

        if (activeTab === 'solved') {
            fetchSolvedProblems();
        } else if (activeTab === 'wrong') {
            fetchWrongAnswers();
        }
    }, [page, activeTab]);

    const renderContent = () => {
        switch (activeTab) {
            case 'solved':
                return <SolvedProblems problems={solvedProblems} />;
            case 'wrong':
                return <WrongAnswers problems={wrongAnswers} />;
            case 'comments':
                return <MyComments />;
            default:
                return <SolvedProblems problems={solvedProblems} />;
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
                    {loading ? <p>로딩 중...</p> : renderContent()}
                    {(solvedProblems.length > 0 || wrongAnswers.length > 0) && totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                disabled={page === 0}
                                onClick={() => setPage(page - 1)}
                            >
                                이전
                            </button>
                            <span>{page + 1} / {totalPages}</span>
                            <button
                                disabled={page >= totalPages - 1}
                                onClick={() => setPage(page + 1)}
                            >
                                다음
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default MyPage;
