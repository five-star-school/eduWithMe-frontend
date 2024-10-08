import React, { useRef, useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import axios from "../util/axiosConfig";
import { AuthContext } from '../util/AuthContext';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const emailInput = useRef();
    const passwordInput = useRef();
    const [loginError, setLoginError] = useState('');
    const { login } = useContext(AuthContext);

    useEffect(() => {
        if (location.state?.email && location.state?.tempPassword) {
            emailInput.current.value = location.state.email;
            passwordInput.current.value = location.state.tempPassword;
        }
    }, [location]);

    const handleLoginClick = async (e) => {
        e.preventDefault();
        const email = emailInput.current?.value;
        const password = passwordInput.current?.value;

        if (!email || !password) {
            setLoginError('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post('/api/users/login', { email, password });

            if (response.status === 200) {
                const accessToken = response.headers['accesstoken'];
                const { nickName, userId } = response.data;

                const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString(); // 1시간 후 만료
                document.cookie = `AccessToken=${accessToken}; path=/; Expires=${expires}; Secure; SameSite=Strict`;
                document.cookie = `userId=${userId}; path=/; Expires=${expires}; Secure; SameSite=Strict`;


                login({ userId, nickName });
                alert('로그인 성공!');
                navigate('/main');
            } else {
                setLoginError('로그인 실패: ' + response.data.message);
            }
        } catch (error) {
            setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };


    const handleKakaoLogin = async () => {
        try {
            const keyResponse = await axios.get('/api/users/key-value');
            const { redirectUri, appKey } = keyResponse.data;

            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(appKey);
            }

            window.Kakao.Auth.authorize({
                redirectUri: redirectUri,
                scope: 'profile_nickname, account_email',
            });
        } catch (error) {
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
                <Link to="/forgotPassword" className={styles.link}>비밀번호 찾기</Link>
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