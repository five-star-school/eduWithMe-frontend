import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SidebarComponent from '../components/SidebarComponent';
import axios from "../util/axiosConfig";
import { getCookie } from '../util/cookie';
import styles from '../styles/ManageMainPage.module.css';
import ManageMainHeaderNav from "../components/Manage/ManageMainHeaderNav";

function ManageMainPage() {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [roomName, setRoomName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const { roomId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const questionsPerPage = 10;
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');

    useEffect(() => {
        const token = getCookie('AccessToken');
        if (token === null) {
            navigate('/login');
        } else {
            fetchRoomInfo();
            fetchQuestions();
        }
    }, [roomId, page, sortField, sortDirection]);

    const fetchRoomInfo = async () => {
        try {
            const response = await axios.get(`/api/rooms/one/${roomId}`);
            if (response.data && response.data.data) {
                const roomData = response.data.data;
                setRoomName(roomData.roomName);
                setIsPrivate(roomData.roomPassword !== null && roomData.roomPassword !== '');
                const currentUserId = parseInt(getCookie('userId'), 10);
                setIsManager(roomData.managerUserId === currentUserId);
            }
        } catch (error) {
            console.error('Failed to fetch room info:', error);
        }
    };

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const params = {
                page: page,
                size: questionsPerPage,
                sort: `${sortField},${sortDirection}`
            };
            const response = await axios.get(`/api/rooms/${roomId}/question`, { params });
            
            console.table(response.data.data.content);

            if (response.data && response.data.data && response.data.data.content) {
                const questionsData = response.data.data.content;
                setQuestions(questionsData);
                setTotalPages(response.data.data.totalPages);
            } else {
                setQuestions([]);
            }
        } catch (error) {
            console.error('Failed to fetch questions:', error);
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
            const response = await axios.get(`/api/search/rooms/${roomId}/question/title`, {
                params: {
                    keyword: searchKeyword,
                    page: 0,
                    size: questionsPerPage,
                }
            });

            console.table(response.data.data);

            if (response.data && Array.isArray(response.data.data)) {
                setQuestions(response.data.data);
                setTotalPages(Math.ceil(response.data.data.length / questionsPerPage));
                setPage(0);
            } else {
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd HH:mm');
    };

    const handleQuestionClick = (questionId) => {
        navigate(`/room/${roomId}/question/${questionId}/manageRead`);
    };

    const handleCreateClick = () => {
        navigate(`/room/${roomId}/manageCreate`);
    };

    const handleQuestionListClick = () => {
        if (location.pathname.includes('/question/')) {
            navigate(`/room/${roomId}/manageMain`);
        } else {
            window.location.reload();
        }
    };

    const handleSortByDate = () => {
        setSortField('createdAt');
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        setPage(0);
    };

    const handleSortByDifficulty = () => {
        setSortField('difficulty');
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        setPage(0);
    };

    const sortedQuestions = useMemo(() => {
        return [...questions].sort((a, b) => {
            if (sortField === 'createdAt') {
                return sortDirection === 'asc'
                    ? a.formattedCreatedAt.localeCompare(b.formattedCreatedAt)
                    : b.formattedCreatedAt.localeCompare(a.formattedCreatedAt);
            } else if (sortField === 'difficulty') {
                return sortDirection === 'asc'
                    ? a.difficulty.localeCompare(b.difficulty)
                    : b.difficulty.localeCompare(a.difficulty);
            }
            return 0;
        });
    }, [questions, sortField, sortDirection]);

    return (
        <div className={styles.managePage}>
            <SidebarComponent />
            <div className={styles.mainContent}>
                <ManageMainHeaderNav
                    roomId={roomId}
                    roomName={roomName}
                    roomIsPrivate={isPrivate}
                    onQuestionListClick={handleQuestionListClick}
                    isManager={isManager}
                />
                {isManager ? (
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
                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.filterButton}
                                    onClick={handleSortByDifficulty}
                                >
                                    난이도 {sortField === 'difficulty' && (sortDirection === 'asc' ? '(쉬운 순)' : '(어려운 순)')}
                                </button>
                                <button
                                    className={styles.filterButton}
                                    onClick={handleSortByDate}
                                >
                                    출제일 {sortField === 'createdAt' && (sortDirection === 'asc' ? '(오래된 순)' : '(최신 순)')}
                                </button>
                                <button className={styles.createButton} onClick={handleCreateClick}>생성</button>
                            </div>
                        </div>
                        {loading ? (
                            <p>로딩 중...</p>
                        ) : (
                            sortedQuestions.length > 0 ? (
                                <table className={styles.problemTable}>
                                    <thead>
                                    <tr>
                                        <th>문제 번호</th>
                                        <th>카테고리</th>
                                        <th>문제 제목</th>
                                        <th>난이도</th>
                                        <th>출제일</th>
                                        <th>수정일</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {sortedQuestions.map((question) => (
                                            <tr key={question.questionId}
                                                onClick={() => handleQuestionClick(question.questionId)}
                                                style={{cursor: 'pointer'}}>
                                                <td>{question.orderInRoom}</td>
                                                <td>{question.category}</td>
                                                <td>{question.title}</td>
                                                <td>{question.difficulty}</td>
                                                <td>{question.formattedCreatedAt || 'N/A'}</td>
                                                <td>{question.formattedUpdatedAt || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>검색 결과가 없습니다.</p>
                            )
                        )}
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
                    </div>
                ) : (
                    <div className={styles.studentContent}>
                        <p>이 페이지에 대한 접근 권한이 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageMainPage;