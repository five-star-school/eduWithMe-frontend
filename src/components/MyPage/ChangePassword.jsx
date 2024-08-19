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
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,15}$/;
        return passwordRegex.test(password);
    };

    const handleNewPasswordChange = (event) => {
        const value = event.target.value;
        setNewPassword(value);

        if (!isPasswordValid(value)) {
            setNewPasswordError('비밀번호는 8~15자이며, 대문자, 숫자, 특수문자를 포함해야 합니다.');
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
            setCurrentPasswordError(''); // 현재 비밀번호 오류 초기화

            const response = await axios.put('/api/profiles/password', {
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
            if (error.response?.data?.message === '현재 비밀번호가 틀렸습니다.') {
                setCurrentPasswordError('현재 비밀번호가 틀렸습니다.');
                setError(null); // 일반 오류는 비워두기
            } else {
                setError(error.response?.data?.message || '* 비밀번호 변경에 실패했습니다.');
                setCurrentPasswordError(''); // 현재 비밀번호 오류를 초기화
            }
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
