import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../util/axiosConfig";
import { getCookie } from '../util/cookie';
import styles from '../styles/RoomMainPage.module.css';
import { format } from 'date-fns';

function RoomMain() {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const { roomId } = useParams();
    const navigate = useNavigate();

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
            const response = await axios.get(`/rooms/${roomId}/question?page=${page}`);
            console.log('API Response:', response.data);
            if (response.data && response.data.data) {
                // Sort questions by their id
                const sortedQuestions = response.data.data.sort((a, b) => a.questionId - b.questionId);
                setQuestions(sortedQuestions);
            }
        } catch (error) {
            console.error('Failed to fetch questions:', error);
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/search/rooms/${roomId}/question/title?keyword=${encodeURIComponent(searchKeyword)}&page=0`);
            if (response.data && response.data.data) {
                setQuestions(response.data.data);
            }
        } catch (error) {
            console.error('Failed to search questions:', error);
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
                        {questions.map((question) => (
                            <tr key={question.questionId} onClick={() => handleQuestionClick(question.questionId)} style={{cursor: 'pointer'}}>
                                <td>{question.questionId}</td>
                                <td>{question.category}</td>
                                <td>{question.title}</td>
                                <td>{question.difficulty}</td>
                                <td>{question.updatedAt ? formatDate(question.updatedAt) : 'N/A'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RoomMain;