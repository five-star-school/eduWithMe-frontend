import React, { useRef } from 'react';
import styles from '../styles/ForgotPassword.module.css';

function ForgotPassword() {
    const emailInput = useRef();

    const isEmailValid = (email) => {
        // 이메일 유효성 검사를 위한 정규 표현식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleConfirmClick = () => {
        const email = emailInput.current?.value;

        if (!email) {
            alert('이메일 주소를 입력해주세요.');
            return;
        }

        if (!isEmailValid(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        alert('임시 비밀번호가 이메일로 발송되었습니다.');
        // 여기에 이메일로 임시 비밀번호를 발송하는 로직을 추가할 수 있습니다.
    };

    return (
        <div className={styles.forgotPassword}>
            <h2 className={styles.title}>비밀번호 찾기</h2>
            <div className={styles.form}>
                <input className={styles.input} type="email" placeholder="이메일" ref={emailInput} />
                <button className={styles.button} onClick={handleConfirmClick}>확인</button>
                <p className={styles.notice}>*이메일 주소 입력 후 확인 버튼 클릭시 해당 메일로 임시 비밀번호가 발송됩니다.</p>
            </div>
        </div>
    );
}

export default ForgotPassword;
