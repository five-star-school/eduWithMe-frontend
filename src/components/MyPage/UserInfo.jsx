import React, { useState } from 'react';
import styles from '../../styles/UserInfo.module.css';
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from '../../util/axiosConfig';

function UserInfo({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [nickName, setNickName] = useState(user.nickName);
    const [email] = useState(user.email); // 이메일은 수정할 수 없으므로 상태에 저장만 합니다.
    const [isUploading, setIsUploading] = useState(false); // 파일 업로드 상태
    const [profileImageUrl, setProfileImageUrl] = useState(user.photoUrl); // 프로필 이미지 URL 상태
    const [nicknameError, setNicknameError] = useState('');

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
                email, // 이메일은 수정하지 않습니다.
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
        setIsUploading(!isUploading); // 업로드 상태를 토글하여 input 태그를 표시하거나 숨김
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
                    const newPhotoUrl = response.data.photoUrl; // 서버에서 반환된 새 이미지 URL을 가져옵니다.
                    setProfileImageUrl(newPhotoUrl); // 상태 업데이트로 새 이미지 URL 설정
                    alert('프로필 사진이 성공적으로 업로드되었습니다.');
                    setIsUploading(false); // 업로드가 완료된 후 파일 선택 창 숨기기
                } else {
                    throw new Error('프로필 사진 업로드에 실패했습니다.');
                }
            } catch (error) {
                console.error('프로필 사진 업로드 오류:', error);
                alert('프로필 사진 업로드 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className={styles.userInfo}>
            <div className={styles.profileImage}>
                {profileImageUrl ? (
                    <img src={profileImageUrl} alt="Profile Image" />
                ) : (
                    <IoPersonCircleOutline size={100} className={styles.defaultIcon} />
                )}
                <button className={styles.editButton} onClick={handleImageUpload}>프로필 사진 수정</button>
                {isUploading && (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                        style={{ display: 'none' }} // 기본적으로 숨김 처리
                        ref={input => input && isUploading && input.click()} // 업로드 버튼 클릭 시 자동 클릭
                    />
                )}
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
                    <input type="text" value={user.ranking} readOnly />
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
