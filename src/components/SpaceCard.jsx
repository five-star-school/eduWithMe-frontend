import React, { useEffect, useState } from 'react';
import styles from '../styles/SpaceCard.module.css';
import axios from "../util/axiosConfig";
import Modal from './Modal';

function SpaceCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(true);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [allSpaces, setAllSpaces] = useState([]); // 전체 데이터를 저장하는 상태
  const [filteredSpaces, setFilteredSpaces] = useState([]); // 필터된 데이터를 저장하는 상태
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSpaces = async () => {
    try {
      const response = await axios.get('/api/rooms?page=0');
      if (Array.isArray(response.data.data)) {
        const updatedSpaces = response.data.data.map(space => ({
          ...space,
          description: space.nickName || '방 설명', // Use nickName or default to '방 설명'
        }));
        setAllSpaces(updatedSpaces);
        setFilteredSpaces(updatedSpaces); // 초기에는 전체 데이터를 필터된 데이터로 설정
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
    const newSpace = {
      icon: isPrivate ? '🔒' : '🏠',
      roomName: title,
      description: nickName || '방 설명',
      userCount: 0,
      roomId: Date.now(),
      roomPassword: isPrivate ? roomPassword : null
    };
    
    setAllSpaces([...allSpaces, newSpace]);
    setFilteredSpaces([...allSpaces, newSpace]); // 필터된 데이터에도 추가
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      const filtered = allSpaces.filter(space =>
        space.roomName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSpaces(filtered);
    } else {
      setFilteredSpaces(allSpaces); // 검색어가 없을 경우 모든 방을 표시
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>방 목록</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="검색어 (방 제목)"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            검색
          </button>
        </div>
        <button className={styles.createButton} onClick={handleCreateClick}>
          방 생성
        </button>
      </div>
      
      {filteredSpaces.length === 0 ? (
        <p className={styles.noResultsMessage}>결과가 없습니다.</p>
      ) : (
        <div className={styles.spaceGrid}>
          {filteredSpaces.map((space, index) => (
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
      )}

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
