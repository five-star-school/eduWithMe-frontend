import React from 'react';
import styles from '../styles/QuestionDetail.module.css';

function QuestionDetail() {
    return (
        <div className={styles.questionSection}>
            <div className={styles.questionTitleSection}>
                <span className={styles.questionLabel}>문제 제목</span>
                <input type="text" className={styles.questionTitleInput} placeholder="문제 제목"/>
            </div>

            <div className={styles.questionContentSection}>
                <span className={styles.questionLabel}>객관식 문제</span>
                <textarea className={styles.questionContentInput} placeholder="진짜 문제가 들어갑니다."></textarea>
            </div>

            <div className={styles.answerOptions}>
                <div className={styles.answerOption}>
                    <span className={styles.optionNumber}>1</span>
                    <span className={styles.optionContent}>문제1</span>
                </div>
                <div className={styles.answerOption}>
                    <span className={styles.optionNumber}>2</span>
                    <span className={styles.optionContent}>문제2</span>
                </div>
                <div className={styles.answerOption}>
                    <span className={styles.optionNumber}>3</span>
                    <span className={styles.optionContent}>문제3</span>
                </div>
                <div className={styles.answerOption}>
                    <span className={styles.optionNumber}>4</span>
                    <span className={styles.optionContent}>문제4</span>
                </div>
            </div>

            <div className={styles.questionInfo}>
                <span className={styles.difficulty}>
                    <span className={styles.infoLabel}>난이도:</span> 중
                </span>
                <span className={styles.points}>
                    <span className={styles.infoLabel}>포인트:</span> 100
                </span>
            </div>
        </div>
    );
}

export default QuestionDetail;
