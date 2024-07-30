import React from 'react';
import RoomLayout from '../components/RoomLayout';
import RoomMain from '../components/RoomMain';

function RoomMainPage() {
    return (
        <RoomLayout>
            <div>
                <RoomMain/>
            </div>
        </RoomLayout>
    );
}

export default RoomMainPage;