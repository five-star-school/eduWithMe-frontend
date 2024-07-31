import React, { useState, useEffect } from 'react';
import styles from '../styles/SidebarComponent.module.css';
import axios from '../util/axiosConfig'; // axiosConfig 경로 수정

function SidebarComponent() {
  const [roomName, setRoomName] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const path = window.location.pathname;
    const roomId = path.split('/')[2];

    const fetchRoomData = async () => {
      try {
        // API 호출
        const response = await axios.get(`/rooms/${roomId}/users`);
        console.log('API Response:', response.data); // 응답 데이터 확인

        // 응답 데이터 구조에 맞게 수정
        const { data } = response.data; // 데이터 추출

        // roomName 설정 (응답 데이터에 roomName이 없을 경우)
        if (data.length > 0) {
          const firstMember = data[0];
          setRoomName(firstMember.roomName || 'Room Name not found');
        }

        setMembers(data || []); // students가 undefined일 경우 빈 배열로 설정
      } catch (error) {
        console.error('Error fetching room data:', error);
        setRoomName('Error loading room');
        setMembers([]);
      }
    };

    fetchRoomData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

  return (
      <aside className={styles.sidebar}>
        <h2 className={styles.roomTitle}>{roomName || '로딩 중...'}</h2>
        <ul className={styles.memberList}>
          {members.length > 0 ? (
              members.map((member, index) => (
                  <li
                      key={index}
                      className={member.managerUserId === member.userId ? styles.roomOwner : styles.student}
                  >
                    {member.nickName}
                    <span className={member.managerUserId === member.userId ? styles.ownerTag : styles.studentTag}>
                {member.managerUserId === member.userId ? '선생님' : '학생'}
              </span>
                  </li>
              ))
          ) : (
              <li>Loading members...</li>
          )}
        </ul>
      </aside>
  );
}

export default SidebarComponent;