import React from 'react';
import styles from '../styles/BalanceModal.module.css';

const BalanceModal = ({ isOpen, onClose, address, currency, balance, balanceToUsd }) => (
    isOpen ? (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2 className={styles.header}>Баланс адреса: {address}</h2>
                <p className={styles.balanceText}>Баланс {currency}: {balance !== null ? balance : 'Загрузка...'}</p>
                <p className={styles.balanceText}>{balanceToUsd !== null ? `Баланс в Долларах: ${balanceToUsd}` : ''}</p>
            </div>
        </div>
    ) : null
);

export default BalanceModal;
