import React, { useRef, useState } from 'react';
import styles from '../styles/SpaceCard.module.css';

function Modal({ modalOpen, setModalOpen, isCreateModal, selectedSpace, addNewSpace }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const modalBackground = useRef();

  const handlePrivateClick = () => {
    setIsPrivate(true);
  };

  const handlePublicClick = () => {
    setIsPrivate(false);
  };

  const handleAddSpace = () => {
    if (newTitle.trim()) {
      if (isPrivate && !newPassword.trim()) {
        alert('비밀번호를 입력해야 합니다.');
        return;
      }
      addNewSpace(newTitle);
      setNewTitle('');
      setNewPassword('');
      setModalOpen(false);
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
                          className={`${styles.modalButton} ${isPrivate ? styles.modalButtonActive : ''}`}
                          onClick={handlePublicClick}
                      >
                        Public
                      </button>
                      <button
                          className={`${styles.modalButton} ${isPrivate ? '' : styles.modalButtonActive}`}
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
                    <p>Private</p>
                    <input
                        className={styles.modalInput}
                        type="text"
                        readOnly
                        defaultValue={selectedSpace?.title || ''}
                    />
                    <input
                        className={styles.modalInput}
                        type="password"
                        placeholder="방 패스워드"
                    />
                    <div className={styles.modalFooter}>
                      <button className={styles.modalSubmitBtn}>입장하기</button>
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
  const [spaces, setSpaces] = useState([
    { icon: '🏢', title: '방 제목1', description: '총 20명' },
    { icon: '🎓', title: '방 제목2', description: '총 2명' },
    { icon: '🛋️', title: '방 제목3', description: '총 2명' },
    { icon: '💼', title: '방 제목4', description: '총 2명' },
    // 추가 공간 정보
  ]);

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

  const addNewSpace = (title) => {
    setSpaces([
      ...spaces,
      { icon: '🆕', title, description: '새로 생성된 방' }, // 새 방의 기본 아이콘과 설명
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
                <div className={styles.spaceIcon}>{space.icon}</div>
                <div className={styles.spaceInfo}>
                  <h2 className={styles.spaceTitle}>{space.title}</h2>
                  <p className={styles.spaceDescription}>{space.description}</p>
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
        />
      </div>
  );
}

export default SpaceCard;