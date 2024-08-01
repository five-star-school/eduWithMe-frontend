import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ManageMainHeaderNav.module.css';
import axios from '../util/axiosConfig';
import { getCookie } from '../util/cookie';

function ManageMainHeaderNav({ roomId }) {
  const navigate = useNavigate();

  const handleDeleteRoom = async () => {
    const confirmDelete = window.confirm('정말로 이 방을 삭제하시겠습니까? 삭제한 데이터는 복구할 수 없습니다.');

    if (!confirmDelete) {
      return; // 사용자가 취소를 누른 경우 아무 작업도 하지 않음
    }

    try {
      const token = getCookie('AccessToken');
      if (!token) {
        alert('로그인 해주세요.');
        return;
      }

      await axios.delete(`/rooms/${roomId}`, {
        headers: {
          'AccessToken': token,
        }
      });

      alert('방이 삭제되었습니다.');
      navigate('/main'); // 방 삭제 후 /main 페이지로 리다이렉트
    } catch (error) {
      console.error('방 삭제 실패:', error);
      alert('방 삭제에 실패했습니다.');
    }
  };

  return (
      <nav className={styles.headerNav}>
        <button className={`${styles.navButton} ${styles.activeButton}`}>문제 목록</button>
        <div className={styles.rightButtons}>
          <button className={`${styles.navButton} ${styles.editButton}`}>방 수정</button>
          <button className={`${styles.navButton} ${styles.deleteButton}`} onClick={handleDeleteRoom}>
            방 삭제
          </button>
        </div>
      </nav>
  );
}

export default ManageMainHeaderNav;
