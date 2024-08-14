import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styles from '../styles/HeaderNavComponent.module.css';

function HeaderNavComponent({ isRoomManager, roomName, isPrivate }) {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const location = useLocation();

    const handleQuestionListClick = () => {
        if (location.pathname.includes('/question/')) {
            navigate(`/room/${roomId}`);
        } else {
            window.location.reload();
        }
    };

    const handleAdminPageClick = () => {
        navigate(`/room/${roomId}/manageMain`);
    };

    return (
        <nav className={styles.headerNav}>
            <span className={`${styles.visibilityIndicator} ${isPrivate ? styles.private : styles.public}`}>
                {isPrivate ? 'Private' : 'Public'}
            </span>
            <div className={styles.navButtons}>
                <button className={styles.navButton} onClick={handleQuestionListClick}>문제 목록</button>
                {/* <button className={styles.navButton}>AI 만들 예정</button> */}
                {isRoomManager && (
                    <button className={styles.navButton} onClick={handleAdminPageClick}>관리자 페이지</button>
                )}
            </div>
        </nav>
    );
}

export default HeaderNavComponent;