import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MyPage.module.css';
import UserInfo from '../components/MyPage/UserInfo';
import SolvedProblems from '../components/MyPage/SolvedAnswers';
import WrongAnswers from '../components/MyPage/WrongAnswers';
import MyComments from '../components/MyPage/MyComments';
import SideBar from '../components/MyPage/SideBar';
import axios from '../util/axiosConfig';

function MyPage() {
    const [activeTab, setActiveTab] = useState('solved');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [solvedProblems, setSolvedProblems] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async (url, setData, setError, setLoading, setTotalPages) => {
        try {
            setLoading(true);
            const response = await axios.get(url, {
                headers: {
                    'AccessToken': document.cookie.split('; ').find(row => row.startsWith('AccessToken='))?.split('=')[1]
                }
            });

            if (response.status === 200) {
                setData(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
                console.table(response.data.data.content);
            } else {
                throw new Error('데이터 조회에 실패했습니다.');
            }
        } catch (error) {
            console.error('데이터 조회 오류:', error);
            setError(error.message || '알 수 없는 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

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

        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (activeTab === 'solved') {
            fetchData(`/profiles/solve?page=${page}&size=5`, setSolvedProblems, setError, setLoading, setTotalPages);
        } else if (activeTab === 'wrong') {
            fetchData(`/profiles/wrong?page=${page}&size=5`, setWrongAnswers, setError, setLoading, setTotalPages);
        } else if (activeTab === 'comments') {
            fetchData(`/profiles/comments?page=${page}&size=5`, setMyComments, setError, setLoading, setTotalPages);
        }
    }, [activeTab, page]);

    const renderContent = () => {
        switch (activeTab) {
            case 'solved':
                return <SolvedProblems problems={solvedProblems} />;
            case 'wrong':
                return <WrongAnswers problems={wrongAnswers} />;
            case 'comments':
                return <MyComments comments={myComments} />;
            default:
                return <SolvedProblems problems={solvedProblems} />;
        }
    };

    const handleChangePassword = () => {
        navigate('/changepassword');
    };

    const handleMyRoomClick = () => {
        navigate('/myroom');
    };

    if (error) {
        return <div className={styles.error}>에러: {error}</div>;
    }

    return (
        <div className={styles.myPage}>
            <header className={styles.header}>
                <h1 className={styles.title}>마이페이지</h1>
                <div className={styles.headerButtons}>
                    <button className={styles.headerButton} onClick={handleMyRoomClick}>마이룸</button>
                    <button className={styles.headerButton} onClick={handleChangePassword}>비밀번호 변경</button>
                </div>
            </header>
            <div className={styles.content}>
                <SideBar activeTab={activeTab} onTabChange={setActiveTab} />
                <main className={styles.mainContent}>
                    {user ? <UserInfo user={user} /> : <p>로딩 중...</p>}
                    {loading ? <p>로딩 중...</p> : renderContent()}
                    {(solvedProblems.length > 0 || wrongAnswers.length > 0 || myComments.length > 0) && totalPages > 1 && (
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