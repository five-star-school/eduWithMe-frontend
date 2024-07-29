import React, { useRef } from 'react';
import styles from '../styles/Login.module.css';
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
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
            <input className={styles.input} type="email" placeholder="이메일" ref={emailInput} />
            <input className={styles.input} type="password" placeholder="비밀번호" ref={passwordInput} />
            <button className={styles.button} type="submit" onClick={handleBoardClick}>Login</button>
        </form>
        <div className={styles.links}>
            <Link to="/forgot-password" className={styles.link}>비밀번호 찾기</Link>
            <span className={styles.separator}>|</span>
            <Link to="/signup" className={styles.link}>회원가입</Link>
        </div>
        <div className={styles.socialLogin}>
                <button className={`${styles.socialButton} ${styles.googleButton}`} onClick={() => console.log('Login with Google')}>
                    <FcGoogle className={styles.socialIcon} /> Google
                </button>
                <button className={`${styles.socialButton} ${styles.kakaoButton}`} onClick={() => console.log('Login with Kakao')}>
                    <RiKakaoTalkFill className={styles.socialIcon} /> Kakao
                </button>
            </div>
    </div>
    );
}

export default Login;