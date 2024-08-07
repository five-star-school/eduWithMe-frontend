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
            const response = await axios.get(`/api/rooms/one/${roomId}`);
            console.log('Room info response:', response.data);

            if (response.data && response.data.data) {
                const roomData = response.data.data;
                setRoomName(roomData.roomName);
                setIsPrivate(roomData.roomPassword !== null && roomData.roomPassword !== '');

                const currentUserId = parseInt(getCookie('userId'), 10);
                setIsRoomManager(roomData.managerUserId === currentUserId);

                console.log('Is Room Manager:', roomData.managerUserId === currentUserId);
            } else {
                console.error('Unexpected data format:', response.data);
                setRoomName('Unknown Room');
                setIsPrivate(false);
                setIsRoomManager(false);
            }
        } catch (error) {
            console.error('Failed to fetch room info:', error);
            setRoomName('Unknown Room');
            setIsPrivate(false);
            setIsRoomManager(false);
        }
    };

    const checkRoomManagerStatus = async () => {
        try {
            const response = await axios.get(`/api/rooms/${roomId}/users`);
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