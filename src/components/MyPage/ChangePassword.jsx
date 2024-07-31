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
    const navigate = useNavigate();  

    const handleConfirmClick = async () => {
        const currentPassword = currentPasswordInput.current?.value;
        const newPassword = newPasswordInput.current?.value;
        const repeatNewPassword = repeatNewPasswordInput.current?.value;

        if (!currentPassword || !newPassword || !repeatNewPassword) {
            alert('빈 칸을 전부 입력 해주세요.');
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
            } else {
                throw new Error('비밀번호 변경에 실패했습니다.');
            }
        } catch (error) {
            setError(error.response?.data?.message || '비밀번호 변경에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.changePassword}>
            <h2 className={styles.title}>비밀번호 수정</h2>
            <div className={styles.form}>
                <input className={styles.input} type="password" placeholder="기존 비밀번호" ref={currentPasswordInput} />
                <input className={styles.input} type="password" placeholder="새 비밀번호" ref={newPasswordInput} />
                <input className={styles.input} type="password" placeholder="새 비밀번호 확인" ref={repeatNewPasswordInput} />
                <button className={styles.button} onClick={handleConfirmClick} disabled={loading}>
                    {loading ? '변경 중...' : '확인'}
                </button>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
}

export default ChangePassword;
