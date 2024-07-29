import React from 'react';
import { useRef } from 'react' 
import styles from '../styles/Login.module.css';
import { Link } from 'react-router-dom';

function Login() {
    const emailInput = useRef();
    const passwordInput = useRef();

    const handleBoardClick = async (e) => {
        e.preventDefault();

        if (!emailInput.current || !passwordInput.current) {
            alert('빈 칸을 전부 입력 해주세요.');
            return;
        }
    };

    return (
        <div className={styles.login}>
        <h2 className={styles.title}>로그인</h2>
        <form className={styles.form}>
            <input className={styles.input} type="email" placeholder="Email" ref={emailInput} />
            <input className={styles.input} type="password" placeholder="Password" ref={passwordInput} />
            <button className={styles.button} type="submit" onClick={handleBoardClick}>Login</button>
        </form>
        <div className={styles.links}>
                <Link to="/forgot-password" className={styles.link}>비밀번호 찾기</Link>
                <span className={styles.separator}>|</span>
                <Link to="/signup" className={styles.link}>회원가입</Link>
            </div>
    </div>
    );
}

export default Login;