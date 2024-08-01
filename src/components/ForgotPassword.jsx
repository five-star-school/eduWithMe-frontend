import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../util/axiosConfig';
import styles from '../styles/ForgotPassword.module.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAuthCodeInput, setShowAuthCodeInput] = useState(false);
    const [showTempPassword, setShowTempPassword] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleAuthCodeChange = (e) => setAuthCode(e.target.value);

    const handleRequestAuthCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/users/temp-password-request', { email });
            setMessage(response.data);
            setShowAuthCodeInput(true);
        } catch (error) {
            setMessage(error.response?.data || '인증 코드 요청 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyAuthCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/users/reset-password', { email, authNum: authCode });
            setShowTempPassword(true);
            setMessage('임시 비밀번호가 이메일로 전송되었습니다. 로그인 페이지로 이동합니다.');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setMessage(error.response?.data || '인증 코드 확인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.forgotPassword}>
            <h2 className={styles.title}>비밀번호 찾기</h2>
            <form onSubmit={showAuthCodeInput ? handleVerifyAuthCode : handleRequestAuthCode} className={styles.form}>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="이메일 주소"
                    required
                    className={styles.input}
                    disabled={showAuthCodeInput}
                />
                {showAuthCodeInput && !showTempPassword && (
                    <input
                        type="text"
                        value={authCode}
                        onChange={handleAuthCodeChange}
                        placeholder="인증 코드"
                        required
                        className={styles.input}
                    />
                )}
                {!showTempPassword && (
                    <button type="submit" disabled={isLoading} className={styles.button}>
                        {isLoading ? '처리 중...' : (showAuthCodeInput ? '인증 코드 확인' : '인증 코드 요청')}
                    </button>
                )}
            </form>
            {message && <p className={styles.message}>{message}</p>}
            {!showTempPassword && (
                <p className={styles.notice}>
                    {showAuthCodeInput
                        ? '* 이메일로 전송된 인증 코드를 입력하세요. 인증 후 임시 비밀번호가 발급됩니다.'
                        : '* 이메일 주소 입력 후 인증 코드 요청 버튼 클릭시 해당 메일로 인증 코드가 발송됩니다.'
                    }
                </p>
            )}
        </div>
    );
}

export default ForgotPassword;