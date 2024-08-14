import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../util/axiosConfig";
import { getCookie } from '../util/cookie';
import styles from '../styles/RoomMainPage.module.css';

function RoomMain() {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const { roomId } = useParams();
    const navigate = useNavigate();
    const questionsPerPage = 10;

    useEffect(() => {
        const token = getCookie('AccessToken');
        if (token === null) {
            navigate('/login');
        } else {
            fetchQuestions();
        }
    }, [roomId, page, navigate]);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/rooms/${roomId}/question`, {
                params: {
                    page: page,
                    size: questionsPerPage,
                }
            });
            if (response.data && response.data.data) {
                const questionsData = response.data.data.content || [];
                // 문제 번호(orderInRoom)를 기준으로 내림차순 정렬
                const sortedQuestions = questionsData.sort((a, b) => b.orderInRoom - a.orderInRoom);
                setQuestions(sortedQuestions);
                setTotalPages(response.data.data.totalPages);
            } else {
                console.error('Unexpected data format:', response.data);
                setQuestions([]);
            }
        } catch (error) {
            setQuestions([]);
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `/api/search/rooms/${roomId}/question/title`,
                {
                    params: {
                        keyword: searchKeyword,
                        page: 0,
                        size: questionsPerPage,
                    },
                }
            );

            if (response.data && Array.isArray(response.data.data)) {
                // 검색 결과도 문제 번호(orderInRoom)를 기준으로 내림차순 정렬
                const sortedQuestions = response.data.data.sort((a, b) => b.orderInRoom - a.orderInRoom);
                setQuestions(sortedQuestions);
                setTotalPages(response.data.totalPages || 1);
                setPage(0);
            } else {
                console.error('Unexpected search data format:', response.data);
                setQuestions([]);
            }
        } catch (error) {
            console.error('Failed to search questions:', error);
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleQuestionClick = (questionId) => {
        navigate(`/room/${roomId}/question/${questionId}`);
    };

    return (
        <div className={styles.roomMainPage}>
            <div className={styles.mainContent}>
                <div className={styles.roomContent}>
                    <div className={styles.contentHeader}>
                        <div className={styles.searchContainer}>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="검색어 ( 제목 )"
                                value={searchKeyword}
                                onChange={handleSearchInputChange}
                            />
                            <button className={styles.searchButton} onClick={handleSearch}>검색</button>
                        </div>
                    </div>
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : (
                        <>
                            <table className={styles.problemTable}>
                                <thead>
                                <tr>
                                    <th>문제 번호</th>
                                    <th>카테고리</th>
                                    <th>문제 제목</th>
                                    <th>난이도</th>
                                    <th>출제일</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(questions) && questions.length > 0 ? (
                                    questions.map((question) => (
                                        <tr key={question.questionId}
                                            onClick={() => handleQuestionClick(question.questionId)}
                                            style={{cursor: 'pointer'}}>
                                            <td>{question.orderInRoom}</td>
                                            <td>{question.category}</td>
                                            <td>{question.title}</td>
                                            <td>{question.difficulty}</td>
                                            <td>{question.formattedCreatedAt || 'N/A'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">결과가 없습니다.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            {totalPages > 1 && (
                                <div className={styles.pagination}>
                                    <button
                                        disabled={page === 0}
                                        onClick={() => setPage(prev => Math.max(0, prev - 1))}
                                    >
                                        이전
                                    </button>
                                    <span>{page + 1} / {totalPages}</span>
                                    <button
                                        disabled={page >= totalPages - 1}
                                        onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
                                    >
                                        다음
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomMain;