const { ETHEREUM_API_KEY } = require('../util/config');
const axios = require('axios');
const { RippleAPI } = require('ripple-lib');
const StellarSdk = require('@stellar/stellar-sdk');
const { TronWeb } = require('tronweb');

async function getBalanceFromAddress(address, currency) {
    switch (currency) {
        case 'bitcoin': return await getBitcoinBalance(address);
        case 'ethereum': return await getEthereumBalance(address);
        case 'ripple': return await getRippleBalance(address);
        case 'stellar': return await getStellarBalance(address);
        case 'tron': return await getTronBalance(address);
    }
}

async function getBitcoinBalance(address) {
    try {
        const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);
        return response.data.balance / 100000000; // Конвертация сатоши в BTC
    } catch (error) {
        throw new Error('Error fetching Bitcoin balance: ' + error);
    }
}

async function getEthereumBalance(address) {
    try {
        const response = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${ETHEREUM_API_KEY}`);
        return response.data.result / Math.pow(10, 18); // Баланс в ETH
    } catch (error) {
        throw new Error('Error fetching Ethereum balance: ' + error);
    }
}

async function getRippleBalance(address) {
    const api = new RippleAPI({ server: 'wss://s1.ripple.com' });
    await api.connect();
    try {
        const accountInfo = await api.getAccountInfo(address);
        return accountInfo.xrpBalance; // Баланс в XRP
    } catch (error) {
        throw new Error('Error fetching Ripple balance: ' + error);
    } finally {
        await api.disconnect();
    }
}

async function getStellarBalance(address) {
    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    try {
        const account = await server.loadAccount(address);

        const balance = account.balances.find(b => b.asset_type === 'native');
        return balance.balance; // Баланс в XLM
    } catch (error) {
        throw new Error('Error fetching Stellar balance: ' + error);
    }
}

async function getTronBalance(address) {
    const tronWeb = new TronWeb({
        fullHost: 'https://api.trongrid.io'
    });
    try {
        const balance = await tronWeb.trx.getBalance(address);
        return balance / Math.pow(10, 6); // Баланс в TRX
    } catch (error) {
        throw new Error('Error fetching Tron balance: ' + error);
    }
}

module.exports = {
    getBalanceFromAddress
};