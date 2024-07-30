import React from 'react';
import styles from '../../styles/MyPage.module.css';

function SideBar({ activeTab, onTabChange }) {
    return (
        <aside className={styles.sidebar}>
            <button
                className={`${styles.sidebarButton} ${activeTab === 'solved' ? styles.active : ''}`}
                onClick={() => onTabChange('solved')}
            >
                해결한 문제
            </button>
            <button
                className={`${styles.sidebarButton} ${activeTab === 'wrong' ? styles.active : ''}`}
                onClick={() => onTabChange('wrong')}
            >
                오답 문제
            </button>
            <button
                className={`${styles.sidebarButton} ${activeTab === 'comments' ? styles.active : ''}`}
                onClick={() => onTabChange('comments')}
            >
                작성한 댓글
            </button>
        </aside>
    );
}

export default SideBar;
