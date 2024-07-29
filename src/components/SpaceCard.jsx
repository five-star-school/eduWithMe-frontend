import React from 'react';
import styles from '../styles/SpaceCard.module.css';

const spaces = [
  { icon: '🏢', title: '방 제목1', description: '총 20명' },
  { icon: '🎓', title: '방 제목2', description: '총 2명' },
  { icon: '🛋️', title: '방 제목3', description: '총 2명' },
  { icon: '💼', title: '방 제목4', description: '총 2명' }
];

function SpaceCard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>방 목록</h1>
        <button className={styles.createButton}>방 생성</button>
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
    </div>
  );
}

export default SpaceCard;
