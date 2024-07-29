import React, { useState } from 'react';
import styles from '../styles/ChatWidget.module.css';

function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'User1',
      text: '안녕하세요!',
      time: '10:00 AM',
      profilePicture: 'https://via.placeholder.com/40'
    },
    {
      sender: 'User2',
      text: '안녕하세요, 어떻게 도와드릴까요?',
      time: '10:01 AM',
      profilePicture: 'https://via.placeholder.com/40'
    },
    {
      sender: 'User1',
      text: '채팅 기능을 구현하고 있어요.',
      time: '10:02 AM',
      profilePicture: 'https://via.placeholder.com/40'
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([
        ...messages,
        {
          sender: 'User1',
          text: newMessage,
          time: currentTime,
          profilePicture: 'https://via.placeholder.com/40'
        }
      ]);
      setNewMessage('');
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

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
                <button className={styles.sendButton} onClick={handleSendMessage}>
                  보내기
                </button>
              </div>
            </div>
        )}
      </div>
  );
}

export default ChatWidget;