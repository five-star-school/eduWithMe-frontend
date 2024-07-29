import React from 'react';
import styles from '../styles/SidebarComponent.module.css';

function SidebarComponent() {
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.roomTitle}>수학 뽀개기</h2>
            <ul className={styles.memberList}>
                <li className={styles.roomOwner}>홍수학 <span className={styles.ownerTag}>선생님</span></li>
                <li className={styles.student}>홍준빈 <span className={styles.studentTag}>학생</span></li>
                <li className={styles.student}>이세원 <span className={styles.studentTag}>학생</span></li>
                <li className={styles.student}>이지우 <span className={styles.studentTag}>학생</span></li>
                <li className={styles.student}>신성훈 <span className={styles.studentTag}>학생</span></li>
            </ul>
        </aside>
    );
}

export default SidebarComponent;