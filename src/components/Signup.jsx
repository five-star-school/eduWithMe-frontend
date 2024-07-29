import React, { useRef } from 'react';
import styles from '../styles/Signup.module.css';

function Signup() {
    const emailInput = useRef();
    const passwordInput = useRef();
    const repeatPasswordInput = useRef();
    const emailVerificationInput = useRef();
    const nicknameInput = useRef();

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

    const handleSignupClick = () => {
        const email = emailInput.current?.value;
        const password = passwordInput.current?.value;
        const repeatPassword = repeatPasswordInput.current?.value;
        const emailVerification = emailVerificationInput.current?.value;
        const nickname = nicknameInput.current?.value;

        if (!email || !password || !repeatPassword || !emailVerification || !nickname) {
            alert('빈 칸을 전부 입력 해주세요.');
            return;
        }

        if (!isEmailValid(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        if (password !== repeatPassword) {
            alert('비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        if (!isPasswordValid(password)) {
            alert('비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다.');
            return;
        }

        alert('회원가입이 성공적으로 완료되었습니다.');
    };

    const handleSendCodeClick = () => {
        alert('인증 코드가 전송되었습니다.');
    };

    const handleVerifyCodeClick = () => {
        alert('인증 코드가 확인되었습니다.');
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
                <input className={styles.input} type="password" placeholder="비밀번호" ref={passwordInput} />
                <input className={styles.input} type="password" placeholder="비밀번호 확인" ref={repeatPasswordInput} />
                <input className={styles.input} type="text" placeholder="닉네임" ref={nicknameInput} />
                <button className={styles.button} type="submit" onClick={handleSignupClick}>Sign up</button>
            </div>
        </div>
    );
}

export default Signup;
