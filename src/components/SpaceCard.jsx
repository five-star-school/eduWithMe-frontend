import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SpaceCard.module.css';
import axios from "../util/axiosConfig";

function Modal({ modalOpen, setModalOpen, isCreateModal, selectedSpace, addNewSpace, fetchSpaces }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const modalBackground = useRef();

  const navigate = useNavigate();

  const handlePrivateClick = () => {
    setIsPrivate(true);
  };

  const handlePublicClick = () => {
    setIsPrivate(false);
  };

  const handleAddSpace = async () => {
    if (newTitle.trim()) {
      if (isPrivate && !newPassword.trim()) {
        alert('비밀번호를 입력해야 합니다.');
        return;
      }

      try {
        if (isPrivate) {
          await axios.post('/rooms/private', {
            roomName: newTitle,
            roomPassword: newPassword,
          });
        } else {
          await axios.post('/rooms/public', {
            roomName: newTitle,
          });
        }
        alert('방이 성공적으로 생성되었습니다.');
        addNewSpace(newTitle, isPrivate, newPassword);
        setNewTitle('');
        setNewPassword('');
        setModalOpen(false);
        fetchSpaces(); // Fetch the updated list of spaces
      } catch (error) {
        const errorMessage = error.response?.data?.msg || '방 생성에 실패했습니다.';
        console.error('방 생성 실패:', errorMessage);
        alert(errorMessage);
      }
    }
  };

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
          {isCreateModal ? (
            <>
              <p>방 생성하기</p>
              <input
                className={styles.modalInput}
                type="text"
                placeholder="방 제목"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className={styles.modalButtonGroup}>
                <button
                  className={`${styles.modalButton} ${isPrivate ? '' : styles.modalButtonActive}`}
                  onClick={handlePublicClick}
                >
                  Public
                </button>
                <button
                  className={`${styles.modalButton} ${isPrivate ? styles.modalButtonActive : ''}`}
                  onClick={handlePrivateClick}
                >
                  Private
                </button>
              </div>
              {isPrivate && (
                <input
                  className={styles.modalInput}
                  type="password"
                  placeholder="방 패스워드"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              )}
              <div className={styles.modalFooter}>
                <button className={styles.modalSubmitBtn} onClick={handleAddSpace}>
                  방 생성하기
                </button>
              </div>
            </>
          ) : (
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
          )}
        </div>
      </div>
    )
  );
}

function SpaceCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(true);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [spaces, setSpaces] = useState([]);

  const fetchSpaces = async () => {
    try {
      const response = await axios.get('/rooms?page=0');
      console.log('API response:', response.data);
      if (Array.isArray(response.data.data)) {
        console.log('Setting spaces:', response.data.data);
        setSpaces(response.data.data);
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

  const handleCreateClick = () => {
    setIsCreateModal(true);
    setSelectedSpace(null);
    setModalOpen(true);
  };

  const handleCardClick = (space) => {
    setIsCreateModal(false);
    setSelectedSpace(space);
    setModalOpen(true);
  };

  const addNewSpace = (title, isPrivate, roomPassword) => {
    setSpaces([
      ...spaces,
      { 
        icon: isPrivate ? '🔒' : '🏠', 
        roomName: title, 
        description: '새로 생성된 방', 
        userCount: 0, 
        roomId: Date.now(),  
        roomPassword: isPrivate ? roomPassword : null  
      }
    ]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>방 목록</h1>
        <button className={styles.createButton} onClick={handleCreateClick}>
          방 생성
        </button>
      </div>
      <div className={styles.spaceGrid}>
        {spaces.map((space, index) => (
          <div
            key={index}
            className={styles.spaceCard}
            onClick={() => handleCardClick(space)}
          >
            <div className={styles.spaceIcon}>{space.roomPassword ? '🔒' : '🏠'}</div>
            <div className={styles.spaceInfo}>
              <h2 className={styles.spaceTitle}>{space.roomName}</h2>
              <p className={styles.spaceDescription}>{space.description || '방 설명'}</p>
              <p className={styles.spaceUserCount}>인원수: {space.userCount || 0}</p> {/* Display user count */}
            </div>
          </div>
        ))}
      </div>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        isCreateModal={isCreateModal}
        selectedSpace={selectedSpace}
        addNewSpace={addNewSpace}
        fetchSpaces={fetchSpaces}  // Pass the fetchSpaces function to Modal
      />
    </div>
  );
}

export default SpaceCard;
