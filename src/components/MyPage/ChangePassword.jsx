import React, { useRef, useState } from 'react';
import axios from '../../util/axiosConfig';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/ChangePassword.module.css';

function ChangePassword() {
    const currentPasswordInput = useRef();
    const newPasswordInput = useRef();
    const repeatNewPasswordInput = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [repeatNewPasswordError, setRepeatNewPasswordError] = useState('');
    const navigate = useNavigate();

    const isPasswordValid = (password) => {
        // 비밀번호가 최소 8자 이상이고, 대문자, 소문자, 숫자, 특수문자를 포함해야 함
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleCurrentPasswordChange = () => {
        // 기존 비밀번호에 대한 유효성 검사 또는 필요한 로직
    };

    const handleNewPasswordChange = (event) => {
        const value = event.target.value;
        setNewPassword(value);

        if (!isPasswordValid(value)) {
            setNewPasswordError('비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다.');
        } else {
            setNewPasswordError('');
        }
    };

    const handleRepeatNewPasswordChange = (event) => {
        const value = event.target.value;
        setRepeatNewPassword(value);

        if (value !== newPassword) {
            setRepeatNewPasswordError('새 비밀번호 확인이 일치하지 않습니다.');
        } else {
            setRepeatNewPasswordError('');
        }
    };

    const handleConfirmClick = async () => {
        const currentPassword = currentPasswordInput.current?.value;

        // 입력 유효성 검사
        if (!currentPassword || !newPassword || !repeatNewPassword) {
            setError('* 빈 칸을 전부 입력 해주세요.');
            return;
        }

        if (newPassword === currentPassword) {
            setError('* 기존 비밀번호와 같은 비밀번호를 사용할 수 없습니다.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await axios.put('/profiles/password', {
                currentPassword,
                newPassword,
            });

            if (response.status === 200) {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                currentPasswordInput.current.value = '';
                newPasswordInput.current.value = '';
                repeatNewPasswordInput.current.value = '';
                navigate('/mypage');
                setNewPassword('');
                setRepeatNewPassword('');
            } else {
                throw new Error('비밀번호 변경에 실패했습니다.');
            }
        } catch (error) {
            setError(error.response?.data?.message || '* 비밀번호 변경에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.changePassword}>
            <h2 className={styles.title}>비밀번호 변경</h2>
            <div className={styles.form}>
                <input
                    className={styles.input}
                    type="password"
                    placeholder="기존 비밀번호"
                    ref={currentPasswordInput}
                    onChange={handleCurrentPasswordChange}
                />
                {currentPasswordError && <p className={styles.error}>{currentPasswordError}</p>}
                <input
                    className={styles.input}
                    type="password"
                    placeholder="새 비밀번호"
                    ref={newPasswordInput}
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
                {newPasswordError && <p className={styles.error}>{newPasswordError}</p>}
                <input
                    className={styles.input}
                    type="password"
                    placeholder="새 비밀번호 확인"
                    ref={repeatNewPasswordInput}
                    value={repeatNewPassword}
                    onChange={handleRepeatNewPasswordChange}
                />
                {repeatNewPasswordError && <p className={styles.error}>{repeatNewPasswordError}</p>}
                <button
                    className={styles.button}
                    onClick={handleConfirmClick}
                    disabled={loading}
                >
                    {loading ? '변경 중...' : '확인'}
                </button>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
}

export default ChangePassword;
