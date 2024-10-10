import axios from 'axios';

const API_URL = 'http://localhost:3001';  // Укажите ваш API URL

export async function getAddresses(crypto) {
    const response = await axios.get(`${API_URL}/addresses/${crypto}`);
    return response.data;
}

export async function addPrivateKey(privateKey, currency) {
    try {
        return await axios.post('${API_URL}/add-private-key', { // Порт изменен на 3001
            privateKey,
            currency,
        });
    } catch (error) {
        console.error('Error add private key:', error);
    }
}

export async function addSeedPhrase(seedPhrase, currency) {
    const response = await axios.post(`${API_URL}/add-seed-phrase`, { seedPhrase, currency });
    return response.data;
}

export async function getBalance(address, currency) {
    const response = await axios.get(`${API_URL}/balance/${address}/${currency}`);
    return response.data;
}

export async function convertBalanceToUSD(balance, currency) {
    const response = await axios.post(`${API_URL}/convert`, { balance, currency });
    return response.data;
}
