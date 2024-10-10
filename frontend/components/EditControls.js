import React from 'react';
import styles from '../styles/EditControls.module.css';

const EditControls = ({ isEditing, onToggleEdit, onSave, onCancel }) => (
    <div className={styles.editControlsWrapper}>
        {!isEditing ? (
            <button className={styles.editButton} onClick={onToggleEdit}>✏️</button>
        ) : (
            <div className={styles.editModeButtons}>
                <button className={styles.saveButton} onClick={onSave}>✔️</button>
            </div>
        )}
    </div>
);

export default EditControls;
//                <button className={styles.cancelButton} onClick={onCancel}>❌</button>