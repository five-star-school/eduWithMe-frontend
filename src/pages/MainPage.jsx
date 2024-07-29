import React from 'react';
import SpaceCard from '../components/SpaceCard'; 
import styles from '../styles/MainPage.module.css'; 

function MainPage() {
  const spaces = [
    { icon: '🏢', title: '방 제목1', description: '총 20명' },
    { icon: '🎓', title: '방 제목2', description: '총 2명' },
    { icon: '🛋️', title: '방 제목3', description: '총 2명' },
    { icon: '💼', title: '방 제목4', description: '총 2명' }
  ];

  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>방 목록</h1>      
        <div className={styles.spaceGrid}>
        {spaces.map((space, index) => (
          <SpaceCard
            key={index}
            icon={space.icon}
            title={space.title}
            description={space.description}
          />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
