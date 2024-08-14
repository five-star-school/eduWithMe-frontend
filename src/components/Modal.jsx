import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SpaceCard.module.css';
import axios from "../util/axiosConfig";

function Modal({ modalOpen, setModalOpen, isCreateModal, selectedSpace, addNewSpace, fetchSpaces }) {
  const [isPrivate, setIsPrivate] = useState(false); // Default to public
  const [newTitle, setNewTitle] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const modalBackground = useRef();
  const navigate = useNavigate();

  const handlePrivateClick = () => setIsPrivate(true);
  const handlePublicClick = () => setIsPrivate(false);

  const handleAddSpace = async () => {
    if (newTitle.trim()) {
      if (isPrivate && !newPassword.trim()) {
        alert('비밀번호를 입력해야 합니다.');
        return;
      }

      try {
        let response;
        if (isPrivate) {
          response = await axios.post('/api/rooms/private', {
            roomName: newTitle,
            roomPassword: newPassword,
          });
        } else {
          response = await axios.post('/api/rooms/public', {
            roomName: newTitle,
          });
        }

        const nickName = response.data.nickName || '방 설명';

        alert('방이 성공적으로 생성되었습니다.');
        addNewSpace(newTitle, isPrivate, newPassword, nickName);
        setNewTitle('');
        setNewPassword('');
        setModalOpen(false);
        fetchSpaces(); // Fetch the updated list of spaces
      } catch (error) {
        const errorMessage = error.response?.data?.msg || '방 생성에 실패했습니다.';
        alert(errorMessage);
      }
    }
  };

  const handleEnterSpace = async () => {
    if (selectedSpace) {
      try {
        if (selectedSpace.roomPassword) {
          if (!enteredPassword.trim()) {
            alert('비밀번호를 입력해야 합니다.');
            return;
          }
          await axios.post(`/api/rooms/${selectedSpace.roomId}/private`, {
            roomPassword: enteredPassword,
          });
        } else {
          await axios.post(`/api/rooms/${selectedSpace.roomId}/public`);
        }
        setModalOpen(false);
        fetchSpaces(); // Fetch the updated list of spaces
        navigate(`/room/${selectedSpace.roomId}`);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('비밀번호가 틀렸습니다.');
        } else {
          alert('로그인 후 입장 가능합니다.');
        }
      }
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
                  className={`${styles.modalButton} ${!isPrivate ? styles.publicButtonActive : ''}`}
                  onClick={handlePublicClick}
                >
                  Public
                </button>
                <button
                  className={`${styles.modalButton} ${isPrivate ? styles.privateButtonActive : ''}`}
                  onClick={handlePrivateClick}
                >
                  Private
                </button>
              </div>
              {isPrivate && (
                <input
                  className={styles.modalInput}
                  type="password"
                  placeholder="비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              )}
              <div className={styles.modalFooter}>
                <button className={styles.modalSubmitBtn} onClick={handleAddSpace}>
                  생성하기
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{selectedSpace.roomPassword ? 'Private' : 'Public'}</p>
              <input
                className={styles.modalInput}
                type="text"
                readOnly
                defaultValue={selectedSpace?.roomName || ''}
              />
              {selectedSpace.roomPassword && (
                <input
                  className={styles.modalInput}
                  type="password"
                  placeholder="비밀번호 입력"
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                />
              )}
              <div className={styles.modalFooter}>
                <button className={styles.modalSubmitBtn} onClick={handleEnterSpace}>
                  입장하기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
}

export default Modal;
