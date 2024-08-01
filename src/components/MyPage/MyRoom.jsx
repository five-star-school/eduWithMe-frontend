import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/SpaceCard.module.css';
import axios from "../../util/axiosConfig";

// 모달 컴포넌트
function Modal({ modalOpen, setModalOpen, selectedSpace }) {
    const [enteredPassword, setEnteredPassword] = useState('');
    const modalBackground = useRef();
    const navigate = useNavigate();

    const handleEnterSpace = async () => {
        if (selectedSpace) {
            try {
                if (selectedSpace.roomPassword) {
                    if (!enteredPassword.trim()) {
                        alert('비밀번호를 입력해야 합니다.');
                        return;
                    }
                    await axios.post(`/rooms/${selectedSpace.roomId}/private`, {
                        roomPassword: enteredPassword,
                    });
                } else {
                    await axios.post(`/rooms/${selectedSpace.roomId}/public`);
                }
                alert('방에 성공적으로 입장했습니다.');
                setModalOpen(false);
                navigate(`/room/${selectedSpace.roomId}`);
            } catch (error) {
                const errorMessage = error.response?.data?.msg || '방 입장에 실패했습니다.';
                console.error('방 입장 실패:', errorMessage);
                alert(errorMessage);
            }
        }
    };

    return (
        modalOpen && (
            <div
                className={styles.modalContainer}
                ref={modalBackground}
                onClick={(e) => {
                    if (e.target === modalBackground.current) {
                        setModalOpen(false);
                    }
                }}
            >
                <div className={styles.modalContent}>
                    <button className={styles.modalCloseBtn} onClick={() => setModalOpen(false)}>
                        &times;
                    </button>
                    <>
                        <p>{selectedSpace?.roomPassword ? 'Private' : 'Public'}</p>
                        <input
                            className={styles.modalInput}
                            type="text"
                            readOnly
                            defaultValue={selectedSpace?.roomName || ''}
                        />
                        {selectedSpace?.roomPassword && (
                            <input
                                className={styles.modalInput}
                                type="password"
                                placeholder="방 패스워드"
                                value={enteredPassword}
                                onChange={(e) => setEnteredPassword(e.target.value)}
                            />
                        )}
                        <div className={styles.modalFooter}>
                            <button className={styles.modalSubmitBtn} onClick={handleEnterSpace}>
                                입장하기
                            </button>
                        </div>
                    </>
                </div>
            </div>
        )
    );
}

// 사용자가 참여 중인 방 목록을 조회하고 렌더링하는 컴포넌트
function MyRoom() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [spaces, setSpaces] = useState([]);

    // 로그인한 사용자의 ID를 가져오는 방법에 따라 이 부분을 수정해야 합니다.
    const userId = 5; // 로그인한 사용자의 실제 ID로 교체

    // 방 목록을 가져오는 함수
    const fetchSpaces = async () => {
        try {
            const response = await axios.get(`/rooms/${userId}`);
            console.log('API response:', response.data);

            // 응답 데이터에서 방 목록을 추출
            const userSpaces = response.data.data || []; // 데이터가 없을 경우 빈 배열로 처리

            // 상태 업데이트
            if (Array.isArray(userSpaces)) {
                console.log('Setting spaces:', userSpaces);
                setSpaces(userSpaces);
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Failed to fetch spaces:', error);
        }
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    const handleCardClick = (space) => {
        setSelectedSpace(space);
        setModalOpen(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.heading}>참여중인 방 목록</h1>
            </div>
            <div className={styles.spaceGrid}>
                {spaces.length > 0 ? (
                    spaces.map((space, index) => (
                        <div
                            key={index}
                            className={styles.spaceCard}
                            onClick={() => handleCardClick(space)}
                        >
                            <div className={styles.spaceIcon}>{space.roomPassword ? '🔒' : '🏠'}</div>
                            <div className={styles.spaceInfo}>
                                <h2 className={styles.spaceTitle}>{space.roomName}</h2>
                                <p className={styles.spaceDescription}>{space.description || '방 설명'}</p>
                                <p className={styles.spaceUserCount}>인원수: {space.userCount || 0}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>방이 없습니다.</p>
                )}
            </div>
            <Modal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedSpace={selectedSpace}
            />
        </div>
    );
}

export default MyRoom;
