// RoomLayout.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../util/axiosConfig";
import SidebarComponent from './SidebarComponent';
import HeaderNavComponent from './HeaderNavComponent';
import ChatWidget from './ChatWidget';
import styles from '../styles/RoomLayout.module.css';
import { getCookie } from '../util/cookie';

function RoomLayout({ children }) {
    const [isRoomManager, setIsRoomManager] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const { roomId } = useParams();

    useEffect(() => {
        fetchRoomInfo();
    }, [roomId]);

    const fetchRoomInfo = async () => {
        try {
            const response = await axios.get(`/rooms/${roomId}`);
            console.log('Room info response:', response.data); // 디버깅을 위한 로그

            if (response.data && Array.isArray(response.data.data)) {
                const room = response.data.data.find(r => r.roomId === parseInt(roomId, 10));
                if (room) {
                    setRoomName(room.roomName);
                    setIsPrivate(room.roomPassword !== null && room.roomPassword !== '');
                    console.log('Room privacy status:', room.roomPassword !== null && room.roomPassword !== ''); // 디버깅을 위한 로그
                } else {
                    console.error('Room not found in the response');
                    setRoomName('Unknown Room');
                    setIsPrivate(false);
                }
            } else {
                console.error('Unexpected data format:', response.data);
                setRoomName('Unknown Room');
                setIsPrivate(false);
            }

            const usersResponse = await axios.get(`/rooms/${roomId}/users`);
            const currentUserId = getCookie('userId');

            if (!currentUserId) {
                console.error('No user ID found in cookies');
                return;
            }

            const isManager = usersResponse.data.data.some(user =>
                user.userId.toString() === currentUserId && user.userId === user.managerUserId
            );
            setIsRoomManager(isManager);
        } catch (error) {
            console.error('Failed to fetch room info:', error);
            setRoomName('Unknown Room');
            setIsPrivate(false);
            setIsRoomManager(false);
        }
    };

    const checkRoomManagerStatus = async () => {
        try {
            const response = await axios.get(`/rooms/${roomId}/users`);
            const currentUserId = getCookie('userId'); // Get the current user ID from the cookie

            // Debugging information
            console.log('User Data: ', response.data.data);
            console.log('Current User ID: ', currentUserId);
            if (!currentUserId) {
                console.error('No user ID found in cookies');
                return;
            }

            const isManager = response.data.data.some(user =>
                user.userId.toString() === currentUserId && user.userId === user.managerUserId
            );
            console.log('Is Room Manager: ', isManager);
            setIsRoomManager(isManager);
        } catch (error) {
            console.error('Failed to check room manager status:', error);
            setIsRoomManager(false);
        }
    };

    return (
        <div className={styles.roomLayout}>
            <SidebarComponent />
            <div className={styles.mainContent}>
                <HeaderNavComponent
                    isRoomManager={isRoomManager}
                    roomName={roomName}
                    isPrivate={isPrivate}
                />
                <div className={styles.pageContent}>
                    {children}
                </div>
            </div>
            <ChatWidget />
        </div>
    );
}

export default RoomLayout;