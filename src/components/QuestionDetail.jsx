import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../util/axiosConfig";
import { getCookie } from '../util/cookie';
import styles from '../styles/QuestionDetail.module.css';

function QuestionDetail() {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', points: '' });
    const [isTeacher, setIsTeacher] = useState(false);
    const { roomId, questionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie('AccessToken');
        if (token === null) {
            navigate('/login');
        } else {
            fetchQuestionDetail();
            checkIfTeacher();
        }
    }, [roomId, questionId, navigate]);

    const fetchQuestionDetail = async () => {
        try {
            const response = await axios.get(`/rooms/${roomId}/question/${questionId}`);
            console.log('Question detail:', response.data);
            if (response.data && response.data.data) {
                setQuestion(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch question detail:', error);
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
        }
    };

    const checkIfTeacher = async () => {
        try {
            const response = await axios.get(`/rooms/${roomId}/users`);
            if (response.data && response.data.data) {
                const currentUserId = getCookie('userId');
                const roomData = response.data.data;
                setIsTeacher(roomData.some(user => user.userId.toString() === currentUserId && user.userId === user.managerUserId));
            }
        } catch (error) {
            console.error('Failed to check if user is teacher:', error);
        }
    };

    const handleAnswerClick = (index) => {
        if (!isTeacher) {
            setSelectedAnswer(index);
        }
    };

    const handleSubmit = async () => {
        if (isTeacher) {
            alert('선생님은 문제를 풀 수 없습니다.');
            return;
        }

        if (selectedAnswer !== null && question) {
            try {
                const response = await axios.post(`/rooms/${roomId}/question/${questionId}/submit`, {
                    selectedAnswer: selectedAnswer + 1
                });

                const result = response.data.data;
                setModalContent({
                    title: result.correct ? '정답입니다!' : '오답입니다.',
                    points: `획득한 포인트: ${result.earnedPoints}`
                });
                setShowModal(true);
            } catch (error) {
                console.error('Failed to submit answer:', error);
                setModalContent({
                    title: '오류',
                    message: '답안 제출 중 오류가 발생했습니다.',
                    points: ''
                });
                setShowModal(true);
            }
        }
    };

    const handleShowAnswer = () => {
        if (question && question.answerOption) {
            const correctAnswer = question.answerOption.answered;
            setModalContent({
                title: '정답',
                message: ` ${correctAnswer}번`,
                points: ''
            });
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.questionSection}>
            <div className={styles.questionTitleSection}>
                <span className={styles.questionLabel}>문제 제목</span>
                <input type="text" className={styles.questionTitleInput} value={question.title} readOnly/>
            </div>

            <div className={styles.questionContentSection}>
                <span className={styles.questionLabel}>객관식 문제</span>
                <textarea className={styles.questionContentInput} value={question.content} readOnly></textarea>
            </div>

            <div className={styles.answerOptions}>
                {question.answerOption && [
                    question.answerOption.first,
                    question.answerOption.second,
                    question.answerOption.third,
                    question.answerOption.fourth
                ].map((option, index) => (
                    <div key={index} className={styles.answerOption}>
                        <span className={styles.optionNumber}>{index + 1}</span>
                        <span
                            className={`${styles.optionContent} ${selectedAnswer === index ? styles.selectedAnswer : ''} ${isTeacher ? styles.disabled : ''}`}
                            onClick={() => handleAnswerClick(index)}
                        >
                            {option}
                        </span>
                    </div>
                ))}
            </div>

            <div className={styles.questionInfo}>
                <span className={styles.difficulty}>
                    <span className={styles.infoLabel}>난이도:</span> {question.difficulty}
                </span>
                <span className={styles.points}>
                    <span className={styles.infoLabel}>포인트:</span> {question.point}
                </span>
                <button
                    className={styles.showAnswerButton}
                    onClick={handleShowAnswer}
                >
                    정답 확인
                </button>
            </div>

            <button
                className={`${styles.submitButton} ${isTeacher ? styles.disabled : ''}`}
                onClick={handleSubmit}
                disabled={isTeacher}
            >
                {isTeacher ? '선생님은 제출할 수 없습니다' : '제출'}
            </button>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>{modalContent.title}</h2>
                        <p>{modalContent.message}</p>
                        {modalContent.points && <p>{modalContent.points}</p>}
                        <button onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuestionDetail;