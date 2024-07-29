import React, { useRef } from 'react';
import styles from '../styles/Login.module.css';
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

function Login() {
    const emailInput = useRef();
    const passwordInput = useRef();

    const isEmailValid = (email) => {
        // 이메일 유효성 검사를 위한 정규 표현식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        // 비밀번호 규정: 최소 8자, 대문자, 소문자, 숫자, 특수문자 포함
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleBoardClick = async (e) => {
        e.preventDefault();

        const email = emailInput.current?.value;
        const password = passwordInput.current?.value;

        if (!email || !password) {
            alert('빈 칸을 전부 입력 해주세요.');
            return;
        }

        if (!isEmailValid(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        if (!isPasswordValid(password)) {
            alert('비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다.');
            return;
        }

        // 여기에 로그인 로직 추가
        alert('로그인 시도');
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
