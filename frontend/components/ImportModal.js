import React, { useState } from 'react';
import styles from '../styles/ImportModal.module.css';

const ImportModal = ({ isOpen, onClose, onImport, onImportToggle, onImportCurrency, currencies }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onImport(inputValue);
        setInputValue('')
    };

    return isOpen ? (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2 className={styles.header}>Импорт</h2>
                <form className={styles.addForm} onSubmit={handleSubmit}>
                    <select className={styles.list} onChange={(e) => onImportToggle(e.target.value)}>
                        <option value="privateKey">Приватный ключ</option>
                        <option value="seedPhrase">Сид-фраза</option>
                    </select>
                    <select className={styles.list} onChange={(e) => onImportCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                    <input
                        className={styles.inputValue}
                        type="text"
                        name="input"
                        placeholder="Введите данные"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.addButton}>Добавить</button>
                </form>
            </div>
        </div>
    ) : null;
};

export default ImportModal;
