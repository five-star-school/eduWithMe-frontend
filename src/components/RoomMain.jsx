import React from 'react';
import styles from '../styles/RoomMainPage.module.css';

function RoomMain() {
    return (
        <div className={styles.roomMainPage}>
            <div className={styles.mainContent}>
                <div className={styles.roomContent}>
                    <div className={styles.contentHeader}>
                        <div className={styles.searchContainer}>
                            <input type="text" className={styles.searchInput} placeholder="검색어 ( 제목 )"/>
                            <button className={styles.searchButton}>검색</button>
                        </div>
                    </div>
                    <table className={styles.problemTable}>
                        <thead>
                        <tr>
                            <th>문제 번호</th>
                            <th>카테고리</th>
                            <th>문제 제목</th>
                            <th>난이도</th>
                            <th>출제일</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RoomMain;