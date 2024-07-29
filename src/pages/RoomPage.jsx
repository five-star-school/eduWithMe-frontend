// src/pages/RoomPage.jsx
import React from 'react';
import RoomLayout from '../components/RoomLayout';
import styles from '../styles/RoomPage.module.css';

function RoomPage() {
    return (
        <RoomLayout>
            <div className={styles.roomPageContent}>
                {/* RoomPage의 고유한 내용 */}
            </div>
        </RoomLayout>
    );
}

export default RoomPage;