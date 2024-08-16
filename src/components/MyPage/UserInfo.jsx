import React, { useState, useRef } from 'react';
import styles from '../../styles/UserInfo.module.css';
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import axios from '../../util/axiosConfig';

function UserInfo({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [nickName, setNickName] = useState(user.nickName);
    const [email] = useState(user.email);
    const [profileImageUrl, setProfileImageUrl] = useState(user.photoUrl);
    const [nicknameError, setNicknameError] = useState('');
    const [showTooltip, setShowTooltip] = useState(false); // Tooltip 표시 상태
    const fileInputRef = useRef(null);

    // 각 랭크에 대한 포인트 범위 정의
    const rankThresholds = [
        { rank: 'F', minPoints: 0, maxPoints: 50 },
        { rank: 'D', minPoints: 51, maxPoints: 100 },
        { rank: 'C', minPoints: 101, maxPoints: 150 },
        { rank: 'B', minPoints: 151, maxPoints: 200 },
        { rank: 'A', minPoints: 201, maxPoints: Infinity }
    ];

    // 현재 포인트와 다음 랭크를 계산
    const getNextRankInfo = (currentPoints) => {
        for (let i = 0; i < rankThresholds.length - 1; i++) {
            const currentRank = rankThresholds[i];
            const nextRank = rankThresholds[i + 1];
            if (currentPoints >= currentRank.minPoints && currentPoints <= currentRank.maxPoints) {
                const pointsNeeded = nextRank.minPoints - currentPoints;
                return {
                    nextRank: nextRank.rank,
                    pointsNeeded: pointsNeeded > 0 ? pointsNeeded : 0
                };
            }
        }
        return {
            nextRank: null,
            pointsNeeded: 0
        };
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setNicknameError('');
    };

    const checkNicknameAvailability = async (newNickname) => {
        if (newNickname === user.nickName) {
            return true;
        }
        try {
            const response = await axios.get(`/api/users/check-nickname?nickname=${newNickname}`);
            return response.data.available;
        } catch (error) {
            console.error('닉네임 확인 중 오류 발생:', error);
            return false;
        }
    };

    const handleSaveClick = async () => {
        setNicknameError('');

        if (nickName === user.nickName) {
            setIsEditing(false);
            return;
        }

        const isAvailable = await checkNicknameAvailability(nickName);
        if (!isAvailable) {
            setNicknameError('이미 사용 중인 닉네임입니다.');
            return;
        }

        try {
            const response = await axios.put('/api/profiles', {
                email,
                nickName
            });

            if (response.status === 200) {
                alert('프로필이 성공적으로 저장되었습니다.');
                setIsEditing(false);
                window.location.reload(); // 저장 후 페이지 새로고침
            } else {
                throw new Error('프로필 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('프로필 저장 오류:', error);
            alert('프로필 저장 중 오류가 발생했습니다.');
        }
    };

    const handleImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('/api/profiles/photo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {
                    const newPhotoUrl = response.data.photoUrl;
                    setProfileImageUrl(newPhotoUrl);
                    alert('프로필 사진이 성공적으로 업로드되었습니다.');
                } else {
                    throw new Error('프로필 사진 업로드에 실패했습니다.');
                }
            } catch (error) {
                console.error('프로필 사진 업로드 오류:', error);
                alert('프로필 사진 업로드 중 오류가 발생했습니다.');
            }
        }
    };

    const handleIconClick = () => {
        setShowTooltip(prevState => !prevState); // Tooltip 토글
    };

    const handleCloseTooltip = () => {
        setShowTooltip(false); // Tooltip 숨기기
    };

    const { nextRank, pointsNeeded } = getNextRankInfo(user.points);

    return (
        <div className={styles.userInfo}>
            <div className={styles.profileImage}>
                {profileImageUrl ? (
                    <img src={profileImageUrl} alt="Profile Image" />
                ) : (
                    <IoPersonCircleOutline size={100} className={styles.defaultIcon} />
                )}
                <button className={styles.editButton} onClick={handleImageUpload}>프로필 사진 수정</button>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                />
            </div>
            <div className={`${styles.userDetails} ${isEditing ? styles.editing : ''}`}>
                <div className={styles.detailRow}>
                    <span className={styles.label}>이메일</span>
                    <input
                        type="text"
                        value={email}
                        readOnly
                    />
                    <span className={styles.label}>랭크</span>
                    <div className={styles.rankContainer}>
                        <div className={styles.inputContainer}>
                            <input type="text" value={user.ranking} readOnly />
                            <IoIosInformationCircleOutline
                                className={styles.infoIcon}
                                onClick={handleIconClick}
                            />
                            {showTooltip && (
                                <div className={`${styles.tooltip} ${styles.showTooltip}`}>
                                    <button className={styles.closeButton} onClick={handleCloseTooltip}>
                                        &times;
                                    </button>
                                    <p>랭크 F: 50포인트 이하</p>
                                    <p>랭크 D: 51~100포인트</p>
                                    <p>랭크 C: 101~150포인트</p>
                                    <p>랭크 B: 151~200포인트</p>
                                    <p>랭크 A: 201포인트 이상</p>
                                    {nextRank && pointsNeeded > 0 && (
                                        <p>다음 랭크 {nextRank}로 올라가려면 {pointsNeeded}포인트 더 필요합니다.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>닉네임</span>
                    <input
                        type="text"
                        value={nickName}
                        onChange={(e) => {
                            setNickName(e.target.value);
                            setNicknameError('');
                        }}
                        readOnly={!isEditing}
                    />
                    <span className={styles.label}>포인트</span>
                    <input type="text" value={user.points} readOnly />
                </div>
                {nicknameError && <p className={styles.errorMessage}>{nicknameError}</p>}
                <div className={styles.buttonRow}>
                    {isEditing ? (
                        <button className={styles.profileSaveButton} onClick={handleSaveClick}>
                            닉네임 저장
                        </button>
                    ) : (
                        <button className={styles.profileEditButton} onClick={handleEditClick}>
                            닉네임 수정
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
