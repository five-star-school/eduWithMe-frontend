import React, { useState } from 'react';
import styles from '../../styles/UserInfo.module.css';
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from '../../util/axiosConfig';

function UserInfo({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [nickName, setNickName] = useState(user.nickName);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put('/profiles', {
                email,
                nickName
            });

            if (response.status === 200) {
                alert('프로필이 성공적으로 저장되었습니다.');
                setIsEditing(false);
            } else {
                throw new Error('프로필 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('프로필 저장 오류:', error);
            alert('프로필 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.userInfo}>
            <div className={styles.profileImage}>
                {user.photoUrl ? (
                    <img src={user.photoUrl} alt="Profile Image" />
                ) : (
                    <IoPersonCircleOutline size={100} className={styles.defaultIcon} />
                )}
                <button className={styles.editButton}>프로필 사진 편집</button>
            </div>
            <div className={styles.userDetails}>
                <div className={styles.detailRow}>
                    <span className={styles.label}>이메일</span>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={!isEditing}
                    />
                    <span className={styles.label}>랭크</span>
                    <input type="text" value={user.ranking} readOnly />
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>닉네임</span>
                    <input
                        type="text"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                        readOnly={!isEditing}
                    />
                    <span className={styles.label}>포인트</span>
                    <input type="text" value={user.points} readOnly />
                </div>
                <div className={styles.buttonRow}>
                    {isEditing ? (
                        <button className={styles.profileSaveButton} onClick={handleSaveClick}>
                            프로필 저장
                        </button>
                    ) : (
                        <button className={styles.profileEditButton} onClick={handleEditClick}>
                            프로필 수정
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
