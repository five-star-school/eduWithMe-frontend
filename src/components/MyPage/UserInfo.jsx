import React from 'react';
import styles from '../../styles/UserInfo.module.css';

function UserInfo() {
    return (
        <div className={styles.userInfo}>
            <div className={styles.profileImage}>
                <img src="" alt="User Avatar" />
                <button className={styles.editButton}>프로필 사진 편집</button>
            </div>
            <div className={styles.userDetails}>
                <div className={styles.detailRow}>
                    <span className={styles.label}>이메일</span>
                    <input type="text" value="user@example.com" readOnly />
                    <span className={styles.label}>랭크</span>
                    <input type="text" value="골드" readOnly />
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>닉네임</span>
                    <input type="text" value="유저네임" readOnly />
                    <span className={styles.label}>포인트</span>
                    <input type="text" value="1000" readOnly />
                </div>
            </div>
        </div>
    );
}

export default UserInfo;