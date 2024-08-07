import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/ChatWidget.module.css';
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
  useEffect(() => {
    console.log('User:', user);
  }, [user]);
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/room/${roomId}`);
      const data = response.data;
      setMessages(data.map(msg => ({
        sender: msg.sender,
        text: msg.content,
        time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        profilePicture: 'https://via.placeholder.com/40'
      })));
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };
  const connect = useCallback(() => {
    const token = Cookies.get('AccessToken');
    const socket = new SockJS('http://localhost:8888/api/ws');
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        'AccessToken': token
      },
      onConnect: () => {
        console.log('Connected');
        stompClient.current.subscribe(`/api/topic/room/${roomId}`, message => {
          const parsedMessage = JSON.parse(message.body);
          showMessage(parsedMessage.sender, parsedMessage.content);
        });
        fetchMessages();
      },
      onDisconnect: () => {
        console.log('Disconnected');
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      }
    });
    stompClient.current.activate();
  }, [roomId]);
  const disconnect = () => {
    if (stompClient.current !== null) {
      stompClient.current.deactivate();
      console.log('Disconnected');
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
  const sendMessage = () => {
    if (user && user.nickName) {
      const token = Cookies.get('AccessToken');
      if (newMessage.trim() !== '' && stompClient.current && stompClient.current.connected) {
        const chatMessage = {
          sender: user.nickName,
          content: newMessage
        };
        stompClient.current.publish({
          destination: `/api/app/chat/${roomId}`,
          headers: {
            'AccessToken': token
          },
          body: JSON.stringify(chatMessage)
        });
        setNewMessage('');
      }
    } else {
      console.warn('User is not logged in or user.nickName is not available.');
    }
  };
  const showMessage = (sender, messageContent) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prevMessages => [
      ...prevMessages,
      {
        sender: sender || 'Unknown User',
        text: messageContent,
        time: currentTime,
        profilePicture: 'https://via.placeholder.com/40'
      }
    ]);
  };
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <div className={styles.chatWidgetContainer}>
      <div className={styles.chatIcon} onClick={toggleChat}>
        :말풍선:
      </div>
      {isChatOpen && (
        <div className={styles.chatBox}>
          <button className={styles.closeBtn} onClick={toggleChat}>
            &times;
          </button>
          <div className={styles.chatContent}>
            {messages.map((message, index) => (
              <div key={index} className={styles.chatMessage}>
                <img src={message.profilePicture} alt="Profile" className={styles.profilePicture} />
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