// src/components/MyPage/UserInfo.jsx
import React from 'react';
import styles from '../../styles/UserInfo.module.css';

function UserInfo({ user }) {
    // 기본 프로필 사진 URL
    const defaultPhotoUrl = 'https://cdn-icons-png.flaticon.com/256/4703/4703650.png';

    // photoUrl이 null일 경우 기본 프로필 사진 URL을 사용
    const profilePhotoUrl = user.photoUrl || defaultPhotoUrl;

    return (
        <div className={styles.userInfo}>
            <div className={styles.profileImage}>
                <img src={profilePhotoUrl} alt="Profile Image" />
                <button className={styles.editButton}>프로필 사진 편집</button>
            </div>
            <div className={styles.userDetails}>
                <div className={styles.detailRow}>
                    <span className={styles.label}>이메일</span>
                    <input type="text" value={user.email} readOnly />
                    <span className={styles.label}>랭크</span>
                    <input type="text" value={user.ranking} readOnly />
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>닉네임</span>
                    <input type="text" value={user.nickName} readOnly />
                    <span className={styles.label}>포인트</span>
                    <input type="text" value={user.points} readOnly />
                </div>
            </div>
        </div>
    );
}

export default UserInfo; // default export로 변경
