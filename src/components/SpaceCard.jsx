import React from 'react';
import styles from '../styles/SpaceCard.module.css'; 

function SpaceCard({ icon, title, description }) {
  return (
    <div className={styles.spaceCard}>
      <div className={styles.spaceIcon}>{icon}</div>
      <div className={styles.spaceInfo}>
        <h2 className={styles.spaceTitle}>{title}</h2>
        <p className={styles.spaceDescription}>{description}</p>
      </div>
    </div>
  );
}

export default SpaceCard;
