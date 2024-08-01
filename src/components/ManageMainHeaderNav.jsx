import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ManageMainHeaderNav.module.css';
import axios from '../util/axiosConfig';
import { getCookie } from '../util/cookie';

function ManageMainHeaderNav({ roomId, roomName }) { // 수정
  const navigate = useNavigate();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

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

  const handleEditRoom = async () => {
    if (!newRoomName.trim()) {
      alert('방 이름을 입력해주세요.');
      return;
    }

    try {
      const token = getCookie('AccessToken');
      if (!token) {
        alert('로그인 해주세요.');
        return;
      }

      await axios.put(`/rooms/${roomId}`, {
        roomId: roomId,
        roomName: newRoomName,
      }, {
        headers: {
          'AccessToken': token,
        }
      });

      alert('방 이름이 수정되었습니다.');
      setEditModalOpen(false);
      window.location.reload(); // 수정 후 페이지 새로고침
    } catch (error) {
      console.error('방 수정 실패:', error);
      alert('방 수정에 실패했습니다.');
    }
  };

  return (
      <nav className={styles.headerNav}>
        <button className={`${styles.navButton} ${styles.activeButton}`}>문제 목록</button>
        <div className={styles.rightButtons}>
          <button className={`${styles.navButton} ${styles.editButton}`} onClick={() => setEditModalOpen(true)}>방 수정</button>
          <button className={`${styles.navButton} ${styles.deleteButton}`} onClick={handleDeleteRoom}>방 삭제</button>
        </div>

        {isEditModalOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <h2>방 수정</h2>
                <div className={styles.formGroup}>
                  <label>현재 방 이름</label>
                  <input type="text" value={roomName} disabled />
                </div>
                <div className={styles.formGroup}>
                  <label>새 방 이름</label>
                  <input type="text" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} />
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.saveButton} onClick={handleEditRoom}>수정</button>
                  <button className={styles.cancelButton} onClick={() => setEditModalOpen(false)}>취소</button>
                </div>
              </div>
            </div>
        )}
      </nav>
  );
}

export default ManageMainHeaderNav;
