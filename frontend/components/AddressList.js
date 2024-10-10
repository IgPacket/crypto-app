import React, { useState } from 'react';
import styles from '../styles/AddressList.module.css';

const AddressList = ({ addresses, isEditing, onMoveCurrencyBlock, onMoveAddress, onDeleteAddress, onCheckBalance }) => {
    const [collapsedBlocks, setCollapsedBlocks] = useState({});

    const toggleCollapse = (currency) => {
        setCollapsedBlocks((prevState) => ({
            ...prevState,
            [currency]: !prevState[currency]
        }));
    };

    return (
        <ul className={styles.addressList}>
            {addresses.map((item) => (
                <li key={item.currency} className={styles.currencyBlock}>
                    <div
                        className={styles.currencyHeader}
                        onClick={() => toggleCollapse(item.currency)}
                    >
                        <span className={styles.currencyTitle}>
                            {collapsedBlocks[item.currency] ? '▲️' : '▼'}
                            {item.currency}
                        </span>
                    </div>
                    {!collapsedBlocks[item.currency] && item.addresses.map((address, index) => (
                        <div key={address.toString()} className={styles.addressItem}>
                        <span>{address}</span>
                            {!isEditing ? (
                                <button className={styles.balanceButton}
                                        onClick={() => onCheckBalance(item.currency, address)}>Посмотреть
                                    баланс</button>
                            ) : (
                                <div className={styles.editControlsBlock}>
                                    <button
                                        className={index !== 0 ? styles.editControlsAddress : styles.editControlsAddressDisabled}
                                        onClick={() => onMoveAddress(item.currency, index, -1)}
                                        disabled={index === 0}>⬆️
                                    </button>
                                    <button
                                        className={index !== item.addresses.length - 1 ? styles.editControlsAddress : styles.editControlsAddressDisabled}
                                        onClick={() => onMoveAddress(item.currency, index, 1)}
                                        disabled={index === item.addresses.length - 1}>⬇️
                                    </button>
                                    <button className={styles.editControlsAddress}
                                            onClick={() => onDeleteAddress(item.currency, address)}>🗑️
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </li>
            ))}
        </ul>
    );
};

export default AddressList;


// {isEditing && (
//     <div className={styles.editControlsBlock}>
//         <button className={styles.editControlsCurrency}
//                 onClick={() => onMoveCurrencyBlock(blockIndex, -1)} disabled={blockIndex === 0}>
//             ⬆️
//         </button>
//         <button className={styles.editControlsCurrency}
//                 onClick={() => onMoveCurrencyBlock(blockIndex, 1)}
//                 disabled={blockIndex === addresses.length - 1}>
//             ⬇️
//         </button>
//     </div>
// )}