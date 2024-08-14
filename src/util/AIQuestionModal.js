import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/AIQuestionModal.module.css';

function AIQuestionModal({ onClose }) {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        const requestBody = { prompt: input };

        try {
            const result = await axios.post('http://localhost:8888/api/gemini/generate',
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setResponse(result.data);
        } catch (error) {
            setResponse(`Error: ${error.response?.data || error.message}`);
        }
        setIsLoading(false);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>AI에게 질문하기</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="질문을 입력하세요..."
                        rows="4"
                        className={styles.inputArea}
                    />
                </form>
                {response && (
                    <div className={styles.responseArea}>
                        <h3>AI 응답:</h3>
                        <p>{response}</p>
                    </div>
                )}
                <div className={styles.buttonGroup}>
                    <button onClick={handleSubmit} disabled={isLoading} className={styles.submitButton}>
                        {isLoading ? '처리 중...' : '질문하기'}
                    </button>
                    <button onClick={onClose} className={styles.closeButton}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default AIQuestionModal;