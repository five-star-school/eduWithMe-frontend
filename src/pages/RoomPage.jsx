import React from 'react';
import SidebarComponent from '../components/SidebarComponent';
import HeaderNavComponent from '../components/HeaderNavComponent';
import MainContentComponent from '../components/MainContentComponent';
import styles from '../styles/RoomPage.module.css';

function RoomPage() {
    return (
        <div className={styles.roomPage}>
            <div className={styles.roomContent}>
                <SidebarComponent />
                <div className={styles.mainArea}>
                    <HeaderNavComponent />
                    <MainContentComponent />
                </div>
            </div>
        </div>
    );
}

export default RoomPage;