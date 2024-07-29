import React, {useRef, useState} from 'react';
import styles from '../styles/SpaceCard.module.css';

function Modal({ modalOpen, setModalOpen }) {
  const [isPrivate, setIsPrivate] = useState(false);

  const modalBackground = useRef();

  const handlePrivateClick = () => {
    setIsPrivate(true);
  };

  const handlePublicClick = () => {
    setIsPrivate(false);
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
              <p>방 생성하기</p>
              <input className={styles.modalInput} type="text" placeholder="방 제목"/>
              <div className={styles.modalButtonGroup}>
                <button className={styles.modalButton} onClick={handlePublicClick}>
                  public
                </button>
                <button className={styles.modalButton} onClick={handlePrivateClick}>
                  Private
                </button>
              </div>
              {isPrivate && <input className={styles.modalInput} type="password" placeholder="방 패스워드"/>}
              <div className={styles.modalFooter}>
                <button className={styles.modalSubmitBtn}>방 생성하기</button>
              </div>
            </div>
          </div>
      )
  );
}

function SpaceCard() {

  const [modalOpen, setModalOpen] = useState(false);

  const spaces = [
    {icon: '🏢', title: '방 제목1', description: '총 20명'},
    {icon: '🎓', title: '방 제목2', description: '총 2명'},
    {icon: '🛋️', title: '방 제목3', description: '총 2명'},
    {icon: '💼', title: '방 제목4', description: '총 2명'}
    // 추가 공간 정보
  ];

  return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>방 목록</h1>
          <button className={styles.createButton} onClick={() => setModalOpen(true)}>방 생성</button>
        </div>
        <div className={styles.spaceGrid}>
          {spaces.map((space, index) => (
              <div key={index} className={styles.spaceCard}>
                <div className={styles.spaceIcon}>{space.icon}</div>
                <div className={styles.spaceInfo}>
                  <h2 className={styles.spaceTitle}>{space.title}</h2>
                  <p className={styles.spaceDescription}>{space.description}</p>
                </div>
              </div>
          ))}
        </div>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </div>
  );
}

export default SpaceCard;
