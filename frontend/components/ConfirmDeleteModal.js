import React from 'react';
import styles from '../styles/ConfirmDeleteModal.module.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => (
    isOpen ? (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2 className={styles.header}>Вы уверены, что хотите удалить этот адрес?</h2>
                <button onClick={onConfirm} className={styles.confirmButton}>Да</button>
                <button onClick={onClose} className={styles.cancelButton}>Нет</button>
            </div>
        </div>
    ) : null
);

export default ConfirmDeleteModal;
