// src/components/RoomLayout.jsx
import React from 'react';
import SidebarComponent from './SidebarComponent';
import HeaderNavComponent from './HeaderNavComponent';
import styles from '../styles/RoomLayout.module.css';

function RoomLayout({ children }) {
    return (
        <div className={styles.roomLayout}>
            <SidebarComponent />
            <div className={styles.mainContent}>
                <HeaderNavComponent />
                <div className={styles.pageContent}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default RoomLayout;