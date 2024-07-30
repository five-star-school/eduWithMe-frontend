import React, { useRef } from 'react';
import axios from 'axios';
import styles from '../styles/Login.module.css';
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

function Login() {
    const emailInput = useRef();
    const passwordInput = useRef();

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLoginClick = async (e) => {
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

        try {
            const response = await axios.post('http://localhost:8888/users/login', { email, password });

            if (response.status === 200) {
                console.log(response);
                console.log(response.headers);
                // 헤더 키는 소문자로 접근합니다.
                const accessToken = response.headers['accesstoken'];

                console.log('로그인 성공, 토큰:', accessToken);
                document.cookie = `AccessToken=${accessToken}; path=/; secure; SameSite=Strict`;
                alert('로그인 성공!');
            } else {
                alert('로그인 실패: ' + response.data.message);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.login}>
            <h2 className={styles.title}>로그인</h2>
            <form className={styles.form}>
                <input className={styles.input} type="email" placeholder="이메일" ref={emailInput} />
                <input className={styles.input} type="password" placeholder="비밀번호" ref={passwordInput} />
                <button className={styles.button} type="submit" onClick={handleLoginClick}>Login</button>
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



