import React from 'react';
import styles from '../styles/HeaderNavComponent.module.css';

function HeaderNavComponent() {
    return (
        <nav className={styles.headerNav}>
            <button className={styles.navButton}>문제 목록</button>
            <button className={styles.navButton}>AI 아바 만들 예정</button>
            <button className={styles.navButton}>관리자 페이지</button>
        </nav>
    );
}

export default HeaderNavComponent;