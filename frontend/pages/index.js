import React, { useState, useEffect } from 'react';
import AddressList from '../components/AddressList';
import EditControls from '../components/EditControls';
import BalanceModal from '../components/BalanceModal';
import ImportModal from '../components/ImportModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import styles from '../styles/Homepage.module.css';

const Homepage = () => {
    const [addresses, setAddresses] = useState([]);
    const [editedAddresses, setEditedAddresses] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isBalanceOpen, setBalanceOpen] = useState(false);
    const [isImportOpen, setImportOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [balance, setBalance] = useState(null);
    const [balanceToUsd, setBalanceToUsd] = useState(null);
    const [importType, setImportType] = useState('privateKey');
    const [currencyImport, setCurrencyImport] = useState('');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);  // Модальное окно удаления
    const [addressToDelete, setAddressToDelete] = useState(null);     // Хранит адрес для удаления
    const [currencyToDelete, setCurrencyToDelete] = useState(null);

    const fetchAddresses = async () => {
        const response = await fetch('http://localhost:3001/addresses');
        const data = await response.json();
        setAddresses(data);
        setEditedAddresses(data)
        const dataCurrency = data.error == null ? data.map(el => el.currency) : null
        setCurrencies(dataCurrency)
    };

    useEffect(() => {
        fetchAddresses();
    }, []);


    const handleBalanceCheck = async (currency, address) => {
        try {
            if (isEditing) return;
            setSelectedAddress(address);
            setSelectedCurrency(currency);
            const response = await fetch(`http://localhost:3001/balance/${currency}/${address}`);
            const data = await response.json();
            if (response.ok) {
                setBalance(data.balance);
                setBalanceToUsd(data.balanceToUsd);
            } else {
                setBalance(null);
                setBalanceToUsd(null);
            }
            setBalanceOpen(true);
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Ошибка сети. Попробуйте снова.');
        }
    };

    const handleImportSubmit = async (inputValue) => {
        try {
            const importUrl = importType === "privateKey" ? "add-private-key" : "add-seed-phrase"
            const body = { currency: currencyImport }
            body[importType] = inputValue
            const response = await fetch(`http://localhost:3001/${importUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( body ),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Импорт успешен:', result);
                alert('Адрес успешно добавлен!');
                setImportOpen(false);
                fetchAddresses();
            } else {
                console.error('Ошибка импорта:', result);
                alert('Произошла ошибка при импорте. Попробуйте снова.');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Ошибка сети. Попробуйте снова.');
        }
    };

    const handleSave = () => {
        setAddresses([...editedAddresses]);
        setIsEditing(false);
    };

    // const handleCancel = () => {
    //     setEditedAddresses([...addresses]);
    //     setIsEditing(false);
    // };

    const handleImportClick = () => {
        setImportOpen(true);
        setCurrencyImport(currencies[0])
    };

    const ImportButton = ({ isEditing }) => (
        !isEditing ?
            (<div className={styles.right}>
            <button className={styles.importButton} onClick={handleImportClick}>Import</button>
        </div>) :
            (<div className={styles.right}>
                <button disabled={true} className={styles.importButton} onClick={handleImportClick}>Import</button>
            </div>)
    );

    const handleDeleteAddress = (currency, address) => {
        setCurrencyToDelete(currency);
        setAddressToDelete(address);
        setDeleteModalOpen(true);
    };

    const confirmDeleteAddress = async () => {
        setDeleteModalOpen(false);
        if (!currencyToDelete || !addressToDelete) return;

        const updatedAddresses = editedAddresses.map(item =>
            item.currency === currencyToDelete ? {
                ...item,
                addresses: item.addresses.filter(addr => addr !== addressToDelete)
            } : item
        )
        setEditedAddresses(updatedAddresses);

        try {
            await fetch(`http://localhost:3001/addresses/${addressToDelete}`, {
                method: 'DELETE'
            });
            setAddresses(updatedAddresses);
        } catch (error) {
            console.error('Ошибка при удалении адреса:', error);
        }
    };

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
    };

    const handleEditToggle = () => {
        if (!isEditing) {
            setEditedAddresses([...addresses]);
        }
        setIsEditing(!isEditing);
    };

    // const moveCurrencyBlock = (index, direction) => {
    //     const updatedAddresses = [...editedAddresses];
    //     const [movedCurrency] = updatedAddresses.splice(index, 1);
    //     updatedAddresses.splice(index + direction, 0, movedCurrency);
    //     setEditedAddresses(updatedAddresses);
    // };

    const moveAddress = (currency, index, direction) => {
        const updatedAddresses = [...editedAddresses];
        const item = updatedAddresses.find((item) => item.currency === currency);
        if (item) {
            const newAddresses = [...item.addresses];
            const [movedAddress] = newAddresses.splice(index, 1);
            newAddresses.splice(index + direction, 0, movedAddress);
            item.addresses = newAddresses;
            setEditedAddresses(updatedAddresses);
        }
    };

    if (addresses.error != null) {
        return (
            <div className={styles.homepage}>
                <h1 className={styles.header}>Отсутствует подключение к базе данных</h1>
            </div>
        )
    }

    return (
        <div className={styles.homepage}>
            <h1 className={styles.header}>Ваши адреса</h1>

            <ImportButton
                isEditing={isEditing}
            />
            <EditControls
                isEditing={isEditing}
                onToggleEdit={handleEditToggle}
                onSave={handleSave}
                //onCancel={handleCancel}
            />
            <AddressList
                addresses={isEditing ? editedAddresses : addresses}
                isEditing={isEditing}
                //onMoveCurrencyBlock={moveCurrencyBlock}
                onMoveAddress={moveAddress}
                onDeleteAddress={handleDeleteAddress}
                onCheckBalance={handleBalanceCheck}
            />
            <BalanceModal
                isOpen={isBalanceOpen}
                onClose={() => setBalanceOpen(false)}
                address={selectedAddress}
                currency={selectedCurrency}
                balance={balance}
                balanceToUsd={balanceToUsd}
            />
            <ImportModal
                isOpen={isImportOpen}
                onClose={() => setImportOpen(false)}
                onImport={handleImportSubmit}
                onImportToggle={(importType) => setImportType(importType)}
                onImportCurrency={(currency) => setCurrencyImport(currency)}
                currencies={currencies}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onConfirm={confirmDeleteAddress}  // Подтверждение удаления
            />
        </div>
    );
};

export default Homepage;
