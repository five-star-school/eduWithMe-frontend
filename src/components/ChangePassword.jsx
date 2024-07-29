import React, { useRef } from 'react';
import styles from '../styles/ChangePassword.module.css';

function ChangePassword() {
    const currentPasswordInput = useRef();
    const newPasswordInput = useRef();
    const repeatNewPasswordInput = useRef();

    const isPasswordValid = (password) => {
        // 비밀번호가 최소 8자 이상이고, 대문자, 소문자, 숫자, 특수문자를 포함해야 함
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleConfirmClick = () => {
        const currentPassword = currentPasswordInput.current?.value;
        const newPassword = newPasswordInput.current?.value;
        const repeatNewPassword = repeatNewPasswordInput.current?.value;

        if (!currentPassword || !newPassword || !repeatNewPassword) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        if (newPassword !== repeatNewPassword) {
            alert('새 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        if (newPassword === currentPassword) {
            alert('기존 비밀번호와 같은 비밀번호를 사용할 수 없습니다.');
            return;
        }

        if (!isPasswordValid(newPassword)) {
            alert('새 비밀번호가 규정에 맞지 않습니다. 비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다.');
            return;
        }

        alert('비밀번호가 성공적으로 변경되었습니다.');
    };

    return (
        <div className={styles.changePassword}>
            <h2 className={styles.title}>비밀번호 수정</h2>
            <div className={styles.form}>
                <input className={styles.input} type="password" placeholder="기존 비밀번호" ref={currentPasswordInput} />
                <input className={styles.input} type="password" placeholder="새 비밀번호" ref={newPasswordInput} />
                <input className={styles.input} type="password" placeholder="새 비밀번호 확인" ref={repeatNewPasswordInput} />
                <button className={styles.button} onClick={handleConfirmClick}>확인</button>
            </div>
        </div>
    );
}

export default ChangePassword;
