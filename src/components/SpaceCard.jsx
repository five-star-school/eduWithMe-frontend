import React, { useEffect, useState } from 'react';
import styles from '../styles/SpaceCard.module.css';
import axios from "../util/axiosConfig";
import Modal from './Modal';

function SpaceCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(true);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [allSpaces, setAllSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roomUsers, setRoomUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchSpaces = async (page = 0) => {
    try {
      const response = await axios.get('/api/rooms', {
        params: { page, size: 12 }
      });
      if (response.data && response.data.data) {
        const { content, totalPages, totalElements } = response.data.data;
        const updatedSpaces = await Promise.all(content.map(async (space) => {
          const userCountResponse = await axios.get(`/api/rooms/${space.roomId}/users`);
          const userCount = userCountResponse.data.data.length;
          return { ...space, description: space.nickName || '방 설명', userCount };
        }));
        setAllSpaces(updatedSpaces);
        setFilteredSpaces(updatedSpaces);
        setTotalPages(totalPages);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch spaces:', error);
    }
  };

  useEffect(() => {
    fetchSpaces(currentPage);
  }, [currentPage]);

  const fetchRoomUsers = async (roomId) => {
    try {
      const response = await axios.get(`/api/rooms/${roomId}/users`);
      if (response.data && Array.isArray(response.data.data)) {
        setRoomUsers(response.data.data);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch room users:', error);
    }
  };

  const handleCreateClick = () => {
    setIsCreateModal(true);
    setSelectedSpace(null);
    setModalOpen(true);
  };

  const handleCardClick = (space) => {
    setIsCreateModal(false);
    setSelectedSpace(space);
    setModalOpen(true);
    fetchRoomUsers(space.roomId);
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
    setFilteredSpaces([...allSpaces, newSpace]);
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
      setFilteredSpaces(allSpaces);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
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
            <>
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
              <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={currentPage === 0}>이전</button>
                <span>{currentPage + 1} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>다음</button>
              </div>
            </>
        )}

        <Modal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            isCreateModal={isCreateModal}
            selectedSpace={selectedSpace}
            addNewSpace={addNewSpace}
            fetchSpaces={fetchSpaces}
            roomUsers={roomUsers}
        />
      </div>
  );
}

export default SpaceCard;
