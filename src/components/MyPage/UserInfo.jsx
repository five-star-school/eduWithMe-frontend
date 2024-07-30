import React from 'react';
import styles from '../../styles/UserInfo.module.css';
import { IoPersonCircleOutline } from "react-icons/io5";

function UserInfo({ user }) {

    const profilePhotoUrl = user.photoUrl;

    return (
        <div className={styles.userInfo}>
            <div className={styles.profileImage}>
                {user.photoUrl ? (
                    <img src={profilePhotoUrl} alt="Profile Image" />
                ) : (
                    <IoPersonCircleOutline size={100} className={styles.defaultIcon} />
                )}
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
