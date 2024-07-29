import React from 'react';
import styles from '../styles/UserInfo.module.css';

function UserInfo() {
    return (
        <div className={styles.userInfo}>
            <div className={styles.profileImage}>
                <img src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F9139b68e-0a04-4416-b7e6-1480001f5540%2Fimage.png?table=block&id=0c0d1673-70ab-43f0-b76f-ac34a4c492be&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=250&userId=4d4e9390-7be2-4339-ad86-2bb5b349b5fb&cache=v2" alt="User Avatar" />
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