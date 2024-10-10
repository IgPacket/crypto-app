const axios = require('axios');
const { CRYPTO_API_URL } = require('../util/config')

module.exports = {
    async convertToFiat(balance, currency, fiatCurrency) {
        try {
            const response = await axios.get(`${CRYPTO_API_URL}/simple/price?ids=${currency.toLowerCase()}&vs_currencies=${fiatCurrency.toLowerCase()}`);
            const rate = response.data[currency.toLowerCase()][fiatCurrency.toLowerCase()];
            return balance * rate;
        } catch (error) {
            throw new Error('Failed to convert balance: ' + error);
        }
    },
};
