import React, { useEffect, useState } from 'react';
import styles from '../styles/SpaceCard.module.css';
import axios from "../util/axiosConfig";
import Modal from './Modal';

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
        const updatedSpaces = response.data.data.map(space => ({
          ...space,
          description: space.nickName || '방 설명', // Use nickName or default to '방 설명'
        }));
        setSpaces(updatedSpaces);
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

  const addNewSpace = (title, isPrivate, roomPassword, nickName) => {
    setSpaces([
      ...spaces,
      { 
        icon: isPrivate ? '🔒' : '🏠', 
        roomName: title, 
        description: nickName || '방 설명', // Use nickName or default description
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
              <p className={styles.spaceUserCount}>인원수: {space.userCount || 0}</p> 
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
        fetchSpaces={fetchSpaces}  
      />
    </div>
  );
}

export default SpaceCard;
