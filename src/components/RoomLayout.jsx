// RoomLayout.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../util/axiosConfig";
import SidebarComponent from './SidebarComponent';
import HeaderNavComponent from './HeaderNavComponent';
import ChatWidget from './ChatWidget';
import styles from '../styles/RoomLayout.module.css';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function RoomLayout({ children }) {
    const [isRoomManager, setIsRoomManager] = useState(false);
    const { roomId } = useParams();

    useEffect(() => {
        checkRoomManagerStatus();
    }, [roomId]);

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
                <HeaderNavComponent isRoomManager={isRoomManager} />
                <div className={styles.pageContent}>
                    {children}
                </div>
            </div>
            <ChatWidget />
        </div>
    );
}

export default RoomLayout;