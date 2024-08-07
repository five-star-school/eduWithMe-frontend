import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../util/axiosConfig';
import styles from '../styles/Signup.module.css';

function Signup() {
    const navigate = useNavigate();
    const emailInput = useRef();
    const passwordInput = useRef();
    const repeatPasswordInput = useRef();
    const emailVerificationInput = useRef();
    const nicknameInput = useRef();

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [nicknameError, setNicknameError] = useState('');

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9]{1,20}$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
        return passwordRegex.test(password);
    };

    const handleSendCodeClick = async () => {
        const email = emailInput.current?.value;
        if (!email || !isEmailValid(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        try {
            await axios.post('/api/users/signup/request', { email });
            alert('인증 코드가 이메일로 전송되었습니다.');
        } catch (error) {
            if (error.response && error.response.data.msg === "중복된 유저가 존재합니다.") {
                alert('이미 존재하는 이메일입니다.');
            } else {
                alert('이메일 형식이 올바르지 않습니다. 다시 입력해주세요.');
            }
        }
    };

    const handleVerifyCodeClick = async () => {
        const email = emailInput.current?.value;
        const authNum = emailVerificationInput.current?.value;
        if (!email || !authNum) {
            alert('인증 코드를 입력해주세요.');
            return;
        }

        try {
            await axios.post('/api/users/signup/verify', { email, authNum });
            alert('이메일 인증이 완료되었습니다.');
            setIsEmailVerified(true);
        } catch (error) {
            alert('이메일 인증에 실패했습니다.');
        }
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        if (!isPasswordValid(password)) {
            setPasswordError('비밀번호는 8~15자이며, 영문, 숫자, 특수문자를 포함해야 합니다.');
        } else {
            setPasswordError('');
        }
    };

    const handleRepeatPasswordChange = (e) => {
        const repeatPassword = e.target.value;
        const password = passwordInput.current?.value;
        setPasswordMismatch(password !== repeatPassword);
    };

    const handleNicknameChange = (e) => {
        const nickname = e.target.value;
        setNicknameError(nickname ? '' : '닉네임은 필수 입력사항입니다.');
    };

    const handleSignupClick = async () => {
        const email = emailInput.current?.value;
        const password = passwordInput.current?.value;
        const repeatPassword = repeatPasswordInput.current?.value;
        const nickname = nicknameInput.current?.value;

        if (!email || !password || !repeatPassword || !nickname || !isEmailVerified) {
            alert('입력칸을 모두 작성해주세요.');
            return;
        }

        if (password !== repeatPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!isPasswordValid(password)) {
            alert('비밀번호 형식이 올바르지 않습니다.');
            return;
        }

        try {
            await axios.post('/api/users/signup', {
                email,
                password,
                nickName: nickname
            });
            alert('회원가입이 성공적으로 완료되었습니다.');
            navigate('/login');  // 로그인 페이지로 이동
        } catch (error) {
            if (error.response && error.response.data.msg === "중복된 유저가 존재합니다.") {
                alert('중복된 닉네임입니다. 다른 닉네임을 선택해주세요.');
            } else {
                alert('회원가입에 실패했습니다. 모든 정보를 올바르게 입력했는지 확인해주세요.');
            }
        }
    };

    return (
        <div className={styles.signup}>
            <h2 className={styles.title}>회원가입</h2>
            <div className={styles.form}>
                <div className={styles.inputWrapper}>
                    <input className={styles.input} type="email" placeholder="이메일" ref={emailInput} />
                    <button className={styles.codeButton} onClick={handleSendCodeClick}>인증코드 전송</button>
                </div>
                <div className={styles.inputWrapper}>
                    <input className={styles.input} type="text" placeholder="이메일 인증 코드" ref={emailVerificationInput} />
                    <button className={styles.codeButton} onClick={handleVerifyCodeClick}>코드 확인</button>
                </div>
                <input
                    className={styles.input}
                    type="password"
                    placeholder="비밀번호"
                    ref={passwordInput}
                    onChange={handlePasswordChange}
                />
                {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
                <input
                    className={styles.input}
                    type="password"
                    placeholder="비밀번호 확인"
                    ref={repeatPasswordInput}
                    onChange={handleRepeatPasswordChange}
                />
                {passwordMismatch && <p className={styles.errorMessage}>비밀번호가 일치하지 않습니다.</p>}
                <input
                    className={styles.input}
                    type="text"
                    placeholder="닉네임"
                    ref={nicknameInput}
                    onChange={handleNicknameChange}
                />
                {nicknameError && <p className={styles.errorMessage}>{nicknameError}</p>}
                <button className={styles.button} type="submit" onClick={handleSignupClick}>Sign up</button>
            </div>
        </div>
    );
}

export default Signup;