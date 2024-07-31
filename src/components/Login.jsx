import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../util/axiosConfig';
import styles from '../styles/Login.module.css';
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

function Login() {
    const navigate = useNavigate();
    const emailInput = useRef();
    const passwordInput = useRef();
    const [loginError, setLoginError] = useState('');

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
            setLoginError('빈 칸을 전부 입력 해주세요.');
            return;
        }

        if (!isEmailValid(email)) {
            setLoginError('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        if (!isPasswordValid(password)) {
            setLoginError('이메일과 비밀번호를 확인해주세요.');
            return;
        }

        try {
            const response = await axios.post('/users/login', { email, password });

            if (response.status === 200) {
                console.log(response);
                console.log(response.headers);
                const accessToken = response.headers['accesstoken'];
                console.log('로그인 성공, 토큰:', accessToken);
                document.cookie = `AccessToken=${accessToken}; path=/; secure; SameSite=Strict`;
                alert('로그인 성공!');
                navigate('/main');
            } else {
                setLoginError('로그인 실패: ' + response.data.message);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            setLoginError('일치하는 회원이 없습니다.');
        }
    };

    const handleKakaoLogin = async () => {
        try {
            const keyResponse = await axios.get('/users/key-value');
            const { redirectUri, appKey } = keyResponse.data;
            // Kakao SDK 초기화
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(appKey);
            }
            // Kakao 로그인 요청
            window.Kakao.Auth.authorize({
                redirectUri: redirectUri,
                scope: 'profile_nickname, account_email',
            });
        } catch (error) {
            console.error('Error fetching key values:', error);
            setLoginError('카카오 로그인을 시작할 수 없습니다.');
        }
    };

    return (
        <div className={styles.login}>
            <h2 className={styles.title}>로그인</h2>
            <form className={styles.form} onSubmit={handleLoginClick}>
                <input className={styles.input} type="email" placeholder="이메일" ref={emailInput} />
                <input className={styles.input} type="password" placeholder="비밀번호" ref={passwordInput} />
                <button className={styles.button} type="submit">Login</button>
            </form>
            {loginError && <p className={styles.errorMessage}>{loginError}</p>}
            <div className={styles.links}>
                <Link to="/forgot-password" className={styles.link}>비밀번호 찾기</Link>
                <span className={styles.separator}>|</span>
                <Link to="/signup" className={styles.link}>회원가입</Link>
            </div>
            <div className={styles.socialLogin}>
                <button className={`${styles.socialButton} ${styles.googleButton}`}>
                    <FcGoogle className={styles.socialIcon} /> Google
                </button>
                <button className={`${styles.socialButton} ${styles.kakaoButton}`} onClick={handleKakaoLogin}>
                    <RiKakaoTalkFill className={styles.socialIcon} /> Kakao
                </button>
            </div>
        </div>
    );
}

export default Login;