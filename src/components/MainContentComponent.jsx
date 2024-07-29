import React from 'react';
import styles from '../styles/MainContentComponent.module.css';

function MainContentComponent() {
    return (
        <main className={styles.mainContent}>
            {/* 여기에 선택된 메뉴에 따른 콘텐츠를 표시합니다 */}
            <p>선택된 기능의 내용이 여기에 표시됩니다.</p>
        </main>
    );
}

export default MainContentComponent;