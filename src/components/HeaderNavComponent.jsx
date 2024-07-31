import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styles from '../styles/HeaderNavComponent.module.css';

function HeaderNavComponent() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const location = useLocation();

    const handleQuestionListClick = () => {
        if (location.pathname.includes('/question/')) {
            // QuestionDetailPage에서 RoomMainPage로 이동
            navigate(`/room/${roomId}`);
        } else {
            // RoomMainPage에서 새로고침
            window.location.reload();
        }
    };

    return (
        <nav className={styles.headerNav}>
            <button className={styles.navButton} onClick={handleQuestionListClick}>문제 목록</button>
            <button className={styles.navButton}>AI 아바 만들 예정</button>
            <button className={styles.navButton}>관리자 페이지</button>
        </nav>
    );
}

export default HeaderNavComponent;