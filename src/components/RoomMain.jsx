import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../util/axiosConfig";
import { getCookie } from '../util/cookie';
import styles from '../styles/RoomMainPage.module.css';
import { format } from 'date-fns';

function RoomMain() {
    const [questions, setQuestions] = useState([]); // 초기 상태를 빈 배열로 설정
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
            const response = await axios.get(`/rooms/${roomId}/question`, {
                params: {
                    page: page,
                    size: questionsPerPage,
                }
            });
            console.log('API Response:', response.data); // 응답 데이터 확인
            if (response.data && response.data.data) {
                const questionsData = response.data.data.content || []; // 응답 데이터가 없을 경우 빈 배열로 설정
                setQuestions(questionsData);

                // Update total pages based on API response
                setTotalPages(response.data.data.totalPages);
            } else {
                console.error('Unexpected data format:', response.data);
                setQuestions([]); // 예상치 못한 데이터 형식인 경우 빈 배열로 설정
            }
        } catch (error) {
            console.error('Failed to fetch questions:', error);
            setQuestions([]); // 오류 발생 시 빈 배열로 설정
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
            // URL에 쿼리 매개변수 직접 포함
            const response = await axios.get(
                `/search/rooms/${roomId}/question/title`,
                {
                    params: {
                        keyword: searchKeyword,
                        page: 0,
                        size: questionsPerPage,
                    },
                }
            );

            console.log('Search API Response:', response.data); // 검색 응답 데이터 확인

            if (response.data && Array.isArray(response.data.data)) {
                setQuestions(response.data.data);  // 응답 데이터의 배열 설정
                setTotalPages(response.data.totalPages || 1);
                setPage(0); // 검색 후 페이지를 첫 페이지로 초기화
            } else {
                console.error('Unexpected search data format:', response.data);
                setQuestions([]); // 예상치 못한 데이터 형식인 경우 빈 배열로 설정
            }
        } catch (error) {
            console.error('Failed to search questions:', error);
            setQuestions([]); // 오류 발생 시 빈 배열로 설정
        } finally {
            setLoading(false);
        }
    };


    const handleSearchInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd HH:mm');
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
                                            <tr key={question.questionId} onClick={() => handleQuestionClick(question.questionId)} style={{ cursor: 'pointer' }}>
                                                <td>{question.questionId}</td>
                                                <td>{question.category}</td>
                                                <td>{question.title}</td>
                                                <td>{question.difficulty}</td>
                                                <td>{question.updatedAt ? formatDate(question.updatedAt) : 'N/A'}</td>
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
