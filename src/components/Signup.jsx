import React, { useRef } from 'react';
import styles from '../styles/Signup.module.css';

function Signup() {
    const emailInput = useRef();
    const passwordInput = useRef();
    const repeatPasswordInput = useRef();
    const emailVerificationInput = useRef();
    const nicknameInput = useRef();

    const handleSignupClick = () => {
        if (!emailInput.current || !passwordInput.current || !repeatPasswordInput.current || !emailVerificationInput.current) {
            alert('빈 칸을 전부 입력 해주세요.');
            return;
        }

        if (repeatPasswordInput.current.value !== passwordInput.current.value) {
            alert('비밀번호 확인이 일치하지 않습니다.');
            return;
        }
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
