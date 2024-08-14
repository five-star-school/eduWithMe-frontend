import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/ChatWidget.module.css';
import { IoPersonCircleOutline } from "react-icons/io5";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from '../util/axiosConfig';
import Cookies from 'js-cookie';
import { AuthContext } from '../util/AuthContext';

function ChatWidget() {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const stompClient = useRef(null);
  const chatContentRef = useRef(null); // 채팅 내용 컨테이너를 참조할 ref

  useEffect(() => {
  }, [user]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/room/${roomId}`);
      const data = response.data;
      setMessages(data.map(msg => ({
        sender: msg.sender,
        text: msg.content,
        time: new Date(msg.timestamp).toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        profilePicture: msg.photoUrl
      })));
    } catch (error) {
    }
  };

  const connect = useCallback(() => {
    const token = Cookies.get('AccessToken');
    const socket = new SockJS('https://eduwithme.com/api/ws');
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        'AccessToken': token
      },
      onConnect: () => {
        stompClient.current.subscribe(`/api/topic/room/${roomId}`, () => {
          // 새로운 메시지가 들어올 때마다 메시지 재로드
          fetchMessages();
        });
        fetchMessages();
      },
      onDisconnect: () => {
      },
      onStompError: (frame) => {
      }
    });
    stompClient.current.activate();
  }, [roomId]);

  const disconnect = () => {
    if (stompClient.current !== null) {
      stompClient.current.deactivate();
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      connect();
      return () => {
        disconnect();
      };
    }
  }, [isChatOpen, connect]);

  const sendMessage = async () => {
    if (user && user.nickName) {
      const token = Cookies.get('AccessToken');
      if (newMessage.trim() !== '' && stompClient.current && stompClient.current.connected) {
        const chatMessage = {
          sender: user.nickName,
          content: newMessage
        };

        // 메시지 전송
        stompClient.current.publish({
          destination: `/api/app/chat/${roomId}`,
          headers: {
            'AccessToken': token
          },
          body: JSON.stringify(chatMessage)
        });

        // 메시지 초기화
        setNewMessage('');

        // 메시지를 보낸 후 서버에서 최신 메시지를 다시 불러옴
        await fetchMessages();
      }
    } else {
      console.warn('User is not logged in or user.nickName is not available.');
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // 메시지가 업데이트될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatWidgetContainer}>
      <div className={styles.chatIcon} onClick={toggleChat}>
        💬
      </div>
      {isChatOpen && (
        <div className={styles.chatBox}>
          <button className={styles.closeBtn} onClick={toggleChat}>
            &times;
          </button>
          <div className={styles.chatContent} ref={chatContentRef}>
            {messages.map((message, index) => (
              <div key={index} className={styles.chatMessage}>
              {message.profilePicture ? (
                <img src={message.profilePicture} alt="Profile" className={styles.profilePicture} />
              ) : (
                <IoPersonCircleOutline size={40} className={styles.defaultIcon} />
              )}
                <div className={styles.messageContainer}>
                  <div className={styles.messageHeader}>
                    <strong>{message.sender}</strong>
                  </div>
                  <div className={styles.messageContent}>
                    <span className={styles.messageText}>{message.text}</span>
                    <span className={styles.messageTime}>{message.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.chatInputContainer}>
            <input
              className={styles.chatInput}
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="메시지를 입력하세요..."
            />
            <button className={styles.sendButton} onClick={sendMessage}>
              보내기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
